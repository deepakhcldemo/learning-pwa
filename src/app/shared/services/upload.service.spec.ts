// import { TestBed, inject } from '@angular/core/testing';
// import { UploadFileService } from './upload-file.service';
// import { CustomErrorHandlerService } from './custom.errorhandler.service';
// import { MediaService } from './media.service';
// import { TelemetryService } from './telemetry.service';
// import { FirebaseDbService } from './firebase.db.service';
// import { AssessmentService } from './assessment.service';
// import { IndexedDbService } from './indexed.db.service';
// import { MediaPopupService } from '../components/media-popup/media-popup.service';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import {FileConstants} from 'src/app/shared/constants/file-constants';
// import { environment } from '../../../environments/environment';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { AlertService } from '../components/alert/alert.service';
// import { MediaMetaData, MediaMetaData } from 'src/app/models/media.model';
// import { of } from 'rxjs';
// import { UserService } from 'src/app/auth/user.service';

// describe('UploadService', () => {
//   const mediaData: MediaMetaData = {
//     createdat: new Date(),
//     updatedat: new Date(),
//     mediaid: '1',
//     mediakind: FileConstants.constants.image,
//     product: '1',
//     mediaDescription: '',
//     caption: FileConstants.constants.untitled,
//     path: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
//     teacherId: '',
//     students: [],
//     classid: '0'
//   };

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [UploadFileService,
//         UserService,
//         IndexedDbService,
//         MediaPopupService,
//         AssessmentService,
//         FirebaseDbService,
//         TelemetryService,
//         MediaService,
//         CustomErrorHandlerService,
//         AlertService],
//       imports: [
//         AngularFirestoreModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFirestoreModule,
//         AngularFireDatabaseModule,
//         HttpClientModule,
//         FormsModule
//       ]
//     });
//   });

//   it('should be created', inject([UploadFileService], (service: UploadFileService) => {
//     expect(service).toBeTruthy();
//   }));

//   /* it('should call saveFileToFireStore', () => {
//     const mediaMock = mediaData;
//     const fileData = { 'type': 'image/data' };
//     const mediaType = 'Image';
//     const base64Data = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
//     uploadService = TestBed.get(UploadFileService);
//     uploadService.saveFileToFireStore(fileData, mediaData, mediaType);
//     expect(uploadService.saveFileToFireStore).toBeDefined();
//   });

//   it('should check saveMediaInLocalDBForOfflineMode in UploadService ', () => {
//     uploadService = TestBed.get(UploadFileService);
//     const localData = {
//         createdat: new Date(),
//         updatedat: new Date(),
//         mediaid: '1',
//         mediakind: FileConstants.constants.image,
//         product: '1',
//         mediaDescription: '',
//         caption: FileConstants.constants.untitled,
//         path: '',
//         encodedPath: '',
//         teacherId: ''

//     };
//     const IDBSpy = spyOn(uploadService, 'saveMediaInLocalDBForOfflineMode').and.returnValue(of({

//         createdat: new Date(),
//         updatedat: new Date(),
//         mediaid: '1',
//         mediakind: FileConstants.constants.image,
//         product: '1',
//         mediaDescription: '',
//         caption: FileConstants.constants.untitled,
//         path: '',
//         encodedPath: '',
//         teacherId: ''

//     }));
//     uploadService.saveMediaInLocalDBForOfflineMode(localData);
//     expect(IDBSpy).toBeTruthy();
// });
//  it('should call uploadFileMetaDataToStorage method with students condition', () => {
//         const file = { target: { files: { name: 'new file', type: 'image' } } };
//         uploadService = TestBed.get(UploadFileService);
//         const mediaListSpy = spyOn(uploadService, 'uploadFileMetaDataToStorage').and.returnValue(of({
//             mediaList: [],
//             mediaUndefined: undefined
//         }));
//         uploadService.uploadFileMetaDataToStorage(file,  mediaData, 'image');
//         mediaData['student'] = ['1'];
//         expect(mediaListSpy).toHaveBeenCalled();
//     }); */
// });
