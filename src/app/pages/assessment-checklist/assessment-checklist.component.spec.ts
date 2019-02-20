// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
// import { MediaService } from '../../shared/services/media.service';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { Router, ActivatedRoute } from '@angular/router';
// import { of } from 'rxjs';
// import { AssessmentChecklistComponent } from './assessment-checklist.component';
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
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { FooterService } from '../../shared/components/footer/footer.service';
// import { ObservationDalService } from 'src/app/shared/services/realtime-datalayer/observation-dal.service';
// import { CommentDalService } from 'src/app/shared/services/realtime-datalayer/comment-dal.service';
// import { ProductService } from 'src/app/shared/services/product.service';
// import { StudentService } from 'src/app/shared/services/student.service';
// import {FileConstants} from 'src/app/shared/constants/file-constants';
// import { RosterService } from 'src/app/shared/services/roster.service';
// import { UserService } from 'src/app/auth/user.service';

// const fakeActivatedRoute = {
//     snapshot: { data: {} }
// } as ActivatedRoute;

// const mockRouter = {
//     navigate: jasmine.createSpy('navigate')
// };

// const mediaList = [{
//     assessmentid: '312',
//     assessmentitemdetails: {
//         benchmarks: [1],
//         id: 1110,
//         mathpractices: [282],
//         sequence: 2,
//         title: '~Are students able to?~'
//     },
//     assessmentitemid: 1110,
//     comment: '',
//     createdat: { seconds: 1543391392, nanoseconds: 510000000 },
//     ctype: 'media',
//     deleted: false,
//     id: '2uyxIh5wBmS8k11FH46z',
//     isobserved: true,
//     mediaid: '33465030',
//     parent: '3|17|63|610',
//     students: ['ffffffff5bb28890f63bbf06200fd259'],
//     type: 'ongoing',
//     updatedat: { seconds: 1543391392, nanoseconds: 510000000 }
// },
// {
//     assessmentid: '312',
//     assessmentitemdetails: {
//         benchmarks: [1],
//         id: 1110,
//         mathpractices: [282],
//         sequence: 2,
//         title: '~Are students able to?~'
//     },
//     assessmentitemid: 1110,
//     comment: '',
//     createdat: { seconds: 1548391392, nanoseconds: 510000000 },
//     ctype: 'media',
//     deleted: false,
//     id: '2uyxIh5wBmS8k11FH46z',
//     isobserved: true,
//     mediaid: '33465030',
//     parent: '3|17|63|610',
//     students: ['ffffffff5bb28890f63bbf06200fd259'],
//     type: 'ongoing',
//     updatedat: { seconds: 1543891392, nanoseconds: 510000000 }
// }];

// describe('AssessmentChecklistComponent', () => {
//     let component: AssessmentChecklistComponent;
//     let fixture: ComponentFixture<AssessmentChecklistComponent>;
//     const formBuilder: FormBuilder = new FormBuilder();
//     let assessmentService: AssessmentService, notesService: NotesService,
//         userService: UserService, modalService: ModalService,
//         studentDetailService: StudentDetailService,
//         indexedDbService: IndexedDbService, headerService: HeaderService,
//         observationDalService: ObservationDalService,
//         mediaPopUpService: MediaPopupService, telemetryService: TelemetryService,
//         accordionService: AccordionService/*,  mediaService: MediaService */;
//     let productService: ProductService;
//     let studentService: StudentService;
//     let route: ActivatedRoute;

