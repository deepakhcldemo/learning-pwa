// import { TestBed, inject } from '@angular/core/testing';
// import { MediaService } from './media.service';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { Router, ActivatedRoute } from '@angular/router';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { IndexedDbService } from './indexed.db.service';
// import { UploadFileService } from './upload-file.service';
// import { FirebaseDbService } from './firebase.db.service';
// import { AssessmentService } from './assessment.service';
// import { CustomErrorHandlerService } from './custom.errorhandler.service';
// import { MediaPopupService } from '../components/media-popup/media-popup.service';
// import { MainPageFocusStatusService } from '../mainpage-focus-status.service';
// import { TelemetryService } from './telemetry.service';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import {FileConstants} from 'src/app/shared/constants/file-constants';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../environments/environment';
// import { AlertService } from '../components/alert/alert.service';
// import { UserService } from 'src/app/auth/user.service';
// const fakeActivatedRoute = {
//   snapshot: { data: {} }
// } as ActivatedRoute;

// const mockRouter = {
//   navigate: jasmine.createSpy('navigate')
// };
// describe('MediaService', () => {
//   let mediaService: MediaService;
//   let userService: UserService;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         ReactiveFormsModule,
//         FormsModule,
//         AngularFirestoreModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFireDatabaseModule
//       ],
//       providers: [ MediaService, { provide: Router, useValue: mockRouter },
//         { provide: ActivatedRoute, useValue: fakeActivatedRoute },
//         HttpClient,
//         HttpHandler,
//         HttpClientTestingModule,
//         UserService,
//         IndexedDbService,
//         MediaService,
//         UploadFileService,
//         FirebaseDbService,
//         AssessmentService,
//         CustomErrorHandlerService,
//         UploadFileService,
//         IndexedDbService,
//         MediaPopupService,
//         MainPageFocusStatusService,
//         TelemetryService,
//         AngularFirestoreModule, AlertService]
//     });
//     mediaService = TestBed.get(MediaService);
//     userService = TestBed.get(UserService);
//     userService.setUser({
//       'identityId': 'ffffffff51c87040e4b07dddca2a0511'
//     }
//     );
//   });
//   it('should be created', inject([MediaService], (service: MediaService) => {
//     expect(service).toBeTruthy();
//   }));

//   it('should call getMediaById method in media service', () => {
//     mediaService = TestBed.get(MediaService);
//     mediaService.getMediaById('09664367');
//     expect(mediaService.getMediaById).toBeDefined();
//   });

//   it('should call getMediaById method in media service', () => {
//     mediaService = TestBed.get(MediaService);
//     mediaService.getMediaById(null);
//     expect(mediaService.getMediaById).toBeDefined();
//   });
//   it('should call getAllMedia method in media service', () => {
//     const mediaMockData = {
//       createdat: new Date(),
//       updatedat: new Date(),
//       mediaid: '1',
//       mediakind: FileConstants.constants.image,
//       product: '1',
//       mediaDescription: '',
//       caption: FileConstants.constants.untitled,
//       path: '',
//       encodedPath: '',
//       teacherId: '',
//       students: [],
//       classid: '0'
//     };
//     mediaService = TestBed.get(MediaService);
//     mediaService._mediaList = [mediaMockData];
//     mediaService.getAllMedia();
//     expect(mediaService.getAllMedia).toBeDefined();
//   });

//   // creating data in firebase
//  /*  it('should call setMedia method in media service with optional parameters', () => {
//     const fileData = { 'type': 'image/data' };
//     const base64Data = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
//     const assessmentData = { 'assessmentType': 'checklist' };
//     const setProduct = {
//       name: 'test',
//       productID: '336566'
//     };
//     mediaService = TestBed.get(MediaService);
//     mediaService.setMedia(fileData, base64Data, assessmentData);
//     expect(mediaService.setMedia).toBeDefined();
//   }); */

//   it('should call getRecentMediaList method in media service', () => {
//     const fileData = {};
//     const mediaType = 'image';
//     const assessmentData = { 'assessmentType': 'checklist' };
//     mediaService = TestBed.get(MediaService);
//     mediaService.getRecentMediaList().subscribe((data) => { });
//     expect(mediaService.getRecentMediaList).toBeDefined();
//   });

//   // deleting data in firebase
//   it('should success for delete media service', () => {
//     mediaService = TestBed.get(MediaService);
//     const mediaList = [];
//     mediaService.deleteMedia(['0']);
//     expect(mediaService.deleteMedia).toBeDefined();
//   });
//   it('should error for delete media service', () => {
//     const mediaList = [];
//     mediaService.deleteMedia(['0']);
//     expect(mediaService.deleteMedia).toBeTruthy();
//     mediaService = TestBed.get(MediaService);
//     const spy = spyOn(mediaService, 'deleteMedia');
//     mediaService.deleteMedia(['0']);
//     expect(mediaService.deleteMedia(['0']));
//     expect(spy).toBeDefined();
//   });
//   it('should success for getMediaByClassId media service', () => {
//     mediaService.getMediaByClassId(['09664367']);
//     expect(mediaService.deleteMedia).toBeTruthy();
//     mediaService = TestBed.get(MediaService);
//     const spy = spyOn(mediaService, 'getMediaByClassId');
//     mediaService.getMediaByClassId(['09664367']);
//     expect(mediaService.getMediaByClassId(['09664367']));
//     expect(spy).toBeDefined();
//   });

