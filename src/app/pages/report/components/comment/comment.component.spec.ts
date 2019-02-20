// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { AccordionService } from 'src/app/shared/services/accordion.service';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { IndexedDbService } from 'src/app/shared/services/indexed.db.service';
// import { Router } from '@angular/router';
// import { CommentComponent } from './comment.component';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';
// import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from 'src/environments/environment.prod';
// import { AssessmentNavigationData } from 'src/app/shared/mock-data/Assessment-checklist';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AssessmentService } from 'src/app/shared/services/assessment.service';
// import { FormsModule } from '@angular/forms';
// import { AlertService } from 'src/app/shared/components/alert/alert.service';
// import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
// import { FirebaseDbService } from 'src/app/shared/services/firebase.db.service';
// import { CustomErrorHandlerService } from 'src/app/shared/services/custom.errorhandler.service';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { of } from 'rxjs';
// import { TelemetryService } from 'src/app/shared/services/telemetry.service';
// import { StudentService } from 'src/app/shared/services/student.service';
// import { GlobalService } from 'src/app/global.service';
// import { RosterService } from 'src/app/shared/services/roster.service';
// import { UserService } from 'src/app/auth/user.service';

// describe('CommentComponent', () => {
//     let fixture: ComponentFixture<CommentComponent>;
//     const mockRouter = {
//         navigate: jasmine.createSpy('navigate')
//     };
//     let userService: UserService;
//     let assessmentService: AssessmentService;
//     let accordionService: AccordionService;
//     let spinnerService: NgxSpinnerService;
//     let commentComponentInstance: CommentComponent;
//     let studentService: StudentService;
//     let globalService: GlobalService;
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [CommentComponent, DateFormatPipe],
//             imports: [
//                 ReactiveFormsModule,
//                 FormsModule,
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFireDatabaseModule
//             ],

//             providers: [
//                 { provide: Router, useValue: mockRouter },
//                 CustomErrorHandlerService,
//                 AlertService,
//                 AssessmentService,
//                 FirebaseDbService,
//                 AngularFirestore,
//                 AngularFirestoreModule,
//                 UserService,
//                 HttpClient,
//                 HttpHandler,
//                 IndexedDbService,
//                 AccordionService,
//                 AngularFireDatabaseModule,
//                 NgxSpinnerService,
//                 TelemetryService,
//                 StudentService,
//                 GlobalService,
//                 RosterService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(CommentComponent);
//         commentComponentInstance = fixture.componentInstance;
//         assessmentService = TestBed.get(AssessmentService);
//         spinnerService = TestBed.get(NgxSpinnerService);
//         accordionService = TestBed.get(AccordionService);
//         studentService = TestBed.get(StudentService);
//         globalService = TestBed.get(GlobalService);
//         const grade = { name: 'Kindergarten', productID: '77772' };
//         assessmentService._navData.navigation = [
//             AssessmentNavigationData.NavigationData
//         ];
//         // const spy = spyOn(globalService, 'convertTreeToList').and.returnValue(
//         //     [
//         //         AssessmentNavigationData.AssessmentConvertToTreeList
//         //     ]
//         // );
//         // globalService.convertTreeToList(grade);
//         const SpyOnSpinnerService = spyOn(spinnerService, 'show');
//         spinnerService.show();
//         expect(SpyOnSpinnerService).toHaveBeenCalled();
//         // expect(spy).toHaveBeenCalledWith(grade);

//         userService = TestBed.get(UserService);
//         userService.setUser(
//             {
//                 'identityId': 'ffffffff51c87040e4b07dddca2a0511',
//                 idpResponse: {
//                     data: {
//                         assertion: {
//                             attributes: {
//                                 DisplayName: 'Teacher',
//                                 EmailAddress: 'no6@pearson.com',
//                                 FirstName: 'realize1',
//                                 Gender: 'U',
//                                 Language: 'en',
//                                 LastName: 'teacher11',
//                                 OrgName1: 'realize_organization1',
//                                 OrgRole1: 'Teacher',
//                                 OrganizationId1: '8a97b1a638c9f02701393168afbf1d20',
//                                 PreferredTimeZone: 'America/New_York',
//                                 Title: 'Colonel.',
//                                 UserId: 'ffffffff51c87040e4b07dddca2a0511',
//                                 UserName: 'realize_teacher',
//                                 UserStatus: 'Active'
//                             }
//                         }
//                     }
//                 }
//             }
//         );
//     });
//     it('check for Intialization', () => {
//         const spyOnAssessmentRecods = spyOn(globalService, 'getAssessmentRecord').and.returnValue(of(
//             [{
//                 'assessments': [
//                     AssessmentNavigationData.AssessmentConvertToTreeList
//                 ],
//                 'assessmentItem': [
//                     AssessmentNavigationData.AssessmentConvertToTreeList,
//                 ],
//                 'parent': '3|17|63|609',
//                 'parentid': '609',
//                 'path': 'Grade 2 > Unit 1 > Investigation 1 > Session 1.1',
//                 'sequence': 281,
//                 'shortname': 'Session 1.1',
//                 'title': 'Students generate different combinations of 10 and use addition notation to record their work.',
//                 'type': 'ongoing'
//             }]
//         ));
//         globalService.getAssessmentRecord().subscribe((assessmentRecords) => {
//             commentComponentInstance._assementChecklist = assessmentRecords;
//         });
//         expect(spyOnAssessmentRecods).toHaveBeenCalled();
//         commentComponentInstance.ngOnInit();
//     });
//     it('should check for Assessment service and assessment chekklist service', () => {
//         const getComment = {
//             'comment': {
//                 'assessmentid': '288',
//                 'assessmentitemdetails': {
//                     'benchmarks': [1],
//                     'id': 1034,
//                     'mathpractice': [282],
//                     'sequence': 2,
//                     'title': 'Can you explain'
//                 },
//                 'assessmentitemid': 1034,
//                 'checked': true,
//                 'comments': 'new comments',
//                 'createdat': {
//                     'nanoseconds': 994000000,
//                     'seconds': 1542972862
//                 },
//                 'ctype': 'comments',
//                 'deleted': false,
//                 'id': '22652924',
//                 'isobserved': false,
//                 'mediaid': '',
//                 'parent': '3|17|64|253',
//                 'students': [
//                     'ffffffff5bb290def856993930d369a2'
//                 ],
//                 'type': 'checklist',
//                 'updatedat': {
//                     'nanoseconds': 994000000,
//                     'seconds': 1542972862
//                 }
//             },
//             'parent': '3|17|64|253|288|1034'
//         };
//         commentComponentInstance._assementChecklist = [{
//             'assessment': AssessmentNavigationData.AssessmentConvertToTreeList,
//             'assessmentItem': AssessmentNavigationData.AssessmentConvertToTreeList,
//             'parent': '3|17|64|253',
//             'parentid': '609',
//             'path': 'Grade 2 > Unit 1 > Investigation 1 > Session 1.1',
//             'sequence': 281,
//             'shortname': 'Session 1.1',
//             'title': 'Students generate different combinations of 10 and use addition ,     notation to record their work.',
//             'type': 'ongoing'
//         }
//         ];
//         commentComponentInstance.redirectToStudent(getComment);
//     });

