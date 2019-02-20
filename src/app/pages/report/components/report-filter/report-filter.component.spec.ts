// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { ReportFilterComponent } from './report-filter.component';
// import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { NgbModule, NgbDate } from '@ng-bootstrap/ng-bootstrap';
// import { AssessmentService } from '../../../../shared/services/assessment.service';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../../../environments/environment';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { HttpClientModule } from '@angular/common/http';
// import { IndexedDbService } from '../../../../shared/services/indexed.db.service';
// import { FirebaseDbService } from '../../../../shared/services/firebase.db.service';
// import { CustomErrorHandlerService } from '../../../../shared/services/custom.errorhandler.service';
// import { AlertService } from '../../../../shared/components/alert/alert.service';
// import { FilterService } from '../../services/filter.service';
// import { TelemetryService } from '../../../../shared/services/telemetry.service';
// import {ErrorMessageConstants} from 'src/app/shared/constants/error-message-constants';
// import { UserService } from 'src/app/auth/user.service';

// describe('ReportFilterComponent', () => {
//     let component: ReportFilterComponent;
//     let fixture: ComponentFixture<ReportFilterComponent>;
//     let alertService: AlertService;
//     let filterService: FilterService;
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [ReportFilterComponent],
//             imports: [NgbModule,
//                 AngularFirestoreModule,
//             AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule,
//                 HttpClientModule,
//             ],
//             providers: [AssessmentService,
//                 UserService,
//                 IndexedDbService,
//                 FirebaseDbService,
//                 CustomErrorHandlerService,
//                 AlertService,
//                 FilterService,
//                 TelemetryService
//             ],
//             schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(ReportFilterComponent);
//         component = fixture.componentInstance;
//         alertService = TestBed.get(AlertService);
//         filterService = TestBed.get(FilterService);
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
//     it('should initialise required data', () => {
//         component.setFlag = true;
//     });
//     it('should have called onFromDateSelection method', () => {
//         component.optionSelected = {
//             view: '',
//             when: '',
//             sort: '',
//             from: '',
//             to: ''
//         };
//         component.fromDate = new NgbDate(0, 0, 0);
//         const date: NgbDate = new NgbDate(0, 0, 0);

//         component.onFromDateSelection(date);
//         filterService.setDateRange(component.optionSelected);
//         fixture.detectChanges();
//         expect(component.fromDate).not.toBeNull();
//     });
//     it('should have called onToDateSelection method', () => {
//         component.optionSelected = {
//             view: '',
//             when: '',
//             sort: '',
//             from: '',
//             to: ''
//         };
//         component.toDate = new NgbDate(0, 0, 0);
//         const date: NgbDate = new NgbDate(0, 0, 0);

//         component.onToDateSelection(date);
//         filterService.setDateRange(component.optionSelected);
//         fixture.detectChanges();
//         expect(component.toDate).not.toBeNull();
//     });
//     it('should have called onWhenOptionsSelected method', () => {
//         component.optionSelected = {
//             view: '',
//             when: '7',
//             sort: '',
//             from: '',
//             to: ''
//         };
//         component.toDate = new NgbDate(0, 0, 0);
//         const date: NgbDate = new NgbDate(0, 0, 0);

//         component.onWhenOptionsSelected();
//         filterService.setWhenOptionsSelected(component.optionSelected.when);
//         fixture.detectChanges();
//         expect(component.optionSelected.when).not.toBe('custom');
//     });

//     it('should have called ngOnViewInit method for default selection', () => {
//         component.ngOnViewInit();
//         fixture.detectChanges();
//         expect(component.optionSelected.view).toBe('assesment');
//     });
//     it('should have called onSortByOptionsSelected method', () => {
//         filterService.setSortByOptionsSelected({
//             key: 'observations',
//             value: 'Observations'
//         });
//         component.onSortByOptionsSelected();
//         fixture.detectChanges();
//         expect(component.optionSelected.sort).not.toBeNull();
//     });

//     it('should have called onViewOptionsSelected method', () => {
//         filterService.setViewOptionsSelected({
//             key: 'ongoing',
//             value: 'Ongoing Assesments'
//         });
//         component.onViewOptionsSelected();
//         fixture.detectChanges();
//         expect(component.optionSelected.view).not.toBeNull();
//     });

//     it('should have called toggleForm', () => {
//         spyOn(component.showFilter, 'emit');
//         component.toggleForm();
//         expect(component.showFilter.emit).toHaveBeenCalledWith(true);
//         component.toggleForm();
//         fixture.detectChanges();
//     });

//     it('should have called isDateRangeValidated method', () => {
//         component.optionSelected.from = '10/11/2018';
//         component.optionSelected.to = '12/11/2018';
//         component.isDateRangeValidated();
//         fixture.detectChanges();
//         expect(component.isDateRangeValidated()).toBe(true);
//     });

//     it('should have called isDateRangeValidated method for invalid date', () => {
//         component.optionSelected.from = '12/11/2018';
//         component.optionSelected.to = '10/11/2018';
//         const error = {
//             'message': ErrorMessageConstants.errorMessages.calendarWarning
//         };
//         component.isDateRangeValidated();
//         fixture.detectChanges();
//         expect(component.isDateRangeValidated()).toBe(false);
//     });

// });
