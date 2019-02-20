// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { AccordianComponent } from './accordion.component';
// import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
// import { Router } from '@angular/router';
// import { AssessmentService } from '../../services/assessment.service';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../../environments/environment';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { IndexedDbService } from '../../services/indexed.db.service';
// import { FirebaseDbService } from '../../services/firebase.db.service';
// import { TelemetryService } from '../../services/telemetry.service';
// import { AccordionService } from '../../services/accordion.service';
// import { AssessmentNavigationData } from '../../mock-data/Assessment-checklist';
// import { ActivatedRoute } from '@angular/router';
// import { computeStyle } from '@angular/animations/browser/src/util';
// import { ProductService } from '../../services/product.service';
// import { GlobalService } from 'src/app/global.service';
// import { UserService } from 'src/app/auth/user.service';
// // ADDED CLASS
// class MockRouter {
//   navigateByUrl(url: string) { return url; }
// }

// describe('AccordianComponent', () => {
//   let component: AccordianComponent;
//   let fixture: ComponentFixture<AccordianComponent>;
//   let accessibilityService: AccessibilityService;
//   let assessmentService: AssessmentService;
//   let userService: UserService;
//   let productService: ProductService;
//   let globalService: GlobalService;
//   const mockRouter = {
//     navigate: jasmine.createSpy('navigate')
//   };
//   const navigationData = {
//     navigation: [{
//       'id': '1',
//       'isbn': ['9780328946143'],
//       'productId': '1730939',
//       'sequence': 1,
//       'shortname': 'Kindergarten',
//       'title': 'Kindergarten',
//       'nodes': [
//         {
//           'title': 'Counting People, Sorting Buttons',
//           'shortname': 'Unit 1',
//           'sequence': 1,
//           'id': '1',
//           'parent': '336566',
//           'practice': {
//             'benchmarks': [
//               1,
//               2
//             ],
//             'mathpractices': [
//               282,
//               283
//             ]
//           },
//           'nodes': [
//             {
//               'title': 'Counting and exploring math materials',
//               'shortname': 'Investigation 1',
//               'sequence': 1,
//               'id': '2',
//               'parent': '336566|1',
//               'nodes': [
//                 {
//                   'title': 'The attendance routine:How Many are we?',
//                   'shortname': 'Session 1.1',
//                   'sequence': 1,
//                   'id': '1',
//                   'parent': '336566|1|1',
//                   'path': 'Kindergarten|Unit 1|Investigation 1',
//                   'assessments': [
//                     778,
//                     816
//                   ]
//                 }
//               ]
//             }

//           ]
//         }
//       ]
//     }]
//   };
//   const assessmentDetails = {
//     assessments: [{
//       criteria: [{
//         benchmarks: [1],
//         id: 1033,
//         mathpractices: [282],
//         sequence: 1,
//         title: 'Adds numbers in an order that is different from what is given'
//       }],
//       id: 288,
//       templatekind: '0',
//       title: 'MP8, Look for and express regularity in repeated reasoning',
//       type: 'checklist'
//     }]
//   };
//   const assessmentItem = {
//     benchmarks: [{
//       description: 'Count and count out a set of up to 10 objects',
//       id: '1',
//       title: 'Benchmark 1',
//     },
//     {
//       description: 'Describe',
//       id: '2',
//       title: 'Benchmark 2'
//     },
//     {
//       description: 'Compare two',
//       id: '58',
//       title: 'Benchmark 3'
//     }
//     ],
//     mathpractices: [{
//       description: 'Make sense of problems and persevere in solving them',
//       id: '0',
//       title: 'MP1'
//     }]

