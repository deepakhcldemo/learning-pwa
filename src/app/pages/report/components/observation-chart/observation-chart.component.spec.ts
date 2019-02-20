// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ObservationChartComponent } from './observation-chart.component';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../../../environments/environment';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { HttpClientModule } from '@angular/common/http';
// import { IndexedDbService } from '../../../../shared/services/indexed.db.service';
// import { AssessmentService } from '../../../../shared/services/assessment.service';
// import { FirebaseDbService } from '../../../../shared/services/firebase.db.service';
// import { CustomErrorHandlerService } from '../../../../shared/services/custom.errorhandler.service';
// import { AlertService } from '../../../../shared/components/alert/alert.service';
// import { ObservedAssessment } from '../../../../models/report.model';
// import { ObservationChartService } from '../../services/observation-chart.service';
// import { of } from 'rxjs';
// import { FilterService } from '../../services/filter.service';
// import { TelemetryService } from '../../../../shared/services/telemetry.service';
// import { ProductService } from 'src/app/shared/services/product.service';
// import { StudentService } from 'src/app/shared/services/student.service';
// import { RosterService } from 'src/app/shared/services/roster.service';
// import { UserService } from 'src/app/auth/user.service';

// describe('ObservationChartComponent', () => {
//     let component: ObservationChartComponent;
//     let fixture: ComponentFixture<ObservationChartComponent>;
//     let assessmentService: AssessmentService;
//     let userService: UserService;
//     let observationChartService: ObservationChartService;
//     let errorHandler: CustomErrorHandlerService;
//     let filterService: FilterService;
//     let productService: ProductService;
//     let studentService: StudentService;
//     const studentList = [{
//         avatar: '0a',
//         emailAddress: 'emailaddress@pearson.com',
//         firstName: '0911',
//         fullName: '0911 adaptive',
//         lastName: 'adaptive',
//         observationCount: 0,
//         userId: 'ffffffff5bb290def856993930d369a2',
//         observed: [{
//             assessmentitemid: 1117,
//             id: '6CfEHWPm2cDhr9Eve5Od',
//             isobserved: true,
//         }, {
//             assessmentitemid: 1110,
//             id: 'utSUv31tulNWigr4WTlm',
//             isobserved: true,
//         }
//         ]
//     }, {
//         avatar: '1f',
//         emailAddress: 'emailaddress@pearson.com',
//         firstName: '10',
//         fullName: '10 feb',
//         lastName: 'feb',
//         userId: 'ffffffff5a7d7439f02ebd1b9347e303',
//         observationCount: 1,
//         observed: [{
//             assessmentitemid: 1117,
//             id: '6CfEHWPm2cDhr9Eve5Od',
//             isobserved: true,
//         }, {
//             assessmentitemid: 1110,
//             id: 'utSUv31tulNWigr4WTlm',
//             isobserved: true,
//         }
//         ]
//     }];
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [ObservationChartComponent],
//             imports: [AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule,
//                 HttpClientModule,
//             ],
//             providers: [UserService,
//                 IndexedDbService,
//                 AssessmentService,
//                 FirebaseDbService,
//                 CustomErrorHandlerService,
//                 AlertService,
//                 CustomErrorHandlerService,
//                 TelemetryService,
//                 StudentService,
//                 RosterService
//             ],
//             schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(ObservationChartComponent);
//         component = fixture.componentInstance;
//         assessmentService = TestBed.get(AssessmentService);
//         productService = TestBed.get(ProductService);
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
//     it('should check default filter defined', () => {
//         const optionSelected = {
//             view: 'checklist',
//             when: '',
//             sort: 'student',
//             from: '',
//             to: ''
//         };
//         expect(component.optionSelected).toEqual(optionSelected);
//     });
//     it('should have studentList', () => {
//         expect(component.studentList).not.toBeNull();
//     });
//     it('should have a userService instance', () => {
//         expect(userService).toBeDefined();
//     });
//     it('should have a assessmentService instance', () => {
//         expect(assessmentService).toBeDefined();
//     });
//     it('should have a assessmentService instance', () => {
//         expect(assessmentService).toBeDefined();
//     });
//     it('should have called getObservationData method', () => {
//         observationChartService = TestBed.get(ObservationChartService);
//         errorHandler = TestBed.get(CustomErrorHandlerService);
//         component.observationDataList = [];
//         const spy = spyOn(observationChartService, 'getObservationData').and.returnValue(
//             of([{
//                 assessmentid: 778,
//                 assessmentitemdetails: { benchmarks: [], id: 5154, mathpractices: [], title: 'Calculates multiple of 10 currectly.' },
//                 assessmentitemid: 5154,
//                 comments: 'new comment',
//                 comment: '',
//                 createdat: { seconds: 1542365256, nanoseconds: 79000000 },
//                 deleted: false,
//                 isobserved: false,
//                 mediaid: '',
//                 parent: '336566|1|1|1',
//                 student: 'ffffffff5aab5e6ff856993c2720cf83',
//                 students: ['ffffffff5aab5e6ff856993c2720cf83'],
//                 type: 'checklist',
//                 ctype: 'note',
//                 updatedat: { seconds: 1542365256, nanoseconds: 79000000 }
//             }])
//         );
//         //  component.getObservationData();
//         observationChartService.getObservationData().subscribe((observation) => {
//             // component.observationDataList.push(observation);
//             expect(observation).not.toBeNull();
//             component.setScaling();
//         }, error => {
//             errorHandler.handleError(error);
//         });
//         expect(component.observationDataList).not.toBeNull();
//         component.getObservationData();
//         expect(spy).toHaveBeenCalled();
//     });

