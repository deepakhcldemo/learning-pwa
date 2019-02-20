import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MediaTabStatus } from 'src/app/models/media.model';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private _tabIndexFirstLevelStatus: Subject<boolean> = new Subject();
  private _tabIndexSecondLevelStatus: Subject<boolean> = new Subject();
  private _tabIndexThirdLevelStatus: Subject<boolean> = new Subject();
  private _avatarTabindexStatus: Subject<boolean> = new Subject();
  private _mediaTabIndexStatus: Subject<MediaTabStatus> = new Subject();

  constructor() { }
  /**
   * Get the first level of page layer status
   */
  getTabIndexFirstLevelStatus() {
    return this._tabIndexFirstLevelStatus;
  }

  /**
   * Get the second level of page layer status
   */
  getTabIndexSecondLevelStatus() {
    return this._tabIndexSecondLevelStatus;
  }

  /**
   * Get the third level of page layer status
   */
  getTabIndexThirdLevelStatus() {
    return this._tabIndexThirdLevelStatus;
  }

  /**
   * Set the tabindex status for page layer
   * @param firstLevel set as boolean to enable and disable of tabindex status for first layer
   * @param secondLevel set as boolean to enable and disable of tabindex status for second layer
   * @param thirdLevel set as boolean to enable and disable of tabindex status for third layer
   */
  setTabIndexLevelStatus(firstLevel: boolean, secondLevel: boolean, thirdLevel: boolean) {
    this._tabIndexFirstLevelStatus.next(firstLevel);
    this._tabIndexSecondLevelStatus.next(secondLevel);
    this._tabIndexThirdLevelStatus.next(thirdLevel);
  }
  /**
   * Method to set tabindex level for media popup
   * @param mediaLevel tabIndex status for media popup, accepts boolean input
   */
  setMediaPopUpTabIndexStatus(mediaLevel: boolean, parentLevel: number) {
    this._mediaTabIndexStatus.next({ 'currentLevel': mediaLevel, 'parentLevel': parentLevel } as MediaTabStatus);
  }
  /**
  * Method to get tabindex level for media popup
  */
  getMediaPopUpTabIndexStatus() {
    return this._mediaTabIndexStatus;
  }
  /**
   * Set the tabindex status for avatar
   * @param avatarLevel set as boolean to enable and disable of tabindex status for avatar
   */
  setAvatarTabIndexStatus(avatarLevel: boolean) {
    this._avatarTabindexStatus.next(avatarLevel);
  }

  /**
   * Get avatar tab index status
   */
  getAvatarTabIndexStatus() {
    return this._avatarTabindexStatus;
  }

  /**
   * Method used to set focus on starting element of page (for cyclic tabbing)
   * @param elementName1, elementName2 : name of element where focus should go.
   */
  selectFocus(elementName1, elementName2?) {
    if (!elementName1) {
      return false;
    }
    let elementName = elementName1;
    if (elementName2) {
      if (screen.width <= 768) {
        elementName = elementName2;
      }
    }

    const element = document.getElementById(elementName);
    if (element) {
      element.focus();
    }
  }

}
