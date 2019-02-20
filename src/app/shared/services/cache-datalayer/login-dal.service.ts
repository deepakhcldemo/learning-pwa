import { Injectable } from '@angular/core';
import { IndexedDbService } from '../indexed.db.service';
import { FileConstants } from '../../constants/file-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginDalService {

  constructor(private indexedDbService: IndexedDbService, ) { }
  /**
   * clear logged in data.
   */
  clearLoggedInData() {
    return this.indexedDbService.clear();
  }

  /**
   * Create logged in data.
   */
  createLoggedInData() {
    return this.indexedDbService.create(this.indexedDbService.dbSchema());
  }

  /**
   * Update logged in user data.
   * @param loggedinUserData loggedin userdata tobe updated.
   */
  updateLoggedInUserDetails(loggedinUserData) {
    return this.indexedDbService.put(FileConstants.constants.login, loggedinUserData);
  }

  /**
   * Get logged in user data
   * @param callback callback reference
   */
  getLoggedInUserDetail(callback) {
    this.indexedDbService.getAll(FileConstants.constants.login, (loggedinUserData) => {
      callback(loggedinUserData);
    });
  }
}