//     const assessmentDataMock = {
//         assesmentItem: {
//             id: 1033,
//             title: 'Adds numbers in an order that is different from what is given',
//             sequence: 1,
//             benchmarks: [1],
//             mathpractices: [282]
//         },
//         assessment: {
//             parent: '3|17|64|253',
//             parentid: '253',
//             path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//             progressCount: 38,
//             sequence: 289,
//             shortname: 'Session 2.3',
//             title: 'MP8, Look for and express regularity in repeated reasoning',
//             type: 'checklist'
//         },
//         student: {
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: 'ash',
//             lastName: 'dev',
//             userId: 'ffffffff5bb290def856993930d369a2',
//             fullName: 'ash dev'
//         }
//     };
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [NgbModule.forRoot(),
//             AngularFireModule.initializeApp(environment.firebase), FormsModule
//             ],
//             declarations: [AssessmentChecklistComponent, DateFormatPipe,
//                 HeaderComponent, StudentDetailComponent, FooterComponent, GlobalModalComponent, TruncatePipe,
//                 ShowObserve, AvatarComponent],
//             providers: [
//                 { provide: Router, useValue: mockRouter },
//                 { provide: ActivatedRoute, useValue: fakeActivatedRoute },
//                 CustomErrorHandlerService, AlertService, AssessmentService,
//                 FirebaseDbService, AngularFirestore, UserService, HttpHandler, ObservationDalService,
//                 IndexedDbService, NotesService, MediaService, UploadFileService, AngularFireDatabase,
//                 AccordionService, ModalService, HeaderService, MediaPopupService, CommentDalService,
//                 StudentDetailService, TelemetryService, HttpClientModule, HttpClient, FooterService, StudentService, RosterService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(AssessmentChecklistComponent);
//         component = fixture.componentInstance;
//         userService = TestBed.get(UserService);
//         studentService = TestBed.get(StudentService);

//         assessmentService = TestBed.get(AssessmentService);
//         observationDalService = TestBed.get(ObservationDalService);
//         indexedDbService = TestBed.get(IndexedDbService);
//         notesService = TestBed.get(NotesService);
//         headerService = TestBed.get(HeaderService);
//         mediaPopUpService = TestBed.get(MediaPopupService);
//         modalService = TestBed.get(ModalService);
//         telemetryService = TestBed.get(TelemetryService);
//         accordionService = TestBed.get(AccordionService);
//         productService = TestBed.get(ProductService);
//         userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511' });
//         headerService.setHeaderTitle('Assessment Checklist');
//         productService.setCurrentProduct({
//             name: 'Kindergarten',
//             productID: '336566'
//         });
//         assessmentService.setCurrentAssesmentProduct({
//             name: 'Kindergarten',
//             productID: '336566'
//         });
//         assessmentService.setCurrentAssessment({
//             assessment: {
//                 id: 123,
//                 criteria: [{
//                     id: 1110,
//                     sequence: 2,
//                     title: '~Are students able to'
//                 }]
//             },
//             parent: '3|17|63|610',
//             path: 'Grade2>Unit1 >investigation1',
//             type: 'ongoing'

//         });
//         assessmentService.setCurrentAssesmentProduct({
//             name: 'Kindergarten',
//             productID: '336566'
//         });
//         component.currentProduct = {
//             name: 'Kindergarten',
//             productID: '336566'
//         };
//         studentService.setCurrentStudentFromStudentList({
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             userId: 'ffffffff5bb290def856993930d369a2'
//         });
//         modalService.setCurrentAssessment({
//             assessment: {
//                 id: 123,
//                 criteria: [{
//                     id: 1110,
//                     sequence: 2,
//                     title: '~Are students able to'
//                 }]
//             },
//             parent: '3|17|63|610',
//             path: 'Grade2>Unit1 >investigation1',
//             type: 'ongoing'

//         });
//         accordionService.setBreadcrumb('a>b>c>d');
//         component.studentList = [{
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             userId: 'ffffffff5bb290def856993930d369a2'
//         }, {
//             avatar: '1f',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '10',
//             fullName: '10 feb',
//             lastName: 'feb',
//             userId: 'ffffffff5a7d7439f02ebd1b9347e303'
//         }];
//         component.currentAssessment = {
//             assessment: {
//                 id: '1',
//                 criteria: [{
//                     id: '1110',
//                     sequence: 2,
//                     title: '~Are students able to~'
//                 }]
//             },
//             parent: '3|17|63|610',
//             path: '1 > 2 > 3',
//             type: 'checklist'
//         };
//         component.currentAssessmentItem = component.currentAssessment['assessment'].criteria[0];
//         component.ngOnInit();
//         fixture.detectChanges();
//         route = TestBed.get(ActivatedRoute);
//     });

//     it('instance of assessment checklist component', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should have called oninit with no path and current product', () => {
//         component.ngOnInit();
//     });

//     it('should have called getCarousel method from accordionService', () => {
//         accordionService = TestBed.get(AccordionService);
//         const spy = spyOn(accordionService, 'getCarousel').and.returnValue(
//             [{
//                 id: '126',
//                 templatekind: '0',
//                 title: 'Words that Describe Relative Position',
//                 type: 'checklist',
//                 criteria: [{
//                     benchmarks: [1],
//                     id: 460,
//                     mathpractices: [282],
//                     sequence: 1,
//                     title: 'Above or on top of/below or beneath'
//                 }]
//             }, {
//                 id: '288',
//                 templatekind: '0',
//                 title: 'MP8, Look for and express regularity in repeated reasoning',
//                 type: 'checklist',
//                 criteria: [{
//                     benchmarks: [1],
//                     id: 1033,
//                     mathpractices: [282],
//                     sequence: 1,
//                     title: 'Adds numbers in an order that is different from what is given'
//                 }]
//             }]
//         );
//        // component.dataById = accordionService.getCarousel();
//         expect(spy).toHaveBeenCalled();
//         expect(component).not.toBeNull();
//     });

//     it('should have called getCurrentAssessment method from assessmentService', () => {
//         assessmentService = TestBed.get(AssessmentService);
//         const spy = spyOn(assessmentService, 'getCurrentAssessment').and.returnValue(
//             [{
//                 assessment: {
//                     templatekind: '0',
//                     title: 'Words that Describe Relative Position',
//                     id: '126',
//                     type: 'checklist',
//                     criteria: [{
//                         benchmarks: [1],
//                         id: 460,
//                         mathpractices: [282],
//                         sequence: 1,
//                         title: 'Above or on top of/below or beneath'
//                     }]
//                 },
//                 assessmentItem: {
//                     templatekind: '0',
//                     title: 'Words that Describe Relative Position',
//                     id: '126',
//                     type: 'checklist',
//                     criteria: [{
//                         benchmarks: [1],
//                         id: 460,
//                         mathpractices: [282],
//                         sequence: 1,
//                         title: 'Above or on top of/below or beneath'
//                     }]
//                 },
//                 parent: '1|1|2|2',
//                 parentid: '2',
//                 path: 'Kindergarten > Unit 1 > Investigation 1 > Session 1.2',
//                 progressCount: 0,
//                 sequence: 2,
//                 shortname: 'Session 1.2',
//                 title: 'Words that Describe Relative Position',
//                 type: 'checklist'
//             }]
//         );
//         component.currentAssessment = assessmentService.getCurrentAssessment();
//         expect(spy).toHaveBeenCalled();
//         expect(component.currentAssessment).not.toBeNull();
//     });

//     it('should have called getfocus function', () => {
//         const params = 'B';
//         component.getFocus(params);
//         fixture.detectChanges();
//         expect(component.getFocus).toBeDefined();
//     });

//     it('should call the closeStudentAssessmentItemDetails Method', () => {
//         component.closeStudentAssessmentItemDetails();
//         expect(component.currentStudent).toEqual(component.studentList[-1]);
//         expect(component.toggleStudentObservation).toBeFalsy();
//     });

//     it('should have called openCommentPopup method for media', () => {
//         const mediaData = {
//             comment: {
//                 caption: 'untitled',
//                 product: '1730940',
//                 students: 'ffffffff5bb290def856993930d369a2',
//                 types: 'media',
//             },
//             commentType: 'media'
//         };
//         component.openCommentPopup(mediaData);
//         const EnvironmentComment = FileConstants.constants.media;
//         expect(EnvironmentComment).toEqual(mediaData.commentType);
//         expect(component.openMediaPopup).toBeTruthy();
//         expect(component.mediaPopupCondition).toBeTruthy();
//         expect(mediaPopUpService.setMediaPopupState).toBeTruthy();
//     });

//     it('should have called openCommentPopup method for comment', () => {
//         const commentData = {
//             comment: {
//                 assessmentid: '288',
//                 assessmentitemdetails: {
//                     id: 1033,
//                     title: 'Adds numbers in an order that is different from what is given'
//                 },
//                 assessmentitemid: 1033,
//                 ctype: 'comment',
//                 deleted: false,
//                 id: '74431491',
//                 isobserved: false,
//                 mediaid: '',
//                 parent: '3|17|64|253',
//                 students: ['ffffffff5bb290def856993930d369a2'],
//                 type: 'checklist'
//             },
//             commentType: 'comment'
//         };

//         component.openCommentPopup(commentData);
//         const EnvironmentComment = FileConstants.constants.comment;
//         expect(EnvironmentComment).toEqual(commentData.commentType);
//         expect(component.openMediaPopup).toBeFalsy();
//         expect(component.mediaPopupCondition).toBeFalsy();
//         modalService = TestBed.get(ModalService);
//         const setPopUpType = spyOn(modalService, 'setPopupType');
//         modalService.setPopupType(commentData.comment);
//         expect(setPopUpType).toHaveBeenCalled();
//         const setData = spyOn(modalService, 'setData');
//         modalService.setData(commentData.commentType);
//         expect(setData).toHaveBeenCalledWith(commentData.commentType);
//         const getElement = spyOn(modalService, 'getElement');
//         expect(getElement).toBeDefined();
//         const openModal = spyOn(modalService, 'openModal');
//         modalService.openModal(getElement);
//         expect(openModal).toHaveBeenCalledWith(getElement);
//         fixture.detectChanges();
//     });

//     it('should have called openStudentAssessmentItemDetails method', () => {
//         const currentAssessmentItemMock = {
//             benchmarks: [1],
//             id: 1033,
//             mathpractices: [282],
//             sequence: 1,
//             title: 'Adds numbers in an order that is different from what is given'
//         };
//         const index = 0;
//         component.openStudentAssessmentItemDetails(currentAssessmentItemMock, index);
//         expect(component.currentAssessmentItem).toEqual(currentAssessmentItemMock);
//         expect(component.toggleStudentObservation).toBeTruthy();
//         studentDetailService = TestBed.get(StudentDetailService);
//         const setAssessmentDetails = spyOn(studentDetailService, 'setAssessmentDetails');
//         studentDetailService.setAssessmentDetails(component.currentAssessment);
//         expect(setAssessmentDetails).toHaveBeenCalledWith(component.currentAssessment);
//         const setAssessmentItemDetails = spyOn(studentDetailService, 'setAssessmentItemDetails');
//         studentDetailService.setAssessmentItemDetails(component.currentAssessmentItem);
//         expect(setAssessmentItemDetails).toHaveBeenCalledWith(component.currentAssessmentItem);
//         const setStudentDetail = spyOn(studentDetailService, 'setStudentDetail');
//         studentDetailService.setStudentDetail(component.currentStudent);
//         expect(setStudentDetail).toHaveBeenCalledWith(component.currentStudent);
//         const setPopupStatus = spyOn(studentDetailService, 'setPopupStatus');
//         studentDetailService.setPopupStatus(component.currentStudent);
//         expect(setPopupStatus).toHaveBeenCalled();
//         expect(setPopupStatus).toBeTruthy();
//         fixture.detectChanges();
//     });

//     it('should have called setCurrentAssessmentItem method', () => {
//         const setCurrentAssessmentItem = {
//             benchmarks: [1],
//             id: 1033,
//             mathpractices: [282],
//             sequence: 1,
//             title: 'Adds numbers in an order that is different from what is given'
//         };
//         component.setCurrentAssessmentItem(setCurrentAssessmentItem);
//     });

//     it('should have open media list for assessment checklist', () => {
//         component.openMediaList({});
//         const comment = {
//             commentType: 'media',
//             comment: {
//                 mediaid: 1
//             }
//         };
//         const observedData = [{
//             assessmentid: '288',
//             assessmentitemid: 1033,
//             createdat: '',
//             id: '81ICKO04BTtd6MivGZfd',
//             isobserved: true,
//             parent: '3|17|64|254',
//             path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.4',
//             students: 'ffffffff5bd30e0445d9913ac68206eb',
//             type: 'checklist',
//             updatedat: ''
//         }];
//         component.popupType = 'media';
//         component.headerTitle = 'attach media';
//         modalService.setPopupType('media');
//         modalService.setMediaList([]);
//         modalService.setStudentDetails(comment);
//         fixture.detectChanges();
//         expect(component.openMediaList).toBeDefined();
//         const setCurrentAssessment = spyOn(modalService, 'setCurrentAssessment');
//         modalService.setCurrentAssessment(observedData);
//         expect(setCurrentAssessment).toHaveBeenCalledWith(observedData);
//     });

//     // it('should check the setMedia function in media component', () => {
//     //     const fileData = { type: 'image/data', length: 1 };
//     //     const base64Data = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
//     //     assessmentService.setCurrentProduct('1');
//     //     const spy = spyOn(component, 'setMedia');
//     //     fixture.detectChanges();
//     //     expect(spy).toBeTruthy();
//     //     mediaService = TestBed.get(MediaService);
//     //     const mediaType = 'image';
//     //     const spy1 = spyOn(mediaService, 'setMedia');
//     //     mediaService.setMedia(fileData, mediaType);
//     //     expect(spy1).toHaveBeenCalled();
//     //     expect(spy1).toHaveBeenCalledTimes(1);
//     //     expect(spy1).toHaveBeenCalledWith(fileData, mediaType);

//     // });

//     it('onFileUpload call in media component', () => {
//         const file = { target: { files: { name: 'new file', type: 'image' } } };
//         const assessmentData = { 'file': file };
//         component.onFileUpload(assessmentData);
//         const spy = spyOn(component, 'onFileUpload');
//         component.onFileUpload(assessmentData);
//         productService.setCurrentProduct('1');
//         expect(spy).toHaveBeenCalled();
//     });

//     // it('should have get media list', () => {
//     //     component.getMedia();
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
//     //     mediaService.getMediaByProductId('1730940').subscribe(mediaLst => {
//     //         if (mediaLst) { }
//     //     });

//     //     fixture.detectChanges();
//     //     expect(component.getMedia).toBeDefined();
//     // });

//     it('should have called format media list', () => {
//         component.formatMediaList(mediaList);
//         fixture.detectChanges();
//     });

//     // it('should initialize assessment checklist page data', () => {
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

//     it('should have called getAssessmentObservations method from assessmentService', () => {
//         const observedData = [{
//             assessmentid: '288',
//             assessmentitemid: 1033,
//             createdat: '',
//             id: '81ICKO04BTtd6MivGZfd',
//             isobserved: true,
//             parent: '3|17|64|254',
//             path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.4',
//             students: 'ffffffff5bd30e0445d9913ac68206eb',
//             type: 'checklist',
//             updatedat: ''
//         }];

//         const assessmentItemData = [{
//             avatar: 'HP',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: 'Harry',
//             fullName: 'Harry Potter',
//             lastName: 'Potter',
//             observed: [],
//             userId: 'ffffffff5bd30cc7d407951ac8bce01c',
//         }];

//         component.setAssessmentObservations();
//         expect(component.setAssessmentObservations).toBeTruthy();
//         assessmentService = TestBed.get(AssessmentService);
//         const spy = spyOn(observationDalService, 'getAssessmentObservations').and.returnValue(
//             of({
//                 assessmentid: '288',
//                 assessmentitemid: 1034,
//                 id: '0V5j2OBRYtfU2ub4TTl9',
//                 isobserved: true,
//                 parent: '3|17|64|253',
//                 path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//                 students: 'ffffffff5bd30ca4f85699611757821d'
//             })
//         );
//         observationDalService.getAssessmentObservations().subscribe(assessment => {
//            // component.assessmentAnswerSubscription(assessment);
//         });
//         component.studentList = assessmentItemData;
//     });

//     it('should call ngOndestroy method', () => {
//         component.ngOnDestroy();
//         expect(component.ngOnDestroy).toBeTruthy();
//     });

//     // it('should call save is observed method', () => {
//     //     const currentAssessment = {
//     //         assessment: {
//     //             criteria: [{
//     //                 benchmarks: [1],
//     //                 id: 1033,
//     //                 mathpractices: [282],
//     //                 sequence: 1,
//     //                 title: 'Adds numbers in an order that is different from what is given'
//     //             }],
//     //             id: 288,
//     //             templatekind: '0',
//     //             title: 'MP8, Look for and express regularity in repeated reasoning',
//     //             type: 'checklist'
//     //         },
//     //         assessmentItem: {
//     //             criteria: [{
//     //                 benchmarks: [1],
//     //                 id: 1033,
//     //                 mathpractices: [282],
//     //                 sequence: 1,
//     //                 title: 'Adds numbers in an order that is different from what is given'
//     //             }],
//     //             id: 288,
//     //             templatekind: '0',
//     //             title: 'MP8, Look for and express regularity in repeated reasoning',
//     //             type: 'checklist'
//     //         },
//     //         parent: '3|17|64|253',
//     //         parentid: '253',
//     //         path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//     //         progressCount: 38,
//     //         sequence: 289,
//     //         shortname: 'Session 2.3',
//     //         title: 'MP8, Look for and express regularity in repeated reasoning',
//     //         type: 'checklist',
//     //         updatedat: { seconds: 1543479802, nanoseconds: 238000000 }
//     //     };
//     //     const assessitm = {
//     //         benchmarks: [1],
//     //         id: 1033,
//     //         mathpractices: [282],
//     //         sequence: 1,
//     //         title: 'Adds numbers in an order that is different from what is given'
//     //     };
//     //     const student = {
//     //         avatar: 'ad',
//     //         emailAddress: 'emailaddress@pearson.com',
//     //         firstName: 'ash',
//     //         fullName: 'ash dev',
//     //         lastName: 'dev',
//     //         observed: [{
//     //             assessmentitemid: 1033,
//     //             id: '5YxYWze5NuwOKWzdwrWK',
//     //             isObserved: true
//     //         }],
//     //         userId: 'ffffffff5bb290def856993930d369a2'
//     //     };
//     //     const isSaved = false;
//     //     const observed = true;
//     //     const observelist = {
//     //         assessmentitemid: 1034,
//     //         id: 'HSu50wkauqYpjTnCu6b4',
//     //         isObserved: true
//     //     };
//     //     const spy = spyOn(component, 'saveIsObserved');
//     //     component.saveIsObserved(currentAssessment, assessitm, student, isSaved, observed, observelist);
//     //     expect(spy).toHaveBeenCalledWith(currentAssessment, assessitm, student, isSaved, observed, observelist);
//     //     // component.saveIsObserved(currentAssessment, assessitm, student, isSaved, observed, observelist);
//     //     // expect(component.saveIsObserved).toBeTruthy();
//     //     //  const spy = spyOn(telemetryService, 'sendTelemetryEvent');
//     //     fixture.detectChanges();
//     //     expect(telemetryService.sendTelemetryEvent).toBeDefined();
//     // });

//     it('should call getAssessMentFocus method', () => {
//       //  expect(component.getAssessMentFocus).toBeTruthy();
//     });

//     it('should get and sort student list', () => {
//         studentService.setCurrentStudentFromStudentList(undefined);
//     //     component.getAndSortStudentlist([{
//     //         avatar: '0a',
//     //         emailAddress: 'emailaddress@pearson.com',
//     //         firstName: '0911',
//     //         fullName: '0911 adaptive',
//     //         lastName: 'adaptive',
//     //         userId: 'ffffffff5bb290def856993930d369a2'
//     //     }, {
//     //         avatar: '1f',
//     //         emailAddress: 'emailaddress@pearson.com',
//     //         firstName: '70',
//     //         fullName: '10 feb',
//     //         lastName: 'feb',
//     //         userId: 'ffffffff5a7d7439f02ebd1b9347e303'
//     //     },
//     //     {
//     //         avatar: '1f',
//     //         emailAddress: 'emailaddress@pearson.com',
//     //         firstName: '10',
//     //         fullName: '10 feb',
//     //         lastName: 'feb',
//     //         userId: 'ffffffff5a7d7439f02ebd1b9347e303'
//     //     }]);
//      });

// });
