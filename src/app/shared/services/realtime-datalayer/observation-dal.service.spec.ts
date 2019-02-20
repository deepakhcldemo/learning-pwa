// import { TestBed} from '@angular/core/testing';

// import { ObservationDalService } from './observation-dal.service';
// import { FirebaseDbService } from '../firebase.db.service';
// import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
// import { CustomErrorHandlerService } from '../custom.errorhandler.service';
// import { AlertService } from '../../components/alert/alert.service';
// import { IndexedDbService } from '../indexed.db.service';
// import { HttpClientModule } from '@angular/common/http';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from 'src/environments/environment';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { UserService } from 'src/app/auth/user.service';

// describe('ObservationDalService', () => {
//   let observationDalService: ObservationDalService;
//   let userService: UserService;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [ObservationDalService,
//         FirebaseDbService,
//         AngularFirestore,
//         CustomErrorHandlerService,
//         AlertService,
//         UserService,
//         IndexedDbService],
//         imports: [HttpClientModule,
//           AngularFirestoreModule,
//           AngularFireModule.initializeApp(environment.firebase),
//           AngularFirestoreModule,
//           AngularFireDatabaseModule,
//         ]
//     });
//     observationDalService = TestBed.get(ObservationDalService);
//     userService = TestBed.get(UserService);
//     userService.setUser({ identityId: 'ffffffff54738483e4b001bd4b61aaf0' });
//   });

//   it('should create ObservationDalService', () => {
//     expect(ObservationDalService).toBeTruthy();
//   });

//   it('should have call get observation information function', () => {
//     // observationDalService.getObserveInformation('ffffffff5a7d7439f02ebd1b9347e303').subscribe(observelist => {
//     //     expect(observelist.length).toBeGreaterThanOrEqual(0);
//     // });
//   });

//   it('should get editItemObservation method', () => {
//     userService.setUser({
//       firstName: 'realize1',
//       identityId: 'ffffffff51c87040e4b07dddca2a0511',
//       idpName: 'RUMBA'
//     });
//     observationDalService.editItemObservation('0');
//     expect(observationDalService.editItemObservation).toBeTruthy();
//   });

//   // -> Commented because of real db hit //

//   // it('should get saveItemObservation method', () => {
//   //   userService.setUser({
//   //     firstName: 'realize1',
//   //     identityId: 'ffffffff51c87040e4b07dddca2a0511',
//   //     idpName: 'RUMBA'
//   //   });
//   //   observationDalService.saveItemObservation({});
//   //   expect(observationDalService.saveItemObservation).toBeTruthy();
//   // });

//   // -> Commented because of real db hit //

//   // it('should get saveObservationStatus method', () => {
//   //   ObservationDalService.saveObservationStatus('', '', '', true, true, '');
//   //   expect(ObservationDalService.saveObservationStatus).toBeTruthy();
//   // });

//   it('should get getAssessmentObservations method', () => {
//     userService.setUser({
//       firstName: 'realize1',
//       identityId: 'ffffffff51c87040e4b07dddca2a0511',
//       idpName: 'RUMBA'
//     });
//     // observationDalService.getAssessmentObservations().subscribe((getAssessmentObservations) => {
//     //   expect(getAssessmentObservations.length).toBeGreaterThanOrEqual(0);
//     // });
//   });

//   it('should get getRecentlyObservedAssessmentItem method', () => {
//     observationDalService.getRecentlyObservedAssessmentItem('12').subscribe((recentAssessmentItem) => {
//       expect(recentAssessmentItem.length).toBeGreaterThanOrEqual(0);
//     });
//   });

//   it('should get getAssessmentObservationByStudent method', () => {
//     // observationDalService.getAssessmentObservationByStudent(1, 1, '', 1).subscribe((assessmentObservationByStudent) => {
//     //   expect(assessmentObservationByStudent.length).toBeGreaterThanOrEqual(0);
//     // });
//   });

// });
