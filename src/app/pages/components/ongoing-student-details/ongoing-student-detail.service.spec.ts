// import { OngoingStudentDetailService } from './ongoing-student-detail.service';

// describe('OngoingStudentDetailService', () => {
//     let service: OngoingStudentDetailService;
//     beforeEach(() => {
//         service = new OngoingStudentDetailService();
//     });

//     it('should set setPopupStatus method', () => {
//         service.setPopupStatus(true);
//         expect(service.setPopupStatus).toBeTruthy();
//     });

//     it('should set getPopupStatus method', () => {
//         service.getPopupStatus();
//         expect(service.getPopupStatus).toBeTruthy();
//     });

//     it('should set setAssessmentDetails method', () => {
//         service.setAssessmentDetails({
//             assessment: {
//               criteria: [{
//                 benchmarks: [1],
//                 id: 1033,
//                 mathpractices: [282],
//                 sequence: 1,
//                 title: 'Adds numbers in an order that is different from what is given'
//               }],
//               id: 288,
//               templatekind: '0',
//               title: 'MP8, Look for and express regularity in repeated reasoning',
//               type: 'checklist'
//             },
//             assessmentItem: {
//               criteria: [{
//                 benchmarks: [1],
//                 id: 1033,
//                 mathpractices: [282],
//                 sequence: 1,
//                 title: 'Adds numbers in an order that is different from what is given'
//               }],
//               id: 288,
//               templatekind: '0',
//               title: 'MP8, Look for and express regularity in repeated reasoning',
//               type: 'checklist'
//             },
//             parent: '3|17|64|253',
//             parentid: '253',
//             path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
//             progressCount: 38,
//             sequence: 289,
//             shortname: 'Session 2.3',
//             title: 'MP8, Look for and express regularity in repeated reasoning',
//             type: 'checklist',
//             updatedat: {seconds: 1543479802, nanoseconds: 238000000}
//           });
//         expect(service.setAssessmentDetails).toBeTruthy();
//     });

//     it('should set getAssessmentDetails method', () => {
//         service.getAssessmentDetails();
//         expect(service.getAssessmentDetails).toBeTruthy();
//     });

//     it('should set setAssessmentItemDetails method', () => {
//         service.setAssessmentItemDetails({
//             benchmarks: [1],
//             id: 1033,
//             mathpractices: [282],
//             sequence: 1,
//             title: 'Adds numbers in an order that is different from what is given'
//           });
//         expect(service.setAssessmentItemDetails).toBeTruthy();
//     });

//     it('should set getAssessmentItemDetails method', () => {
//         service.getAssessmentItemDetails();
//         expect(service.getAssessmentItemDetails).toBeTruthy();
//     });

//     it('should set setStudentDetail method', () => {
//         service.setStudentDetail({
//             avatar: 'ad',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: 'ash',
//             fullName: 'ash dev',
//             lastName: 'dev',
//             observed: [{
//               assessmentitemid: 1033,
//               id: '5YxYWze5NuwOKWzdwrWK',
//               isObserved: true
//             }],
//             userId: 'ffffffff5bb290def856993930d369a2'
//           });
//         expect(service.setStudentDetail).toBeTruthy();
//     });

//     it('should set getStudentDetail method', () => {
//         service.getStudentDetail();
//         expect(service.getStudentDetail).toBeTruthy();
//     });
// });