//   };
//   const fakeActivatedRoute = {
//     snapshot: {
//       data: {
//         navigation: navigationData,
//         assessment: assessmentDetails,
//         assessmentItem: assessmentItem
//       }
//     }
//   };
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [AccordianComponent],
//       providers: [{ provide: Router, useValue: mockRouter },
//       { provide: ActivatedRoute, useValue: fakeActivatedRoute },
//         AssessmentService,
//         UserService,
//         HttpClient,
//         HttpHandler,
//         IndexedDbService,
//         FirebaseDbService,
//         TelemetryService,
//         AccordionService,
//         GlobalService
//       ],
//       imports: [AngularFirestoreModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFireDatabaseModule]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     const productISBN = [{
//       CGProgram: 'Realize',
//       OrderedISBN: '9780328946143',
//       OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//       ProductDisplayName: 'Realize Sample Program',
//       ProductId: '336566',
//       ProductLongDescription: 'Realize Sample Program',
//       ProductShortDescription: 'Realize Sample Program',
//       StartDate: '2012-08-16T00:00:00.000-04:00',
//       UsedLicenses: '18935'
//     }, {
//       CGProgram: 'Realize',
//       DenyNewSubscription: '0',
//       OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//       ProductDisplayName: 'Realize Testing Sample version 1',
//       ProductId: '339781',
//       ProductLongDescription: 'realize Testing Sample Long Description',
//       ProductShortDescription: 'realize Testing Sample SD',
//       StartDate: '2012-06-12T00:00:00.000-04:00',
//       UsedLicenses: '1562'
//     }];
//     fixture = TestBed.createComponent(AccordianComponent);
//     component = fixture.componentInstance;
//     userService = TestBed.get(UserService);
//     globalService = TestBed.get(GlobalService);
//     userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511', permissions: productISBN });
//     assessmentService = TestBed.get(AssessmentService);
//     // assessmentService._navData.navigation = [AssessmentNavigationData.NavigationData];
//     // globalService.setNavigation('navigation', fakeActivatedRoute.snapshot.data.navigation);
//     // globalService.setNavigation('assessment', fakeActivatedRoute.snapshot.data.assessment);
//     // globalService.setNavigation('assessmentitem', fakeActivatedRoute.snapshot.data.assessmentItem);
//     productService = TestBed.get(ProductService);

//     productService.setCurrentProduct({
//       name: 'Kindergarten',
//       productID: '336566'
//     });
//     // component.path = 'Kindergarten|Unit 1|Investigation 1';
//     component.parent = '336566|1|1';
//     fixture.detectChanges();
//     component.ngOnInit();
//     component.accordianTabIndexStatus = false;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should called ngOninit', () => {
//     component.ngOnInit();
//     expect(component.childGrids.length).toEqual(0);
//   });

//   it('should get selectFocus method', () => {
//     accessibilityService = TestBed.get(AccessibilityService);
//     component.setFocus('asessment_close_button', '');
//     const spy = spyOn(accessibilityService, 'selectFocus');
//     accessibilityService.selectFocus('asessment_close_button', '');
//     expect(spy).toHaveBeenCalled();
//   });

//   it('should have called close accordion', () => {
//     component.closeAccordian({ title: 'Unit1' });
//     expect(component.noData).toEqual(false);
//   });

//   it('should have called close accordion with no title', () => {
//     const itrLength = component.openedGridsStack.length;
//     component.closeAccordian({ title: '' });
//     expect(component.openedGridsStack.length).toEqual(itrLength);
//   });

//   /* it('should have call close accordion with openedGridsStack data', () => {
//     component.openedGridsStack = [{
//       id: '123',
//       nodes: [],
//       sequence: 2,
//       shortname: 'Unit1',
//       title: 'Unit 1'
//     },
//     {
//       id: '123',
//       nodes: [],
//       sequence: 2,
//       shortname: 'Unit2',
//       title: 'Unit 2'
//     }];
//     fixture.detectChanges();
//     component.closeAccordian({ title: 'Unit 1' });
//     expect(component.openedGridsStack.length).toBeGreaterThanOrEqual(0);
//   }); */

//   it('should have called expand accordion with no node data', () => {
//     const gridData = { path: 'Kindergarten' };
//     component.expanGrids(gridData);
//     expect(component.isUnit).toEqual(true);
//   });

