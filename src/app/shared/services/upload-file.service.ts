// Core imports
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
// Service imports
import { CustomErrorHandlerService } from './custom.errorhandler.service';
import { UserService } from 'src/app/auth/user.service';
import { LoggerService } from '../logger.service';
import { MediaDalService } from './cache-datalayer/media-dal.service';
import { RealTimeMediaDalService } from './realtime-datalayer/realtime-media-dal.service';
// Model imports
import { MediaMetaData } from '../../models/media.model';
// Constants import
import { FileConstants } from 'src/app/shared/constants/file-constants';
@Injectable()
export class UploadFileService {

  // Private variables
  private _basePath: string = FileConstants.constants.firebaseStoragePath;

  // Public variables
  public showLoaderImg = false;

  constructor(
    private userService: UserService,
    private errorHandler: CustomErrorHandlerService,
    private mediaDalService: MediaDalService,
    private realTimeMediaDalService: RealTimeMediaDalService
  ) { }

  /**
   * Method to handle file upload to firebase bucket.
   * @param fileUpload selected image data as object
   * @param progress progress of upload in firebase
   * @param student data from assessment-checklist component to check for studentId
   * @param mediaType uploading media file type
   */
  public uploadFileMetaDataToStorage(imageName: string, localMediaData: MediaMetaData, callback?: Function): void {
    const storageRef = this.realTimeMediaDalService.getStorageReference();
    let id = '';
    storageRef.child(this.getBucketUrl(imageName as string))
      .putString(localMediaData.encodedPath, 'data_url').then((snapshot: firebase.storage.UploadTaskSnapshot) => {
        snapshot.ref.getDownloadURL().then((mediaFirebaseBucketOnlineURL: string) => {
          const firebaseDBMediaData =
            this.createFirebaseDBMedia(localMediaData as MediaMetaData, mediaFirebaseBucketOnlineURL as string, id as string);
          this.checkForOnlineandOfflineMode(id as string, firebaseDBMediaData as MediaMetaData, localMediaData as MediaMetaData,
            (getMediaId: string) => {
              id = getMediaId;
              callback(id);
            });
        }, err => {
        });
      }, (err: Error) => {
        this.createRecordInOfflineMode(localMediaData as MediaMetaData, id as string);
        LoggerService.error(err['message'] as string, err as Object);
      });
  }
  private checkForOnlineandOfflineMode(id: string, firebaseDBMediaData: MediaMetaData, localMediaData: MediaMetaData,
    callbackForId: Function) {
    if (navigator.onLine) {
      this.createdMediaRecordInOnlineDB(firebaseDBMediaData as MediaMetaData, localMediaData as MediaMetaData,
        (mediaId: string) => {
          id = mediaId;
          if (callbackForId) {
            callbackForId(mediaId);
          }
          // this.spinner.hide();
        });
    } else {
      // offline
      // this.spinner.hide();
    }
  }
  private createFirebaseDBMedia(localMediaData: MediaMetaData, mediaFirebaseBucketOnlineURL: string, id: string): MediaMetaData {
    return Object.assign({}, new MediaMetaData(
      localMediaData.mediaId ? localMediaData.mediaId : id,
      localMediaData.mediakind,
      localMediaData.classid,
      localMediaData.mediaDescription ? localMediaData.mediaDescription : '',
      localMediaData.caption ? localMediaData.caption : FileConstants.constants.untitled,
      mediaFirebaseBucketOnlineURL ? mediaFirebaseBucketOnlineURL : '',
      '',
      this.userService.getCurrentUser().identityId,
      localMediaData.students ? localMediaData.students : []
    ));
  }

  /**
   * Storing media data in firebase, generating its id for new media,
   * for local media update its path in firebase
   * @param id media id to sotre in database
   * @param firebaseDBMediaData media object to store in Firebase
   * @param indexDBMediaData media object to store in IndexDB
   */
  private createdMediaRecordInOnlineDB(firebaseDBMediaData: MediaMetaData,
    indexDBMediaData: MediaMetaData, callback: Function): void {
    let tableId = indexDBMediaData.mediaId;
    if (indexDBMediaData.mediaId === '' || indexDBMediaData.mediaId === undefined) {
      tableId = this.realTimeMediaDalService.generateFireBaseId();
      firebaseDBMediaData['id'] = tableId;
      indexDBMediaData['id'] = tableId;
      firebaseDBMediaData['mediaId'] = tableId;
      indexDBMediaData['mediaId'] = tableId;
      this.saveMediaInLocalDBForOfflineMode(indexDBMediaData as MediaMetaData);
      if (this.userService.getCurrentUser().identityId as string) {
        this.realTimeMediaDalService.createUpdateMediaRecord(tableId as string, firebaseDBMediaData as MediaMetaData);
      }
    } else {
      this.realTimeMediaDalService.createUpdateMediaRecord(tableId as string, firebaseDBMediaData as MediaMetaData);
    }
    callback(tableId as string);
  }

  /**
   * Storing Media metadata in locally in IndexedDB
   * @param localData is the Local Media Metadata to store in IndexedDB
   */
  public saveMediaInLocalDBForOfflineMode(localData: MediaMetaData): void {
    try {
      this.mediaDalService.saveMediaInOffline(localData as MediaMetaData);
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Gets bucket url
   * @param fileName {string}
   * @returns bucket url
   */
  private getBucketUrl(fileName: string): string {
    let imageName = fileName ? fileName : FileConstants.constants.untitled;
    imageName = imageName + new Date();
    imageName = imageName.toString();
    imageName = imageName.split('(')[0];

    return `${this._basePath}/${imageName}`;
  }

  /**
   * Creates record in offline mode
   * @param localMediaData
   * @param id
   */
  private createRecordInOfflineMode(localMediaData: MediaMetaData, id: string): void {
    const firebaseDBMediaData: MediaMetaData = {
      createdat: this.getCurrentDate(),
      updatedat: this.getCurrentDate(),
      mediaId: localMediaData.mediaId,
      path: '',
      mediakind: localMediaData.mediakind,
      students: localMediaData.students,
      classid: localMediaData.classid,
      mediaDescription: '',
      caption: FileConstants.constants.untitled,
      teacherId: this.userService.getCurrentUser().identityId
    };

    this.createdMediaRecordInOnlineDB(
      firebaseDBMediaData as MediaMetaData,
      localMediaData as MediaMetaData,
      (mediaId: string) => {
        id = mediaId;
        // // this.spinner.hide();
      });
    const error = {
      message: 'Seems you are offline.\nUploaded Media is saved in your local.'
    };
    this.errorHandler.handleError(error);
  }

  /**
   * Gets current date
   * @returns  Object with seconds and nanoseconds of current date
   */
  private getCurrentDate() {
    return {
      seconds: new Date().getTime() / FileConstants.constants.secondsCount,
      nanoseconds: new Date().getTime() / FileConstants.constants.nanoSecondsCount
    };
  }
}
