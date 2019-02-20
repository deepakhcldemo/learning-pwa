// Core imports
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
// Services Import
import { LoggerService } from '../../logger.service';
import { RealTimeMediaDalService } from '../../services/realtime-datalayer/realtime-media-dal.service';
// Model imports
import { MediaMetaDataWithStudentsList, MediaMetaData, MediaUpdateDetails } from 'src/app/models/media.model';
// File constants import
import { FileConstants } from '../../constants/file-constants';


@Injectable()
export class MediaPopupService {
    private _openMediaPopupState: Subject<boolean> = new Subject();
    private _media: MediaMetaDataWithStudentsList;
    constructor(
        private realTimeMediaDalService: RealTimeMediaDalService
    ) { }
    /**
     * set media popup open/close sate
     * @param mediaPopUpStateFlag open/close status as boolean value
     */
    public setMediaPopupState(mediaPopUpStateFlag: boolean): void {
        this._openMediaPopupState.next(mediaPopUpStateFlag as boolean);
    }

    /**
     * get media popup open/close status
     */
    public getMediaPopupState(): Observable<boolean> {
        return this._openMediaPopupState.asObservable();
    }

    /**
     * set media details
     * @param media media details
     */
    public setMediaDetails(media: MediaMetaDataWithStudentsList, parentView?: string): void {
        media['parent'] = parentView;
        this._media = media;
    }

    /**
     * get media details
     */
    public getMediaDetails(): MediaMetaDataWithStudentsList {
        return this._media;
    }

    /**
     * Opens media popup
     * @param media selected media
     */
    public openMediaPopup(media: MediaMetaDataWithStudentsList| MediaMetaData): void {
        try {
            const _media = {
                media: media,
                students: []
            };
            this.setMediaDetails(_media as MediaMetaDataWithStudentsList, FileConstants.constants.media as string);
            this.setMediaPopupState(true);
        } catch (error) {
            LoggerService.error(error['message'] as string, error as Object);
        }
    }
    /**
     * Updates media details like tagged students, caption and description.
     * @param mediaId [string] id of media to be modified.
     * @param media [MediaUpdateDetails] updateed values of media oject.
     */
    public updateMedia(mediaId: string, media: MediaUpdateDetails): Promise<void> {
        return this.realTimeMediaDalService.updateMediaMetaData(mediaId as string, media as MediaUpdateDetails);
    }
}
