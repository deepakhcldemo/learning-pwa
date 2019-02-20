// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { AssessmentChecklistComponent } from './assessment-checklist.component';
// import { HeaderComponent } from '../../../../shared/components/header/header.component';
// import { HeaderService } from '../../../../shared/components/header/header.service';
// import { CommentComponent } from '../comment/comment.component';
// import { FooterComponent } from '../../../../shared/components/footer/footer.component';
// import { DateFormatPipe } from '../../../../shared/pipes/date-format.pipe';
// import { AssessmentService } from '../../../../shared/services/assessment.service';
// import { FirebaseDbService } from '../../../../shared/services/firebase.db.service';
// import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
// import { HttpClientModule } from '@angular/common/http';
// import { IndexedDbService } from '../../../../shared/services/indexed.db.service';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../../../environments/environment';
// import { CustomErrorHandlerService } from '../../../../shared/services/custom.errorhandler.service';
// import { AlertService } from '../../../../shared/components/alert/alert.service';
// import { MediaService } from '../../../../shared/services/media.service';
// import { UploadFileService } from '../../../../shared/services/upload-file.service';
// import { NotesService } from '../../../../shared/services/notes.service';
// import { TelemetryService } from '../../../../shared/services/telemetry.service';
// import { of } from 'rxjs';
// import { AssessmentNavigationData } from '../../../../shared/mock-data/Assessment-checklist';
// import { FooterService } from 'src/app/shared/components/footer/footer.service';
// import { ObservationDalService } from 'src/app/shared/services/realtime-datalayer/observation-dal.service';
// import { StudentService } from 'src/app/shared/services/student.service';
// import { CommentDalService } from 'src/app/shared/services/realtime-datalayer/comment-dal.service';
// import { GlobalService } from 'src/app/global.service';
// import { RosterService } from 'src/app/shared/services/roster.service';

// import { UserService } from 'src/app/auth/user.service';

