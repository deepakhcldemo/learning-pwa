// import { TestBed, inject } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { AuthGuard } from './auth.guard';

// import { IndexedDbService } from '../shared/services/indexed.db.service';
// import { RouterModule, Router, Routes } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { LoginComponent } from '../pages/login/login.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from 'src/environments/environment';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { StudentListMockData } from '../shared/services/student-list.mock.data';
// import { of, Observable } from 'rxjs';
// import { UserService } from './user.service';


// describe('AuthGuardService', () => {
//     let service: AuthGuard;
//     let userService: UserService;
//     const router = {
//         navigate: jasmine.createSpy('navigate')
//     };
//     const routes: Routes = [
//         { path: '', component: LoginComponent },
//         { path: '**', component: LoginComponent }
//     ];
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [RouterModule,
//                 RouterTestingModule,
//                 HttpClientTestingModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule,

//             ],
//             providers: [
//                 UserService,
//                 IndexedDbService,
//                 AuthGuard,
//                 { provide: Router, useValue: router }


//             ],
//             schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
//         });
//     });
//     beforeEach(() => {
//         service = TestBed.get(AuthGuard);
//         userService = TestBed.get(UserService);
//         userService.setUser(StudentListMockData.currentUser);
//     });

//     it('should be created', () => {
//         expect(service).toBeTruthy();
//     });

//     it('should have called canactivate method return true', async () => {
//         service.canActivate(null, null);
//         userService.setUser(StudentListMockData.currentUser);
//         const spy = spyOn(service, 'canActivate').and.returnValue(
//             Observable.create((observer: any) => {
//                 if (StudentListMockData.currentUser) {
//                     observer.next(true);
//                 } else {
//                     observer.next(false);
//                 }
//             })
//         );

//         service.canActivate(null, null);
//         expect(spy).toHaveBeenCalledWith(null, null);
//     });

//     it('should have called canactivate method return false', async () => {
//         service.canActivate(null, null);
//         const spy = spyOn(service, 'canActivate').and.returnValue(
//             of(false)
//         );
//         service.canActivate(null, null);
//     });

// });
