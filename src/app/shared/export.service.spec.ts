// import { TestBed, inject } from '@angular/core/testing';

// import { ExportService } from './export.service';
// import { ObservationDalService } from './services/realtime-datalayer/observation-dal.service';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from 'src/environments/environment.perf';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { IndexedDbService } from './services/indexed.db.service';
// import { MediaService } from './services/media.service';
// import { UploadFileService } from './services/upload-file.service';
// import { FirebaseDbService } from './services/firebase.db.service';
// import { AssessmentService } from './services/assessment.service';
// import { CustomErrorHandlerService } from './services/custom.errorhandler.service';
// import { AlertService } from './components/alert/alert.service';
// import { CommentDalService } from './services/realtime-datalayer/comment-dal.service';
// import { ProductService } from './services/product.service';
// import { StudentMockData } from './mock-data/student.mock.data';
// import { UserService } from '../auth/user.service';

// describe('ExportService', () => {
//   let exportService: ExportService;
//   let userService: UserService;
//   let productService: ProductService;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [ExportService,
//         UserService,
//         ObservationDalService, IndexedDbService,
//          MediaService, AssessmentService,
//          UploadFileService, CustomErrorHandlerService, AlertService,
//           FirebaseDbService, CommentDalService],
//         imports: [HttpClientModule,
//           RouterTestingModule,
//           AngularFirestoreModule,
//           AngularFireModule.initializeApp(environment.firebase),
//           AngularFireDatabaseModule,
//           NgbModalModule,
//       ],
//     });
//     exportService = TestBed.get(ExportService);
//     userService = TestBed.get(UserService);
//     productService = TestBed.get(ProductService);
//     userService.setUser({ identityId: 'ffffffff54738483e4b001bd4b61aaf0' });
//     productService.setCurrentProduct('336566');
//     exportService.studentDetails =  {
//       'avatar': '0a',
//       'emailAddress': 'emailaddress@pearson.com',
//       'firstName': '0911',
//       'fullName': '0911 adaptive',
//       'lastName': 'adaptive',
//       'userId': 'ffffffff59b667fd45d99156d4fa1d53'
//     };

//   });

//   it('should be created', inject([ExportService], (service: ExportService) => {
//     expect(service).toBeTruthy();
//   }));

//     it('it should call the prepareCSVFormatData() method', () => {
//       const  studentDetails =  {
//         'avatar': '0a',
//         'emailAddress': 'emailaddress@pearson.com',
//         'firstName': '0911',
//         'fullName': '0911 adaptive',
//         'lastName': 'adaptive',
//         'userId': 'ffffffff59b667fd45d99156d4fa1d53'
//       };
//     //   exportService.prepareCSVFormatData(studentDetails, StudentMockData.assessmentType);
//       expect(exportService.prepareCSVFormatData).toBeDefined();
//     });

//     it(' it should call prepareAllCommentAndMediaList method ', () => {
//         // const usreId = component.studentDetails[0].userId;
//         const comments = StudentMockData.comment;
//         exportService.prepareAllCommentAndMediaList(comments);
//         expect(exportService.prepareAllCommentAndMediaList).toBeDefined();
//     });

//     it('it should call getObservationByStudentId method', () => {
//         const studentId = 'ffffffff5bb290def856993930d369a2';
//         exportService.getObservationByStudentId(studentId);
//         expect(exportService.getObservationByStudentId).toBeDefined();
//     });

//     it('it should call getCommentForObservation method', () => {
//         const studentId = 'ffffffff5bb290def856993930d369a2';
//         exportService.getCommentForObservation(studentId);
//         expect(exportService.getCommentForObservation).toBeDefined();
//     });

//     it('it should call iterateOverAssessmentArray method', () => {
//             const studentDetails = {
//                 'avatar': '0a',
//                 'emailAddress': 'emailaddress@pearson.com',
//                 'firstName': '0911',
//                 'fullName': '0911 adaptive',
//                 'lastName': 'adaptive',
//                 'userId': 'ffffffff59b667fd45d99156d4fa1d53'
//               };
//               const assessmentArrayData = StudentMockData.assessmentType;
//             //   exportService.iterateOverAssessmentArray(studentDetails, assessmentArrayData );
//               expect(exportService.iterateOverAssessmentArray).toBeDefined();

//     });

