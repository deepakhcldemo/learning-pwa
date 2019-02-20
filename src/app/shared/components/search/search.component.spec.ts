// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { SearchComponent } from './search.component';
// import { FormsModule } from '@angular/forms';
// import { AssessmentService } from '../../services/assessment.service';
// import { IndexedDbService } from '../../services/indexed.db.service';
// import { SearchService } from 'src/app/shared/services/realtime-datalayer/search-dal.service';
// import { MediaPopupService } from '../media-popup/media-popup.service';
// import { Router, Event, RouterModule } from '@angular/router';
// import { NotesPopupService } from '../edit-notes/notes-popup.service';
// import { AccordionService } from '../../services/accordion.service';
// import { HttpClientModule, HttpHandler, HttpClient } from '@angular/common/http';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../../environments/environment.prod';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { FirebaseDbService } from '../../services/firebase.db.service';
// import { NotesService } from '../../services/notes.service';
// import { CustomErrorHandlerService } from '../../services/custom.errorhandler.service';
// import { AlertService } from '../../components/alert/alert.service';
// import { MediaService } from '../../services/media.service';
// import { UploadFileService } from '../../services/upload-file.service';
// import { of } from 'rxjs';
// import { TelemetryService } from '../../services/telemetry.service';
// import { ModalService } from '../global-modal/modal.service';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { FooterService } from '../footer/footer.service';
// import { AccessibilityService } from '../../services/accessibility.service';
// import { HeaderService } from '../header/header.service';
// import { ProductService } from '../../services/product.service';
// import { StudentService } from '../../services/student.service';
// import { GlobalService } from 'src/app/global.service';
// import { StudentMockData } from '../../mock-data/student.mock.data';
// import { UserService } from 'src/app/auth/user.service';
// import { NotesDalService } from '../../services/realtime-datalayer/notes-dal.service';
// import { CommentDalService } from '../../services/realtime-datalayer/comment-dal.service';
// import { RosterService } from '../../services/roster.service';
// import { LoggerService } from '../../logger.service';
// import { SearchMockData } from '../../mock-data/search.mock.data';
// import { SearchedKeywordsIdb } from 'src/app/models/search.model';
// import { TeacherClassModel } from 'src/app/models/class.model';


// fdescribe('SearchComponent', () => {
//     let component: SearchComponent;
//     let fixture: ComponentFixture<SearchComponent>;
//     let assessmentService: AssessmentService;
//     let searchService: SearchService;
//     let userService: UserService;
//     let studentService: StudentService;
//     let accessibilityService: AccessibilityService;
//     let productService: ProductService;

//     let globalService: GlobalService;
//     const mockRouter = {
//         navigate: jasmine.createSpy('navigate')
//     };
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 FormsModule,
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFireDatabaseModule, NgbModalModule, RouterModule
//             ],
//             declarations: [SearchComponent],
//             providers: [
//                 { provide: Router, useValue: mockRouter },
//                 HeaderService,
//                 AssessmentService,
//                 UserService,
//                 HttpClientModule,
//                 IndexedDbService,
//                 SearchService,
//                 HttpClient,
//                 MediaPopupService,
//                 AssessmentService,
//                 NotesPopupService,
//                 AccordionService,
//                 HttpHandler,
//                 FirebaseDbService,
//                 NotesService,
//                 CustomErrorHandlerService,
//                 AlertService,
//                 MediaService,
//                 UploadFileService,
//                 TelemetryService,
//                 ModalService,
//                 FooterService,
//                 AccessibilityService,
//                 GlobalService,
//                 NotesDalService,
//                 CommentDalService,
//                 RosterService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(SearchComponent);
//         component = fixture.componentInstance;
//         userService = TestBed.get(UserService);
//         globalService = TestBed.get(GlobalService);
//         productService = TestBed.get(ProductService);
//         studentService = TestBed.get(StudentService);
//         accessibilityService = TestBed.get(AccessibilityService);
//         userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511' });
//         component.ngOnInit();
//         assessmentService = TestBed.get(AssessmentService);
//         searchService = TestBed.get(SearchService);
//         productService.setCurrentProduct('1730940');
//         fixture.detectChanges();
//     });

//     it('should create search component', () => {
//         expect(component).toBeTruthy();
//     });

//     it(' it should called ngOnIt() method', () => {

