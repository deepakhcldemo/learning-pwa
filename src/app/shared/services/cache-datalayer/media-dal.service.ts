// Core Imports
import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
// Service Imports
import { IndexedDbService } from '../indexed.db.service';
import { UserService } from 'src/app/auth/user.service';
// Model Imports
import { MediaMetaData } from 'src/app/models/media.model';
// File Constant Import
import { FileConstants } from '../../constants/file-constants';

@Injectable({
  providedIn: 'root'
})
export class MediaDalService {
  private _allMedia: Subject<Array<MediaMetaData>> = new Subject();
  private _putSubscription$: Subscription;
  constructor(
    private indexedDbService: IndexedDbService,
    private userService: UserService
  ) { }

  /**
   * Gets all media
   * @returns all media
   */
  public getAllMedia(): Observable<Array<MediaMetaData>> {
    this.setAllMedia();
    return this._allMedia.asObservable();
  }

  /**
   * Sets all media
   */
  private setAllMedia(): void {
    this.indexedDbService.getAll(
      FileConstants.constants.media as string,
      (result: Array<MediaMetaData>) => {
        this._allMedia.next(result as Array<MediaMetaData>);
      },
      `${FileConstants.constants.persistentDBName}_${this.userService.getCurrentUser().identityId}` as string
    );
  }

  /**
   * Deletes media
   * @param mediaId to be deleted
   */
  public deleteMedia(mediaId: string): void {
    this.indexedDbService.getAll(FileConstants.constants.media as string, (response: Array<MediaMetaData>) => {
      response.forEach((mediaObj: MediaMetaData) => {
        if (mediaObj.mediaId === mediaId) {
          this.indexedDbService.remove(FileConstants.constants.media as string, mediaObj.mediaId as string,
            `${FileConstants.constants.persistentDBName}_${this.userService.getCurrentUser().identityId}` as string
          ).subscribe();
        }
      });
    }, FileConstants.constants.persistentDBName + '_' + this.userService.getCurrentUser().identityId as string);
  }

  /**
   * Saves media in offline
   * @param localData to be saved in Local IndexedDB
   */
  public saveMediaInOffline(localData: MediaMetaData): void {
    this.destroySubscription();
    this._putSubscription$ = this.indexedDbService.put(FileConstants.constants.media as string, localData as MediaMetaData,
      `${FileConstants.constants.persistentDBName}_${this.userService.getCurrentUser().identityId}` as string).subscribe(res => {
      }, err => {
      });
  }

  /**
   * Destroys subscription
   */
  private destroySubscription(): void {
    if (this._putSubscription$) {
      this._putSubscription$.unsubscribe();
    }
  }
}
