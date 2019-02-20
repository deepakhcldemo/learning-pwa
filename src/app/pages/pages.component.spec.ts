// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { PagesComponent } from './pages.component';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { AssessmentService } from '../shared/services/assessment.service';
// import { HttpClientModule } from '@angular/common/http';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from 'src/environments/environment';
// import { IndexedDbService } from '../shared/services/indexed.db.service';
// import { FirebaseDbService } from '../shared/services/firebase.db.service';
// import { TelemetryService } from '../shared/services/telemetry.service';
// import { ActivatedRoute } from '@angular/router';
// import { AlertService } from '../shared/components/alert/alert.service';
// import { AssessmentNavigationData } from '../shared/mock-data/Assessment-checklist';
// import { ProductService } from '../shared/services/product.service';
// import { GlobalService } from '../global.service';
// import { UserService } from '../auth/user.service';

// describe('PagesComponent', () => {
//     let component: PagesComponent;
//     let fixture: ComponentFixture<PagesComponent>;
//     let assessmentService: AssessmentService;
//     let userService: UserService;
//     let productService: ProductService;
//     let globalService: GlobalService;
//     const assessmentItem = {
//         benchmarks: [{
//             description: 'Count and count out a set of up to 10 objects',
//             id: '1',
//             title: 'Benchmark 1',
//         },
//         {
//             description: 'Describe',
//             id: '2',
//             title: 'Benchmark 2'
//         },
//         {
//             description: 'Compare two',
//             id: '58',
//             title: 'Benchmark 3'
//         }
//         ],
//         mathpractices: [{
//             description: 'Make sense of problems and persevere in solving them',
//             id: '0',
//             title: 'MP1'
//         }]

//     };
//     const navigationData = {
//         navigation: [{
//             'id': '1',
//             'isbn': ['9780328946143'],
//             'productId': '1730939',
//             'sequence': 1,
//             'shortname': 'Kindergarten',
//             'title': 'Kindergarten',
//             'nodes': [
//                 {
//                     'title': 'Counting People, Sorting Buttons',
//                     'shortname': 'Unit 1',
//                     'sequence': 1,
//                     'id': '1',
//                     'parent': '336566',
//                     'practice': {
//                         'benchmarks': [
//                             1,
//                             2
//                         ],
//                         'mathpractices': [
//                             282,
//                             283
//                         ]
//                     },
//                     'nodes': [
//                         {
//                             'title': 'Counting and exploring math materials',
//                             'shortname': 'Investigation 1',
//                             'sequence': 1,
//                             'id': '2',
//                             'parent': '336566|1',
//                             'nodes': [
//                                 {
//                                     'title': 'The attendance routine:How Many are we?',
//                                     'shortname': 'Session 1.1',
//                                     'sequence': 1,
//                                     'id': '1',
//                                     'parent': '336566|1|1',
//                                     'path': 'Kindergarten|Unit 1|Investigation 1',
//                                     'assessments': [
//                                         778,
//                                         816
//                                     ]
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         }]
//     };
//     const assessmentDetails = {
//         assessments: [{
//             criteria: [{
//                 benchmarks: [1],
//                 id: 1033,
//                 mathpractices: [282],
//                 sequence: 1,
//                 title: 'Adds numbers in an order that is different from what is given'
//             }],
//             id: 288,
//             templatekind: '0',
//             title: 'MP8, Look for and express regularity in repeated reasoning',
//             type: 'checklist'
//         }]
//     };
//     const fakeActivatedRoute = {
//         snapshot: {
//             data: {
//                 navigation: navigationData,
//                 assessment: assessmentDetails,
//                 assessmentItem: assessmentItem
//             }
//         }
//     };
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [PagesComponent],
//             providers: [AssessmentService,
//                 UserService,
//                 IndexedDbService,
//                 FirebaseDbService,
//                 TelemetryService,
//                 AlertService,
//                 GlobalService,
//                 {
//                     provide: ActivatedRoute, useValue: fakeActivatedRoute
//                 }
//             ],
//             imports: [HttpClientModule,
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(PagesComponent);
//         component = fixture.componentInstance;
//         assessmentService = TestBed.get(AssessmentService);
//         productService = TestBed.get(ProductService);
//         userService = TestBed.get(UserService);
//         globalService = TestBed.get(GlobalService);
//         const productISBN = [{
//             CGProgram: 'Realize',
//             OrderedISBN: '3332224445556',
//             OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//             ProductDisplayName: 'Realize Sample Program',
//             ProductId: '336566',
//             ProductLongDescription: 'Realize Sample Program',
//             ProductShortDescription: 'Realize Sample Program',
//             StartDate: '2012-08-16T00:00:00.000-04:00',
//             UsedLicenses: '18935'
//         }, {
//             CGProgram: 'Realize',
//             DenyNewSubscription: '0',
//             OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//             ProductDisplayName: 'Realize Testing Sample version 1',
//             ProductId: '339781',
//             ProductLongDescription: 'realize Testing Sample Long Description',
//             ProductShortDescription: 'realize Testing Sample SD',
//             StartDate: '2012-06-12T00:00:00.000-04:00',
//             UsedLicenses: '1562'
//         }];
//         userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511', permissions: productISBN });
//         assessmentService._navData.navigation = [AssessmentNavigationData.NavigationData];
//         globalService
//         .setNavigation('navigation', fakeActivatedRoute.snapshot.data.navigation);
//         globalService
//         .setNavigation('assessment', fakeActivatedRoute.snapshot.data.assessment);
//         globalService.setNavigation('assessmentitem', fakeActivatedRoute.snapshot.data.assessmentItem);
//         productService.setCurrentProduct({
//             name: 'Kindergarten',
//             productID: '1730939'
//         });
//         fixture.detectChanges();
//     });

//     it('should create pagesComponent', () => {
//         expect(component).toBeTruthy();
//     });
//     it('should change screen value', () => {
//         const window = {
//             screen: {
//                 Screen: {
//                     availHeight: 728,
//                     availLeft: 0,
//                     availTop: 0,
//                     availWidth: 1200,
//                     colorDepth: 24,
//                     height: 768
//                 }
//             },
//             innerWidth: 1600
//         };
//         expect(window.screen.Screen.availWidth).toBeLessThan(1366);
//         component.screen = true;
//         fixture.detectChanges();
//     });
// });
