// import { async, ComponentFixture, TestBed, getTestBed, fakeAsync, inject } from '@angular/core/testing';
// import {FileConstants} from 'src/app/shared/constants/file-constants';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
// import { LoginComponent } from './login.component';
// import { IndexedDbService } from '../../shared/services/indexed.db.service';
// import { of} from 'rxjs';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { BehaviorSubject } from 'rxjs';

// import { FirebaseDbService } from '../../shared/services/firebase.db.service';

// import { RosterService } from '../../shared/services/roster.service';
// import { AlertService } from '../../shared/components/alert/alert.service';
// import { AuthenticationMockData } from '../../shared/services/authentication.mock.data';
// import { AuthTokenMockData } from '../../shared/services/auth.token.mock.data';
// import { RosterMockData } from '../../shared/services/roster.mock.data';
// import { UserMockData } from '../../shared/services/user.service.mock.data';
// import { TelemetryService } from '../../shared/services/telemetry.service';
// import { StudentListMockData } from '../../shared/services/student-list.mock.data';
// import { AssessmentNavigationData } from 'src/app/shared/mock-data/Assessment-checklist';
// import {ErrorMessageConstants} from 'src/app/shared/constants/error-message-constants';
// import { AuthTokenService } from 'src/app/auth/authtoken.service';
// import { AuthenticationService } from 'src/app/auth/authentication.service';
// import { UserService } from 'src/app/auth/user.service';
// const mockRouter = {
//   navigate: jasmine.createSpy('navigate')
// };

// const FirestoreStub = {
//   collection: (name: string) => ({
//     doc: (_id: string) => ({
//       valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
//       set: (_d: any) => new Promise((resolve, _reject) => resolve()),
//     }),
//   }),
// };

// const fakeActivatedRoute = {
//   snapshot: { data: {} }
// } as ActivatedRoute;

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let authService: AuthenticationService = null;
//   let authenticationTokenService: AuthTokenService;
//   let rosterService: RosterService;
//   let userService: any;
//   let authData: any, authTokenData: any, sectionList: any;
//   let telemetryService: TelemetryService;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
//       declarations: [LoginComponent],
//       providers: [{ provide: Router, useValue: mockRouter },
//       { provide: ActivatedRoute, useValue: fakeActivatedRoute },
//         UserService, HttpClient, HttpHandler, HttpClientTestingModule,
//       { provide: AngularFirestore, useValue: FirestoreStub },
//         IndexedDbService, AuthenticationService, FirebaseDbService, AuthTokenService, RosterService, AlertService,
//         AuthenticationService,
//         TelemetryService
//       ],

//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     component.ngOnInit();
//     fixture.detectChanges();
//   });

//   beforeEach(inject([AuthenticationService, AuthTokenService, RosterService,
//     UserService], (authenticationService: AuthenticationService,
//       authTokenService: AuthTokenService, rosterServiceData: RosterService, userServiceData: UserService) => {
//       authService = authenticationService;
//       authenticationTokenService = authTokenService;
//       rosterService = rosterServiceData;
//       userService = userServiceData;
//       userService.setUser(StudentListMockData.currentUser);
//     }));

//   it('should have a authentication service instance', () => {
//     expect(authService).toBeDefined();
//   });

//   it('should have a auth token service instance', () => {
//     expect(authenticationTokenService).toBeDefined();
//   });

//   it('should send the login request to the server', async (done) => {
//     done();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('form invalid when empty', () => {
//     expect(component.loginForm.valid).toBeTruthy();
//   });

//   it('username field validity with blank values', () => {
//     const username = component.loginForm.controls['username'];
//     expect(username.value).toEqual('');
//   });

//   it('username field validity with errors', () => {
//     let errors = {};
//     const username = component.loginForm.controls['username'];
//     errors = username.errors || {};
//     // expect(errors['required']).toBeFalsy();
//     expect(component.getErrorUsernameMessage()).toBe(ErrorMessageConstants.errorMessages.incorrectUserName);
//   });

//   it('username field validity with wrong values', () => {
//     const username = component.loginForm.controls['username'];
//     username.setValue('rea_tr');
//     expect(username.value).toBeTruthy();
//   });

//   it('username field validity with correct values', () => {
//     const username = component.loginForm.controls['username'];
//     username.setValue('realize_teacher');
//     expect(username.value).toBeTruthy();
//   });

