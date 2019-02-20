// import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

// import { StudentDetailComponent } from './student-detail.component';
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
// import { StudentDetailService } from './student-detail.service';
// import { TelemetryService } from 'src/app/shared/services/telemetry.service';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { of } from 'rxjs';
// import { AssessmentNavigationData } from 'src/app/shared/mock-data/Assessment-checklist';
// import { studentObj } from 'src/app/shared/mock-data/student';
// import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
// import { ObservationDalService } from 'src/app/shared/services/realtime-datalayer/observation-dal.service';
// import { CommentDalService } from 'src/app/shared/services/realtime-datalayer/comment-dal.service';
// import { UserService } from 'src/app/auth/user.service';

// describe('StudentDetailComponent', () => {
//   let component: StudentDetailComponent;
//   let fixture: ComponentFixture<StudentDetailComponent>;
//   let mediaService: MediaService;
//   let userService: UserService;
//   let assessmentService: AssessmentService;
//   let commentDalService: CommentDalService;
//   let observationDalService: ObservationDalService;
//   let indexedDbService: IndexedDbService;
//   let studentDetailService: StudentDetailService;
//   let modalService: ModalService;
//   let accessibilityService;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [StudentDetailComponent, DateFormatPipe],
//       imports: [
//         ReactiveFormsModule,
//         FormsModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFirestoreModule,
//       ],
//       providers: [
//         MediaService, UserService, HttpClient, HttpHandler, IndexedDbService, CommentDalService,
//         UploadFileService, AngularFireDatabase, FirebaseDbService, AssessmentService, ObservationDalService,
//         CustomErrorHandlerService, AlertService, ModalService, StudentDetailService, TelemetryService, AccessibilityService
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(StudentDetailComponent);
//     component = fixture.componentInstance;
//     userService = TestBed.get(UserService);
//     userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511' });
//     mediaService = TestBed.get(MediaService);
//     assessmentService = TestBed.get(AssessmentService);
//     commentDalService = TestBed.get(CommentDalService);
//     indexedDbService = TestBed.get(IndexedDbService);
//     studentDetailService = TestBed.get(StudentDetailService);
//     observationDalService = TestBed.get(ObservationDalService);
//     modalService = TestBed.get(ModalService);
//     accessibilityService = TestBed.get(AccessibilityService);
//     studentDetailService.setAssessmentDetails(AssessmentNavigationData.AssessmentDetails);
//     studentDetailService.setStudentDetail(studentObj.studentDetail);
//     studentDetailService.setAssessmentItemDetails(AssessmentNavigationData.AssessmentItem);
//     component.assessmentDetail = AssessmentNavigationData.AssessmentDetails;
//     // component._assessmentItem = AssessmentNavigationData.AssessmentItem;
//     component.studentDetails = studentObj.studentDetail;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call pop getPopupStatus in studentDetailService', () => {
//     studentDetailService.setPopupStatus(true);
//     fixture.detectChanges();
//     const spy = spyOn(studentDetailService, 'getPopupStatus').and.returnValue(of(true));
//     component._popupSubscription = studentDetailService.getPopupStatus().subscribe((popupFlag) => {
//       expect(popupFlag).toBe(true);
//     });
//     expect(spy).toHaveBeenCalled();
//   });

//   it('should call popupStatusSubscriber in component', () => {
//     component.studentDetails = studentDetailService.getStudentDetail();
//     component.assessmentDetail = studentDetailService.getAssessmentDetails();
//     component._assessmentItem = studentDetailService.getAssessmentItemDetails();
//     const spy = spyOn(commentDalService, 'getAssessmentCommentsByStudentId').and.returnValue(
//       of(AssessmentNavigationData.AssessmentItemComment));
//     component._commentSubscription = commentDalService.getAssessmentCommentsByStudentId(
//       AssessmentNavigationData.AssessmentDetails.assessment.id,
//       AssessmentNavigationData.AssessmentItem.id,
//       AssessmentNavigationData.AssessmentDetails.parent,
//       studentObj.studentDetail.userId
//     ).subscribe((commentData) => {
//     });
//     expect(spy).toHaveBeenCalledWith(AssessmentNavigationData.AssessmentDetails.assessment.id,
//       AssessmentNavigationData.AssessmentItem.id,
//       AssessmentNavigationData.AssessmentDetails.parent,
//       studentObj.studentDetail.userId
//     );
//   });

//   it('should call getCommentResult in component', () => {
//     component.getCommentResult(AssessmentNavigationData.AssessmentItemComment);
//    // component._commentDetails = AssessmentNavigationData.AssessmentAllComment;
//    // component.allComment = AssessmentNavigationData.AssessmentAllComment;
//     fixture.detectChanges();
//     expect(component.getCommentResult).toBeDefined();
//   });

//   it('should call clearData in component', () => {
//     // const spyComponent = spyOn(component, 'clearData');
//     component.clearData();
//     expect(component.clearData).toBeDefined();
//     // expect(spyComponent).toHaveBeenCalled();
//   });

