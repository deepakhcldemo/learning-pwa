// import { TestBed, inject } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { LoggerService } from './logger.service';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { environment } from 'src/environments/environment';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { HttpClientModule } from '@angular/common/http';
// import { IndexedDbService } from './services/indexed.db.service';
// import { UserService } from '../auth/user.service';

// describe('LoggerService', () => {
//     let service: LoggerService;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule,
//                 HttpClientModule],
//             providers: [LoggerService,
//                 UserService,
//                 IndexedDbService

//             ],
//             schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
//         });
//     });
//     beforeEach(() => {
//         service = TestBed.get(LoggerService);
//     });

//     it('should be created', () => {
//         expect(service).toBeTruthy();
//     });
//     it('should have called log method created', () => {
//         expect(service).toBeTruthy();
//         LoggerService.log('message');
//     });
//     it('should have called errot method', () => {
//         LoggerService.error('message', {});
//     });
// });
