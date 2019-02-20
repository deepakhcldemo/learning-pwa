// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { DashboardComponent } from './dashboard.component';
// import { SearchComponent } from 'src/app/shared/components/search/search.component';
// import { RecentActivityComponent } from 'src/app/shared/components/recent-activity/recent-activity.component';
// import { ToDoComponent } from 'src/app/shared/components/to-do/to-do.component';
// import { HeaderComponent } from 'src/app/shared/components/header/header.component';
// import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
// import { AccordionComponent } from 'src/app/shared/components/accordion/accordion.component';
// import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';

// import { BrowserModule } from '@angular/platform-browser';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
// import { HeaderService } from 'src/app/shared/components/header/header.service';
// import { AssessmentService } from 'src/app/shared/services/assessment.service';
// import { FirebaseDbService } from 'src/app/shared/services/firebase.db.service';
// import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
// import { environment } from 'src/environments/environment';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { CustomErrorHandlerService } from 'src/app/shared/services/custom.errorhandler.service';
// import { AlertService } from 'src/app/shared/components/alert/alert.service';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { IndexedDbService } from 'src/app/shared/services/indexed.db.service';
// import { MediaPopupService } from 'src/app/shared/components/media-popup/media-popup.service';
// import { NotesPopupService } from 'src/app/shared/components/edit-notes/notes-popup.service';
// import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AccordionService } from 'src/app/shared/services/accordion.service';
// import { NotesService } from 'src/app/shared/services/notes.service';
// import { MediaService } from 'src/app/shared/services/media.service';
// import { UploadFileService } from 'src/app/shared/services/upload-file.service';
// import { ModalService } from 'src/app/shared/components/global-modal/modal.service';
// import { MainPageFocusStatusService } from 'src/app/shared/mainpage-focus-status.service';
// import { of } from 'rxjs';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { TelemetryService } from 'src/app/shared/services/telemetry.service';
// import { StudentListMockData } from 'src/app/shared/services/student-list.mock.data';
// import { FooterService } from 'src/app/shared/components/footer/footer.service';
// import { AssessmentNavigationData } from 'src/app/shared/mock-data/Assessment-checklist';
// import { ObservationDalService } from 'src/app/shared/services/realtime-datalayer/observation-dal.service';
// import { StudentService } from 'src/app/shared/services/student.service';
// import { RosterService } from 'src/app/shared/services/roster.service';
// import { UserService } from 'src/app/auth/user.service';
// import { ToDoService } from 'src/app/shared/services/realtime-datalayer/todo-dal.service';

// describe('DashboardComponent', () => {
//     let component: DashboardComponent;
//     let fixture: ComponentFixture<DashboardComponent>;
//     let userService: UserService;
//     let assessmentService: AssessmentService;
//     let headerService: HeaderService;
//     let mainPageFocusStatusService: MainPageFocusStatusService;
//     const mockRouter = {
//         navigate: jasmine.createSpy('navigate')
//     };
//     // let router: Router;
//     const routes: Routes = [
//         { path: '', component: DashboardComponent },
//         { path: '**', component: DashboardComponent }
//     ];
//     const permission = [{
//         CGProgram: 'Realize',
//         DenyNewSubscription: '0',
//         EndDate: '2021-08-15T23:59:59.000-04:00',
//         GradeLevel: 'N/A',
//         LicensePoolId: '8a97b1a738c9f0d90139316b11f3180e',
//         LicensePoolStatus: 'A',
//         LicensePoolType: 'Student seat based licensing',
//         LicensedOrganizationDisplayName: 'realize_organization1',
//         LicensedOrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//         OrderedISBN: '3332224445556',
//         OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//         ProductDisplayName: 'Realize Sample Program',
//         ProductId: '336566',
//         ProductLongDescription: 'Realize Sample Program',
//         ProductShortDescription: 'Realize Sample Program',
//         Quantity: '250',
//         StartDate: '2012-08-16T00:00:00.000-04:00',
//         UsedLicenses: '18963'
//     }];

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [BrowserModule,
//                 ReactiveFormsModule,
//                 FormsModule,
//                 SlickCarouselModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule,
//                 RouterModule,
//                 RouterTestingModule.withRoutes(routes),
//             ],
//             declarations: [DashboardComponent,
//                 SearchComponent,
//                 RecentActivityComponent,
//                 ToDoComponent,
//                 HeaderComponent,
//                 FooterComponent,
//                 AccordianComponent,
//                 CarouselComponent,
//                 DateFormatPipe
//             ],
//             providers: [HeaderService,
//                 AssessmentService,
//                 FirebaseDbService,
//                 CustomErrorHandlerService,
//                 AlertService,
//                 UserService,
//                 HttpClient,
//                 HttpHandler,
//                 IndexedDbService,
//                 MediaPopupService,
//                 NotesPopupService,
//                 AccordionService,
//                 NotesService,
//                 MediaService,
//                 ObservationDalService,
//                 UploadFileService,
//                 ModalService,
//                 MainPageFocusStatusService,
//                 TelemetryService,
//                 FooterService,
//                 ToDoService,
//                 StudentService,
//                 RosterService
//                 // { provide: Router, useValue: mockRouter },
//                 // {provide: Router, useClass: RouterModule}

//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(DashboardComponent);
//         component = fixture.componentInstance;
//         userService = TestBed.get(UserService);
//         assessmentService = TestBed.get(AssessmentService);
//         headerService = TestBed.get(HeaderService);
//         mainPageFocusStatusService = TestBed.get(MainPageFocusStatusService);
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
//         assessmentService.setCurrentAssessment({
//           assessment: {
//             id: 123,
//             criteria: [{
//               id: 1110,
//               sequence: 2,
//               title: '~Are students able to'
//             }]
//           },
//           parent: '3|17|63|610',
//           path: 'Grade2>Unit1 >investigation1',
//           type: 'ongoing'
//         });
//         assessmentService._navData.navigation = AssessmentNavigationData.NavigationData;
//         mainPageFocusStatusService.setMainPageFocusStatus(false);
//         userService.setUser(StudentListMockData.currentUser);
//     });

//     it('should create DashboardComponent', () => {
//         expect(component).toBeDefined();
//     });
//     it('should call showLink', () => {
//         component.showLink(true);
//         expect(component.showLink).toBeDefined();
//     });
//     it('should call toggleAssessSideBarAcordian', () => {
//         component.toggleAssessSideBarAcordian();
//         expect(component.toggleAssessSideBarAcordian).toBeDefined();
//     });
//     it('should call toggleRecent', () => {
//         const spy = spyOn(component, 'toggleRecent').and.returnValue({
//             success: true
//         });
//         component.toggleRecent();
//         expect(spy).toHaveBeenCalled();
//     });
//     it('should call setHeaderTitleAccordingToAssessmentType', () => {
//         component.setHeaderTitleAccordingToAssessmentType('ongoing');
//         headerService.setHeaderTitle('ongoing');
//         expect(component.setHeaderTitleAccordingToAssessmentType).toBeDefined();
//     });
//     it('should call toggleEditNote', () => {
//         component.toggleEditNote({});
//         expect(component.toggleEditNote).toBeDefined();
//     });
//     it('should call toggleEditMedia', () => {
//         component.toggleEditMedia({});
//         expect(component.toggleEditMedia).toBeDefined();
//     });
//     it('should call closeMediaSideBar', () => {
//         component.closeMediaSideBar();
//         expect(component.closeMediaSideBar).toBeDefined();
//     });
// });

