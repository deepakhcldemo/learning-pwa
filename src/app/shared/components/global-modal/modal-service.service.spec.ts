// import { TestBed, inject } from '@angular/core/testing';
// import { ModalService } from './modal.service';
// import { Subject } from 'rxjs';
// import { AssessmentService } from '../../services/assessment.service';
// import { MediaService } from '../../services/media.service';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { environment } from '../../../../environments/environment.prod';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { HttpClientModule } from '@angular/common/http';
// import { IndexedDbService } from '../../services/indexed.db.service';
// import { FirebaseDbService } from '../../services/firebase.db.service';
// import { TelemetryService } from '../../services/telemetry.service';
// import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { UserService } from 'src/app/auth/user.service';


// describe('ModalServiceService', () => {
//   // let mediaService: MediaService;
//   // let userService: UserService;
//   // let assessmentService: AssessmentService;
//   let modalService: ModalService;
//   const chartStudentSource = new Subject<any>();
//   const chartCommentSource = new Subject<any>();
//   const onViewOptionsSelected = new Subject<any>();
//   const onWhenOptionsSelected = new Subject<any>();
//   const onSortByOptionsSelected = new Subject<any>();
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [AngularFirestoreModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFirestoreModule,
//         AngularFireDatabaseModule,
//         HttpClientModule],
//       providers: [ModalService,
//         MediaService,
//         UserService,
//         IndexedDbService,
//         AssessmentService,
//         FirebaseDbService,
//         TelemetryService
//       ],
//       schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
//     });
//   });

//   it('should be created', inject([ModalService], (service: ModalService) => {
//     expect(service).toBeTruthy();
//   }));
//   it('should call getElement method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.getElement();
//     expect(modalService.getElement).toBeDefined();
//   });
//   it('should call getPopupStatus method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.getPopupStatus();
//     expect(modalService.getPopupStatus).toBeDefined();
//   });
//   it('should call hide method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.hide();
//     expect(modalService.hide).toBeDefined();
//   });
//   it('should call closeModal method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.closeModal();
//     expect(modalService.closeModal).toBeDefined();
//   });
//   it('should call getStudentDetails method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.getStudentDetails();
//     expect(modalService.getStudentDetails).toBeDefined();
//   });
//   it('should call getMediaList method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.getMediaList();
//     expect(modalService.getMediaList).toBeDefined();
//   });
//   it('should call setAssessmentMedia method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.setAssessmentMedia();
//     expect(modalService.setAssessmentMedia).toBeDefined();
//   });
//   it('should call getCurrentAssessment method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.getCurrentAssessment();
//     expect(modalService.getCurrentAssessment).toBeDefined();
//   });
//   it('should call getAssessmentItemMedia method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.getAssessmentItemMedia();
//     expect(modalService.getAssessmentItemMedia).toBeDefined();
//   });
//   it('should call getPopupType method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.getPopupType();
//     expect(modalService.getPopupType).toBeDefined();
//   });
//   it('should call getData method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.getData();
//     expect(modalService.getData).toBeDefined();
//   });
//   it('should call getNotesConfirmation method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.getNotesConfirmation();
//     expect(modalService.getNotesConfirmation).toBeDefined();
//   });
//   it('should call getMediaPopupRef method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.getMediaPopupRef();
//     expect(modalService.getMediaPopupRef).toBeDefined();
//   });
//   it('should call getStudentPopupRef method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.getStudentPopupRef();
//     expect(modalService.getStudentPopupRef).toBeDefined();
//   });
//   it('should call getStudentPopupRef method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.setStudentDetails({});
//     expect(modalService.setStudentDetails).toBeDefined();
//   });
//   it('should call setData method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.setData({});
//     expect(modalService.setData).toBeDefined();
//   });
//   it('should call setElement method in modal service', () => {
//     modalService = TestBed.get(ModalService);
//     modalService.setElement({});
//     expect(modalService.setElement).toBeDefined();
//   });

// });
