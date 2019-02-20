import { Injectable } from '@angular/core';
import { CurrentUser } from '../models/user.model';

@Injectable()
export class UserService {
    private _CURRENTUSER = 'currentUser';
    private _token: any;
    constructor() { }

    /**
     * Set current User
     * @param user User details
     */
    setUser(user: any): void {
        // let curentUser: CurrentUser;
        if (user) {
            // curentUser = {
            //     castgc: user.castgc,
            //     firstName: user.firstName,
            //     identityId: user.identityId,
            //     authorizedResource: user.idpResponse.data.authorizedResource,
            //     lastName: user.lastName,
            //     locale: user.locale,
            //     name: user.name,
            //     timeZone: user.timeZone,
            //     title: user.title,
            //     token: user.token,
            //     userName: user.userName
            // };
            sessionStorage.setItem(this._CURRENTUSER, JSON.stringify(user));
        }
    }

    /**
     * get Current User
     */
    getCurrentUser(): any {
        if (sessionStorage.getItem(this._CURRENTUSER)) {
            return JSON.parse(sessionStorage.getItem(this._CURRENTUSER));
        }
        return null;
    }

    /**
     * Set authentication token for User
     * @param _token login token
     */
    setToken(token: any): void {
        this._token = token;
    }

    /**
     * Get authentication token
     */
    getToken(): any {
        return this._token;
    }

    /**
     * Remove logged in user session
     */
    removeCurrentUserSession(): void {
        if (this.getCurrentUser()) {
            sessionStorage.removeItem(this._CURRENTUSER);
        }
    }

}