//   it('password field validity with blank values', () => {
//     const password = component.loginForm.controls['password'];
//     expect(password.value).toBeFalsy();
//   });

//   it('password field validity with errors', () => {
//     let errors = {};
//     const password = component.loginForm.controls['password'];
//     errors = password.errors || {};
//     expect(errors['required']).toBeFalsy();
//     expect(component.getErrorPasswordMessage()).toBe(ErrorMessageConstants.errorMessages.incorrectPassword);
//   });

//   it('password field validity with wrong values', () => {
//     const password = component.loginForm.controls['password'];
//     password.setValue('rea_tr');
//     expect(password.value).toBeTruthy();
//   });

//   it('password field validity with correct values', () => {
//     const password = component.loginForm.controls['password'];
//     password.setValue('realize_teacher');
//     expect(password.value).toBeTruthy();
//   });

//   it('should call the login Method', () => {
//     // component.login();
//     fixture.detectChanges();
//     spyOn(component, 'login');

//     const containerElement = fixture.debugElement.nativeElement.querySelector('.sign--btn');
//     containerElement.click();
//     expect(component.login).toHaveBeenCalledTimes(1);
//   });

//   it('Login form should be valid', () => {
//     component.loginForm.controls['username'].setValue('realize_teacher');
//     component.loginForm.controls['password'].setValue('testing123$');
//     expect(component.loginForm.valid).toBeTruthy();
//   });

//   it('Login service response', () => {
//     const authSpy = spyOn(authService, 'login').and.returnValues(
//       of({
//         userName: 'realize_teacher',
//         token: 'ST-83302-K0gRjeqgLQVxegLuYo46-b3-rumba-int-01-04',
//         identityId: 'ffffffff51c87040e4b07dddca2a0511'
//       })
//     );

//     // act
//     authService.login('realize_teacher', 'testing123$').subscribe(data => {
//       if (data) {
//         authData = data;
//         expect(data.userName).toBe(AuthenticationMockData.userName);
//         expect(data.token).toBe(AuthenticationMockData.token);
//         expect(data.identityId).toEqual(AuthenticationMockData.identityId);
//       }
//     });

//     // assert
//     expect(authSpy).toHaveBeenCalled();
//   });


//   it('Authentication token service response', () => {
//     const authTokenSpy = spyOn(authenticationTokenService, 'getToken').and.returnValues(
//       of({
//         clientId: 'O5n6dEnWdN6RLJBUeBOxXQ2cUxIOCRIo',
//         userId: 'ffffffff51c87040e4b07dddca2a0511',
//         token_type: 'Bearer'
//       })
//     );
//     authenticationTokenService.getToken().subscribe(data => {
//       if (data && authData) {
//         authTokenData = data;
//         expect(data.clientId).toBe(AuthTokenMockData.clientId);
//         expect(data.userId).toBe(AuthTokenMockData.userId);
//         expect(data.token_type).toBe(AuthTokenMockData.token_type);
//       }
//     });

//     expect(authTokenSpy).toHaveBeenCalled();
//   });

//   it('Section List by Roaster Service', () => {
//     const sectionSpy = spyOn(rosterService, 'getSection').and.returnValues(
//       of({
//         classId: '77DB2F4FC20514ABE0532502140A62E8',
//         className: 'To Import - Updated Title',
//         organizationId: '8a97b1a638c9f02701393168afbf1d20'
//       })
//     );
//     rosterService.getSection().subscribe(data => {
//       if (data && authTokenData) {
//         sectionList = data;
//         expect(data.classId).toBe(RosterMockData.rosters[0].classId);
//         expect(data.className).toBe(RosterMockData.rosters[0].className);
//         expect(data.organizationId).toBe(RosterMockData.rosters[0].organizationId);
//       }
//     });

//     expect(sectionSpy).toHaveBeenCalled();
//   });

//   it('User profile service response', () => {
//     const userProfileSpy = spyOn(rosterService, 'getUserProfileBulk').and.returnValue(
//       of({
//         userId: 'ffffffff57e94c05e4b055dec03aaeb0',
//         userName: 'bls2',
//         emailAddress: 'emailaddress@pearson.com',
//       })
//     );
//     rosterService.getUserProfileBulk(['ffffffff5a7d7439f02ebd1b9347e303']).subscribe(data => {
//       if (data && sectionList) {
//         expect(data.userId).toBe(UserMockData.users[1].rumbaUser.userId);
//         expect(data.userName).toBe(UserMockData.users[1].rumbaUser.userName);
//         expect(data.emailAddress).toBe(UserMockData.users[1].rumbaUser.emailAddress);
//       }
//     });