//         component.getClassAssessmentsSubscription();
//         component.getSearchPanelStatus();
//         component.getSearchListSubscription();
//         const studentServiceSpy = spyOn(studentService, 'getAllStudentDetail');
//         studentService.getAllStudentDetail((result) => {
//         });
//         expect(studentServiceSpy).toHaveBeenCalled();
//         component.ngOnInit();
//         expect(component.ngOnInit).toBeDefined();
//         fixture.detectChanges();
//     });

//     it('it should call getSearchStatusSubscription()', () => {
//         component.getSearchPanelStatus();
//         component.searchStatusSubscription = searchService.getSearchStatus().subscribe((searchStatusResult) => {
//             component.openSearchSidebar();
//         }, error => {
//             LoggerService.error(error.Message, {});
//             component.unSubscribeAll();
//         });
//         expect(component.getSearchPanelStatus).toBeDefined();
//         fixture.detectChanges();
//     });

//     it('it should call clearSearchkeyword method', () => {
//         component.searchKeyword = '';
//         component.searchItems.length = 0;
//         component.searchOnKeyword = false;
//         component.initializeFromSearchCache();
//         component.today = true;
//         component.week = true;
//         component.suggest = false;
//         component.result = false;
//         component.clearSearchkeyword();
//         expect(component.clearSearchkeyword).toBeDefined();
//         fixture.detectChanges();
//     });

//     it('it should call openSearchSidebar method', () => {
//         component.intializeGloballyTemplateValues();
//         component.today = true;
//         component.week = true;
//         component.result = false;
//         component.suggest = false;
//         component.searchOnKeyword = false;
//         component.toggleSearch = true;
//         component.clearSearchkeyword();
//         component.openSearchSidebar();
//         expect(component.openSearchSidebar).toBeDefined();
//         fixture.detectChanges();
//     });

//     it('it should call intializeTodayWeekValues() method', () => {
//         const searchedKeywordsArr: Array<SearchedKeywordsIdb> = SearchMockData.searchKeywordArr;
//         component.intializeTodayWeekValues(searchedKeywordsArr);
//         expect(component.intializeTodayWeekValues).toBeDefined();
//         fixture.detectChanges();
//     });

//     // it('it should call getAssessmentsIdb() method', () => {
//     //     const currentSelectedClass: TeacherClassModel = SearchMockData.currentSelectedClass;
//     //     component.getAssessmentsIdb(currentSelectedClass);
//     //     expect(component.getAssessmentsIdb).toBeDefined();
//     //     fixture.detectChanges();
//     // });

//     it('it should call suggestedKeyword() method', () => {
//         component.searchedKeywordsArr = SearchMockData.searchKeywordArr ;
//         component.suggestedKeyword();
//         fixture.detectChanges();
//     });
//     it('it should call searchOnClick() method', () => {
//         const searchKey = SearchMockData.searchKey;
//         const assessments = SearchMockData.allAssessmentsCache;
//         const currentClassId = '78F9ECC58C1D7CBCE0532502140A442C';
//         component.currentSelectedClass = SearchMockData.currentSelectedClass;
//         component.searchOnClick(searchKey);
//         const searchServiceSpy = spyOn(searchService, 'searchItemByKeyword');
//         searchService.searchItemByKeyword( searchKey , assessments, currentClassId ).subscribe((data) => {
//              if (data.length === 0) {
//                  component.result = true;
//             }

//          });
//          expect( searchService.searchItemByKeyword).toHaveBeenCalled();
//         expect(component.searchOnClick).toBeDefined();
//         fixture.detectChanges();
//     });