//     it('should check for setAssessmentNRouteToStudent', () => {
//         const getComment = {
//             'comment': {
//                 'assessmentid': '288',
//                 'assessmentitemdetails': {
//                     'benchmarks': [1],
//                     'id': 1034,
//                     'mathpractice': [282],
//                     'sequence': 2,
//                     'title': 'Can you explain'
//                 },
//                 'assessmentitemid': 1034,
//                 'checked': true,
//                 'comments': 'new comments',
//                 'createdat': {
//                     'nanoseconds': 994000000,
//                     'seconds': 1542972862
//                 },
//                 'ctype': 'comments',
//                 'deleted': false,
//                 'id': '22652924',
//                 'isobserved': false,
//                 'mediaid': '',
//                 'parent': '3|17|64|253',
//                 'students': [
//                     'ffffffff5bb290def856993930d369a2'
//                 ],
//                 'type': 'checklist',
//                 'updatedat': {
//                     'nanoseconds': 994000000,
//                     'seconds': 1542972862
//                 }
//             },
//             'parent': '3|17|64|253|288|1034'
//         };
//         commentComponentInstance._assementChecklist = [{
//             'assessment': AssessmentNavigationData.AssessmentConvertToTreeList,
//             'assessmentItem': AssessmentNavigationData.AssessmentConvertToTreeList,
//             'parent': '3|17|64|253',
//             'parentid': '609',
//             'path': 'Grade 2 > Unit 1 > Investigation 1 > Session 1.1',
//             'sequence': 281,
//             'shortname': 'Session 1.1',
//             'title': 'Students generate different combinations of 10 and use addition ,     notation to record their work.',
//             'type': 'ongoing'
//         }
//         ];

//         const path = 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3';
//         const spyOnassessmentService = spyOn(assessmentService, 'setCurrentAssessment');
//         assessmentService.setCurrentAssessment(commentComponentInstance._assementChecklist);
//         expect(spyOnassessmentService).toHaveBeenCalledWith(commentComponentInstance._assementChecklist);

//         const spyOnsetBreadcrumb = spyOn(accordionService, 'setBreadcrumb');
//         accordionService.setBreadcrumb(path);
//         expect(spyOnsetBreadcrumb).toHaveBeenCalled();
//         const spyOnsetCurrentStudent = spyOn(studentService, 'setCurrentStudent');
//         studentService.setCurrentStudent('ffffffff5bb290def856993930d369a2');
//         expect(spyOnsetCurrentStudent).toHaveBeenCalledWith('ffffffff5bb290def856993930d369a2');
//         commentComponentInstance.setAssessmentNRouteToStudent
//             (commentComponentInstance._assementChecklist, getComment);
//     });


//     it('should check for groupAssessmentItem  method', () => {
//         const comments = [{
//             comment: {
//                 assessmentid: '288',
//                 assessmentitemdetails: {
//                     benchmarks: [1], id: 1034, mathpractices: [282],
//                     sequence: 2,
//                     title: 'Can explain why order doesnt matter in addition'
//                 },
//                 assessmentitemid: 1034,
//                 checked: false,
//                 comment: '',
//                 createdat: { seconds: 1543565566, nanoseconds: 33000000 },
//                 ctype: 'media',
//                 deleted: false,
//                 id: '45t16hvLXKvUCFhfiCRU',
//                 isobserved: true,
//                 mediaData: { id: '57564155', caption: 'untitled', createdat: { seconds: 1543565566, nanoseconds: 33000000 } },
//                 mediaDescription: '',
//                 mediaid: '57564155',
//                 parent: '3|17|64|253',
//                 students: ['ffffffff5bb290def856993930d369a2'],
//                 type: 'checklist',
//                 updatedat: { seconds: 1543565566, nanoseconds: 33000000 }
//             },
//             'parent': '3|17|64|253|288|1034',
//         }
//         ];
//         commentComponentInstance.groupAssessmentItem(comments, 'parent');
//     });
// });
