// import { TestBed, inject } from '@angular/core/testing';
// import { ProductService } from './product.service';
// import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { FirebaseDbService } from './firebase.db.service';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../environments/environment';
// import { IndexedDbService } from './indexed.db.service';
// import { UserService } from 'src/app/auth/user.service';

// describe('ProductService', () => {
//   let productService: ProductService;
//   let userService: UserService;
//   let indexedDbService: IndexedDbService;

//   const productISBN = [{
//     CGProgram: 'Realize',
//     OrderedISBN: '3332224445556',
//     OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//     ProductDisplayName: 'Realize Sample Program',
//     ProductId: '336566',
//     ProductLongDescription: 'Realize Sample Program',
//     ProductShortDescription: 'Realize Sample Program',
//     StartDate: '2012-08-16T00:00:00.000-04:00',
//     UsedLicenses: '18935'
//   }, {
//     CGProgram: 'Realize',
//     DenyNewSubscription: '0',
//     OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//     ProductDisplayName: 'Realize Testing Sample version 1',
//     ProductId: '339781',
//     ProductLongDescription: 'realize Testing Sample Long Description',
//     ProductShortDescription: 'realize Testing Sample SD',
//     StartDate: '2012-06-12T00:00:00.000-04:00',
//     UsedLicenses: '1562'
//   }];

//   const navigationDataFilter = [{
//     id: '1',
//     isbn: ['9780328946143', '9780328938490'],
//     nodes: [{
//       id: '1',
//       nodes: [{}],
//       parent: '1',
//       practice: { benchmarks: [1, 2], mathpractices: [282, 283] },
//       sequence: 1,
//       shortname: 'Unit 1',
//       title: 'Counting People, Sorting Buttons'
//     }],
//     productId: '1730939',
//     sequence: 1,
//     shortname: 'Kindergarten',
//     title: 'Kindergarten'
//   }];

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         AngularFireModule.initializeApp(environment.firebase)
//         ],
//       providers: [ProductService, UserService, HttpHandler, HttpClientModule,
//         HttpClient, FirebaseDbService, AngularFirestore, AngularFireDatabase, IndexedDbService]
//     });
//     productService = TestBed.get(ProductService);
//     productService.setProductId(
//       '1730939'
//   );
//   });

//   beforeEach(() => {
//     userService = TestBed.get(UserService);
//     indexedDbService = TestBed.get(IndexedDbService);
//   });

//   it('should be created', inject([ProductService], (service: ProductService) => {
//     expect(service).toBeTruthy();
//   }));
//   it('should check for get product method', () => {
//     productService.getProductId();
//   });

//   it('should be created', inject([ProductService], (service: ProductService) => {
//     service.getProductWithISBN(productISBN);
//     expect(productISBN.length).toBeGreaterThanOrEqual(1);
//   }));

//   it('should get getCurrentProductOnChange method', inject([ProductService], (service: ProductService) => {
//     service.getCurrentProductOnChange();
//     expect(service.getCurrentProductOnChange).toBeTruthy();
//   }));

//   it('should get getProductIdByGradeId  method', inject([ProductService], (service: ProductService) => {
//     userService.setUser({
//       firstName: 'realize1',
//       identityId: 'ffffffff51c87040e4b07dddca2a0511',
//       idpName: 'RUMBA'
//     });
//     service._navData.navigation = navigationDataFilter;
//     service.getProductIdByGradeId ('1');
//     expect(service.getProductIdByGradeId ).toBeTruthy();
//   }));

// });
