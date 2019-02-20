// import { TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { FirebaseDbService } from './firebase.db.service';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { environment } from 'src/environments/environment';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { IndexedDbService } from './indexed.db.service';
// import { HttpClientModule } from '@angular/common/http';
// import { UserService } from 'src/app/auth/user.service';

// describe('FirebaseDbService', () => {
//     let service: FirebaseDbService;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [ RouterTestingModule,
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFireDatabaseModule,
//                 HttpClientModule
//             ],
//                providers: [
//                         IndexedDbService,
//                         FirebaseDbService,
//                         UserService
//                     ],
//             schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
//         });
//     });
//     beforeEach(() => {
//         service = TestBed.get(FirebaseDbService);
//     });

//     it('should create the instance of firebase database service', () => {
//         expect(service).toBeTruthy();
//     });

//     it('should call the getRandomInt method', () => {
//         service._getRandomInt(0, 0);
//         expect(service).toBeTruthy();
//     });

//     it('should call the IDGenerator method', () => {
//         service.IDGenerator();
//         expect(service).toBeTruthy();
//     });

//     it('should have called init firebase database', () => {
//         const initDBSpy = spyOn(service, 'initUserCollectionInFirebase').and.returnValue({
//             success: true
//         });
//         service.initUserCollectionInFirebase();
//         expect(initDBSpy).toHaveBeenCalled();
//     });

// });
