// import { TestBed, inject } from '@angular/core/testing';
// import { GlobalService } from './global.service';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from 'src/environments/environment';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { IndexedDbService } from './shared/services/indexed.db.service';
// import { FirebaseDbService } from './shared/services/firebase.db.service';
// import { UserService } from './auth/user.service';


// describe('GlobalService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [AngularFirestoreModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFirestoreModule,
//         AngularFireDatabaseModule,
//         HttpClientModule],
//         providers: [
//           FirebaseDbService, GlobalService, UserService,
//           IndexedDbService
//       ],
//     });
//   });

//   it('should be created', inject([GlobalService], (service: GlobalService) => {
//     expect(service).toBeTruthy();
//   }));
// });