//     // it('it should call onkeyPress() first if condition for event type Backspace', () => {
//     //     searchService = TestBed.get(SearchService);
//     //     let suggestKey;
//     //     suggestKey = [{
//     //         keyword: 'student',
//     //         searchString: 1,
//     //         time: 1543415387404
//     //     }, {
//     //         keyword: 'students',
//     //         searchString: 2,
//     //         time: 1543393458017
//     //     }];
//     //     const keyType: any = {
//     //         altKey: false,
//     //         bubbles: true,
//     //         cancelBubble: false,
//     //         cancelable: true,
//     //         charCode: 0,
//     //         code: 'KeyA',
//     //         composed: true,
//     //         ctrlKey: false,
//     //         currentTarget: '',
//     //         defaultPrevented: false,
//     //         detail: 0,
//     //         eventPhase: 2,
//     //         isComposing: false,
//     //         isTrusted: true,
//     //         key: 'Backspace',
//     //         keyCode: 65,
//     //         location: 0,
//     //         metaKey: false,
//     //         path: '',
//     //         repeat: false,
//     //         returnValue: true,
//     //         shiftKey: false,
//     //         sourceCapabilities: '',
//     //         target: '',
//     //         timeStamp: 228969.40000000177,
//     //         type: 'keyup',
//     //         which: 65,
//     //     };
//     //     // const search = SearchMockData.searchdata;
//     //     // const searchSpy = spyOn(searchService, 'getSearchList').and.returnValue(of(search));
//     //     // searchService.getSearchList().subscribe((searchedData) => {
//     //     //     expect(searchedData).toBeDefined();
//     //     // });
//     //    // expect(searchSpy).toHaveBeenCalled();
//     //     component.searchKeyword = '';
//     //     component.onKeyPress(keyType);
//     //     component.suggestKeys.length = 0;
//     //     component.searchItems.length = 0;
//     //     expect(component.suggestKeys.length).toBe(0);
//     //     expect(component.searchItems.length).toEqual(0);
//     //     fixture.detectChanges();
//     // });

//     // it('onKeyUp() method second if condition with Backspace as key event and searchkeyword is  empty', () => {
//     //     const suggestKeys = [{
//     //         keyword: 'student',
//     //         searchString: 1,
//     //         time: 1543415387404
//     //     }, {
//     //         keyword: 'students',
//     //         searchString: 2,
//     //         time: 1543393458017
//     //     }];
//     //     const keyType: any = {
//     //         altKey: false,
//     //         bubbles: true,
//     //         cancelBubble: false,
//     //         cancelable: true,
//     //         charCode: 0,
//     //         code: 'Backspace',
//     //         composed: true,
//     //         ctrlKey: false,
//     //         currentTarget: null,
//     //         defaultPrevented: false,
//     //         detail: 0,
//     //         eventPhase: 0,
//     //         isComposing: false,
//     //         isTrusted: true,
//     //         key: 'Backspace',
//     //         keyCode: 8,
//     //         location: 0,
//     //         metaKey: false,
//     //         path: '',
//     //         repeat: false,
//     //         returnValue: true,
//     //         shiftKey: false,
//     //         sourceCapabilities: '',
//     //         srcElement: '',
//     //         target: '',
//     //         timeStamp: 60550.900000002,
//     //         type: 'keyup',
//     //         view: '',
//     //         which: 8,
//     //     };
//     //     component.searchKeyword = '';
//     //     component.onKeyPress(keyType);
//     //     component.suggestKeys.length = 0;
//     //     component.suggestedKeyword();
//     //     fixture.detectChanges();
//     // });
//     // // it('onKeyUp() method if condition for event key type Enter', () => {
//     // //     searchService = TestBed.get(SearchService);
//     // //     indexService = TestBed.get(IndexedDbService);
//     // //     const keyType: any = {
//     // //         altKey: false,
//     // //         bubbles: true,
//     // //         cancelBubble: false,
//     // //         cancelable: true,
//     // //         charCode: 0,
//     // //         code: 'Enter',
//     // //         composed: true,
//     // //         ctrlKey: false,
//     // //         currentTarget: null,
//     // //         defaultPrevented: false,
//     // //         keyCode: 13,
//     // //         location: 0,
//     // //         metaKey: false,
//     // //         path: '',
//     // //         repeat: false,
//     // //         returnValue: true,
//     // //         shiftKey: false,
//     // //         sourceCapabilities: '',
//     // //         type: 'keyup',
//     // //         view: '',
//     // //         which: 13,
//     // //     };
//     // //     component.searchKeyword = 'student';
//     // //     component.onKeyPress(keyType);
//     // //     // const initIDbSpy = spyOn(component, 'initializeArrayFromIdb').and.returnValue({
//     // //     //     success: true
//     // //     // });
//     // //     // component.initializeArrayFromIdb();
//     // //     // expect(initIDbSpy).toHaveBeenCalled();
//     // //     component.searchOnEnter();
//     // //     fixture.detectChanges();
//     // //     expect(component.searchOnEnter).toBeDefined();
//     // // });

//     it('should get selectFocus method', () => {
//         accessibilityService = TestBed.get(AccessibilityService);
//         component.setFocus('search', '');
//         const spy = spyOn(accessibilityService, 'selectFocus');
//         accessibilityService.selectFocus('search', '');
//         expect(spy).toHaveBeenCalled();
//         fixture.detectChanges();
//     });

