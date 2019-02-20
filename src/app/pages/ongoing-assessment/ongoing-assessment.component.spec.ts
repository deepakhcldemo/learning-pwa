// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { InjectionToken } from '@angular/core';
// import { NotesMockData } from 'src/app/shared/services/notes.service.mock.data';
// import { AngularFireModule } from 'angularfire2';
// import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
// import { MediaService } from 'src/app/shared/services/media.service';
// import { MediaMockData } from 'src/app/shared/services/media.service.mock.data';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { Router, ActivatedRoute } from '@angular/router';
// import { of, BehaviorSubject } from 'rxjs';
// import { AssessmentService } from '../../shared/services/assessment.service';
// import { NotesService } from '../../shared/services/notes.service';
// import { IndexedDbService } from '../../shared/services/indexed.db.service';
// import { environment } from '../../../environments/environment.prod';
// import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
// import { CustomErrorHandlerService } from '../../shared/services/custom.errorhandler.service';
// import { AlertService } from '../../shared/components/alert/alert.service';
// import { FirebaseDbService } from '../../shared/services/firebase.db.service';
// import { FormsModule, FormBuilder } from '@angular/forms';
// import { UploadFileService } from '../../shared/services/upload-file.service';
// import { ModalService } from '../../shared/components/global-modal/modal.service';
// import { AccordionService } from '../../shared/services/accordion.service';
// import { HeaderComponent } from '../../shared/components/header/header.component';
// import { StudentDetailComponent } from '../components/student-detail/student-detail.component';
// import { FooterComponent } from '../../shared/components/footer/footer.component';
// import { GlobalModalComponent } from '../../shared/components/global-modal';
// import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
// import { ShowObserve } from '../../shared/pipes/show-observe.pipe';
// import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
// import { HeaderService } from '../../shared/components/header/header.service';
// import { MediaPopupService } from '../../shared/components/media-popup/media-popup.service';
// import { StudentDetailService } from '../components/student-detail/student-detail.service';
// import { TelemetryService } from '../../shared/services/telemetry.service';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { AssessmentMockData } from '../../shared/services/assessment.service.mock.data';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { OngoingAssessmentComponent } from './ongoing-assessment.component';
// import { SplitTitleDirective } from 'src/app/shared/directives/split-title.directive';
// import { FooterService } from 'src/app/shared/components/footer/footer.service';
// import { ProductService } from 'src/app/shared/services/product.service';
// import { CommentDalService } from 'src/app/shared/services/realtime-datalayer/comment-dal.service';
// import { StudentService } from 'src/app/shared/services/student.service';
// import { RosterService } from 'src/app/shared/services/roster.service';
// import { UserService } from 'src/app/auth/user.service';
// import { NotesDalService } from 'src/app/shared/services/realtime-datalayer/notes-dal.service';

// const fakeActivatedRoute = {
//     snapshot: { data: {} }
// } as ActivatedRoute;

// const mockRouter = {
//     navigate: jasmine.createSpy('navigate')
// };

