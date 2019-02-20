// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { RecentActivityComponent } from './recent-activity.component';
// import { DateFormatPipe } from '../../pipes/date-format.pipe';
// import { CustomErrorHandlerService } from '../../services/custom.errorhandler.service';
// import { AlertService } from '../../components/alert/alert.service';
// import { AssessmentService } from '../../services/assessment.service';
// import { FirebaseDbService } from '../../services/firebase.db.service';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { NotesMockData } from '../../../shared/services/notes.service.mock.data';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../../environments/environment.prod';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { IndexedDbService } from '../../services/indexed.db.service';
// import { NotesService } from '../../services/notes.service';
// import { MediaService } from '../../../shared/services/media.service';
// import { MediaMockData } from '../../../shared/services/media.service.mock.data';
// import { UploadFileService } from '../../services/upload-file.service';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { Router, ActivatedRoute } from '@angular/router';
// import { AccordionService } from '../../services/accordion.service';
// import { ModalService } from '../global-modal/modal.service';
// import { of } from 'rxjs';
// import { TelemetryService } from '../../services/telemetry.service';
// import { AssessmentNavigationData } from '../../../shared/mock-data/Assessment-checklist';
// import { recentObj } from '../../mock-data/recent';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { ObservationDalService } from '../../services/realtime-datalayer/observation-dal.service';
// import { ProductService } from '../../services/product.service';
// import { GlobalService } from 'src/app/global.service';
// import {FileConstants} from 'src/app/shared/constants/file-constants';
// import { UserService } from 'src/app/auth/user.service';

// const fakeActivatedRoute = {
//     snapshot: { data: {} }
// } as ActivatedRoute;

// const mockRouter = {
//     navigate: jasmine.createSpy('navigate')
// };

// describe('RecentActivityComponent', () => {
//     let component: RecentActivityComponent;
//     let fixture: ComponentFixture<RecentActivityComponent>;
//     let assessmentService: AssessmentService;
//     let observationDalService: ObservationDalService;
//     let notesService: NotesService;
//     let userService: UserService;
//     let route: ActivatedRoute;
//     let indexedDbService: IndexedDbService;
//     let productService: ProductService;
//     let globalService: GlobalService;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 AngularFireModule.initializeApp(environment.firebase),
//                 NgbModalModule
//             ],
//             declarations: [RecentActivityComponent, DateFormatPipe],
//             providers: [
//                 { provide: Router, useValue: mockRouter },
//                 { provide: ActivatedRoute, useValue: fakeActivatedRoute },
//                 CustomErrorHandlerService, AlertService, AssessmentService, ObservationDalService,
//                 FirebaseDbService, AngularFirestore, UserService, HttpClient, HttpHandler,
//                 IndexedDbService, NotesService, MediaService, UploadFileService, AngularFireDatabase,
//                 AccordionService, ModalService, TelemetryService, GlobalService
//             ]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(RecentActivityComponent);
//         component = fixture.componentInstance;
//         userService = TestBed.get(UserService);
//         assessmentService = TestBed.get(AssessmentService);
//         indexedDbService = TestBed.get(IndexedDbService);
//         observationDalService = TestBed.get(ObservationDalService);
//         notesService = TestBed.get(NotesService);
//         productService = TestBed.get(ProductService);
//         globalService = TestBed.get(GlobalService);
//         userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511' });
//         // const spy = spyOn(globalService, 'getProductByNavigation').and.returnValue(
//         //     [{
//         //         productID: '336566', name: 'Kindergarten'
//         //     }]
//         // );
//         // expect(globalService.getProductByNavigation()).toBeDefined();
//         // expect(spy).toHaveBeenCalled();

