// import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { AvatarComponent } from './avatar.component';
// import { NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../../environments/environment';
// import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
// import { IndexedDbService } from '../../services/indexed.db.service';
// import { Router } from '@angular/router';
// import { AssessmentService } from '../../services/assessment.service';
// import { FirebaseDbService } from '../../services/firebase.db.service';
// import { TelemetryService } from '../../services/telemetry.service';
// import { NotesService } from '../../services/notes.service';
// import { CustomErrorHandlerService } from '../../services/custom.errorhandler.service';
// import { AlertService } from '../../components/alert/alert.service';
// import { MediaService } from '../../services/media.service';
// import { UploadFileService } from '../../services/upload-file.service';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { AccessibilityService } from '../../services/accessibility.service';
// import { AuthenticationService } from 'src/app/auth/authentication.service';
// import { UserService } from 'src/app/auth/user.service';

// const mockRouter = {
//     navigate: jasmine.createSpy('navigate')
// };

// describe('AvatarComponent', () => {
//     let component: AvatarComponent;
//     let fixture: ComponentFixture<AvatarComponent>;
//     let userService: UserService;
//     let accessibilityService: AccessibilityService;
//     let authenticationService: AuthenticationService;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [NgbModule,
//                 HttpClientModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,

//             ],
//             declarations: [AvatarComponent],
//             providers: [UserService,
//                 IndexedDbService,
//                 { provide: Router, useValue: mockRouter },
//                 AssessmentService,
//                 FirebaseDbService,
//                 TelemetryService,
//                 NotesService,
//                 CustomErrorHandlerService,
//                 AlertService,
//                 MediaService,
//                 UploadFileService,
//                 AngularFireDatabase,
//                 AuthenticationService
//             ]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(AvatarComponent);
//         component = fixture.componentInstance;
//         authenticationService = TestBed.get(AuthenticationService);
//         component.name = 'realize_teacher';
//         fixture.detectChanges();

//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should get getCurrentUser method', () => {
//         userService = TestBed.get(UserService);
//         const spy = spyOn(userService, 'getCurrentUser').and.returnValue(
//             {
//                 cookies: {},
//                 firstName: 'realize1',
//                 identityId: 'ffffffff51c87040e4b07dddca2a0511',
//                 idpName: 'RUMBA',
//                 idpResponse: { data: {} },
//                 lastName: 'teacher11',
//                 locale: 'en_US',
//                 loggedInSince: 1542964869108,
//                 modules: [],
//                 name: 'realize_teacher',
//                 permissions: [],
//                 refreshToken: null,
//                 timeZone: 'America/New_York',
//                 title: 'Colonel.',
//                 token: 'ST-167339-scEUbnoGSkdcg2rRkf7L-b3-rumba-int-01-01',
//                 userName: 'realize_teacher',
//             }
//         );
//         const user = userService.getCurrentUser();
//         expect(spy).toHaveBeenCalled();
//         component.ngOnInit();
//         fixture.detectChanges();
//     });

//     it('should call toggleWithGreeting method', () => {
//         const buttonElement: HTMLElement = fixture.nativeElement;
//         const button = buttonElement.querySelectorAll('button');
//         button[0].click();
//         fixture.detectChanges();
//         const toggle = {
//             isOpen: function () {
//                 return true;
//             },
//             close: function () {
//                 return false;
//             }
//         };
//         component.toggleWithGreeting(toggle);
//         expect(component.toggleWithGreeting).toBeDefined();
//     });

//     it('navigate to "login" takes you to login page', () => {
//         userService = TestBed.get(UserService);
//         component.currentPopover = {
//             isOpen: function () {
//                 return true;
//             },
//             close: function () {
//                 return true;
//             }
//         };
//         component.toggleWithGreeting();
//         const spy = spyOn(authenticationService, 'logout');
//         authenticationService.logout(function () { });
//         expect(spy).toHaveBeenCalled();
//         component.logout();
//         fixture.detectChanges();

//     });

//     it('should call openSearch method', () => {
//         userService = TestBed.get(UserService);
//         component.currentPopover = {
//             isOpen: function () {
//                 return true;
//             },
//             close: function () {
//                 return true;
//             }
//         };
//         component.openSearch();
//     });

//     it('should call setFocus method', () => {

//         component.setFocus('avatar_btn_desk');
//         expect(component.setFocus).toBeDefined();
//     });

//     it('should call openFaq method', () => {

//         userService = TestBed.get(UserService);
//         component.currentPopover = {
//             isOpen: function () {
//                 return true;
//             },
//             close: function () {
//                 return true;
//             }
//         };
//        // component.openFaq();
//     });

//     it('should get selectFocus method', () => {
//         accessibilityService = TestBed.get(AccessibilityService);
//         component.setFocus('avatar_btn_desk', 'avatar_btn_mob');
//         const spy = spyOn(accessibilityService, 'selectFocus');
//         accessibilityService.selectFocus('avatar_btn_desk', 'avatar_btn_mob');
//         expect(spy).toHaveBeenCalled();
//     });

// });