// describe('OngoingAssessmentComponent', () => {
//     let component: OngoingAssessmentComponent;
//     let fixture: ComponentFixture<OngoingAssessmentComponent>;
//     const formBuilder: FormBuilder = new FormBuilder();
//     let assessmentService: AssessmentService, notesService: NotesService,
//         userService: UserService,
//         modalService: ModalService, headerService: HeaderService,
//         mediaPopUpService: MediaPopupService, telemetryService: TelemetryService,
//         accordionService: AccordionService, mediaService: MediaService;
//     let commentDalService: CommentDalService;
//     let route: ActivatedRoute;
//     let productService: ProductService;
//     let studentService: StudentService;
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [NgbModule.forRoot(),
//             AngularFireModule.initializeApp(environment.firebase), FormsModule
//             ],
//             declarations: [OngoingAssessmentComponent, DateFormatPipe,
//                 HeaderComponent, StudentDetailComponent, FooterComponent, GlobalModalComponent, TruncatePipe,
//                 ShowObserve, AvatarComponent, SplitTitleDirective],
//             providers: [
//                 { provide: Router, useValue: mockRouter },
//                 { provide: ActivatedRoute, useValue: fakeActivatedRoute },
//                 CustomErrorHandlerService, AlertService, AssessmentService,
//                 FirebaseDbService, AngularFirestore, UserService, HttpHandler, NotesDalService,
//                 IndexedDbService, NotesService, MediaService, UploadFileService, AngularFireDatabase,
//                 AccordionService, ModalService, HeaderService, MediaPopupService,
//                 StudentDetailService, TelemetryService, HttpClientModule, HttpClient, FooterService,
//                 CommentDalService, StudentService, RosterService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(OngoingAssessmentComponent);
//         component = fixture.componentInstance;
//         userService = TestBed.get(UserService);
//         assessmentService = TestBed.get(AssessmentService);
//         notesService = TestBed.get(NotesService);
//         headerService = TestBed.get(HeaderService);
//         mediaPopUpService = TestBed.get(MediaPopupService);
//         telemetryService = TestBed.get(TelemetryService);
//         accordionService = TestBed.get(AccordionService);
//         modalService = TestBed.get(ModalService);
//         mediaService = TestBed.get(MediaService);
//         productService = TestBed.get(ProductService);
//         commentDalService = TestBed.get(CommentDalService);
//         studentService = TestBed.get(StudentService);
//         userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511' });
//         headerService.setHeaderTitle('Ongoing Assessment');
//         assessmentService.setCurrentAssessment({
//             assessmentPath: 'ONGOING_1.json',
//             assessmentUrl: 'ONGOING_1.json',
//             criteria: [
//                 {
//                     id: 'ONG_1_CRIT_1',
//                     sequence: 1,
//                     tags: [{
//                         description: 'This is the description of criteria tag 1',
//                         title: 'Criteria tag 1'
//                     }],
//                     title: 'Ongoing criteria 1'
//                 }
//             ],
//             id: 'ONGOING_1',
//             keywords: ['ongoing', 'assessment', '1'],
//             parent: 'P1_N1|P1_N1.1|ONGOING_1',
//             path: 'Prog 1 - Node 1|Prog 1 - Node 1.1|Ongoing Assessment 1',
//             progressCount: 3,
//             title: 'Ongoing Assessment 1',
//             type: 'ongoing',
//             updatedat: new Date()
//         });
//         accordionService.setBreadcrumb('Prog 1 - Node 1|Prog 1 - Node 1.1|Ongoing Assessment 1');
//         component.currentAssessment = {
//             assessmentPath: 'ONGOING_1.json',
//             assessmentUrl: 'ONGOING_1.json',
//             criteria: [
//                 {
//                     id: 'ONG_1_CRIT_1',
//                     sequence: 1,
//                     tags: [{
//                         description: 'This is the description of criteria tag 1',
//                         title: 'Criteria tag 1'
//                     }],
//                     title: 'Ongoing criteria 1'
//                 }
//             ],
//             id: 'ONGOING_1',
//             keywords: ['ongoing', 'assessment', '1'],
//             parent: 'P1_N1|P1_N1.1|ONGOING_1',
//             path: 'Prog 1 - Node 1|Prog 1 - Node 1.1|Ongoing Assessment 1',
//             progressCount: 3,
//             title: 'Ongoing Assessment 1',
//             type: 'ongoing',
//             updatedat: new Date()
//         };
//       //  component.currentAssessmentItem = component.currentAssessment['assessment'].criteria[0];
//         // component.currentAssessmentItem = component.currentAssessment['assessment'].criteria[0];
//         component.ngOnInit();
//         fixture.detectChanges();
//         route = TestBed.get(ActivatedRoute);
//     });

//     it('instance of ongoing assessment component', () => {
//         expect(component).toBeTruthy();
//     });

//     // it('should have set header title', () => {
//     //     headerService = TestBed.get(HeaderService);
//     //     headerService.setHeaderTitle('Ongoing Assessment');
//     // });

//     // // it('should editable be toggle', () => {
//     // //     component.editable = false;
//     // //     component.toggleEdit();
//     // //     fixture.detectChanges();
//     // //     expect(component.editable).toBe(true);
//     // // });

//     // // it('should assessment item details page be closed', () => {
//     // //     component.closeStudentAssessmentItemDetails(false);
//     // //     fixture.detectChanges();
//     // //     expect(component.toggleStudentObservation).toBe(false);
//     // // });

//     // it('should current student be selected', () => {
//     //     component.setCurrentStudent(1);
//     //     fixture.detectChanges();
//     //     expect(component.currentStudent.firstName).toEqual('10');
//     // });

//     // it('should open ongoing assessment comment popup', () => {
//     //     const commentResult = {
//     //         commentType: 'comment',
//     //         comment: {
//     //             assessmentid: 'ONGOING_1',
//     //             assessmentitemdetails: {id: 'ONG_1_CRIT_1', sequence: 1, tags: Array(2), title: 'Ongoing criteria 1'},
//     //             assessmentitemid: 'ONG_1_CRIT_1',
//     //             classid: '78F9ECC58C1D7CBCE0532502140A442C',
//     //             comments: 'comment',
//     //             createdat: new Date(),
//     //             ctype: 'comment',
//     //             deleted: false,
//     //             id: '83359953',
//     //             isobserved: false,
//     //             mediaid: '',
//     //             parent: 'P1_N1|P1_N1.1|ONGOING_1',
//     //             path: 'Prog 1 - Node 1|Prog 1 - Node 1.1|Ongoing Assessment 1',
//     //             productid: '1730940',
//     //             programid: 'P1',
//     //             students: ['ffffffff5bd30d6f1c6dd524050950ba'],
//     //             type: 'ongoing',
//     //             updatedat: new Date()
//     //         }
//     //     };
//     //     component.openCommentPopup(commentResult);
//     //     fixture.detectChanges();
//     //     expect(component.popupType).toEqual('comment');
//     // });

//     // it('should open ongoing assessment media popup', () => {
//     //     const comment = {
//     //         commentType: 'media',
//     //         comment: {
//     //             mediaid: 1
//     //         }
//     //     };
//     //     component.openCommentPopup(comment);
//     //     fixture.detectChanges();
//     //     expect(component.popupType).toEqual('media');
//     // });

//     // it('should have selected detail link', () => {
//     //     component.selectedLink = '';
//     //     component.isDetails();
//     //     fixture.detectChanges();
//     //     expect(component.selectedLink).toBe('');
//     // });

//     // it('should have open assessment detail page', () => {
//     //     component.toggleStudentObservation = false;
//     //   //  component.openStudentAssessmentItemDetails({ assessmentid: 1, title: 'abc' }, 1);
//     //     fixture.detectChanges();
//     //     expect(component.toggleStudentObservation).toEqual(true);
//     // });

//     // it('should have called getfocus function', () => {
//     //     const params = 'B';
//     //     component.getFocus(params);
//     //     fixture.detectChanges();
//     //     expect(component.getFocus).toBeDefined();
//     // });

//     // it('should have open media list for ongoing assessment', () => {
//     //    // component.openMediaList({});
//     //     const comment = {
//     //         commentType: 'media',
//     //         comment: {
//     //             mediaid: 1
//     //         }
//     //     };
//     //     component.popupType = 'media';
//     //     component.headerTitle = 'attach media';
//     //     modalService.setPopupType('media');
//     //     modalService.setAssessmentItemMedia(comment.comment);
//     //     modalService.setMediaList([]);
//     //     modalService.setStudentDetails(comment);
//     //     fixture.detectChanges();
//     //     expect(component.openMediaList).toBeDefined();
//     // });

//     // it('should have get media list', () => {
//     //    // component.getMedia();
//     //     const currentAssessmentSpy = spyOn(mediaService, 'getMediaByProductId').and.returnValues(
//     //         of([{
//     //             caption: 'Image from safari',
//     //             id: '09664367',
//     //             mediaDescription: 'Discription changed',
//     //             mediaid: '09664367',
//     //             mediakind: 'image',
//     //             path: 'abc',
//     //             product: '1730940',
//     //             students: ['ffffffff59b667fd45d99156d4fa1d53', 'ffffffff5a7d7439f02ebd1b9347e303'],
//     //             types: 'media'
//     //         }])
//     //     );
//     //     fixture.detectChanges();
//     //   //  expect(component.getMedia).toBeDefined();
//     // });

//     // it('should initialize ongoing assessment page data ', () => {
//     //     const mediaListSpy = spyOn(mediaService, 'getMediaList').and.returnValues(
//     //         of([{
//     //             caption: 'Image from safari',
//     //             id: '09664367',
//     //             mediaDescription: 'Discription changed',
//     //             mediaid: '09664367',
//     //             mediakind: 'image',
//     //             path: 'abc',
//     //             product: '1730940',
//     //             students: ['ffffffff59b667fd45d99156d4fa1d53', 'ffffffff5a7d7439f02ebd1b9347e303'],
//     //             types: 'media'
//     //         }])
//     //     );
//     //     mediaService.getMediaList().subscribe(data => {
//     //         if (data) {

//     //         }
//     //     });
//     //     expect(mediaListSpy).toHaveBeenCalled();
//     // });

//     // it('should get student details by product id', () => {
//     //     const studentDetailsSpy = spyOn(studentService, 'getStudentDetailsByProduct')
//     //         .and.returnValues(
//     //             of([{
//     //                 avatar: 'ad',
//     //                 emailAddress: 'emailaddress@pearson.com',
//     //                 firstName: 'ash',
//     //                 fullName: 'ash dev',
//     //                 lastName: 'dev',
//     //                 userId: 'ffffffff5bb290def856993930d369a2'
//     //             }])
//     //         );

//     //     studentService.getStudentDetailsByProduct('1730940', (data) => {

//     //     });
//     //     expect(studentDetailsSpy).toHaveBeenCalled();
//     // });

//     // it('should user service return no current student', () => {
//     //    // component.initData();
//     //     fixture.detectChanges();
//     //    // expect(component.path).toBeDefined();
//     // });

//     // it('should have called oninit with no path and current product', () => {
//     //    // component.path = undefined;
//     //    // expect(component.path).toBeUndefined();
//     // });

//     // // it('should have called format media list', () => {
//     // //     const mediaSpy = spyOn(component, 'formatMediaList').and.returnValue({
//     // //         mediaid: 1
//     // //     });
//     // //     component.formatMediaList({});
//     // //     expect(component.formatMediaList).toHaveBeenCalled();
//     // // });

//     // it('should called format StudentAssessmentData', () => {
//     //    // component.formatStudentAssessmentData(studentCommentList);
//     //     expect(component.studentList.length).toEqual(2);
//     // });

//     // it('sgould get and sort student list', () => {
//     //     studentService.setCurrentStudentFromStudentList(undefined);
//     //     // component.getAndSortStudentlist([{
//     //     //     avatar: '0a',
//     //     //     emailAddress: 'emailaddress@pearson.com',
//     //     //     firstName: '0911',
//     //     //     fullName: '0911 adaptive',
//     //     //     lastName: 'adaptive',
//     //     //     userId: 'ffffffff5bb290def856993930d369a2'
//     //     // }, {
//     //     //     avatar: '1f',
//     //     //     emailAddress: 'emailaddress@pearson.com',
//     //     //     firstName: '70',
//     //     //     fullName: '10 feb',
//     //     //     lastName: 'feb',
//     //     //     userId: 'ffffffff5a7d7439f02ebd1b9347e303'
//     //     // },
//     //     // {
//     //     //     avatar: '1f',
//     //     //     emailAddress: 'emailaddress@pearson.com',
//     //     //     firstName: '10',
//     //     //     fullName: '10 feb',
//     //     //     lastName: 'feb',
//     //     //     userId: 'ffffffff5a7d7439f02ebd1b9347e303'
//     //     // }]);
//     //     fixture.detectChanges();
//     // });

//     // it('should called ng destroy', () => {
//     //     component.ngOnDestroy();
//     // });
// });
