import { Injectable } from '@angular/core';
import { RosterService } from '../../shared/services/roster.service';
import { ProductService } from '../../shared/services/product.service';
import { StudentService } from '../../shared/services/student.service';
import { TelemetryService } from '../../shared/services/telemetry.service';
import { ErrorMessageConstants } from '../../shared/constants/error-message-constants';
import { LoggerService } from '../../shared/logger.service';
import { FileConstants } from '../../shared/constants/file-constants';
import { Subject, timer } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
import { AuthTokenService } from 'src/app/auth/authtoken.service';
import { UserService } from 'src/app/auth/user.service';
import { BackgroundProcessService } from 'src/app/shared/services/background-process.service';
import { LoginDalService } from 'src/app/shared/services/cache-datalayer/login-dal.service';
import { Authentication } from 'src/app/models/auth.model';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { TeacherClassModel } from 'src/app/models/class.model';

@Injectable()
export class LoginService {
  readonly PROGRESSSTATUS = {
    Initial: 0,
    Login: 1,
    Sync: 2
  };
  private _username: string;
  private _password: string;
  public returnPickClassUrl: string;
  loginErrorMessage: Subject<string> = new Subject();
  loginProgressStatus: Subject<number> = new Subject();
  constructor(private router: Router,
    private authtokenService: AuthTokenService,
    private userService: UserService,
    private rosterService: RosterService,
    private productService: ProductService,
    private studentService: StudentService,
    public telemetryService: TelemetryService,
    private backgroundProcessService: BackgroundProcessService,
    private loginDalService: LoginDalService,
    private teacherClassService: TeacherClassService
  ) {
    this.returnPickClassUrl = 'pickclass';
  }

  /**
   * process login online mode
   * @param loggedInUserResponse loggedIn user response
   * @param username username enterd by user
   * @param password password entered by user
   */
  public processLoginOnlineMode(loggedInUserResponse: any, username: string, password: string): void {
    this._username = username;
    this._password = password;
    if (!loggedInUserResponse) {
      this.setProgressStatus(this.PROGRESSSTATUS.Initial);
      this.userService.removeCurrentUserSession();
      LoggerService.error(ErrorMessageConstants.errorMessages.serviceResponseIssue, {});
      return;
    }
    if (loggedInUserResponse.token) {
      this.loginDalService.clearLoggedInData().subscribe(() => {
        this.createLoggedInUserData(loggedInUserResponse);
      }, error => {
        LoggerService.error('IndexedDB Error: ', error);
      });
    } else {
      this.setProgressStatus(this.PROGRESSSTATUS.Initial);
      this.userService.removeCurrentUserSession();
      this.setMessage(ErrorMessageConstants.errorMessages.incorrectUsernamePassword);
    }
  }

  /**
   * create logged in user data
   * @param loggedInUserResponse logged in user response
   */
  private createLoggedInUserData(loggedInUserResponse: any): void {

    this.loginDalService.createLoggedInData().subscribe(() => {
      this.createLoggedInOnSuccess(loggedInUserResponse);
    }, (error) => {
      this.createLoggedInUserErrorHandler(error);
    });

  }
  /**
   * create logged in on success
   * @param loggedInUserResponse  loggedin user response
   */
  private createLoggedInOnSuccess(loggedInUserResponse: any): void {
    this.userService.setUser(loggedInUserResponse);
    if (loggedInUserResponse.idpResponse &&
      loggedInUserResponse.idpResponse.data &&
      loggedInUserResponse.idpResponse.data.authorizedResource && loggedInUserResponse.idpResponse.data.authorizedResource.length > 0) {
      this.productService.populateProductsInLocalDB(loggedInUserResponse.idpResponse.data.authorizedResource);
      this.getAccessTokenFromService(this.tokenOnSuccess);
    } else {
      this.setProgressStatus(this.PROGRESSSTATUS.Initial);
      this.userService.removeCurrentUserSession();
      this.setMessage(ErrorMessageConstants.errorMessages.productAuthorization);
    }
  }

