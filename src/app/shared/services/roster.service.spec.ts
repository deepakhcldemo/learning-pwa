// import { RosterService } from './roster.service';
// import { TestBed } from '@angular/core/testing';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// import {
//     HttpClientTestingModule,
//     HttpTestingController
// } from '@angular/common/http/testing';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../environments/environment';
// import { IndexedDbService } from './indexed.db.service';
// import { of } from 'rxjs';
// import { UserService } from 'src/app/auth/user.service';


// describe('RosterService', () => {
//     let rosterService: RosterService;
//     let httpMock: HttpTestingController;
//     let userService: UserService;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 HttpClientTestingModule,
//                 AngularFireModule.initializeApp(environment.firebase)
//             ],
//             providers: [
//                 RosterService, UserService, AngularFirestore, IndexedDbService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         });

//         // inject the service
//         rosterService = TestBed.get(RosterService);
//         httpMock = TestBed.get(HttpTestingController);
//         userService = TestBed.get(UserService);

//         // Starting getSection method
//         const token = {
//             access_token: '3|17|64|253'
//         };
//         const tokenDetail = userService.setToken(token);
//         const auth = userService.getToken();
//     });

//     it('should have a service instance', () => {
//         expect(rosterService).toBeDefined();
//     });

//     it('should have get bulk user profile', () => {
//         rosterService.getUserProfileBulk(['ffffffff5a7d7439f02ebd1b9347e303']);
//     });

//     // Checking the existence of method "getSection" in class Class "RosterService"
//     it('Method "getSection" should be defined', () => {

//         const spyOngetBreadcrumb = spyOn(rosterService, 'getSection').and.returnValue(of(true));
//         rosterService.getSection();
//         // expect(rosterService.getSection).toBeDefined();
//         // expect(spyOngetBreadcrumb).toHaveBeenCalled();
//         expect(spyOngetBreadcrumb).toHaveBeenCalled();
//     });
// });
