// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { OngoingStudentDetailComponent } from './ongoing-student-detail.component';
// import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MediaService } from 'src/app/shared/services/media.service';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from 'src/environments/environment';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { IndexedDbService } from 'src/app/shared/services/indexed.db.service';
// import { UploadFileService } from 'src/app/shared/services/upload-file.service';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { FirebaseDbService } from 'src/app/shared/services/firebase.db.service';
// import { AssessmentService } from 'src/app/shared/services/assessment.service';
// import { CustomErrorHandlerService } from 'src/app/shared/services/custom.errorhandler.service';
// import { AlertService } from 'src/app/shared/components/alert/alert.service';
// import { ModalService } from 'src/app/shared/components/global-modal/modal.service';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { of } from 'rxjs';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { AssessmentNavigationData } from 'src/app/shared/mock-data/Assessment-checklist';
// import { studentObj } from 'src/app/shared/mock-data/student';
// import { OngoingStudentDetailService } from './ongoing-student-detail.service';
// import { TelemetryService } from 'src/app/shared/services/telemetry.service';
// import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
// import { ObservationDalService } from 'src/app/shared/services/realtime-datalayer/observation-dal.service';
// import { CommentDalService } from 'src/app/shared/services/realtime-datalayer/comment-dal.service';
// import { UserService } from 'src/app/auth/user.service';
// import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';

// describe('OngoingStudentDetailComponent', () => {
//   let component: OngoingStudentDetailComponent;
//   let fixture: ComponentFixture<OngoingStudentDetailComponent>;
//   let mediaService: MediaService;
//   let userService: UserService;
//   let assessmentService: AssessmentService;
//   let commentDalService: CommentDalService;
//   let observationDalService: ObservationDalService;
//   let indexedDbService: IndexedDbService;
//   let modalService: ModalService;
//   let ongoingStudentDetailService: OngoingStudentDetailService;
//   let accessibilityService: AccessibilityService;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [OngoingStudentDetailComponent, DateFormatPipe, TruncatePipe],
//       imports: [
//         ReactiveFormsModule,
//         FormsModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFirestoreModule,
//       ],
//       providers: [
//         MediaService, UserService, HttpClient, HttpHandler, IndexedDbService, CommentDalService,
//         UploadFileService, AngularFireDatabase, FirebaseDbService, AssessmentService, ObservationDalService,
//         CustomErrorHandlerService, AlertService, ModalService, NgxSpinnerService, OngoingStudentDetailService, TelemetryService
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(OngoingStudentDetailComponent);
//     component = fixture.componentInstance;
//     userService = TestBed.get(UserService);
//     userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511' });
//     mediaService = TestBed.get(MediaService);
//     commentDalService = TestBed.get(CommentDalService);
//     assessmentService = TestBed.get(AssessmentService);
//     observationDalService = TestBed.get(ObservationDalService);
//     indexedDbService = TestBed.get(IndexedDbService);
//     modalService = TestBed.get(ModalService);
//     ongoingStudentDetailService = TestBed.get(OngoingStudentDetailService);
//     // component._assessmentDetail = AssessmentNavigationData.AssessmentDetails;
//     // component.assessmentItem = AssessmentNavigationData.AssessmentItem;
//     component.studentDetail = studentObj.studentDetail;
//     fixture.detectChanges();
//     component.ngOnInit();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize value in studentComment variable', () => {
//     component.studentComment = '';
//     fixture.detectChanges();
//     expect(component.studentComment).toEqual('');
//   });

//   it('should have error value equal to', () => {
//     component.errorMessage = 'Please upload only media files.';
//     fixture.detectChanges();
//     expect(component.errorMessage).toBe('Please upload only media files.');
//   });

//   it('should have student details', () => {
//     fixture.detectChanges();
//     expect(component.studentDetails.avatar).toBe('ad');
//   });

//   it('should call getCurrentAssessment in assessmentService', () => {
//     const spy = spyOn(assessmentService, 'getCurrentAssessment').and.returnValue(AssessmentNavigationData.AssessmentDetails);
//     assessmentService.getCurrentAssessment();
//    // component.assessmentItem = AssessmentNavigationData.AssessmentItem;
//     fixture.detectChanges();
//     expect(component.assessmentItem.id).toEqual('1033');
//     expect(spy).toHaveBeenCalled();
//   });

