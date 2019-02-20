// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ObservationComponent } from './observation.component';
// import { HeaderService } from 'src/app/shared/components/header/header.service';
// import { HeaderComponent } from 'src/app/shared/components/header/header.component';
// import { FilterService } from '../../services/filter.service';
// import { ReportFilterComponent } from '../report-filter/report-filter.component';
// import { ObservationChartComponent } from '../observation-chart/observation-chart.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { environment } from 'src/environments/environment';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { HttpClientModule } from '@angular/common/http';
// import { IndexedDbService } from 'src/app/shared/services/indexed.db.service';
// import { AssessmentService } from 'src/app/shared/services/assessment.service';
// import { FirebaseDbService } from 'src/app/shared/services/firebase.db.service';
// import { CustomErrorHandlerService } from 'src/app/shared/services/custom.errorhandler.service';
// import { AlertService } from 'src/app/shared/components/alert/alert.service';
// import { NotesService } from 'src/app/shared/services/notes.service';
// import { MediaService } from 'src/app/shared/services/media.service';
// import { UploadFileService } from 'src/app/shared/services/upload-file.service';
// import { of } from 'rxjs';
// import { FooterService } from 'src/app/shared/components/footer/footer.service';
// import { TelemetryService } from 'src/app/shared/services/telemetry.service';
// import { ProductService } from 'src/app/shared/services/product.service';
// import { UserService } from 'src/app/auth/user.service';

// describe('ObservationComponent', () => {
//     let component: ObservationComponent;
//     let fixture: ComponentFixture<ObservationComponent>;
//     let userService: UserService;
//     let productService: ProductService;
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [ObservationComponent,
//                 HeaderComponent,
//                 ReportFilterComponent,
//                 ObservationChartComponent,

//             ],
//             providers: [HeaderService,
//                 FilterService,
//                 UserService,
//                 IndexedDbService,
//                 AssessmentService,
//                 FirebaseDbService,
//                 CustomErrorHandlerService,
//                 AlertService,
//                 NotesService,
//                 MediaService,
//                 UploadFileService,
//                 FooterService,
//                 TelemetryService
//             ],
//             imports: [FormsModule,
//                 ReactiveFormsModule,
//                 NgbModule,
//                 PerfectScrollbarModule,
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule,
//                 HttpClientModule,
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(ObservationComponent);
//         const assessmentService: AssessmentService = TestBed.get(AssessmentService);

//         productService = TestBed.get(ProductService);
//         component = fixture.componentInstance;
//         productService.setCurrentProduct({
//             name: 'Kindergarten',
//             productID: '336566'
//         });
//         userService = TestBed.get(UserService);
//         userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511' });
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
//     it('should return the mocked user data', () => {
//         const spy = spyOn(userService, 'getCurrentUser').and.returnValue(
//             of({
//                 identityId: 'ffffffff51c87040e4b07dddca2a0511'
//             })
//         );
//         userService.getCurrentUser().subscribe(data => {
//             expect(data.identityId).toBe('ffffffff51c87040e4b07dddca2a0511');
//         });
//         expect(spy).toHaveBeenCalled();
//     });

//     it('should have set header title', () => {
//         let headerService: HeaderService;
//         headerService = TestBed.get(HeaderService);
//         headerService.setHeaderTitle('Observation Report');
//     });
//     it('should have called toggleFilter method', () => {
//         component.showChart = false;
//         component.toggleFilter(true);
//         fixture.detectChanges();
//         expect(component.showChart).toBe(true);
//     });
// });