//     it('it should call the splitKeyWord method', () => {
//         const pathToSplit = 'Grade 2 > Unit 1 > Investigation 1 > Session 1.4';
//         exportService.splitKeyWord(pathToSplit);
//         expect(exportService.splitKeyWord).toBeDefined();
//     });

//     it('it should call the convertTimeStamp method', () => {
//         const time = { seconds: 1543674042, nanoseconds: 825000000 };
//         exportService.convertTimeStamp(time);
//         expect(exportService.convertTimeStamp).toBeDefined();
//     });


//     it('it should call the fetchGradeMethod ', () => {
//         const storeSplitArray = ['Grade', '2', 'Unit', '1', 'Investigation', '2', 'Session', '2.3'];
//         exportService.fetchGrade(storeSplitArray);
//         expect(exportService.fetchGrade).toBeDefined();
//     });

//     it('it should call the fetchGradeMethodwith grade as KinderGarten', () => {
//         const storeSplitArray = ['Kindergarten', '2', 'Unit', '1', 'Investigation', '2', 'Session', '2.3'];
//         exportService.fetchGrade(storeSplitArray);
//         expect(exportService.fetchGrade).toBeDefined();
//     });


//     it('it should call the setObservedStateByAssessmentType method', () => {
//         const assessmentDataInstance = {
//             assessment: {
//                 templatekind: '0',
//                 title: 'MP8, Look for and express regularity in repeated reasoning',
//                 id: '288',
//                 type: 'checklist',
//                 criteria: [{}],
//             },
//             assessmentItemId: 1033,
//             createdat: '',
//             parent: '3|17|64|253',
//             path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//             students: 'ffffffff5bb290def856993930d369a2',
//             type: 'assessment'
//         };

//         const studentDetails = {
//             'avatar': '0a',
//             'emailAddress': 'emailaddress@pearson.com',
//             'firstName': '0911',
//             'fullName': '0911 adaptive',
//             'lastName': 'adaptive',
//             'userId': 'ffffffff59b667fd45d99156d4fa1d53'
//           };
//         const observeInstance = {
//             assessmentid: 288,
//             assessmentitemid: 1033,
//             createdat: '',
//             isobserved: true,
//             parent: '3|17|64|253',
//             path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//             students: 'ffffffff5bb290def856993930d369a2',
//             updatedat: ''
//         };
//         exportService.setObservedStateByAssessmentType(studentDetails, assessmentDataInstance, observeInstance);
//         expect(exportService.setObservedStateByAssessmentType).toBeDefined();
//     });

//     it('it should have call prepareObservedAssessmentList() function', () => {
//         const assessmentDataInstance = {
//             assessment: {
//                 templatekind: '0',
//                 title: 'MP8, Look for and express regularity in repeated reasoning',
//                 id: '288',
//                 type: 'checklist',
//                 criteria: [{}],
//             },
//             assessmentItemId: 1033,
//             createdat: '',
//             parent: '3|17|64|253',
//             path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//             students: 'ffffffff5bb290def856993930d369a2',
//             type: 'assessment'
//         };
//         const assessmentItemDetail = {
//             benchmarks: [1],
//             id: 1033,
//             mathpractices: [282],
//             sequence: 1,
//             title: 'Adds numbers in an order that is different from what is given'
//         };
//         exportService.studentDetails = StudentMockData.students[0];
//         exportService.studentDetails.firstName = StudentMockData.students[0].fullName;
//         exportService.grade = '2';
//         const unit = '1';
//         const investigation = '1';
//         const session = '2.1';
//         const parent = '3|17|64|253';
//         const tempText = 'Adds numbers in an order that is different from what is given';
//         const observedState = 'true';
//         const commentType = '';
//         const studentDetails = {
//             'avatar': '0a',
//             'emailAddress': 'emailaddress@pearson.com',
//             'firstName': '0911',
//             'fullName': '0911 adaptive',
//             'lastName': 'adaptive',
//             'userId': 'ffffffff59b667fd45d99156d4fa1d53'
//           };
//           exportService.prepareObservedAssessmentList(studentDetails, assessmentDataInstance, assessmentItemDetail, tempText,
//             parent, observedState, commentType);
//             exportService.itemsFormatted.push({
//             name: studentDetails.fullName,
//             grade: exportService.grade,
//             unit: unit,
//             investigation: investigation,
//             session: session,
//             assessmentType: assessmentDataInstance.assessment.type,
//             assessmentTitle: assessmentDataInstance.assessment.title.replace(/[^\w\s]/gi, ''),
//             assessmentItem: tempText,
//             date: '',
//             checkmark: observedState,
//             comment: commentType
//         });
//         expect(exportService.prepareObservedAssessmentList).toBeDefined();
//     });

