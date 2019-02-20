// Core imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Service imports
import { UploadFileService } from './upload-file.service';
import { UserService } from 'src/app/auth/user.service';
import { CustomErrorHandlerService } from './custom.errorhandler.service';
import { MediaDalService } from './cache-datalayer/media-dal.service';
// Model imports
import { MediaMetaData } from '../../models/media.model';
import { TeacherClassModel } from 'src/app/models/class.model';
// Constants import
import { ErrorMessageConstants } from '../constants/error-message-constants';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { AssessmentComment } from 'src/app/models/assessment-detail.model';
import { RealTimeMediaDalService } from './realtime-datalayer/realtime-media-dal.service';
@Injectable()
export class MediaService {
    private _medias: Array<MediaMetaData> = [];
    constructor(
        private userService: UserService,
        private uploadService: UploadFileService,
        private errorHandler: CustomErrorHandlerService,
        private mediaDalService: MediaDalService,
        private realTimeMediaDalService: RealTimeMediaDalService
    ) {
    }

    /**
     * This function is used to set all the media list.
     *
     * @param allMedia
     */
    public setAllMedia(allMedia: Array<MediaMetaData>): void {
        this._medias = allMedia;
    }

    /**
     * Get all the media list
     */
    public getAllMedia(): Array<MediaMetaData> {
        return this._medias;
    }

    /* This function is used to get the media data by media id.
    *
    * @param dbRef
    * @param mediaId mediaID
    */
    public getMediaById(mediaID: string): MediaMetaData {
        let mediaMetaData: MediaMetaData;
        const medias: Array<MediaMetaData> = this.getAllMedia();
        if (medias) {
            medias.forEach((media) => {
                if (media.mediaId === mediaID) {
                    mediaMetaData = media;
                }
            });
        }
        return mediaMetaData;
    }
    /**
     * Method is checking that availability of media in indexedDB and firebase storage
     * so that it can set the status of that media.
     * @param localMedia media from IndexDB
     * @param onlineMedia media from Firebase
     */
    public setStatus(
        localMedia: Array<MediaMetaData>,
        onlineMedia: Array<MediaMetaData>): Array<MediaMetaData> {
        onlineMedia.forEach((realtimeMedia) => {
            if (!this.findMediaInLocal(realtimeMedia as MediaMetaData, localMedia as Array<MediaMetaData>)) {
                if (realtimeMedia['path'] !== '') {
                    realtimeMedia['status'] = FileConstants.constants.toSync;
                } else if (realtimeMedia['path'] === '') {
                    realtimeMedia['status'] = FileConstants.constants.syncError;
                    realtimeMedia['path'] = '../../../assets/images/no-image.png';
                }
            }
        });
        onlineMedia = this.notSyncedMedia(onlineMedia as Array<MediaMetaData>, localMedia as Array<MediaMetaData>);
        return onlineMedia;
    }
    /**
     * Finds media in local
     * @param realtimeMedia media from Online Database
     * @param localMedia Local storage media
     * @returns true if media in local
     */
    private findMediaInLocal(realtimeMedia: MediaMetaData, localMedia: Array<MediaMetaData>): boolean {
        let isFound = false;
        localMedia.forEach((cacheMedia: MediaMetaData) => {
            if (realtimeMedia.mediaId === cacheMedia.mediaId) {
                if (realtimeMedia.path !== '') {
                    cacheMedia['isFound'] = true;
                    realtimeMedia['status'] = FileConstants.constants.synced;
                    realtimeMedia.path = cacheMedia.encodedPath;
                    if (!navigator.onLine) {
                        realtimeMedia.path = cacheMedia.encodedPath;
                    }
                } else {
                    cacheMedia['isFound'] = true;
                    realtimeMedia['status'] = FileConstants.constants.notSynced;
                    realtimeMedia.path = cacheMedia.encodedPath;
                }
                isFound = true;
            }
        });
        return isFound;
    }