//   it('should call closePopup in component', () => {
//     // const spyComponent = spyOn(component, 'closePopup');
//     component.closePopup();
//     expect(component.closePopup).toBeDefined();
//     // expect(spyComponent).toHaveBeenCalled();
//     // studentDetailService.setPopupStatus(false);
//     // const spy = spyOn(accessibilityService, 'setTabIndexLevelStatus').and.returnValue(of(true));
//     // accessibilityService.setTabIndexLevelStatus(false, false, false);
//     // expect(spy).toHaveBeenCalledWith(false, false, false);
//   });

//   it('should call getComment in component for comment and media case', () => {
//     // const spy = spyOn(component, 'getComment');
//     component.getComment({ 'id': '123', ctype: 'comment' }, 'comment');
//     fixture.detectChanges();
//     expect(component.getComment).toBeDefined();
//     component.getComment({'id': '123', ctype: 'media', mediaData: ''}, 'media');
//       fixture.detectChanges();
//       expect(component.getComment).toBeTruthy();
//     // expect(spy).toHaveBeenCalledWith({'id': '123', ctype: 'comment'}, 'comment');
//   });

//   it('should call setFocus in component', () => {
//     component.setFocus('arrow_button');
//     expect(component.setFocus).toBeDefined();
//   });

//   // --------Call real function and save real data-------------
//   // it('should call saveNewComment in component', async(() => {
//   //   component.saveNewComment();
//   //   expect(component.saveNewComment).toBeDefined();
//   //   const spy = spyOn(commentDalService, 'saveAssessmentItemComment');
//   //   commentDalService.saveAssessmentItemComment(AssessmentNavigationData.AssessmentItemComment);
//   //   expect(spy).toHaveBeenCalledWith(AssessmentNavigationData.AssessmentItemComment);
//   // }));

//   // --------Call real function and save real data-------------.
//   // it('should call saveIsObserved in component', async(() => {
//   //   component.saveIsObserved();
//   //   expect(component.saveIsObserved).toBeDefined();
//   //   component.assessmentDetail = AssessmentNavigationData.AssessmentDetails;
//   //   component._assessmentItem = AssessmentNavigationData.AssessmentItem;
//   //   component.studentDetails = studentObj.studentDetail;
//   //   fixture.detectChanges();
//   //   const spyOnSaveIsObserved = spyOn(observationDalService, 'getAssessmentObservationByStudent').and.returnValue(of([]));
//   //   observationDalService.getAssessmentObservationByStudent(component.assessmentDetail.assessment.id,
//   //     component._assessmentItem.id,
//   //     component.assessmentDetail.parent,
//   //     component.studentDetails.userId
//   //   ).subscribe((observedData) => {
//   //     observedData.length = 0;
//   //   });
//   //   expect(spyOnSaveIsObserved).toHaveBeenCalledWith(
//   //     component.assessmentDetail.assessment.id,
//   //     component._assessmentItem.id,
//   //     component.assessmentDetail.parent,
//   //     component.studentDetails.userId
//   //   );
//   // }));

//   // --------Call real function and save real data-------------.
//   // it('should call saveItemObservation in ObservationDalService', () => {
//   //   const spyOnsaveItemObservation = spyOn(observationDalService, 'saveItemObservation');
//   //   observationDalService.saveItemObservation({
//   //     assessmentid: 288,
//   //     assessmentitemid: 1033,
//   //     createdat: new Date(),
//   //     updatedat: new Date(),
//   //     path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//   //     isobserved: false,
//   //     parent: '3|17|64|253',
//   //     students: 'ffffffff5bb290def856993930d369a2'
//   //   });
//   //   expect(spyOnsaveItemObservation).toHaveBeenCalled();
//   // });

//   it('should call deleteComment in component', () => {
//     // const spy = spyOn(component, 'deleteComment');
//     component.deleteComment();
//     expect(component.deleteComment).toBeDefined();
//     // expect(spy).toHaveBeenCalled();
//   });

//   it('should call clearIDs in component', () => {
//     // const spy = spyOn(component, 'clearIDs');
//     component.clearIDs();
//     expect(component.clearIDs).toBeDefined();
//     // expect(spy).toHaveBeenCalled();
//   });

//   it('should call toggleEdit in component', () => {
//     // const spy = spyOn(component, 'toggleEdit');
//     component.toggleEdit();
//     expect(component.toggleEdit).toBeDefined();
//     // expect(spy).toHaveBeenCalled();
//   });

//   // it('should call getMediaList in component', () => {
//   //   component.getMediaList();
//   //   expect(component.getMediaList).toBeDefined();
//   // });

//   // it('should call pushStudentCommentIds in component', () => {
//   //   const checkboxEvent = { 'target': { 'checked': true } };
//   //   component.pushStudentCommentIds(checkboxEvent, '121', 'comment');
//   //   expect(component.pushStudentCommentIds).toBeDefined();
//   // });

//   // it('should call onFileSelected in component', () => {
//   //   const file = { target: { files: [{ name: 'new file', type: 'image' }] } };
//   //   const fileObject = { target: { files: [{ name: 'new file', type: 'image' }] } };
//   //   const spy = spyOn(component, 'onFileSelected');
//   //   component.onFileSelected(file);
//   //   fixture.detectChanges();
//   //   expect(spy).toHaveBeenCalledWith(file);
//   // });

// });