//     // // it('For SearchOnClick', () => {
//     // //     const assessCheckList = [
//     // //         {
//     // //             assessment:
//     // //             {
//     // //                 templatekind: '1',
//     // //                 title: 'Students explore Geoblocks and their attributes.',
//     // //                 id: 70,
//     // //                 type: 'ongoing',
//     // //                 criteria: [{}]
//     // //             },
//     // //             assessmentItem:
//     // //             {
//     // //                 templatekind: '1',
//     // //                 title: 'Students explore Geoblocks and their attributes.',
//     // //                 id: 70,
//     // //                 type: 'ongoing',
//     // //                 criteria: [{}]
//     // //             },
//     // //             parent: '1|1|2|1',
//     // //             parentid: '1',
//     // //             path: 'Kindergarten > Unit 1 > Investigation 1 > Session 1.1',
//     // //             progressCount: 0,
//     // //             sequence: 1,
//     // //             shortname: 'Session 1.1',
//     // //             title: 'Students explore Geoblocks and their attributes.',
//     // //             type: 'ongoing',
//     // //         }
//     // //     ];
//     // //     const searchString = 'students';
//     // //     const search = TestBed.get(SearchService);
//     // //     component.assessmentChecklist = assessCheckList;
//     // //     // const searchServiceSpy = spyOn(search, 'searchItemByKeyword');
//     // //     // search.searchItemByKeyword(searchString.trim());
//     // //     // const sComponentSpy = spyOn(component, 'initializeArrayFromIdb');
//     // //     // component.initializeArrayFromIdb();
//     // //      // expect(sComponentSpy).toHaveBeenCalled();
//     // //     component.searchOnClick(searchString);
//     // //     fixture.detectChanges();
//     // //     expect(component.searchOnClick).toBeDefined();
//     // // });


//     // it('For openAssessment method', () => {
//     //     const assessService = TestBed.get(AssessmentService);
//     //     const assessmentChecklist = [
//     //         {
//     //             assessment:
//     //             {
//     //                 templatekind: '1',
//     //                 title: 'Students explore connecting cubes and their attributes.',
//     //                 id: '69',
//     //                 type: 'ongoing',
//     //                 criteria: [{}]
//     //             },
//     //             assessmentItem:
//     //             {
//     //                 templatekind: '1',
//     //                 title: 'Students explore connecting cubes and their attributes.',
//     //                 id: '69',
//     //                 type: 'ongoing',
//     //                 criteria: [{}]
//     //             },
//     //             parent: '1|1|2|1',
//     //             parentid: '1',
//     //             path: 'Kindergarten > Unit 1 > Investigation 1 > Session 1.1',
//     //             sequence: 1,
//     //             shortname: 'Session 1.1',
//     //             title: 'Students make choices and explore math manipulatives and their attributes.',
//     //             type: 'checklist',
//     //         }];
//     //     const assessmentSpy = spyOn(assessService, 'setCurrentAssessment');
//     //     assessService.setCurrentAssessment(assessmentChecklist);
//     //     expect(assessmentSpy).toHaveBeenCalled();
//     //     component.openAssessment(assessmentChecklist);
//     //     fixture.detectChanges();
//     //     expect(component.openAssessment).toBeDefined();
//     // });


//     // it('For editNotesToggle', () => {
//     //     const notObj = {
//     //         type: 'notes',
//     //         comment: 'hey i m adding the notes in a great quantity to test please dnt remove',
//     //         createdat: '',
//     //         flagged: true,
//     //         flaggeddate: '',
//     //         id: '77798199',
//     //         product: '1730940',
//     //         students: ['ffffffff5a7d7439f02ebd1b9347e303'],
//     //         types: 'notes',
//     //         updatedat: '',
//     //     };
//     //     component.editNotesToggle(notObj);
//     //     fixture.detectChanges();
//     // });

//     // it('For editMediaToggle method', () => {
//     //     const mediaObj = SearchMockData.MediaList[0];
//     //     component.editMediaToggle(mediaObj);
//     //     fixture.detectChanges();
//     //     expect(component.editMediaToggle).toBeDefined();
//     // });

//     // it('For toggleSearch method', () => {
//     //     component.toggleSearchSideBar();
//     //     fixture.detectChanges();
//     // });
// });
