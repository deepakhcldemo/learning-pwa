import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenService {

    constructor(private http: HttpClient, private userService: UserService) { }
    /**
     * Get Authentiation token for loggedin User
     */
    public getToken(): Observable<any> {
        const user: any = this.userService.getCurrentUser();
        return this.http.post<any>(environment.apiUrls.rbsToken,
            { scope: environment.scope, userId: user.identityId, clientId: environment.clientId, grant_type: environment.grant_type },
            {
                headers: {
                    'Content-Type': FileConstants.constants.applicationJSON,
                    'accept': FileConstants.constants.applicationJSON,
                    'castgc': user.castgc
                }
            });
    }
}
