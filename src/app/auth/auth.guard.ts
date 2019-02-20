import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { TeacherClassService } from '../shared/services/teacher-class.service';

/**
 * AuthGaurd implements the canactive interface to protect
 * the route, all the route which need to me protect as logined user can access
 * then include and add canactive property with the route.
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private userService: UserService,
        private teacherClassService: TeacherClassService
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return Observable.create((observer: any) => {
            if (this.userService.getCurrentUser()) {
                if (this.teacherClassService.hasClassContext()) {
                    observer.next(true);
                } else {
                    this.router.navigate(['/pickclass']);
                    observer.next(false);
                }
            } else {
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                observer.next(false);
            }
        });
    }
}
