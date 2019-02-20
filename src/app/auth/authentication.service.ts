import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { IndexedDbService } from '../shared/services/indexed.db.service';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { AuthenticationDalService } from '../shared/services/cache-datalayer/authentication-dal.service';


@Injectable()
export class AuthenticationService {
    private _CURRENTUSER = 'currentUser';

    constructor(private http: HttpClient, private userService: UserService,
        private IDBService: IndexedDbService,
        private authenticationDalService: AuthenticationDalService
    ) { }

    public login(username: string, password: string): Observable<any> {
        return this.http.post<any>(environment.apiUrls.login,
            {
                userName: username,
                password: password,
                appKey: 'NEXT_TEXT_01',
                includeLicensedProducts: true,
                authContextId: environment.authContextId
            },
            {
                headers: {
                    'Content-Type': FileConstants.constants.applicationJSON,
                    'Access-Control-Allow-Origin': environment.AccessControlAllowOrigin
                }
            });
    }

    /**
     * Logout
     * @param callback
     */
    public logout(callback: Function): void {
        if (this.userService.getCurrentUser()) {
            sessionStorage.removeItem(this._CURRENTUSER);
        }
        if (sessionStorage.getItem(FileConstants.constants.CurrentProduct)) {
            sessionStorage.removeItem(FileConstants.constants.CurrentProduct);
        }
        if (sessionStorage.getItem(FileConstants.constants.currentClass)) {
            sessionStorage.removeItem(FileConstants.constants.currentClass);
        }
        if (sessionStorage.getItem(FileConstants.constants.currentProgram)) {
            sessionStorage.removeItem(FileConstants.constants.currentProgram);
        }
        if (sessionStorage.getItem(FileConstants.constants.hasClassList)) {
            sessionStorage.removeItem(FileConstants.constants.hasClassList);
        }

        this.authenticationDalService.getLoggedInUserDetail((loggedinUserData) => {
            if (loggedinUserData && loggedinUserData.length > 0) {
                if (loggedinUserData[0].loginStatus) {
                    loggedinUserData[0].loginStatus = false;
                    this.authenticationDalService.updateLoggedInUserDetails(loggedinUserData).subscribe((res) => {
                        callback();
                    });
                }
            } else {
                callback();
            }
        });
        callback();
    }
}