//   // --------Call real function and save real data-------------
//   // it('should call saveComment in component', () => {
//   //   const studentData = studentObj.studentDetail;
//   //   component.studentComment = 'test';
//   //   component._assessmentDetail = AssessmentNavigationData.AssessmentDetails;
//   //   component.assessmentItem = AssessmentNavigationData.AssessmentItem;
//   //   component.studentDetail = studentObj.studentDetail;
//   //   fixture.detectChanges();
//   //   component.saveNewComment(studentData);
//   //   expect(component.saveNewComment).toBeTruthy();
//   //   userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511' });
//   //   telemetryService = TestBed.get('TelemetryService');
//   //   component.studentComment = '';
//   //   fixture.detectChanges();
//   // });

//   it('should call saveAssessmentItemComment in assessmentService', () => {
//     const spyOnsaveAssessmentItemComment = spyOn(commentDalService, 'saveAssessmentItemComment');
//     // commentDalService.saveAssessmentItemComment({
//     //   assessmentid: '288',
//     //   assessmentitemdetails: {
//     //     // benchmarks: ['1'],
//     //     id: '1033',
//     //     mathpractices: [282],
//     //     sequence: 1,
//     //     title: 'Adds numbers in an order that is different from what is given'
//     //   },
//     //   assessmentitemid: '1033',
//     //   comments: 'test',
//     //   createdat: { seconds: 1542976032, nanoseconds: 386000000 },
//     //   ctype: 'comment',
//     //   deleted: false,
//     //   id: '03333322',
//     //   isobserved: false,
//     //   mediaid: '',
//     //   parent: '3|17|64|253',
//     //   students: ['ffffffff5bb290def856993930d369a2'],
//     //   type: 'checklist',
//     //   updatedat: { seconds: 1542976032, nanoseconds: 386000000 }
//     // });
//     expect(spyOnsaveAssessmentItemComment).toBeTruthy();
//   });

//   it('should call saveIsObserved in component', () => {
//    // component._assessmentDetail = AssessmentNavigationData.AssessmentDetails;
//    // component.assessmentItem = AssessmentNavigationData.AssessmentItem;

//     fixture.detectChanges();
//     component.saveIsObserved();
//     expect(component.saveIsObserved).toBeTruthy();
//     component.saveItemObservation([{
//       assessmentid: '312',
//       assessmentitemid: 1110,
//       createdat: { seconds: 1543568157, nanoseconds: 168000000 },
//       id: 'VIklHgJmlvx6qiK3HLzJ',
//       isobserved: true,
//       parent: '3|17|63|610',
//       path: 'Grade 2 > Unit 1 > Investigation 1 > Session 1.2',
//       students: 'ffffffff5bb290def856993930d369a2',
//       updatedat: { seconds: 1543568157, nanoseconds: 168000000 }
//     }]);
//     expect(component.saveItemObservation).toBeTruthy();
//     component.saveItemObservation([]);
//     expect(component.saveItemObservation).toBeTruthy();
//   });

//   it('should call delete comment in component', () => {
//     observationDalService = TestBed.get(ObservationDalService);
//     observationDalService.saveItemObservation({
//       assessmentid: '312',
//       assessmentitemid: 1110,
//       createdat: { seconds: 1543568157, nanoseconds: 168000000 },
//       updatedat: { seconds: 1543568157, nanoseconds: 168000000 },
//       path: 'Grade 2 > Unit 1 > Investigation 1 > Session 1.2',
//       isobserved: true,
//       parent: '3|17|63|610',
//       students: 'ffffffff5bb290def856993930d369a2'
//     });
//     expect(observationDalService.saveItemObservation).toBeTruthy();
//   });

