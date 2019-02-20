// import { TestBed, inject } from '@angular/core/testing';

// import { CommentDalService } from './comment-dal.service';
// import { FirebaseDbService } from '../firebase.db.service';
// import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
// import { HttpClientModule } from '@angular/common/http';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from 'src/environments/environment.cert';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { CustomErrorHandlerService } from '../custom.errorhandler.service';
// import { AlertService } from '../../components/alert/alert.service';
// import { IndexedDbService } from 'src/app/shared/services/indexed.db.service';
// import { of } from 'rxjs';
// import { UserService } from 'src/app/auth/user.service';
// describe('CommentDalService', () => {
//   let commentDalService: CommentDalService;
//   let userService: UserService;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [CommentDalService,
//         FirebaseDbService,
//         AngularFirestore,
//         CustomErrorHandlerService,
//         AlertService,
//         UserService,
//         IndexedDbService],
//       imports: [HttpClientModule,
//         AngularFirestoreModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFirestoreModule,
//         AngularFireDatabaseModule,
//       ]
//     });
//     commentDalService = TestBed.get(CommentDalService);
//     userService = TestBed.get(UserService);
//     userService.setUser({ identityId: 'ffffffff54738483e4b001bd4b61aaf0' });
//   });

//   it('should have a comment service instance', () => {
//     expect(commentDalService).toBeDefined();
//   });

//   it('should have call get comment for observation', async () => {
//     commentDalService.getCommentForObservation('ffffffff5a7d7439f02ebd1b9347e303');
//     expect(commentDalService.getCommentForObservation).toBeDefined();
//    });



//   it('should get deleteAssessmentItemCommentById method', () => {
//     userService.setUser({
//       firstName: 'realize1',
//       identityId: 'ffffffff51c87040e4b07dddca2a0511',
//       idpName: 'RUMBA'
//     });
//     commentDalService.deleteAssessmentItemCommentById('0');
//     expect(commentDalService.deleteAssessmentItemCommentById).toBeTruthy();
//   });

//   it('should get getAssessmentCommentsByStudentId method', () => {
//     commentDalService.getAssessmentCommentsByStudentId(1, 1, '', 1).subscribe((assessmentByStudentId) => {
//       expect(assessmentByStudentId.length).toBeGreaterThanOrEqual(0);
//     });
//   });

//   // -> Commented because of real db hit //

//   // it('should get saveAssessmentItemComment method', () => {
//   //   const commentData = {
//   //     assessmentid: '288',
//   //     assessmentitemdetails: {
//   //       id: 1033,
//   //       title: 'Adds numbers in an order that is different from what is given',
//   //       sequence: 1,
//   //       benchmarks: [1],
//   //       mathpractices: [282]
//   //     },
//   //     assessmentitemid: 1033,
//   //     comments: 'comment',
//   //     createdat: new Date(),
//   //     ctype: 'comment',
//   //     deleted: false,
//   //     isobserved: false,
//   //     mediaid: '',
//   //     parent: '3|17|64|253',
//   //     students: ['ffffffff5bb290def856993930d369a2'],
//   //     type: 'checklist',
//   //     updatedat: new Date(),
//   //   };
//   //   commentDalService.saveAssessmentItemComment(commentData);
//   //   expect(commentDalService.saveAssessmentItemComment).toBeTruthy();
//   // });

//   it('should get updateCommentByCommentId method', () => {
//     const spy = spyOn(commentDalService, 'updateCommentByCommentId').and.returnValue(
//       of({
//         comments: 'I am',
//         updatedat: new Date()
//       })
//     );
//     commentDalService.updateCommentByCommentId('0', 'I am testing the comment text1', 'ffffffff51c87040e4b07dddca2a0511');
//     expect(spy).toHaveBeenCalledWith('0', 'I am testing the comment text1', 'ffffffff51c87040e4b07dddca2a0511');
//   });

//   it('should get getAllCommentsList method', () => {
//     commentDalService.getAllCommentsList().subscribe((commentList) => {
//       expect(commentList.length).toBeGreaterThanOrEqual(0);
//     });
//   });

//   it('should get getCommentByAssessmentIdAndItemId method', () => {
//     commentDalService.getCommentByAssessmentIdAndItemId(1, 1, '').subscribe((commentByAssessmentId) => {
//       expect(commentByAssessmentId.length).toBeGreaterThanOrEqual(0);
//     });
//   });

// });