//   it('should success for getMediaByProductId media service', () => {
//     mediaService.getMediaByProductId(['09664367']);
//     expect(mediaService.deleteMedia).toBeTruthy();
//     mediaService = TestBed.get(MediaService);
//     const spy = spyOn(mediaService, 'getMediaByProductId');
//     mediaService.getMediaByProductId(['09664367']);
//     expect(mediaService.getMediaByProductId(['09664367']));
//     expect(spy).toBeDefined();
//   });

//   it('should call setStatus in media service', () => {
//     const localData = {
//       createdat: new Date(),
//       updatedat: new Date(),
//       mediaid: '1',
//       mediakind: FileConstants.constants.image,
//       product: '1',
//       mediaDescription: '',
//       caption: FileConstants.constants.untitled,
//       path: '',
//       encodedPath: '',
//       teacherId: ''

//     };
//     const mediaMockData = {
//       createdat: new Date(),
//       updatedat: new Date(),
//       mediaid: '1',
//       mediakind: FileConstants.constants.image,
//       product: '1',
//       mediaDescription: '',
//       caption: FileConstants.constants.untitled,
//       path: '',
//       encodedPath: '',
//       teacherId: '',
//       students: []
//     };
//     mediaService.setStatus([localData, localData], [mediaMockData]);
//     expect(mediaService.setStatus).toBeTruthy();
//     mediaService = TestBed.get(MediaService);
//     const spy = spyOn(mediaService, 'setStatus');
//     expect(spy).toBeDefined();
//   });

//   it('should call setStatus in for else media service', () => {
//     const localData = {
//       createdat: new Date(),
//       updatedat: new Date(),
//       mediaid: '1',
//       mediakind: FileConstants.constants.image,
//       product: '1',
//       mediaDescription: '',
//       caption: FileConstants.constants.untitled,
//       path: '',
//       encodedPath: '',
//       teacherId: ''

//     };
//     const mediaMockData = {
//       createdat: new Date(),
//       updatedat: new Date(),
//       mediaid: '1',
//       mediakind: FileConstants.constants.image,
//       product: '1',
//       mediaDescription: '',
//       caption: FileConstants.constants.untitled,
//       path: '',
//       encodedPath: '',
//       teacherId: '',
//       students: []
//     };
//     const isFound = true;

//     mediaService.setStatus([localData, localData], [mediaMockData]);
//     expect(mediaService.setStatus).toBeTruthy();
//     mediaService = TestBed.get(MediaService);
//     const spy = spyOn(mediaService, 'setStatus');
//     expect(spy).toBeDefined();
//   });

//   // it('should success for index db service', () => {
//   //   const indexdb = TestBed.get(IndexedDbService);
//   //   indexdb.getAll(FileConstants.constants.media).subscribe(success => { });
//   //   expect(indexdb.getAll).toBeDefined();
//   // });

//   it('should success for getMediaList media service', () => {
//     mediaService.getMediaList();
//     expect(mediaService.getMediaList).toBeTruthy();
//     const spy = spyOn(mediaService, 'getMediaList');
//     mediaService.getMediaList();
//     expect(mediaService.getMediaList());
//     expect(spy).toBeDefined();
//   });

//   it('should have get student media', async () => {
//     mediaService.getStudentMedia('ffffffff5a7d7439f02ebd1b9347e303').subscribe(data => {
//         expect(data.length).toBeGreaterThanOrEqual(0);
//     });
// });
// it('should have called onMediaDeleteSuccessCallback media', async () => {
//   const spy = spyOn(mediaService, 'getMediaList');
//   mediaService.onMediaDeleteSuccessCallback('ffffffff5a7d7439f02ebd1b9347e303');
//   expect(spy).toBeDefined();
// });
// it('should have called updateMedia media', () => {
//   const spy = spyOn(mediaService, 'getMediaList');
//   const mediaMockData = {
//     createdat: new Date(),
//     updatedat: new Date(),
//     mediaid: '1',
//     mediakind: FileConstants.constants.image,
//     product: '1',
//     mediaDescription: '',
//     caption: FileConstants.constants.untitled,
//     path: '',
//     encodedPath: '',
//     teacherId: '',
//     students: []
//   };
//   mediaService.updateMedia('id', mediaMockData);
//   expect(spy).toBeDefined();
// });
// it('should have called tagStudentInMedia media', () => {
//   const spy = spyOn(mediaService, 'getMediaList');
//   const mediaMockData = {
//     createdat: new Date(),
//     updatedat: new Date(),
//     mediaid: '1',
//     mediakind: FileConstants.constants.image,
//     product: '1',
//     mediaDescription: '',
//     caption: FileConstants.constants.untitled,
//     path: '',
//     encodedPath: '',
//     teacherId: '',
//     students: [],
//     classid: '0'
//   };
//   mediaService.tagStudentInMedia(mediaMockData , 'id');
//   expect(spy).toBeDefined();
// });
// });