    /**
     * Nots synced media
     * @param onlineMedia
     * @param localMedia
     * @returns all media with all status
     */
    private notSyncedMedia(onlineMedia: Array<MediaMetaData>, localMedia: Array<MediaMetaData>): Array<MediaMetaData> {
        localMedia.forEach((media: MediaMetaData) => {
            if (media.isFound === undefined) {
                media['status'] = FileConstants.constants.notSynced;
                onlineMedia.push(media);
            }
        });
        return onlineMedia;
    }
    /**
     * This function is used to get four most recent media.
     * @param classid class id for which media list is requested
     */
    public getRecentMediaList(classid: string): Observable<Array<MediaMetaData>> {
        return this.realTimeMediaDalService.getRecentMediaList(classid as string);
    }

    /**
     * deletes selected media from firebase and IndexDB based on its ID.
     * @param mediaIds arrays are the selected media Id.
     */
    public deleteMedia(mediaIds: Array<string>): void {
        this.realTimeMediaDalService.deleteMedia(mediaIds as Array<string>);
    }

    /**
     * This function is used to get all media by class id
     *
     * @param classId class id
     */
    public getMediaByClassId(classId: string): Observable<Array<MediaMetaData>> {
        return this.realTimeMediaDalService.getMediaByClassId(classId as string);
    }

    /**
     * This function is used to get media by media and student id.
     * @param mediaId media id string
     * @param studentId student id
     */
    public getMediaByStudentAndMediaId(mediaId: string, studentId: string): Observable<Array<MediaMetaData>> {
        return this.realTimeMediaDalService.getMediaByStudentAndMediaId(mediaId as string, studentId as string);
    }

    /**
     * This function is used to tagged a new student inside media.
     *
     * @param media media detail object
     * @param studentId of the student that should be tagged
     */
    public tagStudentInMedia(media: MediaMetaData, studentId: string): Promise<void> {
        return this.realTimeMediaDalService.tagStudentInMedia(media as MediaMetaData, studentId as string);
    }

    /**
    * Get Media list for student
    * @param studentId student id for which media details required
    *
    */
    public getStudentMedia(studentId: string, currentClassId: string): Observable<Array<MediaMetaData>> {
        return this.realTimeMediaDalService.getStudentMedia(studentId as string, currentClassId as string);
    }

    /**
     * Process uploaded media
     * @param file
     * @param currentSelectedClass
     */
    public processUploadedMedia(file: FileReader,
        currentSelectedClass: TeacherClassModel, assessmentCommentCallback?: Function): void {
        try {
            let receivedMediaId = '';
            const targetedFile = file['target'].files;
            if (targetedFile && targetedFile[0]) {
                if (targetedFile[0].type.split('/')[0] === FileConstants.constants.image
                    || targetedFile[0].type.split('/')[0] === FileConstants.constants.video) {
                    const reader = new FileReader();
                    reader.onload = (innerEvent: Event) => {
                        const localMedia = Object.assign({}, new MediaMetaData('',
                            targetedFile[0].type.split('/')[0], currentSelectedClass.classId,
                            '', FileConstants.constants.untitled, '', innerEvent.target['result'],
                            this.userService.getCurrentUser().identityId
                            , []));
                        this.uploadService.uploadFileMetaDataToStorage(
                            targetedFile[0].name as string,
                            localMedia as MediaMetaData,
                            (mediaId: string) => {
                                receivedMediaId = mediaId;
                                if (assessmentCommentCallback) {
                                    assessmentCommentCallback(receivedMediaId);
                                }
                            });
                    };
                    reader.readAsDataURL(targetedFile[0] as Blob);
                } else {
                    const error = {
                        'message': ErrorMessageConstants.errorMessages.uploadMediaFiles
                    };
                    this.errorHandler.handleError(error);
                    throw error;
                }
            }
        } catch (error) {
        }
    }

    /**
     * Gets all media from Cache
     * @returns all media from Cache
     */
    public getAllMediaFromCache(): Observable<Array<MediaMetaData>> {
        return this.mediaDalService.getAllMedia();
    }
}
