// import { AuthTokenService } from './authtoken.service';
// import { TestBed } from '@angular/core/testing';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../environments/environment';
// import { IndexedDbService } from '../shared/services/indexed.db.service';
// import { UserService } from './user.service';

// const userObj = {
//     avatar: '0a',
//     emailAddress: 'emailaddress@pearson.com',
//     firstName: '0911',
//     fullName: '0911 adaptive',
//     lastName: 'adaptive',
//     userId: 'ffffffff5bb290def856993930d369a2',
//     cookies: {
//         CASTGC : 'username=John Voe; expires=Thu, 1 Dec 2018 12:01:00 UTC'
//     }
// };

// describe('AuthTokenService', () => {
//     let authTokenService: AuthTokenService;
//     let userService: UserService;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 HttpClientTestingModule,
//                 AngularFireModule.initializeApp(environment.firebase)
//             ],
//             providers: [
//                 AuthTokenService, UserService, AngularFirestore, IndexedDbService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         });

//         // Inject the service
//         authTokenService = TestBed.get(AuthTokenService);
//         userService = TestBed.get(UserService);

//         // Setting getToken property
//         userService._CURRENTUSER = 'currentUser';
//         userService.setUser(userObj);
//     });

//     it('should have a service instance', () => {
//         expect(authTokenService).toBeDefined();
//     });

//     it('should have a service service url ', () => {
//         expect(environment.apiUrls.rbsToken).toBeDefined();
//     });

//     // Checking the existence of method "getToken" in class Class "AuthTokenService"
//     it('Method "getToken" should be defined', async() => {

//         authTokenService.getToken().subscribe((data) => {
//             expect(data.fullName).toEqual('0911 adaptive');
//         });

//        const getUser = userService.getCurrentUser();
//        expect(getUser.cookies.CASTGC).toBe('username=John Voe; expires=Thu, 1 Dec 2018 12:01:00 UTC');
//        expect(getUser.cookies.CASTGC).toBeDefined();
//     });
// });