//         productService.setCurrentProduct({
//             name: 'Kindergarten',
//             productID: '336566'
//         });
//         userService.setUser({
//             firstName: 'realize1',
//             identityId: 'ffffffff51c87040e4b07dddca2a0511',
//             idpName: 'RUMBA',
//             permissions: [{
//                 CGProgram: 'Realize',
//                 OrderedISBN: '3332224445556',
//                 OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//                 ProductDisplayName: 'Realize Sample Program',
//                 ProductId: '336566',
//                 ProductLongDescription: 'Realize Sample Program',
//                 ProductShortDescription: 'Realize Sample Program',
//                 StartDate: '2012-08-16T00:00:00.000-04:00',
//                 UsedLicenses: '18935'
//             }],
//         });
//         const NavigationData = {
//             'navigation': [AssessmentNavigationData.NavigationData, AssessmentNavigationData.NavigationData]
//         };
//         // globalService.setNavigation('navigation',
//         //     NavigationData
//         // );
//         // assessmentService._navData.navigation = [AssessmentNavigationData.NavigationData];
//         // globalService.convertTreeToList({
//         //     name: 'Kindergarten',
//         //     productID: '336566'
//         // });
//       //  component._assessmentList = [AssessmentNavigationData.AssessmentDetails];
//         component.ngOnInit();
//         fixture.detectChanges();
//         route = TestBed.get(ActivatedRoute);
//     });

//     it('instance of recent notes component', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should have card heading equal to', () => {
//         component.recentActivityHeading = FileConstants.constants.recentActivity;
//         fixture.detectChanges();
//         expect(component.recentActivityHeading).toEqual(FileConstants.constants.recentActivity);
//     });


//     it('should call method sortRecentItems in component', () => {
//         component.sortRecentItems();
//         expect(component.sortRecentItems).toBeTruthy();
//     });

//     it('should call method setRecentItem in component', () => {
//         component.setRecentItem('c1');
//         expect(component.setRecentItem).toBeTruthy();
//     });

//     // it('should call method getRecentAssessment in component', () => {
//     //     component.getRecentAssessment([], [], []);
//     //     expect(component.getRecentAssessment).toBeTruthy();
//     // });

//     // it('should call method setRecentAssessmentInsideComponent in component', () => {
//     //     const assessmentList = [
//     //         {
//     //             assessmentid: '312',
//     //             assessmentitemid: 1110,
//     //             createdat: new Date(),
//     //             path: 'Grade 2 > Unit 1 > Investigation 1 > Session 1.2',
//     //             students: 'ffffffff5bb290def856993930d369a2',
//     //         }
//     //     ];
//     //     component.setRecentAssessmentInsideComponent(   [AssessmentNavigationData.AssessmentDetails],
//     //     recentObj.note, recentObj.media, assessmentList);
//     //     expect(component.setRecentAssessmentInsideComponent).toBeTruthy();
//     // });

//     // it('should call method getRecentMedia in component', () => {
//     //     component.getRecentMedia(   [AssessmentNavigationData.AssessmentDetails],
//     //     recentObj.note, recentObj.media);
//     //     expect(component.getRecentMedia).toBeTruthy();
//     // });

//     // it('should call method setRecentMediaInsideComponent in component', () => {
//     //     component.setRecentMediaInsideComponent([AssessmentNavigationData.AssessmentDetails],
//     //         recentObj.note, recentObj.media, recentObj.assessment);
//     //     expect(component.setRecentMediaInsideComponent).toBeTruthy();
//     // });

//     it('should call method getRecentNotes in component', () => {
//         component.getRecentNotes([AssessmentNavigationData.AssessmentDetails],
//             recentObj.note, recentObj.media, '12');
//         expect(component.getRecentNotes).toBeTruthy();
//     });

//     // it('should call method setRecentNoteInsideComponent in component', () => {
//     //     component.setRecentNoteInsideComponent([AssessmentNavigationData.AssessmentDetails],
//     //         recentObj.note, recentObj.media, recentObj.assessment);
//     //     expect(component.setRecentNoteInsideComponent).toBeTruthy();
//     // });

//     // it('should call method openAssessment in component', () => {
//     //     component.openAssessment(recentObj.assessment);
//     //     expect(component.openAssessment).toBeTruthy();
//     // });

//     it('should call method toggleContentHidden in component', () => {
//         component.toggleContentHidden();
//         expect(component.toggleContentHidden).toBeTruthy();
//     });

//     it('should call method openVerticallyCentered in component', () => {
//         component.openVerticallyCentered();
//         expect(component.openVerticallyCentered).toBeTruthy();
//     });

//     it('should call method editNotesToggle in component', () => {
//         component.editNotesToggle(recentObj.note);
//         expect(component.editNotesToggle).toBeTruthy();
//     });

//     it('should call method editMediaToggle in component', () => {
//         component.editMediaToggle(recentObj.media);
//         expect(component.editMediaToggle).toBeTruthy();
//     });

// });