// describe('AssessmentChecklistComponent', () => {
//     // tslint:disable-next-line:prefer-const
//     let fixture: ComponentFixture<AssessmentChecklistComponent>;
//     let assessmentChecklist: AssessmentChecklistComponent;
//     let assessmentService: AssessmentService;
//     let observationDalService: ObservationDalService;
//     let headerService: HeaderService;
//     let mediaService: MediaService;
//     let userService: UserService;
//     let telemetryService: TelemetryService;
//     let studentService: StudentService;
//     let commentDalService: CommentDalService;
//     let globalService: GlobalService;
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [AssessmentChecklistComponent,
//                 HeaderComponent,
//                 CommentComponent,
//                 FooterComponent,
//                 DateFormatPipe
//             ],
//             providers: [
//                 HeaderService,
//                 FirebaseDbService,
//                 AssessmentService,
//                 AngularFirestore,
//                 AngularFirestoreModule,
//                 IndexedDbService,
//                 AngularFireDatabaseModule,
//                 CustomErrorHandlerService,
//                 AlertService,
//                 ObservationDalService,
//                 MediaService,
//                 UploadFileService,
//                 NotesService,
//                 TelemetryService,
//                 FooterService,
//                 CommentDalService,
//                 GlobalService,
//                 UserService,
//                 RosterService
//             ],
//             imports: [HttpClientModule,
//                 RouterTestingModule,
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule,
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(AssessmentChecklistComponent);
//         assessmentChecklist = fixture.componentInstance;
//         assessmentService = TestBed.get(AssessmentService);
//         observationDalService = TestBed.get(ObservationDalService);
//         headerService = TestBed.get(HeaderService);
//         mediaService = TestBed.get(MediaService);
//         globalService = TestBed.get(GlobalService);
//         telemetryService = TestBed.get(TelemetryService);
//         studentService = TestBed.get(StudentService);
//         commentDalService = TestBed.get(CommentDalService);
//         userService = TestBed.get(UserService);
//         assessmentChecklist.productId = [
//             '1730939', '1730923', '1730940'];
//         assessmentService._navData.navigation = AssessmentNavigationData.NavigationData;
//         const accordianData = [
//             AssessmentNavigationData.AssessmentCheklistAccordData
//         ];

//         const mediaList = [
//             {
//                 caption: 'testing',
//                 id: '00907760',
//                 mediaDescription: '',
//                 mediaid: '00907760',
//                 mediakind: 'image',
//                 path: 'https://firebasestorage.googleapis.com/v0/b/scout-demo-e52b4.appspot.',
//                 product: '1730940',
//                 students: ['ffffffff5bb290def856993930d369a2'],
//                 types: 'Media'
//             }
//         ];
//         const spyOngetMediaList = spyOn(mediaService, 'getMediaList').and.returnValue(
//             of(mediaList)
//         );
//         mediaService.getMediaList().subscribe((mediaData) => {

//         });
//         expect(spyOngetMediaList).toHaveBeenCalled();
//     //    const spyOngetNavigationByIds = spyOn(globalService, 'getNavigationByIds').and.returnValue(accordianData);
//       //  assessmentChecklist.accordionData = globalService.getNavigationByIds(assessmentChecklist.productId);
//       //  expect(spyOngetNavigationByIds).toHaveBeenCalledWith(assessmentChecklist.productId);
//         expect(assessmentChecklist.accordianData).toBeDefined();
//         const spyongetAllCommentsList = spyOn(commentDalService, 'getAllCommentsList').and.returnValue(of(
//             [
//                 {
//                     'assessmentid': '320',
//                     'assessmentitemdetails': {
//                         'benchmarks': [1],
//                         'id': 1,
//                         'mathpractices': [2]
//                     },
//                     'assessmentitemid': 1135,
//                     'comments': 'do Studnets',
//                     'ctype': 'comment',
//                     'deleted': false,
//                     'id': '00455225',
//                     'isobserved': false,
//                     'mediaid': '',
//                     'parent': '1|1|63|610',
//                     students: ['ffffffff5bb290def856993930d369a2']
//                 }
//             ]
//         ));
//         commentDalService.getAllCommentsList().subscribe((assessCommentItem) => {
//             assessCommentItem.sort();
//         });

//         const spyongetAssessmentObservations = spyOn(observationDalService, 'getAssessmentObservations').and.returnValue(of(
//             [
//                 {
//                     'assessmentid': '320',
//                     'assessmentitemdetails': [{
//                         'benchmarks': [1],
//                         'id': 1,
//                         'mathpractices': [2]
//                     }
//                     ],
//                     'assessmentitemid': 1135,
//                     'comments': 'do Studnets',
//                     'ctype': 'comment',
//                     'deleted': false,
//                     'id': '00455225',
//                     'isobserved': false,
//                     'mediaid': '',
//                     'parent': '1|1|63|610'
//                 }
//             ]
//         ));
//         assessmentChecklist.assessmentAnswer = observationDalService.getAssessmentObservations().subscribe((assesstAnswer) => {
//             assessmentChecklist.getAllObservation = assesstAnswer;
//         });
//         expect(spyongetAssessmentObservations).toHaveBeenCalled();
//         const spyOnsetHeaderTitle = spyOn(headerService, 'setHeaderTitle');
//         headerService.setHeaderTitle('Report CheckList Heading');
//         expect(spyOnsetHeaderTitle).toHaveBeenCalledWith('Report CheckList Heading');
//         const telemetryData = AssessmentNavigationData.TelemetryData;
//         fixture.detectChanges();
//     });
//     it('should check for method of User Service', () => {
//         const callback = function (getStudentList) {

//         };
//         const studentDetails = [
//             {
//                 'avatar': '0a',
//                 'emailAddress': 'emailaddress@pearson.com',
//                 'firstName': '0911',
//                 'fullName': '0911 adaptive',
//                 'lastName': 'adaptive',
//                 'userId': 'ffffffff59b667fd45d99156d4fa1d53',
//             }
//         ];
//         const sypOngetAllStudentDetail = spyOn(studentService, 'getAllStudentDetail').and.returnValue(
//             studentDetails
//         );
//         studentService.getAllStudentDetail(studentDetails);
//         expect(sypOngetAllStudentDetail).toHaveBeenCalledWith(studentDetails);
//         assessmentChecklist.getStudentList();
//         expect(assessmentChecklist.studentList).toBeDefined();
//         fixture.detectChanges();
//     });
//     it('it should intialize the component', () => {
//         assessmentChecklist.ngOnInit();
//         fixture.detectChanges();
//     });
//     it('it should call getGradeName method', () => {
//         const getGradeName = AssessmentNavigationData.NavigationData;
//         fixture.detectChanges();
//         assessmentChecklist.getGradeName(getGradeName);
//         expect(assessmentChecklist.selectedMobUnit).toBeUndefined();
//     });

//     it('adding Units under the grades', () => {
//         const getShortName = 'Unit 1';
//         const trackIndex = 1;
//         const grade = {
//             'changeColor': true,
//             'hideDownArrow': true,
//             'id': '1',
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
//             ],
//             'parent': '1',
//             'practice': {
//                 'benchmarks': [0, 1],
//                 'mathpractices': [283, 283]
//             },
//             'sequence': 1,
//             'shortname': 'Unit 1',
//             'title': 'Counting People, Sorting Buttons'
//         };
//         assessmentChecklist.assessmentUnit = 'Unit';
//         assessmentChecklist.practiceList = [{
//             'parent': '1|1',
//             'type': 'benchmarks',
//             'detail': {
//                 'description': 'Count and count out a set of up to 10 objects',
//                 'id': '1',
//                 'title': 'Benchmark 1'
//             }
//         }];
//         assessmentChecklist.addingUnitsUnderGrades(getShortName, trackIndex, grade);
//         expect(assessmentChecklist.selectedMobUnit).toEqual(grade.shortname);
//         fixture.detectChanges();
//     });

//     it('it should check getBenchMark', () => {
//         const getSpecificUnit = AssessmentNavigationData.AssessmentSpecificGrade;
//         const assessmentsItem = [{
//             'description': 'Describe',
//             'id': '2',
//             'title': 'Benchmark 2'
//         }];
//         const benchmarks = 'benchmarks';
//         const benchmarksArray = [
//             1, 2
//         ];
//         assessmentChecklist.assessmentUnit = 'Unit';
//         const spyOngetAssessmentItemByIds = spyOn(assessmentService, 'getAssessmentItemByIds').and.returnValue(assessmentsItem);
//         assessmentService._navData.assessmentitem = {
//             'benchmark': [
//                 {
//                     'description': 'Count and count out a set of up to 10 objects',
//                     'id': '1',
//                     'title': 'Benchmark 1'
//                 }
//             ]
//         };
//         assessmentChecklist.benchMark = assessmentService.getAssessmentItemByIds(benchmarks, benchmarksArray);
//         expect(spyOngetAssessmentItemByIds).toHaveBeenCalledWith(benchmarks, benchmarksArray);
//         assessmentChecklist.getBenchMarkMathPractice(getSpecificUnit);
//         fixture.detectChanges();
//     });

//     it('it should check getObservationPerStudent method with matching assessment id', () => {
//         const getAllStudents = [
//             {
//                 'detail': {
//                     'avatar': 'ad',
//                     'emailAddress': 'emailaddress@pearson.com',
//                     'firstName': 'ash',
//                     'fullName': 'ash dev',
//                     'lastName': 'dev'

//                 },
//                 'assessmentitem': [
//                     {
//                         'comment': {
//                             'assessmentid': '320',
//                             'assessmentitemdetails': [{
//                                 'benchmarks': [1],
//                                 'id': 1,
//                                 'mathpractices': [2]
//                             }
//                             ],
//                             'checked': true,
//                             'createdat': {
//                                 'nanoseconds': 994000000,
//                                 'seconds': 1542972862
//                             },
//                             'assessmentitemid': 1135,
//                             'comments': 'do Studnets',
//                             'ctype': 'comment',
//                             'deleted': false,
//                             'id': '00455225',
//                             'isobserved': false,
//                             'mediaid': '',
//                             'parent': '1|1|63|610',
//                             'students': ['111111111'],
//                             'type': 'checklist',
//                             'updatedat': {
//                                 'nanoseconds': 994000000,
//                                 'seconds': 1542972862
//                             }
//                         }
//                     }
//                 ]
//             }
//         ];
//         assessmentChecklist.getObservationPerStudent(getAllStudents);
//         fixture.detectChanges();
//     });

//     it('it should check getObservationPerStudent method with not matching assessment id', () => {
//         const getAllStudents = [
//             {
//                 'detail': {
//                     'avatar': 'ad',
//                     'emailAddress': 'emailaddress@pearson.com',
//                     'firstName': 'ash',
//                     'fullName': 'ash dev',
//                     'lastName': 'dev'

//                 },
//                 'assessmentitem': [
//                     {
//                         'comment': {
//                             'assessmentid': '',
//                             'assessmentitemdetails': [{
//                                 'benchmarks': [1],
//                                 'id': 1,
//                                 'mathpractices': [2]
//                             }
//                             ],
//                             'checked': true,
//                             'createdat': {
//                                 'nanoseconds': 994000000,
//                                 'seconds': 1542972862
//                             },
//                             'assessmentitemid': 1135,
//                             'comments': 'do Studnets',
//                             'ctype': 'comment',
//                             'deleted': false,
//                             'id': '00455225',
//                             'isobserved': false,
//                             'mediaid': '',
//                             'parent': '1|1|63|610',
//                             'students': ['111111111'],
//                             'type': 'checklist',
//                             'updatedat': {
//                                 'nanoseconds': 994000000,
//                                 'seconds': 1542972862
//                             }
//                         }
//                     }
//                 ]
//             }
//         ];
//         assessmentChecklist.getObservationPerStudent(getAllStudents);
//         fixture.detectChanges();
//     });

//     it('it should check getAssessMentFocus method', () => {
//         let paramID = 'A';
//         paramID = 'id' + '_' + paramID.toLowerCase();
//         assessmentChecklist.getAssessMentFocus(paramID);
//         fixture.detectChanges();
//     });


//     it('it should check getAssessMentFocus method for mobile device', () => {
//         let paramID = 'A';
//         let studentList;
//         paramID = 'id' + '_' + paramID.toLowerCase();
//         if (window.innerWidth <= 1023) {
//             studentList = document.getElementById('student-list-ids-mobile');
//             expect(studentList).toBeDefined();
//         } else {
//             studentList = document.getElementById('student-list-ids');
//             expect(studentList).toBeDefined();
//         }
//         assessmentChecklist.getAssessMentFocus(paramID);
//         fixture.detectChanges();
//     });

//     it('it should check expanGrids method', () => {
//         const grid = AssessmentNavigationData.AssessmentChecklistGrade;
//         const shortName = 'Kindergarten';
//         const trackIndex = 0;
//         assessmentChecklist.expanGrids(grid, shortName, trackIndex);
//         expect(assessmentChecklist.isUnit).toBeTruthy();
//         expect(assessmentChecklist.selectedGrid).toBeDefined();
//         fixture.detectChanges();
//     });


//     it('it should check expanGrids method without nodes and without practice', () => {
//         const grid = AssessmentNavigationData.AssessmentGradeWithOutPractice;
//         const shortName = 'Kindergarten';
//         const trackIndex = 0;
//         assessmentChecklist.expanGrids(grid, shortName, trackIndex);
//         expect(assessmentChecklist.isUnit).toBeTruthy();
//         expect(assessmentChecklist.selectedGrid).toBeDefined();
//         fixture.detectChanges();
//     });

//     it('it should check function for closeAccordian ', () => {
//         const elementToClose = {
//             'assessmentItem': true,
//             'changeColor': false,
//             'grades': true,
//             'hideDownArrow': true,
//             'hideArrow': true,
//             'id': '1',
//             'isbn': [
//                 '9780328946143'
//             ],
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
//             ],
//             'productId': '1730939',
//             'sequence': 1,
//             'shortname': 'Kindergarten',
//             'title': 'Kindergarten',
//         };
//         const trackIndex = 1;
//         elementToClose.hideDownArrow = false;
//         elementToClose.assessmentItem = true;
//         assessmentChecklist.iterator = [{
//             assessmentItem: true,
//             productId: '1730939',
//             assessmentid: 781,
//             assessmentitemdetails: {
//                 benchmarks: [1],
//                 id: 20,
//                 mathpractices: [2],
//                 title: 'Count and count out a set of up to 10 objects'
//             },
//             assessmentitemid: 781,
//             comments: 'No Comment',
//             ctype: 'CheckList',
//             deleted: false,
//             id: '1',
//             isobserved: false,
//             mediaid: '',
//             students: ['11111'],
//             type: 'Count and count out a set of up to 10 objects',
//             hideDownArrow: true,
//             grades: true,
//             changeColor: true,
//             hideArrow: true,
//             detail: {
//                 'description': 'Count and count out a set of up to 10 objects',
//                 'id': '1',
//                 title: 'BenchMark 1'
//             },
//             hideTitle: true
//         }
//         ];

//         assessmentChecklist.closeAccordian(elementToClose, trackIndex);
//         expect(elementToClose.assessmentItem).toBeTruthy();
//         fixture.detectChanges();
//     });

//     it('it should check function for backToCheckList ', () => {
//         assessmentChecklist.backToCheckList();
//         expect(assessmentChecklist.hidemobile).toBeFalsy();
//         expect(assessmentChecklist.toggleNavigation).toBeFalsy();
//         fixture.detectChanges();
//     });

//     it('it should check function for selectedPractice ', () => {
//         const practice = {
//             changeColor: true,
//             hideArrow: true,
//             hideDownArrow: false,
//             hideTitle: true,
//             parent: '1|1',
//             detail: {
//                 'description': 'Count and count out a set of up to 10 objects',
//                 'id': '1',
//                 'title': 'BenchMark 1',
//             },
//             type: 'benchmarks'
//         };
//         const index = 0;
//         assessmentChecklist.selectedPractice(index, practice);
//     });


//     it('it should check function for getCommentsByAssessmentItem ', () => {
//         const practice = [{
//             changeColor: true,
//             hideArrow: true,
//             hideDownArrow: false,
//             hideTitle: true,
//             parent: '1|1|63|610',
//             detail: {
//                 'description': 'Count and count out a set of up to 10 objects',
//                 'id': '1',
//                 'title': 'BenchMark 1',
//             },
//             type: 'benchmarks'
//         }];
//         const index = 0;
//         assessmentChecklist.studentAssessmentData['currentStudent'] = [];
//         assessmentChecklist.allCommentList =  [{
//             assessmentid: '320',
//             assessmentitemid: 1034,
//             comments: 'text',
//             assessmentitemdetails: {
//                 'benchmarks': [1],
//                 'id': 1,
//                 'mathpractices': [2]
//             },
//             ctype: 'comment',
//             deleted: false,
//             id: '22652924',
//             isobserved: false,
//             mediaid: '',
//             parent: '1|1|64|253',
//             type: 'checklist',
//             students: ['ffffffff5bb290def856993930d369a2']
//         }];
//         assessmentChecklist.studentList = [{
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             userId: 'ffffffff59b667fd45d99156d4fa1d53'
//         }];
//         assessmentChecklist.getCommentsByAssessmentItem(practice);
//     });

//     it('it should check method for removingUnitsFromGrades ', () => {
//         const trackIndex = 0;
//         const selectedUnit = [{
//             assessmentItem: true,
//             changeColor: false,
//             grades: true,
//             hideDownArrow: true,
//             hideArrow: true,
//             isbn: ['9780328946143', '9780328938490'],
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
//             ],
//             productId: '1730939',
//             sequence: 1,
//             shortname: 'Kindergarten',
//             title: 'Kindergarten'
//         },
//         {
//             assessmentItem: true,
//             changeColor: false,
//             grades: true,
//             hideDownArrow: true,
//             hideArrow: true,
//             isbn: ['9780328946143', '9780328938490'],
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
//             ],
//             productId: '1730939',
//             sequence: 1,
//             shortname: 'Kindergarten',
//             title: 'Kindergarten'
//         }
//         ];
//         assessmentChecklist.removingUnitsFromGrades(selectedUnit, trackIndex);
//         expect(assessmentChecklist.hidemobile).toBeFalsy();
//     });


//     it('it should check method for removingUnitsFromGrades with false property ', () => {
//         const trackIndex = 0;
//         const selectedUnit = [{
//             assessmentItem: true,
//             changeColor: false,
//             grades: true,
//             hideDownArrow: true,
//             hideArrow: false,
//             isbn: ['9780328946143', '9780328938490'],
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
//             ],
//             productId: '1730939',
//             sequence: 1,
//             shortname: 'Kindergarten',
//             title: 'Kindergarten'
//         },
//         {
//             assessmentItem: true,
//             changeColor: false,
//             grades: true,
//             hideDownArrow: true,
//             hideArrow: false,
//             isbn: ['9780328946143', '9780328938490'],
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
//             ],
//             productId: '1730939',
//             sequence: 1,
//             shortname: 'Kindergarten',
//             title: 'Kindergarten'
//         }
//         ];
//         assessmentChecklist.removingUnitsFromGrades(selectedUnit, trackIndex);
//         expect(assessmentChecklist.hidemobile).toBeFalsy();
//     });


//     it('it should check function for tabOnNoRecords method ', () => {
//          assessmentChecklist.tabOnNoRecord();
//         fixture.detectChanges();
//     });
// });
