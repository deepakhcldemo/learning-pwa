// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { CarouselComponent } from './carousel.component';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
// import { ProgressCardComponent } from '../progress-card/progress-card.component';
// import { TruncatePipe } from '../../pipes/truncate.pipe';
// import { CircleProgressComponent } from 'ng-circle-progress';
// import { DateFormatPipe } from '../../pipes/date-format.pipe';
// import { Router } from '@angular/router';
// import { AssessmentService } from '../../services/assessment.service';
// import { AccordionService } from '../../services/accordion.service';
// import { HttpClientModule } from '@angular/common/http';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../../environments/environment';
// import { IndexedDbService } from '../../services/indexed.db.service';
// import { FirebaseDbService } from '../../services/firebase.db.service';
// import { TelemetryService } from '../../services/telemetry.service';
// import { CarouselMockData } from './carousel-mockdata';
// import { AssessmentNavigationData } from '../../mock-data/Assessment-checklist';
// import { ObservationDalService } from '../../services/realtime-datalayer/observation-dal.service';
// import { CustomErrorHandlerService } from '../../services/custom.errorhandler.service';
// import { AlertService } from '../alert/alert.service';
// import { ProductService } from '../../services/product.service';
// import { GlobalService } from 'src/app/global.service';
// import { UserService } from 'src/app/auth/user.service';
// const productISBN = [{
//   CGProgram: 'Realize',
//   OrderedISBN: '3332224445556',
//   OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//   ProductDisplayName: 'Realize Sample Program',
//   ProductId: '336566',
//   ProductLongDescription: 'Realize Sample Program',
//   ProductShortDescription: 'Realize Sample Program',
//   StartDate: '2012-08-16T00:00:00.000-04:00',
//   UsedLicenses: '18935'
// }, {
//   CGProgram: 'Realize',
//   DenyNewSubscription: '0',
//   OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//   ProductDisplayName: 'Realize Testing Sample version 1',
//   ProductId: '339781',
//   ProductLongDescription: 'realize Testing Sample Long Description',
//   ProductShortDescription: 'realize Testing Sample SD',
//   StartDate: '2012-06-12T00:00:00.000-04:00',
//   UsedLicenses: '1562'
// }];
// describe('CarouselComponent', () => {
//   let component: CarouselComponent;
//   let assessmentService: AssessmentService;
//   let customErrorHandlerService: CustomErrorHandlerService;
//   let userService: UserService;
//   let alertService: AlertService;
//   let productService: ProductService;
//   let globalService: GlobalService;
//   let fixture: ComponentFixture<CarouselComponent>;
//   const mockRouter = {
//     navigate: jasmine.createSpy('navigate')
//   };
//   const AssessmentData = {
//     'assessment': {
//       id: 625,
//       'criteria': [
//         {
//           'title': 'Calculates multiple of 10 currectly.',
//           'id': 5154,
//           'benchmarks': [
//             1
//           ],
//           'mathpractices': [
//             282
//           ]
//         }
//       ],
//       templatekind: '1',
//       title: 'Students generate examples of arrays of familiar objects and find the products ,represented by these arrays.',
//       type: 'ongoing'
//     },

