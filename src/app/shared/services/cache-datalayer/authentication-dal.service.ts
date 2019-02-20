import { Injectable } from '@angular/core';
import { IndexedDbService } from '../indexed.db.service';
import { FileConstants } from '../../constants/file-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationDalService {

  constructor(private indexedDbService: IndexedDbService) { }

  /**
   * Get logged in user data
   * @param callback callback reference
   */
  getLoggedInUserDetail(callback) {
    this.indexedDbService.getAll(FileConstants.constants.login, (loggedinUserData) => {
      callback(loggedinUserData);
    });
  }

  /**
   * Update logged in user data.
   * @param loggedinUserData loggedin userdata tobe updated.
   */
  updateLoggedInUserDetails(loggedinUserData) {
    return this.indexedDbService.put(FileConstants.constants.login, loggedinUserData);
  }
}
