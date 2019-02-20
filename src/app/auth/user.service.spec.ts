// import { TestBed } from '@angular/core/testing';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { ActivatedRoute } from '@angular/router';
// import { BehaviorSubject, of } from 'rxjs';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { UserService } from './user.service';
// import { ProductService } from '../shared/services/product.service';
// import { StudentService } from '../shared/services/student.service';
// import { environment } from 'src/environments/environment';
// import { FirebaseDbService } from '../shared/services/firebase.db.service';
// import { IndexedDbService } from '../shared/services/indexed.db.service';
// import { RosterService } from '../shared/services/roster.service';

// const fakeActivatedRoute = {
//     snapshot: { data: {} }
// } as ActivatedRoute;

// const mockRouter = {
//     navigate: jasmine.createSpy('navigate')
// };

// const studentList = [{
//     avatar: '0a',
//     emailAddress: 'emailaddress@pearson.com',
//     firstName: '0911',
//     fullName: '0911 adaptive',
//     lastName: 'adaptive',
//     userId: 'ffffffff5bb290def856993930d369a2'
// }, {
//     avatar: '1f',
//     emailAddress: 'emailaddress@pearson.com',
//     firstName: '10',
//     fullName: '10 feb',
//     lastName: 'feb',
//     userId: 'ffffffff5a7d7439f02ebd1b9347e303'
// }];

// const productISBN = [{
//     CGProgram: 'Realize',
//     OrderedISBN: '3332224445556',
//     OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//     ProductDisplayName: 'Realize Sample Program',
//     ProductId: '336566',
//     ProductLongDescription: 'Realize Sample Program',
//     ProductShortDescription: 'Realize Sample Program',
//     StartDate: '2012-08-16T00:00:00.000-04:00',
//     UsedLicenses: '18935'
// }, {
//     CGProgram: 'Realize',
//     DenyNewSubscription: '0',
//     OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//     ProductDisplayName: 'Realize Testing Sample version 1',
//     ProductId: '339781',
//     ProductLongDescription: 'realize Testing Sample Long Description',
//     ProductShortDescription: 'realize Testing Sample SD',
//     StartDate: '2012-06-12T00:00:00.000-04:00',
//     UsedLicenses: '1562'
// }];
// const productList = [{ product: '1730908', studentList: [] },
// { product: '1730923', studentList: [] }];

// const FirestoreStub = {
//     collection: (name: string) => ({
//         doc: (_id: string) => ({
//             valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
//             set: (_d: any) => new Promise((resolve, _reject) => resolve()),
//         }),
//     }),
// };

// describe('UserService', () => {
//     let userService: UserService;
//     let productService: ProductService;
//     let studentService: StudentService;
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 NgbModule.forRoot(),
//                 HttpClientModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule
//             ],
//             providers: [
//                 FirebaseDbService, UserService,
//                 IndexedDbService, HttpClient, StudentService, RosterService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         });
//         userService = TestBed.get(UserService);
//         studentService = TestBed.get(StudentService);
//         productService = TestBed.get(ProductService);

//         userService.setUser({
//             firstName: 'realize1',
//             identityId: 'ffffffff51c87040e4b07dddca2a0511',
//             idpName: 'RUMBA'
//         });
//         userService.setToken({
//             access_token: 'mVS0lDGdSFTcY4Z0p3kFS1cJIJ5v',
//             clientId: 'O5n6dEnWdN6RLJBUeBOxXQ2cUxIOCRIo'
//         });
//         studentService.setCurrentStudentFromStudentList({
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             userId: 'ffffffff5bb290def856993930d369a2'
//         });
//         userService._CURRENTUSER = 'currentUser';

//     });

//     it('should have a user service instance', () => {
//         expect(userService).toBeDefined();
//     });

//     it('should have called set current user', () => {
//         userService.setUser({
//             firstName: 'realize1',
//             identityId: 'ffffffff51c87040e4b07dddca2a0511',
//             idpName: 'RUMBA'
//         });
//         expect(JSON.parse(sessionStorage.getItem('currentUser'))).toBeDefined();
//     });

//     it('should have called set user token ', () => {
//         userService.setToken({
//             access_token: 'mVS0lDGdSFTcY4Z0p3kFS1cJIJ5v',
//             clientId: 'O5n6dEnWdN6RLJBUeBOxXQ2cUxIOCRIo'
//         });
//         expect(userService.token).toBeDefined();
//     });

//     it('should have called get current user', () => {
//         userService.getCurrentUser();
//         expect(JSON.parse(sessionStorage.getItem('currentUser')).firstName).toEqual('realize1');
//     });

//     it('should have set undefined ', () => {
//         userService.getCurrentUser();
//         expect(JSON.parse(sessionStorage.getItem('currentUser')).firstName).toEqual('realize1');
//     });

//     it('should have called get user token', () => {
//         userService.setToken({
//             access_token: 'mVS0lDGdSFTcY4Z0p3kFS1cJIJ5v',
//             clientId: 'O5n6dEnWdN6RLJBUeBOxXQ2cUxIOCRIo'
//         });
//         userService.getToken();
//         expect(userService.token.clientId).toEqual('O5n6dEnWdN6RLJBUeBOxXQ2cUxIOCRIo');
//     });

//     it('should have get product list', () => {
//         const productSpy = spyOn(productService, 'getProduct').and.returnValue(
//             { productId: '1730908', productName: 'Kindergarden' }
//         );
//         productService.getProduct('1730908', (productLst) => {
//         });
//         expect(productSpy).toHaveBeenCalled();
//     });


//     // it('should have called student details', () => {
//     //     const studentSpy = spyOn(userService, 'getStudentDetail').and.returnValue({});

//     //     userService.getStudentDetail('ffffffff5a7d7439f02ebd1b9347e303', (studentLst) => {
//     //         if (studentLst) { }
//     //     });
//     //     expect(studentSpy).toHaveBeenCalled();
//     // });



//     // it('should get product for isbn', () => {
//     //     userService.getProductWithISBN(productISBN);
//     //     expect(productISBN.length).toBeGreaterThanOrEqual(1);
//     // });

//     it('should have called remove logged in user session', () => {
//         const removeSessionSpy = spyOn(userService, 'removeCurrentUserSession').and.returnValue({
//             success: true
//         });
//         userService.removeCurrentUserSession();
//         expect(removeSessionSpy).toHaveBeenCalled();
//     });
// });
