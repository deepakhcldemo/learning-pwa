// import { TestBed, inject } from '@angular/core/testing';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MediaPopupService } from './media-popup.service';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { environment } from '../../../../environments/environment.prod';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { IndexedDbService } from '../../services/indexed.db.service';
// import { MediaService } from '../../services/media.service';
// import { UploadFileService } from '../../services/upload-file.service';
// import { FirebaseDbService } from '../../services/firebase.db.service';
// import { AssessmentService } from '../../services/assessment.service';
// import { CustomErrorHandlerService } from '../../services/custom.errorhandler.service';
// import { TelemetryService } from '../../services/telemetry.service';
// import { AlertService } from '../alert/alert.service';
// import { MediaMetaData } from 'src/app/models/media.model';
// import { MainPageFocusStatusService } from '../../mainpage-focus-status.service';
// import {FileConstants} from 'src/app/shared/constants/file-constants';
// import { UserService } from 'src/app/auth/user.service';

// const fakeActivatedRoute = {
//     snapshot: { data: {} }
// } as ActivatedRoute;

// const mockRouter = {
//     navigate: jasmine.createSpy('navigate')
// };
// describe('MediaPopupService', () => {
//     let mediaPopupService: MediaPopupService;
//     let userService: UserService;
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 ReactiveFormsModule,
//                 FormsModule,
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFireDatabaseModule
//             ],
//             providers: [MediaPopupService, { provide: Router, useValue: mockRouter },
//                 { provide: ActivatedRoute, useValue: fakeActivatedRoute },
//                 HttpClient,
//                 HttpHandler,
//                 HttpClientTestingModule,
//                 UserService,
//                 IndexedDbService,
//                 MediaService,
//                 UploadFileService,
//                 FirebaseDbService,
//                 AssessmentService,
//                 CustomErrorHandlerService,
//                 UploadFileService,
//                 IndexedDbService,
//                 MediaPopupService,
//                 MainPageFocusStatusService,
//                 TelemetryService,
//                 AngularFirestoreModule, AlertService]
//         });
//         mediaPopupService = TestBed.get(MediaService);
//         userService = TestBed.get(UserService);
//         userService.setUser({
//             'identityId': 'ffffffff51c87040e4b07dddca2a0511'
//         }
//         );
//     });
//     it('should be created', inject([MediaPopupService], (service: MediaPopupService) => {
//         expect(service).toBeTruthy();
//     }));

//     it('should call setMediaPopupState method in media popup service', () => {
//         const state = true;
//         mediaPopupService = TestBed.get(MediaPopupService);
//         mediaPopupService.setMediaPopupState(state);
//         expect(mediaPopupService.setMediaPopupState).toBeDefined();
//     });
//     it('should call getMediaPopupState method in media popup service', () => {
//         mediaPopupService = TestBed.get(MediaPopupService);
//         mediaPopupService.getMediaPopupState();
//         expect(mediaPopupService.getMediaPopupState).toBeDefined();
//     });
//     it('should call setMediaDetails method in media popup service', () => {
//         const mediaMockData: MediaMetaData = {
//             createdat: new Date(),
//             updatedat: new Date(),
//             mediaid: '1',
//             mediakind: FileConstants.constants.image,
//             product: '1',
//             mediaDescription: '',
//             caption: FileConstants.constants.untitled,
//             path: '',
//             teacherId: '',
//             students: [],
//             classid: '0'
//         };
//         mediaPopupService = TestBed.get(MediaPopupService);
//         mediaPopupService.setMediaDetails(mediaMockData);
//         expect(mediaPopupService.setMediaDetails).toBeDefined();
//     });
//     it('should call getMediaDetails method in media popup service', () => {
//         mediaPopupService = TestBed.get(MediaPopupService);
//         mediaPopupService.getMediaDetails();
//         expect(mediaPopupService.getMediaDetails).toBeDefined();
//     });
// });