  /**
   * handleError
   * @param error error to be handled
   */
  private createLoggedInUserErrorHandler(error: any): void {
    LoggerService.error(error.message, error);
  }
  /**
   * process login Offline mode
   * @param username username entered by user
   * @param password password entered by user
   */
  public processLoginOfflineMode(username: string, password: string): void {
    this._username = username;
    this._password = password;
    this.loginDalService.getLoggedInUserDetail(this.callbackExistingLoginUser);
  }

  /**
   * callbackExistingLoginUser
   * @param loggedInUserDetail user loggedin response
   */
  private callbackExistingLoginUser = (loggedInUserDetail: any): void => {
    let passwordMatchedWithHashed = false;
    this.teacherClassService.getAllClasses().subscribe((classList) => {
      if (classList && classList.length) {
        this.teacherClassService.setClassContext(true);
      } else {
        this.teacherClassService.setClassContext(false);
      }
    });
    if (loggedInUserDetail && loggedInUserDetail.length && loggedInUserDetail.length > 0) {
      // Compare and match password
      passwordMatchedWithHashed = this.matchPassword(this._password, loggedInUserDetail[0].password);
      if (loggedInUserDetail[0].userName === this._username
        && passwordMatchedWithHashed) {
        loggedInUserDetail[0].loginStatus = true;
        this.loginDalService.updateLoggedInUserDetails(loggedInUserDetail).subscribe(() => {
          this.userService.setUser(loggedInUserDetail[0]);
          this.router.navigate([this.returnPickClassUrl]);
        });
      } else {
        this.setProgressStatus(this.PROGRESSSTATUS.Initial);
        this.setMessage(ErrorMessageConstants.errorMessages.incorrectUsernamePassword);
      }
    } else {
      this.setProgressStatus(this.PROGRESSSTATUS.Initial);
      this.setMessage(ErrorMessageConstants.errorMessages.offlineRecordNotFound + '' + this._username);
    }
  }
  /**
   * get Access TokenFrom Service
   *
   */
  private getAccessTokenFromService(callback: Function): void {
    this.authtokenService.getToken().subscribe(
      (oauth: Authentication) => {
        callback(oauth);
      },
      error => {
        this.accessTokenErrorHandler(error);
      }
    );
  }
  /**
   * set token on success
   * @param oauth token data
   */
  private tokenOnSuccess = (oauth: Authentication): void => {
    if (oauth) {
      this.setProgressStatus(this.PROGRESSSTATUS.Sync);
      this.userService.setToken(oauth);
      this.getAndProcessClassData();
    } else {
      this.setProgressStatus(this.PROGRESSSTATUS.Initial);
      this.userService.removeCurrentUserSession();
      this.setMessage(ErrorMessageConstants.errorMessages.accessTokenFalied);
    }
  }

  /**
   * handle token error
   * @param error to be handled.
   */
  private accessTokenErrorHandler(error: any): void {
    this.setProgressStatus(this.PROGRESSSTATUS.Initial);
    this.userService.removeCurrentUserSession();

    if (error.error) {
      if (error.error.code === 401) {
        this.setMessage(error.error.message);
      } else {
        this.setMessage(ErrorMessageConstants.errorMessages.incorrectUsernamePassword);
      }
    } else {
      this.setMessage(ErrorMessageConstants.errorMessages.serverError);
      LoggerService.error(error.message, error);
    }
  }

  /**
   * get sections detail from roster service
   *
   */
  private getAndProcessClassData(): void {
    this.rosterService.getSection().subscribe(result => {
      this.rosterDataOnSuccess(result);
    },
      (error) => {
        this.handleRosterDataError(error);
      });
  }