//     it('it should call iterateForCriteria method', () => {
//         const assessmentDataInstance = StudentMockData.assessmentType[0];
//         const observeInstance = [{
//             assessmentid: 288,
//             assessmentitemid: 1033,
//             createdat: '',
//             isobserved: true,
//             parent: '3|17|64|253',
//             path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//             students: 'ffffffff5bb290def856993930d369a2',
//             updatedat: ''
//         }];
//         const studentDetails = {
//             'avatar': '0a',
//             'emailAddress': 'emailaddress@pearson.com',
//             'firstName': '0911',
//             'fullName': '0911 adaptive',
//             'lastName': 'adaptive',
//             'userId': 'ffffffff59b667fd45d99156d4fa1d53'
//           };
//         const parent = '3|17|64|253';
//         const assessmentItemId = 1033;
//        // exportService.assessmentArrayData = StudentMockData.assessmentType;
//         exportService.studentDetails = StudentMockData.students[0];
//         exportService.iterateForCriteria(studentDetails, observeInstance, assessmentDataInstance, parent, assessmentItemId);
//         expect( exportService.iterateForCriteria).toBeDefined();
//     });

//     it('it should call iterateObservedData() method', () => {
//         const assessmentDataInstance = {
//             assessment: {
//                 templatekind: '0',
//                 title: 'MP8, Look for and express regularity in repeated reasoning',
//                 id: '288',
//                 type: 'checklist',
//                 criteria: [{}],
//             },
//             assessmentItemId: 1033,
//             createdat: '',
//             parent: '3|17|64|253',
//             path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//             students: 'ffffffff5bb290def856993930d369a2',
//             type: 'assessment'
//         };
//         const studentDetails = {
//             'avatar': '0a',
//             'emailAddress': 'emailaddress@pearson.com',
//             'firstName': '0911',
//             'fullName': '0911 adaptive',
//             'lastName': 'adaptive',
//             'userId': 'ffffffff59b667fd45d99156d4fa1d53'
//           };
//         const observeInstance = [
//             {
//                 assessmentid: 288,
//                 assessmentitemid: 1033,
//                 createdat: '',
//                 isobserved: true,
//                 parent: '3|17|64|253',
//                 path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//                 students: 'ffffffff5bb290def856993930d369a2',
//                 updatedat: ''
//             },
//             {
//                 assessmentid: 288,
//                 assessmentitemid: 1033,
//                 createdat: '',
//                 isobserved: true,
//                 parent: '3|17|64|253',
//                 path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//                 students: 'ffffffff5bb290def856993930d369a2',
//                 updatedat: ''
//             }
//         ];
//         const assessmentItemDetail = {
//             benchmarks: [1],
//             id: 1033,
//             mathpractices: [282],
//             sequence: 1,
//             title: 'Adds numbers in an order that is different from what is given'
//         };
//         const tempText = 'Adds numbers in an order that is different from what is given';
//         const parent = '3|17|64|253';
//         const assessmentItemId = 1033;
//         exportService.studentDetails = StudentMockData.students[0];
//         exportService.studentDetails.fullName = StudentMockData.students[0].fullName;
//         exportService.iterateObservedData( studentDetails,
// observeInstance, assessmentItemDetail, assessmentDataInstance, tempText, parent);
//         expect(exportService.iterateObservedData).toBeDefined();
//     });

