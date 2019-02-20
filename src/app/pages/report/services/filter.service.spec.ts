// import { TestBed, inject } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// import { FilterService } from './filter.service';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../../environments/environment';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { HttpClientModule } from '@angular/common/http';
// import { IndexedDbService } from '../../../shared/services/indexed.db.service';
// import { AssessmentService } from '../../../shared/services/assessment.service';
// import { FirebaseDbService } from '../../../shared/services/firebase.db.service';
// import { Subject, of } from 'rxjs';
// import { TelemetryService } from '../../../shared/services/telemetry.service';
// import { UserService } from 'src/app/auth/user.service';

// describe('FilterService', () => {
//     let service: FilterService;
//     const onViewOptionsSelected = new Subject<any>();
//     const onWhenOptionsSelected = new Subject<any>();

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule,
//                 HttpClientModule],
//             providers: [FilterService,
//                 UserService,
//                 IndexedDbService,
//                 AssessmentService,
//                 FirebaseDbService,
//                 TelemetryService

//             ],
//             schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
//         });
//     });
//     beforeEach(() => {
//         service = TestBed.get(FilterService);
//     });

//     it('should be created', () => {
//         expect(service).toBeTruthy();
//     });

//     it('should have a service instance', () => {
//         expect(service).toBeDefined();
//     });

//     it('should have called setViewOptionsSelected method', () => {
//         const viewOption = {
//             key: 'ongoing',
//             value: 'Ongoing Assesments'
//         };
//         service.setViewOptionsSelected(viewOption);
//         onViewOptionsSelected.next(viewOption);
//         expect(service.getViewOptionsSelected()).not.toBeNull();
//     });
//     it('should have called setWhenOptionsSelected method', () => {
//         const viewOption = {
//             key: '7',
//             value: 'Last 7 days'
//         };
//         service.setWhenOptionsSelected(viewOption);
//         onWhenOptionsSelected.next(viewOption);
//         expect(service.getWhenOptionsSelected()).not.toBeNull();

//     });
//     it('should have called setSortByOptionsSelected method', () => {
//         const viewOption = {
//             key: 'observations',
//             value: 'Observations'
//         };
//         service.setSortByOptionsSelected(viewOption);
//         expect(service.getSortByOptionsSelected()).not.toBeNull();
//     });

//     it('should have called getViewOptionsSelected method', () => {
//         expect(service.getViewOptionsSelected()).not.toBeNull();
//     });
//     it('should have called getWhenOptionsSelected method', () => {
//         expect(service.getWhenOptionsSelected()).not.toBeNull();
//     });
//     it('should have called getSortByOptionsSelected method', () => {
//         expect(service.getSortByOptionsSelected()).not.toBeNull();
//     });
//     it('should have called getAllStudentListOnChange method', () => {
//         expect(service.getAllStudentListOnChange()).not.toBeNull();
//     });
//     it('should have called getAllCommentedDataOnChange method', () => {
//         expect(service.getAllCommentedDataOnChange()).not.toBeNull();
//     });
//     it('should have called getupdatedDataSelection method', () => {
//         expect(service.getupdatedDataSelection()).not.toBeNull();
//     });

// });