//     it('should have called setScaling method', () => {
//         filterService = TestBed.get(FilterService);
//         const optionSelected = {
//             view: 'checklist',
//             when: '',
//             sort: 'student',
//             from: '',
//             to: ''
//         };
//         // component.filterStudentCommentCount(optionSelected['view']);
//         const spy = spyOn(filterService, 'getViewOptionsSelected').and.returnValue(
//             of({
//                 key: 'checklist',
//                 value: 'Assessment Checklist',
//             })
//         );
//         filterService.getViewOptionsSelected().subscribe((value) => {
//             expect(value.key).toBe('checklist');
//             component.studentList = studentList;
//             component.optionSelected['view'] = value.key;
//         });
//         expect(spy).toHaveBeenCalled();
//         const spyComponent = spyOn(component, 'filterStudentCommentCount');
//         component.filterStudentCommentCount('checklist');
//         expect(spyComponent).toHaveBeenCalledWith(optionSelected['view']);

//         const spyCalender = spyOn(filterService, 'getupdatedDataSelection').and.returnValue(
//             of({
//                 from: '11/23/2018',
//                 to: '11/24/2018'
//             })
//         );
//         filterService.getupdatedDataSelection().subscribe((value) => {
//             expect(value).not.toBeNull();
//             component.optionSelected['from'] = value.from;
//             component.optionSelected['to'] = value.to;
//         });
//         expect(spyCalender).toHaveBeenCalled();


//         const spyWhen = spyOn(filterService, 'getWhenOptionsSelected').and.returnValue(
//             of({
//                 key: '7',
//                 value: 'Last 7 days'
//             })
//         );
//         filterService.getWhenOptionsSelected().subscribe((value) => {
//             expect(value).not.toBeNull();
//             component.optionSelected['when'] = value.key;
//         });
//         expect(spyWhen).toHaveBeenCalled();

//         const spySort = spyOn(filterService, 'getSortByOptionsSelected').and.returnValue(
//             of({
//                 key: 'student',
//                 value: 'Student'
//             })
//         );
//         filterService.getSortByOptionsSelected().subscribe((value) => {
//             expect(value).not.toBeNull();
//             component.optionSelected['sort'] = value.key;
//         });
//         expect(spySort).toHaveBeenCalled();

//         component.setScaling();
//     });
//     it('should have called filterStudentCommentCount method', () => {
//         component.studentList = studentList;
//         component.optionSelected = {
//             view: 'checklist',
//             when: '',
//             sort: 'student',
//             from: '',
//             to: ''
//         };
//         component.filterStudentCommentCount('checklist');
//         const spy = spyOn(component, 'scaleWithMaxCount');
//         component.scaleWithMaxCount();
//         expect(spy).toHaveBeenCalled();