//   it('should have called expand accordion with assessment data', () => {
//     const gridData = {
//       path: 'Kindergarten',
//       assessments: []
//     };
//     component.expanGrids(gridData);
//     expect(component.childGrids).toEqual(null);
//   });

//   it('should have called expand grid with one node data ', () => {
//     const gridData = {
//       path: 'Kindergarten|Unit 1|Investigation 1',
//       nodes:
//         [
//           {
//             'title': 'Counting and exploring math materials',
//             'shortname': 'Investigation 1',
//             'sequence': 1,
//             'id': '2',
//             'parent': '336566|1',
//             'nodes': [
//               {
//                 'title': 'The attendance routine:How Many are we?',
//                 'shortname': 'Session 1.1',
//                 'sequence': 1,
//                 'id': '1',
//                 'parent': '336566|1|1',
//                 'path': 'Kindergarten|Unit 1|Investigation 1',
//                 'assessments': [
//                   778,
//                   816
//                 ]
//               }
//             ]
//           }

//         ]
//     };
//     component.expanGrids(gridData);
//     expect(component.openedGridsStack.length).toBeGreaterThanOrEqual(0);
//   });

//   it('should have called expand grid with one node data', () => {
//     const gridData = {
//       path: 'Kindergarten|Unit 1|Investigation 1',
//       nodes:
//         [
//           {
//             'title': 'Counting and exploring math materials',
//             'shortname': 'Investigation 1',
//             'sequence': 1,
//             'id': '2',
//             'parent': '336566|1',
//             'nodes': [
//               {
//                 'title': 'The attendance routine:How Many are we?',
//                 'shortname': 'Session 1.1',
//                 'sequence': 1,
//                 'id': '1',
//                 'parent': '336566|1|1',
//                 'path': 'Kindergarten|Unit 1|Investigation 1',
//                 'assessments': [
//                   778,
//                   816
//                 ]
//               }
//             ]
//           },
//           {
//             'title': 'Counting and exploring math materials',
//             'shortname': 'Investigation 2',
//             'sequence': 2,
//             'id': '2',
//             'parent': '336566|2',
//             'nodes': [
//               {
//                 'title': 'The attendance routine:How Many are we?',
//                 'shortname': 'Session 1.1',
//                 'sequence': 1,
//                 'id': '1',
//                 'parent': '336566|1|2',
//                 'path': 'Kindergarten|Unit 1|Investigation 2',
//                 'assessments': [
//                   778,
//                   816
//                 ]
//               }
//             ]
//           }
//         ]
//     };
//     component.expanGrids(gridData);
//     expect(component.openedGridsStack.length).toBeGreaterThanOrEqual(0);
//   });
// /*
//   it('should call Router.navigateByUrl("pages/:pageName") to checklist', () => {
//     component.path = 'Kindergarten|Unit 1|Investigation 1';
//     component.parent = '336566|1';
//     fixture.detectChanges();
//     component.goToChecklist({ type: 'checklist' });
//     expect(mockRouter.navigate).toHaveBeenCalledWith(['/pages/checklist']);
//   }); */

//   it('should call Router.navigateByUrl("pages/:pageName") to ongoing ', () => {
//     component.goToOngoing({ type: 'ongoing' });
//     expect(mockRouter.navigate).toHaveBeenCalledWith(['/pages/ongoing']);
//   });

//   it('should have called expand appPadding for if condition in accordion component', () => {
//     const gridData = {
//       path: 'Kindergarten',
//       assessments: []
//     };
//     component.addPadding(gridData, true);
//     expect(component.addPadding).toBeDefined();
//   });

//   it('should have called expand appPadding for else condition in accordion component', () => {
//     const gridData = {
//       path: 'Kindergarten',
//       nodes: [
//         { path: 'Unit1', assessments: [] }
//       ]
//     };
//     component.addPadding(gridData, false);
//     expect(component.addPadding).toBeDefined();
//   });

// });