//     assessmentItem: {
//       id: 625,
//       'criteria': [
//         {
//           'title': 'Calculates multiple of 10 currectly.',
//           'id': 5154,
//           'benchmarks': [
//             1
//           ],
//           'mathpractices': [
//             282
//           ]
//         }
//       ],
//       templatekind: '1',
//       title: 'Students generate examples of arrays of familiar objects and find the products ,represented by these arrays.',
//       type: 'ongoing'
//     },
//     parent: '5|28|98|445',
//     parentid: '445',
//     path: 'Grade 4 > Unit 1 > Investigation 1>Session 1.1',
//     sequence: 494,
//     shortname: 'Session 1.1',
//     title: 'Students generate examples of arrays of familiar objects and find the products represented by these arrays.',
//     type: 'ongoing'
//   };
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         CarouselComponent,
//         ProgressCardComponent,
//         TruncatePipe,
//         CircleProgressComponent,
//         DateFormatPipe
//       ],
//       imports: [
//         SlickCarouselModule,
//         HttpClientModule,
//         AngularFirestoreModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFirestoreModule,
//         AngularFireDatabaseModule
//       ],
//       providers: [
//         { provide: Router, useValue: mockRouter },
//         AssessmentService,
//         UserService,
//         AccordionService,
//         ObservationDalService,
//         CustomErrorHandlerService,
//         IndexedDbService,
//         AlertService,
//         FirebaseDbService,
//         GlobalService,
//         TelemetryService
//       ]
//     })
//       .compileComponents();
//   }));
//   beforeEach(() => {
//     fixture = TestBed.createComponent(CarouselComponent);
//     component = fixture.componentInstance;
//     component.products = CarouselMockData.navigationData;
//     assessmentService = TestBed.get(AssessmentService);
//     productService = TestBed.get(ProductService);
//     customErrorHandlerService = TestBed.get(CustomErrorHandlerService);
//     alertService = TestBed.get(AlertService);
//     globalService = TestBed.get(GlobalService);
//     assessmentService.setCurrentAssessment(
//       AssessmentData
//     );
//     userService = TestBed.get(UserService);
//     productService.setCurrentProduct({
//       name: 'Kindergarten',
//       productID: '336566'
//     });
//     userService.setUser({
//       firstName: 'realize1',
//       identityId: 'ffffffff51c87040e4b07dddca2a0511',
//       idpName: 'RUMBA',
//       permissions: [{
//         CGProgram: 'Realize',
//         OrderedISBN: '9780328946143',
//         OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//         ProductDisplayName: 'Realize Sample Program',
//         ProductId: '336566',
//         ProductLongDescription: 'Realize Sample Program',
//         ProductShortDescription: 'Realize Sample Program',
//         StartDate: '2012-08-16T00:00:00.000-04:00',
//         UsedLicenses: '18935'
//       }],
//     });
//     const NavigationData = {
//       'navigation': [AssessmentNavigationData.NavigationData, AssessmentNavigationData.NavigationData]
//     };
//     // globalService.setNavigation('navigation',
//     //   NavigationData
//     // );
//     assessmentService._navData.navigation = [AssessmentNavigationData.NavigationData];
//     // assessmentService._navData.assessment = [AssessmentNavigationData.NavigationData];
//     globalService._navData.navigation = [AssessmentNavigationData.NavigationData];
//     globalService._navData.assessment = [AssessmentNavigationData.NavigationData];
//     // globalService.convertTreeToList({
//     //   name: 'Kindergarten',
//     //   productID: '336566'
//     // });
//     fixture.detectChanges();
//     component.ngOnInit();
//   });

//   it('should create component ', () => {
//     component.ngOnInit();
//     expect(component).toBeTruthy();
//   });

//   it('should call getCarouselNodes Method', () => {
//     component.getAllCarouselNodes();
//     fixture.detectChanges();
//   });

//   it('should call sortDatas Method', () => {
//     component.sortData();
//     fixture.detectChanges();
//   });


//   it('should call openAssessment Method', () => {
//     component.openAssessment(AssessmentData);
//     fixture.detectChanges();
//   });
//   it('should call setGrade Method', () => {
//     const assessmentProduct = {
//       name: 'Grade 2',
//       productID: '1730940'
//     };
//   //  component.setGrade(assessmentProduct);
//     fixture.detectChanges();
//   });

//   it('should call toggleGrade Method', () => {
//    // component.toggleGrade();
//     fixture.detectChanges();
//   });

//   it('should call ngAfterViewInit Method', () => {
//     component.ngAfterViewInit();
//     fixture.detectChanges();
//   });

//   it('should call getProgressCount Method', () => {
//     component.getProgressCount();
//     expect(component).toBeTruthy();
//     fixture.detectChanges();
//   });

//   it('should call getProgressSubscribe Method', () => {
//     component.getProgressSubscribe(AssessmentData);
//     fixture.detectChanges();
//   });
// });