//     expect(userProfileSpy).toHaveBeenCalled();
//   });
//   it('should have called setMessage method', () => {
//     const error = ErrorMessageConstants.errorMessages.incorrectUserName;
//     component.setMessage(error);
//     const spy = spyOn(component, 'setMessage');
//     component.setMessage(error);
//     expect(spy).toHaveBeenCalledWith(error);
//     expect(component.msg).toBe(error);
//   });
//   // it('should have called splitArrayIntoChuncks method', () => {
//   //   const chunk_size = 200;
//   //   let studentGroup = [];
//   //   studentGroup = StudentListMockData.students.map(function (e, i) {
//   //     return i % chunk_size === 0 ? StudentListMockData.students.slice(i, i + chunk_size) : null;
//   //   }).filter(function (e) { return e; });
//   //   component.splitArrayIntoChuncks(StudentListMockData.students);
//   //   const spy = spyOn(component, 'splitArrayIntoChuncks').and.returnValue(
//   //     studentGroup
//   //   );

//   //   expect(component.splitArrayIntoChuncks(StudentListMockData.students)).toBe(studentGroup);
//   //   expect(StudentListMockData.students).not.toBeNull();
//   //   expect(spy).toHaveBeenCalledWith(StudentListMockData.students);
//   // });
//   it('should have destroyed component', () => {
//     component.ngOnDestroy();
//     fixture.detectChanges();
//   });
//   it('it should have called getAccessTokenFromService method if got token', () => {
//     const spy = spyOn(authenticationTokenService, 'getToken').and.returnValue(
//       of(StudentListMockData.token)
//     );

//     authenticationTokenService.getToken().subscribe(data => {
//       expect(data).not.toBeNull();
//     });

//     expect(spy).toHaveBeenCalled();
//     component.getAccessTokenFromService();
//   });
//   it('should have called getAccessTokenFromService method if no token', () => {
//     const spy = spyOn(authenticationTokenService, 'getToken').and.returnValue(
//       of(null)
//     );

//     authenticationTokenService.getToken().subscribe(data => {
//       expect(data).toBeNull();
//     });

//     expect(spy).toHaveBeenCalled();
//     component.getAccessTokenFromService();
//   });
//   it('should have called setLoggedinUserDetail', () => {
//     telemetryService = TestBed.get(TelemetryService);
//     component.telemetryService = telemetryService;
//     const spy = spyOn(telemetryService, 'sendTelemetryEvent');
//     const telemetryData = AssessmentNavigationData.TelemetryData;
//     telemetryService.sendTelemetryEvent({
//       verb: { id: FileConstants.constants.login },
//       object: {
//         definition: { name: FileConstants.constants.applicationPlatform }
//       }
//     });
//     expect(spy).toHaveBeenCalledWith({
//       verb: { id: FileConstants.constants.login },
//       object: {
//         definition: { name: FileConstants.constants.applicationPlatform }
//       }
//     });
//     fixture.detectChanges();

//     component.setLoggedinUserDetail(StudentListMockData.currentUser);
//   });

//   // it('should have called checkLoggedInUserResponse method with response and token', () => {
//   //   indexedDbService = TestBed.get(IndexedDbService);
//   //   component.checkLoggedInUserResponse(StudentListMockData.currentUser);
//   //   expect(StudentListMockData.currentUser).not.toBeNull();
//   // });
//   // it('should have called checkLoggedInUserResponse with no token', () => {
//   //   userService.setUser(StudentListMockData.currentUser);
//   //   //  StudentListMockData.currentUser.token = '';
//   //   const currentUser = StudentListMockData.currentUser;
//   //   currentUser.token = '';
//   //   component.checkLoggedInUserResponse(currentUser);
//   //   expect(StudentListMockData.currentUser).not.toBeNull();
//   // });
//   // it('should have called checkLoggedInUserResponse with no response', () => {
//   //   userService.setUser(StudentListMockData.currentUser);
//   //   // StudentListMockData.currentUser = null;
//   //   let currentUser = StudentListMockData.currentUser;
//   //   currentUser = null;
//   //   component.checkLoggedInUserResponse(currentUser);
//   //   expect(currentUser).toBe(null);
//   // });

// });