//     });
//     it('should have called filterStudentByObservationCount method with "checklist"', () => {
//         component.studentList = studentList;
//         component.optionSelected = {
//             view: 'checklist',
//             when: '',
//             sort: 'student',
//             from: '',
//             to: ''
//         };

//         const spy = spyOn(component, 'filterStudentByObservationCount');
//         component.filterStudentByObservationCount('student');
//         expect(spy).toHaveBeenCalledWith('student');


//     });
//     it('should have called filterStudentByObservationCount method with "observations"', () => {
//         component.studentList = studentList;
//         component.optionSelected = {
//             view: 'checklist',
//             when: '',
//             sort: 'observations',
//             from: '',
//             to: ''
//         };

//         //   const spy = spyOn(component, 'filterStudentByObservationCount');
//         component.filterStudentByObservationCount('observations');
//         //  expect(spy).toHaveBeenCalledWith('observations');


//     });
//     it('should have called ngOninit', () => {
//         userService = TestBed.get(UserService);
//         studentService = TestBed.get(StudentService);
//         observationChartService = TestBed.get(ObservationChartService);
//         const spy = spyOn(studentService, 'getStudentDetailsByProduct').and.returnValue(
//             of(studentList)
//         );
//         studentService.getStudentDetailsByProduct(productService.getCurrentProduct().productID, studentList);
//         expect(spy).toHaveBeenCalledWith(productService.getCurrentProduct().productID, studentList);

//         const spyObservation = spyOn(observationChartService, 'getobservedAssementItems').and.returnValue(
//             of([{
//                 assessmentid: '314',
//                 assessmentitemid: 1117,
//                 createdat: { seconds: 1542988568, nanoseconds: 402000000 },
//                 id: '6CfEHWPm2cDhr9Eve5Od',
//                 isobserved: true,
//                 parent: '3|17|63|609',
//                 path: 'Grade 2|Unit 1|Investigation 1|Session 1.1',
//                 students: 'ffffffff5bb290def856993930d369a2',
//                 updatedat: { seconds: 1542988568, nanoseconds: 402000000 }
//             }])
//         );
//         observationChartService.getobservedAssementItems().subscribe((assessment: Array<ObservedAssessment>) => {
//             component.observedAssessment = [];
//             component.observedAssessment = assessment;
//         });
//         observationChartService.getobservedAssementItems();
//         expect(spyObservation).toHaveBeenCalled();
//         component.ngOnInit();
//         fixture.detectChanges();
//     });
//     it('should have called mapObservationCount method', () => {
//         component.optionSelected = {
//             view: 'checklist',
//             when: '',
//             sort: 'student',
//             from: '',
//             to: ''
//         };
//         const filteredComment = [{
//             assessmentid: '288',
//             assessmentitemdetails: {
//                 benchmarks: [], id: 1034, mathpractices: [], sequence: 2, title: 'Can explain why order doesn\'t matter in addition'
//             },
//             assessmentitemid: 1034,
//             comments: 'tester',
//             createdat: { seconds: 1543217036, nanoseconds: 948000000 },
//             ctype: 'comment',
//             deleted: false,
//             isobserved: false,
//             mediaid: '',
//             parent: '3|17|64|253',
//             student: 'ffffffff5bb290def856993930d369a2',
//             students: ['ffffffff5bb290def856993930d369a2'],
//             type: 'checklist',
//             updatedat: { seconds: 1543217036, nanoseconds: 948000000 }
//         }];
//         component.studentList = studentList;
//         //   const spy = spyOn(component, 'mapObservationCount');
//         component.mapObservationCount(filteredComment);
//         component.scaleWithMaxCount();
//         //  expect(spy).toHaveBeenCalledWith(filteredComment);

//     });
//     it('should have called ngOnInit method', async () => {
//         component.ngOnInit();
//         const spy = spyOn(component, 'ngOnInit');
//         component.ngOnInit();
//         expect(spy).toHaveBeenCalled();
//     });



// });
