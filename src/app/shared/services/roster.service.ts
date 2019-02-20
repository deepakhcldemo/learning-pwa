import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from 'src/app/auth/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class RosterService {

    constructor(private http: HttpClient,
        private userService: UserService) { }

    public getSection(): Observable<any> {
        const auth = this.userService.getToken();
        return this.http.get<any>(environment.apiUrls.rosterSection,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${auth.access_token}`,
                    'userId': `${auth.userId}`
                }
            });

    }

    /**
     * Get User details from Roaster service
     * @param userlist list of user id's for which details is required
     */
    public getUserProfileBulk(userlist: string): Observable<any> {
        const auth: any = this.userService.getToken();
        return this.http.get<any>(environment.apiUrls.userProfile,
            {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`,
                    'userIds': `${auth.userId},${userlist}`,
                    'Access-Control-Allow-Origin': '*'
                }
            });
    }

}