  /**
   * roster data on success
   * @param result roster response.
   */
  private rosterDataOnSuccess(result: any): void {
    if (result && result.rosters && result.rosters.length) {
      const classList = result.rosters.filter((classItem) => {
        return classItem.status === 'ACTIVE';
      });
      this.storeLoggedInUserDetail(this.userService.getCurrentUser());
      this.processAuthorizedClass(classList);
    }
  }

  /**
   * process authorized class
   * @param classList class list
   */
  private processAuthorizedClass(classList: Array<TeacherClassModel>): void {
    const classesHavingAuthorizedProducts = this.teacherClassService.filterClassesHavingAuthorizedProducts(classList);
    if (!(classesHavingAuthorizedProducts && classesHavingAuthorizedProducts.length)) {
      this.router.navigate([this.returnPickClassUrl]);
      return;
    }
    this.teacherClassService.populateClassesInLocalDB(classesHavingAuthorizedProducts, () => {
      this.prepareStudentsListForAuthorizedClassesAndNavigateToRespectivePage(classesHavingAuthorizedProducts);
    });

  }

  /**
   * prepare students list for authorized classes and navigate to respective page.
   * @param classesHavingAuthorizedProducts list of authorized classes.
   */
  private prepareStudentsListForAuthorizedClassesAndNavigateToRespectivePage(classesHavingAuthorizedProducts: Array<TeacherClassModel>)
    : void {
    this.studentService.prepareStudentDetailListForAllClass(classesHavingAuthorizedProducts);
    this.backgroundProcessService.init(this.productService.getAuthorizedProducts(), '', '');
    timer(3000).subscribe(() => {
      if (classesHavingAuthorizedProducts && classesHavingAuthorizedProducts.length
        && classesHavingAuthorizedProducts.length === 1) {
        this.router.navigate([FileConstants.constants.pages + FileConstants.constants.dashboardTitle]);
      } else {
        this.router.navigate([this.returnPickClassUrl]);
      }
    });
  }

  /**
   * handle roster data error
   * @param error
   */
  private handleRosterDataError(error: any): void {
    this.setProgressStatus(this.PROGRESSSTATUS.Initial);
    this.userService.removeCurrentUserSession();
    this.setMessage(ErrorMessageConstants.errorMessages.serverError);
    LoggerService.error(error.message, error);
  }

  /**
   * set logged in users details in indexed db for future need.
   * @param currentUser logged in user detail.
   */
  private storeLoggedInUserDetail(currentUser: any): void {
    // Hashing password
    const hashedPassword = bcrypt.hashSync(this._password, FileConstants.constants.saltRoundsForPassword);
    currentUser['userName'] = this._username;
    currentUser['password'] = hashedPassword;
    currentUser['loginStatus'] = true;
    this.loginDalService.updateLoggedInUserDetails(currentUser).subscribe({
      next: () => {
        if (this.telemetryService instanceof TelemetryService) {
          this.telemetryService.sendTelemetryEvent({
            verb: { id: FileConstants.constants.login },
            object: {
              definition: { name: FileConstants.constants.applicationPlatform }
            }
          }).then(data => {
            console.log(data);
          }).catch(error => {
            this.telemetryService.sendTelemetryExceptionEvent(FileConstants.constants.httpError, error.message);
          });
        }
      }
    });
  }

  /**
   * Function created to display the error message
   */
  private setMessage(message: string): void {
    this.loginErrorMessage.next(message);
  }

  /**
   * Function created to display the error message
   * @state store the progess state
   * 0-main login screen
   * 1-loggin message screen
   * 2-sync message screen
   */

  private setProgressStatus(state: number): void {
    this.loginProgressStatus.next(state);
  }

  /**
   * user password match with password hashed value
   * @param inputPassword user input password value
   * @param stroredPassword stored hashed password value
   */

  public matchPassword(inputPassword: string, stroredPassword: string): boolean {
    try {
      return bcrypt.compareSync(inputPassword, stroredPassword);
    } catch (e) {
      return false;
    }

  }
}
