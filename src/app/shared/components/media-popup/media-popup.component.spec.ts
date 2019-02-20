// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { MediaPopupComponent } from './media-popup.component';
// import { TruncatePipe } from '../../pipes/truncate.pipe';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireModule } from 'angularfire2';
// import {FileConstants} from 'src/app/shared/constants/file-constants';
// import { environment } from '../../../../environments/environment.prod';
// import { HeaderComponent } from '../header/header.component';
// import { DateFormatPipe } from '../../pipes/date-format.pipe';
// import { FooterComponent } from '../footer/footer.component';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { HeaderService } from '../header/header.service';
// import { IndexedDbService } from '../../services/indexed.db.service';
// import { MediaService } from '../../services/media.service';
// import { UploadFileService } from '../../services/upload-file.service';
// import { FirebaseDbService } from '../../services/firebase.db.service';
// import { AssessmentService } from '../../services/assessment.service';
// import { CustomErrorHandlerService } from '../../services/custom.errorhandler.service';
// import { AlertService } from '../../components/alert/alert.service';
// import { MediaPopupService } from './media-popup.service';
// import { MainPageFocusStatusService } from '../../mainpage-focus-status.service';
// import { NotesService } from '../../services/notes.service';
// import { TelemetryService } from '../../services/telemetry.service';
// import { ModalService } from '../global-modal/modal.service';
// import { MediaComponent } from '../../../pages/media/media.component';
// import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
// import { AccessibilityService } from '../../services/accessibility.service';
// import { StudentListMockData } from '../../services/student-list.mock.data';
// import { UserService } from 'src/app/auth/user.service';

// const fakeActivatedRoute = {
//     snapshot: { data: {} }
// } as ActivatedRoute;

// const mockRouter = {
//     navigate: jasmine.createSpy('navigate')
// };
// describe('MediaPopupComponent', () => {
//     let component: MediaPopupComponent;
//     let fixture: ComponentFixture<MediaPopupComponent>;
//     let userService: UserService;
//     // let accessibilityService: AccessibilityService;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 ReactiveFormsModule,
//                 FormsModule,
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFireDatabaseModule,
//                 NgbModalModule
//             ],
//             declarations: [
//                 MediaPopupComponent,
//                 HeaderComponent,
//                 DateFormatPipe,
//                 FooterComponent,
//                 TruncatePipe,
//                 MediaComponent
//             ],
//             providers: [
//                 { provide: Router, useValue: mockRouter },
//                 { provide: ActivatedRoute, useValue: fakeActivatedRoute },
//                 HttpClient,
//                 HttpHandler,
//                 HttpClientTestingModule,
//                 HeaderService,
//                 UserService,
//                 IndexedDbService,
//                 MediaService,
//                 UploadFileService,
//                 FirebaseDbService,
//                 AssessmentService,
//                 CustomErrorHandlerService,
//                 UploadFileService,
//                 IndexedDbService,
//                 AlertService,
//                 MediaPopupService,
//                 MainPageFocusStatusService,
//                 NotesService,
//                 TelemetryService,
//                 ModalService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(async(() => {
//         fixture = TestBed.createComponent(MediaPopupComponent);
//         component = fixture.componentInstance;
//         component.ngAfterViewInit();
//         userService = TestBed.get(UserService);
//         userService.setUser(StudentListMockData.currentUser);
//         fixture.detectChanges();
//     }));

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should call mediaDetails in media popup component', () => {
//         component.isDoneDisplay = false;
//         component.description = '';
//         component.mode = FileConstants.constants.view;
//         component.mediaDetailsObj = {
//             media: { mediaDescription: '' }, students: [{
//                 avatar: '0a',
//                 emailAddress: 'emailaddress@pearson.com',
//                 firstName: '0911',
//                 fullName: '0911 adaptive',
//                 lastName: 'adaptive',
//                 userId: 'ffffffff59b667fd45d99156d4fa1d53'
//             }]
//         };
//         fixture.detectChanges();
//         expect(component.mediaDetails).toBeDefined();
//     });

//     it('should call editMedia in media popup component for success condition', () => {
//         component.isDoneDisplay = true;
//         component.mode = FileConstants.constants.edit;
//         component.editMedia();
//         fixture.detectChanges();
//         expect(component.editMedia).toBeDefined();
//     });

//     it('should call getStudentData in media popup component for success condition', () => {
//         component.mediaDetailsObj = {
//             media: { mediaDescription: '' }, students: [{
//                 avatar: '0a',
//                 emailAddress: 'emailaddress@pearson.com',
//                 firstName: '0911',
//                 fullName: '0911 adaptive',
//                 lastName: 'adaptive',
//                 userId: 'ffffffff59b667fd45d99156d4fa1d53'
//             }]
//         };
//         component.allStudentList = component.mediaDetailsObj.students;
//         component.mediaDetailsObj.media.students = 'ffffffff5bb290def856993930d369a2';
//         component.isDoneDisplay = true;
//         component.mode = FileConstants.constants.edit;
//         component.getStudentData();
//         fixture.detectChanges();
//         expect(component.getStudentData).toBeDefined();
//     });