//   it('should call getAssessmentObservationByStudent in assessmentService', () => {
//     const spyOngetAssessmentObservationByStudent = spyOn(observationDalService, 'getAssessmentObservationByStudent').and.returnValue(of(
//       [{
//         assessmentid: '312',
//         assessmentitemid: 1110,
//         createdat: { seconds: 1542975639, nanoseconds: 27000000 },
//         id: '8bDPmG5nBkm1BjBejfUK',
//         isobserved: true,
//         parent: '3|17|63|610',
//         path: 'Grade 2 > Unit 1 > Investigation 1 > Session 1.2',
//         students: 'ffffffff5bb290def856993930d369a2',
//         updatedat: { seconds: 1543490443, nanoseconds: 158000000 }
//       }]
//     ));
//     observationDalService.getAssessmentObservationByStudent(
//       AssessmentNavigationData.AssessmentDetails.assessment.id,
//       AssessmentNavigationData.AssessmentItem.id, AssessmentNavigationData.AssessmentDetails.parent, studentObj.studentDetail.userId);
//     expect(spyOngetAssessmentObservationByStudent).toHaveBeenCalledWith(
//       AssessmentNavigationData.AssessmentDetails.assessment.id,
//       AssessmentNavigationData.AssessmentItem.id, AssessmentNavigationData.AssessmentDetails.parent, studentObj.studentDetail.userId);
//   });

//   it('should call delete comment in component', () => {
//     component.deleteComment();
//     expect(component.deleteComment).toBeTruthy();
//   });

//   it('should call deleteAssessmentItemCommentById in commentDalService', () => {
//     const spydeleteAssessmentItemCommentById = spyOn(commentDalService, 'deleteAssessmentItemCommentById');
//     commentDalService.deleteAssessmentItemCommentById('12121212');
//     expect(spydeleteAssessmentItemCommentById).toBeTruthy();
//   });

//   it('should call clearId in component', () => {
//     component.clearIDs();
//     expect(component.clearIDs).toBeTruthy();
//   });

//   it('should call closeStudentSidebar in component', () => {
//     component.closeStudentSidebar();
//     expect(component.closeStudentSidebar).toBeTruthy();
//   });

//   it('should call toggleEdit in component', () => {
//     component.toggleEdit();
//     expect(component.toggleEdit).toBeTruthy();
//   });

//   it('should call pushStudentCommentIds in component', () => {
//     const checkboxEvent = { target: { checked: true } };
//     component.pushStudentCommentIds(checkboxEvent, '121', 'comment');
//     expect(component.pushStudentCommentIds).toBeTruthy();
//   });

//   // it('should call onFileSelected in component for image and video', () => {
//   //   const file = { target: { files: [{ name: 'new file', type: 'image' }] } };
//   //   const fileObject = { target: { files: [{ name: 'new file', type: 'image' }] } };
//   //   component.onFileSelected(file);
//   //   const spy = spyOn(component, 'onFileSelected');
//   //   expect(spy).toHaveBeenCalled();
//   //   expect(spy).toHaveBeenCalledWith(file);
//   //   const file1 = { target: { files: [{ name: 'new file', type: 'video' }] } };
//   //   component.onFileSelected(file1);
//   //   const spy1 = spyOn(component, 'onFileSelected');
//   //   expect(spy1).toHaveBeenCalled();
//   //   expect(spy1).toHaveBeenCalledWith(file1);
//   // });

//   // it('should call setMedia in component', () => {
//   //   assessmentService.setCurrentProduct('1');
//   //   const fileData  = { type: 'image/data'  };
//   //   const  base64Data  = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
//   //   component.setMedia(fileData, base64Data, {});
//   //   expect(component.setMedia).toBeTruthy();
//   //   const  spy1  = spyOn(mediaService, 'setMedia');
//   //   mediaService.setMedia(fileData, 'image');
//   //   expect(spy1).toBeTruthy();
//   // });

//   it('should call getMediaList in component', () => {
//     component.getMediaList();
//     expect(component.toggleEdit).toBeTruthy();
//   });

//   it('should call getComment in component', () => {
//     component.getComment({ 'id': '123', ctype: 'comment' }, 'comment');
//     expect(component.toggleEdit).toBeTruthy();
//   });

//   it('should call getComment in component', () => {
//     component.getComment({ 'id': '123', ctype: 'media' }, 'media');
//     expect(component.toggleEdit).toBeTruthy();
//   });

//   it('should get selectFocus method', () => {
//     accessibilityService = TestBed.get(AccessibilityService);
//     component.setFocus('arrow_button', '');
//     const spy = spyOn(accessibilityService, 'selectFocus');
//     accessibilityService.selectFocus('arrow_button', '');
//     expect(spy).toHaveBeenCalled();
//   });

// });
