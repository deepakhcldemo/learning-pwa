import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { LoggerService } from '../../shared/logger.service';
import { IndexedDbService } from '../../shared/services/indexed.db.service';
import { environment } from '../../../environments/environment';
import { UserService } from 'src/app/auth/user.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessageConstants } from 'src/app/shared/constants/error-message-constants';
import { LoginService } from './login.service';
import { AppConstants } from '../../app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit, OnDestroy {
  readonly appVersion = AppConstants.appVersion;
  readonly isProduction = environment.production;
  readonly environmentName = environment.envName;
  private subLogin: Subscription;
  public username = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);
  public loginForm: FormGroup;
  public progressStatus: number;
  public msg = '';
  public easyBridgeUrl: string;
  // subUserProfile: Subscription;
  public errorMsg: any = {
    invalid: ErrorMessageConstants.errorMessages.invalidCredential

  };
  public PROGRESSSTATUS: any = {};

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private indexedDbService: IndexedDbService,
    private ngxSpinnerService: NgxSpinnerService,
    private loginService: LoginService
  ) {
    this.PROGRESSSTATUS = this.loginService.PROGRESSSTATUS;
    this.progressStatus = this.PROGRESSSTATUS.Initial;
  }
  /**
   * Below lifecycle is used to set form group.
   */
  ngOnInit() {
    this.easyBridgeUrl = environment.eazyBridgeURL;
    this.loginForm = this.fb.group({
      username: '',
      password: '',
    });
    this.indexedDbService.create(this.indexedDbService.dbSchema()).subscribe(data => {
    });

    const user = this.userService.getCurrentUser();
    if (user) {
      this.router.navigate([this.loginService.returnPickClassUrl]);
    }
    this.ngxSpinnerService.hide();
    this.loginService.loginProgressStatus.subscribe(stage => {
      this.progressStatus = stage;
    });
    this.loginService.loginErrorMessage.subscribe(message => {
      this.msg = message;
    });
  }
  /**
   * Function used to validate username in the form group
   */
  private getErrorUsernameMessage(): string {
    return this.username.hasError('required') ? ErrorMessageConstants.errorMessages.incorrectUserName : '';
  }
  /**
   * Function created to validate password in the form group
   */
  private getErrorPasswordMessage(): string {
    return this.password.hasError('required') ? ErrorMessageConstants.errorMessages.incorrectPassword : '';
  }

  /**
   * Function used to authenticate username, password and validation of tokens.
   */
  public login(): void {
    if (this.username.valid && this.password.valid) {
      this.progressStatus = this.PROGRESSSTATUS.Login;
      if (!navigator.onLine) {
        this.loginService.processLoginOfflineMode(this.username.value, this.password.value);

      } else {
        this.subLogin = this.authenticationService.login(this.username.value, this.password.value)
          .subscribe(
            (loggedInUserResponse) => this.onSuccess(loggedInUserResponse),
            (error) => this.handleError(error)
          );
      }
    } else if (!this.username.valid) {
      this.msg = this.getErrorUsernameMessage();
    } else if (!this.password.valid) {
      this.msg = this.getErrorPasswordMessage();
    }
  }

  /**
   * Function used to process login in online mode on success
   * @param loggedInUserResponse loggedIn user response
   */
  private onSuccess(loggedInUserResponse: any): void {
    if (loggedInUserResponse && loggedInUserResponse.data) {
      this.loginService.processLoginOnlineMode(loggedInUserResponse.data, this.username.value, this.password.value);
    }
  }
  /**
   * Function used to handle error
   * @param error on failure
   */
  private handleError(error): void {
    this.progressStatus = this.PROGRESSSTATUS.Initial;
    if (error.error) {
      if (error.error.code && error.error.code === 401) {
        this.msg = error.error.message + ', '
          + ErrorMessageConstants.errorMessages.incorrectUsernamePassword;
      } else {
        this.msg = ErrorMessageConstants.errorMessages.serverError;
      }
    } else {
      this.msg = ErrorMessageConstants.errorMessages.serverError;
      LoggerService.error(error.message, error);
    }
    this.unsubscribe();
  }

  /**
   * unsubscribe the subscription
   */
  private unsubscribe(): void {
    if (this.subLogin) { this.subLogin.unsubscribe(); }
  }
  /**
   * Lifecycle invoked to initiate cleanup once instance is destroyed.
   */
  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