//     it('should call addStudent in media popup component for success condition', () => {
//         const student = {
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             userId: 'ffffffff59b667fd45d99156d4fa1d53'
//         };
//         component.allStudentList = [student, student];
//         const event = { target: { checked: true } };
//         component.isDoneDisplay = true;
//         component.allStudentListIndex = component.allStudentList.indexOf(student);
//         component.addStudent(event, student);
//         fixture.detectChanges();
//         expect(component.addStudent).toBeDefined();
//     });

//     it('should call updateMedia in media popup component for success condition', () => {
//         const updateMediaSpy = spyOn(component, 'updateMedia').and.returnValue({
//             success: true
//         });
//         component.mediaDetailsObj = {
//             media: { mediaDescription: '' }, students: [{
//                 avatar: '0a',
//                 emailAddress: 'emailaddress@pearson.com',
//                 firstName: '0911',
//                 fullName: '0911 adaptive',
//                 lastName: 'adaptive',
//                 userId: 'ffffffff59b667fd45d99156d4fa1d53'
//             }]
//         };
//         const mediaObj = {
//             caption: '',
//             mediaDescription: '',
//             students: {
//                 avatar: '0a',
//                 emailAddress: 'emailaddress@pearson.com',
//                 firstName: '0911',
//                 fullName: '0911 adaptive',
//                 lastName: 'adaptive',
//                 userId: 'ffffffff59b667fd45d99156d4fa1d53'
//             },
//             updatedat: new Date()
//         };
//         component.updateMedia('abc', 'title');
//         expect(updateMediaSpy).toHaveBeenCalled();
//     });

//     it('should call closeMobileView in media popup component', () => {
//         component.closeMobileView();
//         expect(component.closeMobileView).toBeDefined();
//     });
//     /* it('should call setFocus in media popup component', () => {
//         const videoElement = document.getElementById('');
//         component.setFocus('', '');
//         expect(component.setFocus).toBeDefined();
//     });

//     it('should get selectFocus method', () => {
//         accessibilityService = TestBed.get(AccessibilityService);
//         component.setFocus('video_section', 'close_section');
//         const spy = spyOn(accessibilityService, 'selectFocus');
//         accessibilityService.selectFocus('video_section', 'close_section');
//         expect(spy).toHaveBeenCalled();
//     }); */

//    /*  it('should call closeMediaPopup in media popup component', () => {
//         component.isDoneDisplay = false;
//         component.mediaCaption = '';
//         component.description = '';
//         component.mode = FileConstants.constants.view;
//         component.previousTabIndexLevel = 1;
//         component.mediaDetailsObj = { media: { mediaDescription: '', mediaCaption: 'untitled' }, students: '', parent: '' };
//         fixture.detectChanges();
//         component.closeMediaPopup();
//         expect(component.closeMediaPopup).toBeDefined();
//     });

//     it('should call closeMediaPopup with elseif condition in media popup component', () => {
//         component.isDoneDisplay = false;
//         component.mediaCaption = '';
//         component.description = '';
//         component.mode = FileConstants.constants.view;
//         component.previousTabIndexLevel = 2;
//         component.wrapperScroll = {
//             nativeElement: { scrollTop: 0 }
//         };
//         component.mediaDetailsObj = { media: { mediaDescription: '', mediaCaption: 'untitled' }, students: '', parent: '' };
//         component.closeMediaPopup();
//         fixture.detectChanges();
//         expect(component.closeMediaPopup).toBeDefined();
//     }); */

//     /* it('should call closeMediaPopup with else condition in media popup component', () => {
//         component.isDoneDisplay = false;
//         component.mediaCaption = '';
//         component.description = '';
//         component.mode = FileConstants.constants.view;
//         component.previousTabIndexLevel = 3;
//         component.wrapperScroll = {
//             nativeElement: { scrollTop: 0 }
//         };
//         component.mediaDetailsObj = { media: { mediaDescription: '', mediaCaption: 'untitled' }, students: '', parent: '' };
//         component.closeMediaPopup();
//         fixture.detectChanges();
//         expect(component.closeMediaPopup).toBeDefined();
//     });

//     it('should get selectFocus method', () => {
//         accessibilityService = TestBed.get(AccessibilityService);
//         component.setFocus('video_section', 'close_section');
//         const spy = spyOn(accessibilityService, 'selectFocus');
//         accessibilityService.selectFocus('video_section', 'close_section');
//         expect(spy).toHaveBeenCalled();
//     }); */
// });
