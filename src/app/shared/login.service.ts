
import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { FileConstants } from './constants/file-constants';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _hashedPassword = '';
  constructor() { }
  /**
   * comparsion with hashed password
   * @param LogginedUserPassword : password from logged in user
   * @param HasshedPassword : hasshed password
   */
  public compareHashedPassword(LogginedUserPassword: string, HasshedPassword: string): boolean {
    return bcrypt.compareSync(LogginedUserPassword, HasshedPassword);
  }

  /**
   * hasshing password form user
   * @param passwordValue password from logged in user
   */
  public hashingPassword(passwordValue: string): string {
    this._hashedPassword = bcrypt.hashSync(passwordValue, FileConstants.constants.saltRoundsForPassword);
    return this._hashedPassword;
  }
}