//     it('it should call iterateOverAssessmentArray', () => {
//         const studentDetails = {
//             'avatar': '0a',
//             'emailAddress': 'emailaddress@pearson.com',
//             'firstName': '0911',
//             'fullName': '0911 adaptive',
//             'lastName': 'adaptive',
//             'userId': 'ffffffff59b667fd45d99156d4fa1d53'
//           };
//         const assessmentDataInstance = {
//             assessment: {
//                 templatekind: '0',
//                 title: 'MP8, Look for and express regularity in repeated reasoning',
//                 id: '288',
//                 type: 'checklist',
//                 criteria: [{}],
//             },
//             assessmentItemId: 1033,
//             createdat: '',
//             parent: '3|17|64|253',
//             path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//             students: 'ffffffff5bb290def856993930d369a2',
//             type: 'assessment'
//         };
//         const observedData = [
//             {
//                 assessmentid: 288,
//                 assessmentitemid: 1033,
//                 createdat: '',
//                 isobserved: true,
//                 parent: '3|17|64|253',
//                 path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//                 students: 'ffffffff5bb290def856993930d369a2',
//                 updatedat: ''
//             },
//             {
//                 assessmentid: 288,
//                 assessmentitemid: 1033,
//                 createdat: '',
//                 isobserved: true,
//                 parent: '3|17|64|253',
//                 path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//                 students: 'ffffffff5bb290def856993930d369a2',
//                 updatedat: ''
//             }
//         ];
//         const parent = '3|17|64|253';
//         const assessmentItemId = 1033;
//         // exportService.assessmentArrayData = StudentMockData.assessmentType;
//         // exportService.iterateOverAssessmentArray(studentDetails, StudentMockData.assessmentType);
//         exportService.assessmentArrayData.forEach((assessmentInstance) => {
//             exportService.iterateForCriteria(studentDetails, observedData, assessmentDataInstance, parent, assessmentItemId);
//         });
//         expect(exportService.iterateOverAssessmentArray).toBeDefined();
//     });

//     it('it should call getIterateOverCommentObservedTrue', () => {
//         const assessmentObservationInstance = {
//             assessmentid: 288,
//             assessmentitemid: 1033,
//             createdat: '',
//             isobserved: true,
//             parent: '3|17|64|253',
//             path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//             students: 'ffffffff5bb290def856993930d369a2',
//             updatedat: '',
//         };
//         const assessmentDataInstance = {
//             assessment:
//             {
//                 templatekind: '0',
//                 title: 'MP8, Look for and express regularity in repeated reasoning', id: '288',
//                 type: 'checklist',
//                 criteria: []
//             },
//             assessmentItemId: 1033,
//             createdat: '',
//             parent: '3|17|64|253',
//             path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//             students: 'ffffffff5bb290def856993930d369a2',
//             type: 'assessment',
//         };
//         const assessmentItemDetail = {
//             benchmarks: [1],
//             id: 1033,
//             mathpractices: [282],
//             sequence: 1,
//             title: 'Adds numbers in an order that is different from what is given'
//         };
//         const comments = [{
//             assessmentid: '288',
//             assessmentitemdetails: {
//                 benchmarks: Array(1),
//                 id: 1033, mathpractices: Array(1),
//                 sequence: 1,
//                 title: 'Adds numbers in an order that is different from what is given',
//             },
//             assessmentitemid: 1033,
//             comments: 'comment',
//             createdat: '',
//             ctype: 'comment',
//             deleted: false,
//             isobserved: false,
//             mediaid: '',
//             parent: '3|17|64|253',
//             students: ['ffffffff5bb290def856993930d369a2'],
//             type: 'checklist',
//             updatedat: ''
//         },
//         {
//             assessmentid: 288,
//             assessmentitemdetails:
//             {
//                 benchmarks: Array(1),
//                 id: 1033,
//                 mathpractices: Array(1),
//                 sequence: 1,
//                 title: 'Adds numbers in an order that is different from what is given'
//             },
//             assessmentitemid: 1033,
//             comments: 'test',
//             createdat: '',
//             ctype: 'comment',
//             deleted: false,
//             isobserved: false,
//             mediaid: '',
//             parent: '3|17|64|253',
//             students: ['ffffffff5bb290def856993930d369a2'],
//             type: 'ongoing',
//             updatedat: ''
//         }];
//         const parent = '3|17|64|253';
//         const tempText = 'Adds numbers in an order that is different from what is given';
//         const observeState = true;
//         const studentDetails = {
//             'avatar': '0a',
//             'emailAddress': 'emailaddress@pearson.com',
//             'firstName': '0911',
//             'fullName': '0911 adaptive',
//             'lastName': 'adaptive',
//             'userId': 'ffffffff59b667fd45d99156d4fa1d53'
//           };
//         exportService.getIterateOverCommentObservedTrue(studentDetails, assessmentObservationInstance,
//             assessmentDataInstance, assessmentItemDetail,
//             tempText, parent);
//       expect(exportService.getIterateOverCommentObservedTrue).toBeDefined();
//     });

// });
