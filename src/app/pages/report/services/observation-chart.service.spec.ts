// import { TestBed, inject } from '@angular/core/testing';

// import { ObservationChartService } from './observation-chart.service';
// import { AngularFirestoreModule, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
// import { environment } from 'src/environments/environment';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { HttpClientModule } from '@angular/common/http';
// import { IndexedDbService } from 'src/app/shared/services/indexed.db.service';
// import { UserService } from 'src/app/auth/user.service';

// describe('ObservationChartService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         AngularFirestoreModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFirestoreModule,
//         AngularFireDatabaseModule,
//         HttpClientModule
//       ],
//       providers: [
//         ObservationChartService,
//         UserService,
//         IndexedDbService,

//       ]
//     });
//   });

//   it('should be created', inject([ObservationChartService], (service: ObservationChartService) => {
//     expect(service).toBeTruthy();
//   }));

//   it('should have called getobservedAssementItems method', async () => {
//     let service: ObservationChartService;
//     service = TestBed.get(ObservationChartService);
//     service.getobservedAssementItems();
//   });

//   it('should have called getObservationData method', async () => {
//     let service: ObservationChartService;
//     service = TestBed.get(ObservationChartService);
//     const spy = spyOn(service, 'getObservationData');
//     service.getObservationData();
//     expect(spy).toHaveBeenCalled();
//   });
//   it('should have called ngOnInit method', async () => {
//     let service: ObservationChartService;
//     service = TestBed.get(ObservationChartService);
//     service.ngOnInit();
//   });
// });
