
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { NotesComponent } from './notes.component';
// import { NotesService } from 'src/app/shared/services/notes.service';
// import { HeaderService } from 'src/app/shared/components/header/header.service';
// import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
// import { HeaderComponent } from 'src/app/shared/components/header/header.component';
// import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
// import { CalendarModule } from 'primeng/calendar';
// import { AvatarComponent } from 'src/app/shared/components/avatar/avatar.component';
// import { NgbModule, NgbDate } from '@ng-bootstrap/ng-bootstrap';
// import { FirebaseDbService } from 'src/app/shared/services/firebase.db.service';
// import { CustomErrorHandlerService } from 'src/app/shared/services/custom.errorhandler.service';
// import { AlertService } from 'src/app/shared/components/alert/alert.service';
// import { IndexedDbService } from 'src/app/shared/services/indexed.db.service';
// import { ModalService } from 'src/app/shared/components/global-modal/modal.service';
// import { MediaService } from 'src/app/shared/services/media.service';
// import { UploadFileService } from 'src/app/shared/services/upload-file.service';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { environment } from 'src/environments/environment.prod';
// import { AngularFireModule } from 'angularfire2';
// import { NotesMockData } from 'src/app/shared/services/notes.service.mock.data';
// import { of } from 'rxjs';
// import { TelemetryService } from 'src/app/shared/services/telemetry.service';
// import { FooterService } from 'src/app/shared/components/footer/footer.service';
// import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
// import { ProductService } from 'src/app/shared/services/product.service';
// import { GlobalService } from 'src/app/global.service';
// import { FileConstants } from 'src/app/shared/constants/file-constants';
// import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
// const fakeActivatedRoute = {
//     snapshot: { data: {} }
// } as ActivatedRoute;

// const mockRouter = {
//     navigate: jasmine.createSpy('navigate')
// };

// describe('NotesComponent', () => {
//     let component: NotesComponent;
//     let fixture: ComponentFixture<NotesComponent>;
//     let headerService: HeaderService, notesService: NotesService;
//     let customModalService: ModalService;
//     let globalService: GlobalService;
//     let route: ActivatedRoute;
//     let accessibilityService: AccessibilityService;
//     let productService: ProductService;
//     let teacherClassService: TeacherClassService;
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 ReactiveFormsModule,
//                 FormsModule,
//                 CalendarModule,
//                 NgbModule,
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFireDatabaseModule
//             ],
//             declarations: [
//                 HeaderComponent,
//                 NotesComponent,
//                 DateFormatPipe,
//                 FooterComponent,
//                 AvatarComponent
//             ],
//             providers: [
//                 { provide: Router, useValue: mockRouter },
//                 { provide: ActivatedRoute, useValue: fakeActivatedRoute },
//                 HttpClient,
//                 HttpHandler,
//                 HttpClientTestingModule,
//                 HeaderService,
//                 NotesService,
//                 FirebaseDbService,
//                 CustomErrorHandlerService,
//                 AlertService,
//                 IndexedDbService,
//                 ModalService,
//                 MediaService,
//                 UploadFileService,
//                 TelemetryService,
//                 FooterService,
//                 GlobalService,
//                 TeacherClassService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(NotesComponent);
//         component = fixture.componentInstance;
//         headerService = TestBed.get(HeaderService);
//         globalService = TestBed.get(GlobalService);
//         notesService = TestBed.get(NotesService);
//         productService = TestBed.get(ProductService);
//         teacherClassService = TestBed.get(TeacherClassService);
//         productService.setCurrentProduct({
//             productID: '336566', name: 'Kindergarten'
//         });
//         headerService.setHeaderTitle('Notes');

//         component.ngOnInit();
//         fixture.detectChanges();
//         route = TestBed.get(ActivatedRoute);
//     });

//     it('instance of notes component', () => {
//         expect(component).toBeTruthy();
//     });



//     it('comment field validity with correct values', () => {
//         const comment = component.noteForm.controls['comment'];
//         comment.setValue('new note');
//         expect(comment.value).toBeTruthy();
//     });
//     it('flaggeddate field validity with blank values', () => {
//         const flaggedDate = component.noteForm.controls['flaggedDate'];
//         flaggedDate.setValue('');
//         expect(flaggedDate.value).toBeFalsy();
//     });

//     it('flaggeddate field validity with correct values', () => {
//         const flaggedDate = component.noteForm.controls['flaggedDate'];
//         flaggedDate.setValue('new note');
//         expect(flaggedDate.value).toBeTruthy();
//     });
//     it('noteFlag field validity with blank values', () => {
//         const noteFlag = component.noteForm.controls['noteFlag'];
//         noteFlag.setValue('');
//         expect(noteFlag.value).toBeFalsy();
//     });

//     it('noteFlag field validity with correct values', () => {
//         const noteFlag = component.noteForm.controls['noteFlag'];
//         noteFlag.setValue('new note');
//         expect(noteFlag.value).toBeTruthy();
//     });

//     it('get notes list method call with error response', () => {
//         notesService = TestBed.get(NotesService);
//         const notesListSpy = spyOn(notesService, 'getNotesList').and.returnValue(
//             of({
//                 success: false,
//                 error: 'failed to get notes'
//             })
//         );

//         notesService.getNotesList().subscribe(notes => {
//             expect(notes['success']).toEqual(false);
//             expect(notes['error']).toEqual('failed to get notes');
//         });

//         expect(notesListSpy).toHaveBeenCalled();

//     });

//     it('get notes list method call with failed condition', () => {
//         notesService = TestBed.get(NotesService);
//         const notesListSpy = spyOn(notesService, 'getNotesList').and.returnValue(
//             of({
//                 notesList: [],
//                 notesUndefined: undefined
//             })
//         );

//         notesService.getNotesList().subscribe(notes => {
//             expect(notes['notesList'].length).toEqual(0);
//             expect(notes['notesUndefined']).toBeUndefined();
//         });

//         expect(notesListSpy).toHaveBeenCalled();

//     });

//     it('get notes list method call with success condition', () => {
//         notesService = TestBed.get(NotesService);
//         const notesListSpy = spyOn(notesService, 'getNotesList').and.returnValue(
//             of({
//                 comment: 'to do added to check placement',
//                 students: [
//                     'ffffffff59b667fd45d99156d4fa1d53',
//                     'ffffffff5a7d7439f02ebd1b9347e303',
//                     'ffffffff5aab5e6ff856993c2720cf83',
//                     'ffffffff5b753def45d991373d80eadd',
//                     'ffffffff5ad6fa4645d9917d851248cb'
//                 ]
//             })
//         );

//         notesService.getNotesList().subscribe(notes => {
//             expect(notes['comment']).toEqual(NotesMockData[0].comment);
//         });

//         expect(notesListSpy).toHaveBeenCalled();

//     });

//     it('get recent notes list method call with error response', () => {
//         notesService = TestBed.get(NotesService);
//         const notesListSpy = spyOn(notesService, 'getRecentNotesList').and.returnValue(of({
//             success: false,
//             error: 'failed to get recent notes'
//         }));

//         notesService.getRecentNotesList().subscribe(recentNotes => {
//             expect(recentNotes['success']).toEqual(false);
//             expect(recentNotes['error']).toEqual('failed to get recent notes');
//         });

//         expect(notesListSpy).toHaveBeenCalled();
//     });

//     it('get recent notes list method call for failed condition', () => {
//         notesService = TestBed.get(NotesService);
//         const notesListSpy = spyOn(notesService, 'getRecentNotesList').and.returnValue(
//             of({
//                 error: 'to do added to check placement',
//                 notesList: [],
//                 notesUndefined: undefined
//             })
//         );
//         notesService.getRecentNotesList().subscribe(notes => {
//             expect(notes['notesList'].length).toEqual(0);
//             expect(notes['notesUndefined']).toBeUndefined();
//         });
//         expect(notesListSpy).toHaveBeenCalled();
//     });

//     it('get recent notes list method call with success response', () => {
//         notesService = TestBed.get(NotesService);
//         const notesListSpy = spyOn(notesService, 'getRecentNotesList').and.returnValue(
//             of({
//                 comment: 'to do added to check placement',
//                 noOfItem: 3
//             })
//         );
//         notesService.getRecentNotesList().subscribe(notes => {
//             expect(notes['noOfItem']).toEqual(NotesMockData.length);
//         });
//         expect(notesListSpy).toHaveBeenCalled();
//     });

//     // it('get recent todo list method call with error response', () => {
//     //     notesService = TestBed.get(NotesService);
//     //     const notesListSpy = spyOn(notesService, 'getRecentToDoList').and.returnValue(of({
//     //         success: false,
//     //         error: 'failed to get recent todo'
//     //     }));

//     //     notesService.getRecentToDoList().subscribe(recentToDo => {
//     //         expect(recentToDo['success']).toEqual(false);
//     //         expect(recentToDo['error']).toEqual('failed to get recent todo');
//     //     });

//     //     expect(notesListSpy).toHaveBeenCalled();
//     // });

//     // it('get recent todo list method call for failed condition', () => {
//     //     notesService = TestBed.get(NotesService);
//     //     const notesListSpy = spyOn(notesService, 'getRecentToDoList').and.returnValue(
//     //         of({
//     //             comment: 'to do added to check placement',
//     //             flagged: true,
//     //             todoList: [],
//     //             todoUndefined: undefined
//     //         })
//     //     );
//     //     notesService.getRecentToDoList().subscribe(notes => {
//     //         expect(notes['todoList'].length).toEqual(0);
//     //         expect(notes['todoUndefined']).toBeUndefined();
//     //     });
//     //     expect(notesListSpy).toHaveBeenCalled();
//     // });

//     // it('get recent todo list method call for success condition', () => {
//     //     notesService = TestBed.get(NotesService);
//     //     const notesListSpy = spyOn(notesService, 'getRecentToDoList').and.returnValue(
//     //         of({
//     //             comment: 'to do added to check placement',
//     //             flagged: true,
//     //             noOfTODOItem: 3
//     //         })
//     //     );
//     //     notesService.getRecentToDoList().subscribe(notes => {
//     //         expect(notes['noOfTODOItem']).toEqual(NotesMockData.length);
//     //         expect(notes['flagged']).toEqual(NotesMockData[0].flagged);
//     //     });
//     //     expect(notesListSpy).toHaveBeenCalled();
//     // });

//     it('save note via notes service', () => {
//         const comment = component.noteForm.controls['comment'];
//         comment.setValue('New Note!!!!!!');
//         const flaggeddate = component.noteForm.controls['flaggedDate'];
//         const todaysDate = new Date();
//         flaggeddate.setValue(todaysDate.getTime());
//         const flagged = component.noteForm.controls['noteFlag'];
//         flagged.setValue(true);

//         expect(comment.value).toBeTruthy();
//         expect(flagged.value).toEqual(true);
//         expect(flaggeddate.value).toBeTruthy();
//         expect(component.noteForm.valid).toBeTruthy();

//     });

//     it('should have called isSelected method ', () => {
//         component.selectedLink = FileConstants.constants.allNotes;
//         const name = 'AllNotes';
//         const flag = component.isSelected(name);
//         fixture.detectChanges();
//         expect(flag).toBe(true);
//     });

//     it('should have called isSelected method when selectedLink is not set', () => {
//         component.selectedLink = '';
//         const name = 'AllNotes';
//         const flag = component.isSelected(name);
//         fixture.detectChanges();
//         expect(flag).toBe(false);
//     });

//     it('should have called showstudents method', () => {
//         component.showStudents = false;
//         component.showstudents();
//         fixture.detectChanges();
//         expect(component.showStudents).toBe(true);
//     });

//     it('should have called enableEdit method', () => {
//         component.enableCheckboxes = false;
//         component.enableEdit();
//         fixture.detectChanges();
//         expect(component.enableCheckboxes).toBe(true);
//     });

//     it('should have called toggleEdit method', () => {
//         component.editable = true;
//         component.isAddNote = true;
//         component.enableCheckboxes = true;

//         component.toggleEdit();
//         fixture.detectChanges();
//         expect(component.editable).toBe(false);
//         expect(component.isAddNote).toBe(false);
//         expect(component.enableCheckboxes).toBe(false);
//     });

//     it('should have called showcheckboxes method', () => {
//         component.enableCancel = false;
//         component.showcheckboxes();
//         fixture.detectChanges();
//         expect(component.enableCancel).toBe(true);
//     });

//     it('should have called clearCheckBox method', () => {
//         component.studentsList = [{
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             userId: 'ffffffff59b667fd45d99156d4fa1d53'
//         }];
//         component.studentsList.length = 0;
//         component.studentCloneList = [{
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             userId: 'ffffffff59b667fd45d99156d4fa1d53'
//         }];
//         component.studentsList = Object.assign([], component.studentCloneList);
//         component.clearCheckBox();
//         fixture.detectChanges();
//         expect(component.studentsList).not.toBeNull();
//     });

//     it('should have called showTodo method', () => {
//         component.toDoFlag = false;
//         component.showAllFlag = true;

//         component.showTodo();
//         fixture.detectChanges();
//         expect(component.toDoFlag).toBe(true);
//         expect(component.showAllFlag).toBe(false);
//     });

//     it('should have called showAll method', () => {
//         component.toDoFlag = true;
//         component.showAllFlag = false;

//         component.showAll();
//         fixture.detectChanges();
//         expect(component.toDoFlag).toBe(false);
//         expect(component.showAllFlag).toBe(true);
//     });
//     it('should have called clearNotesId method', () => {
//         component.deleteNoteIds = [{ noteId: '11574494' }];

//         component.clearNotesId();
//         fixture.detectChanges();
//         expect(component.deleteNoteIds.length).toBe(0);
//     });
//     it('should have called onFromDateSelection method', () => {
//         component.todoDate = new NgbDate(0, 0, 0);
//         const date = {
//             month: 12,
//             day: 1,
//             year: 2018,
//         };
//         component.onFromDateSelection(date);
//         fixture.detectChanges();
//         expect(component.noteForm.value['flaggedDate']).not.toBeNull();
//     });

//     it('should have called onFromDateSelection null method', () => {
//         component.todoDate = null;
//         const date = {
//             month: 12,
//             day: 1,
//             year: 2018,
//         };
//         component.onFromDateSelection(date);
//         fixture.detectChanges();
//         expect(component.noteForm.value['flaggedDate']).not.toBeNull();
//     });

//     it('should have called onFromDateSelection method', () => {
//         component.todoDate['month'] = Number(new Date().getMonth() + 1);
//         component.todoDate['day'] = Number(new Date().getDate());
//         component.todoDate['year'] = Number(new Date().getFullYear());
//         const date = {
//             month: 12,
//             day: 1,
//             year: 2018,
//         };
//         component.onFromDateSelection(date);
//         fixture.detectChanges();
//         expect(component.noteForm.value['flaggedDate']).not.toBeNull();
//     });

//     it('should have called setNotesOrTodo method with ToDo', () => {
//         component.notesList = [{
//             comment: 'aaaaa',
//             createdat: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//             flagged: true,
//             flaggeddate: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//             id: '11574494',
//             noteid: 4514459,
//             product: '1730939',
//             student: [],
//             students: [],
//             type: 'notes',
//             types: 'notes',
//             updatedat: 'Thu Nov 29 2018 20:15:48 GMT+0530'
//         }];
//         component.displayAllNotes = [{
//             comment: 'aaaaa',
//             createdat: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//             flagged: true,
//             flaggeddate: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//             id: '11574494',
//             noteid: 4514459,
//             product: '1730939',
//             student: [],
//             students: [],
//             type: 'notes',
//             types: 'notes',
//             updatedat: 'Thu Nov 29 2018 20:15:48 GMT+0530'
//         }];

//         component.setNotesOrTodo('ToDo');
//         fixture.detectChanges();
//         expect(component.selectedLink).not.toBeNull();
//     });

//     it('should have called setNotesOrTodo method with AllNotes', () => {
//         component.currentTab = 'AllNotes';
//         component.displayAllNotes = [{
//             comment: 'aaaaa',
//             createdat: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//             flagged: null,
//             flaggeddate: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//             id: '11574494',
//             noteid: 4514459,
//             product: '1730939',
//             student: [],
//             students: [],
//             type: 'notes',
//             types: 'notes',
//             updatedat: 'Thu Nov 29 2018 20:15:48 GMT+0530'
//         }];

//         component.setNotesOrTodo('AllNotes');
//         fixture.detectChanges();
//         expect(component.selectedLink).not.toBeNull();
//     });

//     it('should have called toggleEditable method with checked true', () => {
//         const event = {
//             target: {
//                 checked: true
//             }
//         };
//         component.contentEditable = false;

//         component.toggleEditable(event, 1);
//         fixture.detectChanges();
//         expect(component.contentEditable).toBe(true);
//     });

//     it('should have called toggleEditable method with checked false', () => {
//         const event = {
//             target: {
//                 checked: false
//             }
//         };
//         component.contentEditable = true;

//         component.toggleEditable(event, 1);
//         fixture.detectChanges();
//         expect(component.contentEditable).toBe(false);
//     });

//     it('should have called checkToDo method with checked true', () => {
//         const event = {
//             target: {
//                 checked: true
//             }
//         };
//         component.checkToDo(event);
//         fixture.detectChanges();
//         expect(component.todoDate).not.toBeNull();
//         expect(component.showDate).toBe(true);
//     });

//     it('should have called checkToDo method with checked false', () => {
//         const event = {
//             target: {
//                 checked: false
//             }
//         };
//         component.checkToDo(event);
//         fixture.detectChanges();
//         expect(component.showDate).toBe(false);
//     });

//     it('should have called addNoteSideSlider method', () => {
//         component.studentCloneList = [{
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             userId: 'ffffffff59b667fd45d99156d4fa1d53'
//         }];
//         component.addNoteSideSlider();
//         fixture.detectChanges();
//         expect(component.showDate).toBe(false);
//     });

//     it('should have called addStudent method on checked', () => {
//         const event = {
//             target: {
//                 checked: true
//             }
//         };

//         const index = 0;
//         const student = {
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             tagged: true,
//             userId: 'ffffffff59b667fd45d99156d4fa1d53'
//         };
//         component.studentsList = [{
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             tagged: true,
//             userId: 'ffffffff59b667fd45d99156d4fa1d53'
//         }];
//         fixture.detectChanges();
//         expect(component.studentList).not.toBeNull();
//     });

//     it('should have called addStudent method on uncheck', () => {
//         const event = {
//             target: {
//                 checked: false
//             }
//         };
//         const student = {
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             userId: 'ffffffff59b667fd45d99156d4fa1d53',
//             tagged: false
//         };
//         component.studentsList = [{
//             tagged: false,
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             userId: 'ffffffff59b667fd45d99156d4fa1d53'
//         }];

//         fixture.detectChanges();
//         expect(component.studentList).not.toBeNull();
//     });

//     it('should have called setNotesList method on uncheck', async () => {
//         component.setNotesList();
//         expect(component.notesList).not.toBeNull();
//     });

//     it('should have called pushAllDeleteNoteIds method on checked true', () => {
//         component.deleteNoteIds = [{ noteId: '01930013' }];
//         const event = {
//             target: {
//                 checked: true
//             }
//         };
//         const noteId = '01930013';
//         component.pushAllDeleteNoteIds(event, noteId);
//         fixture.detectChanges();
//         expect(component.deleteNoteIds.length).not.toBe(0);
//     });

//     it('should have called pushAllDeleteNoteIds method on checked false', () => {
//         component.deleteNoteIds = [{ noteId: '01930013' }];
//         const event = {
//             target: {
//                 checked: false
//             }
//         };
//         const noteId = '01930013';
//         component.pushAllDeleteNoteIds(event, noteId);
//         fixture.detectChanges();
//         expect(component.deleteNoteIds.length).toBe(0);
//     });

//     it('should have called closePopup method', () => {
//         component.isAddSliderOpen = true;
//         component.closePopup();
//         fixture.detectChanges();
//         expect(component.isAddSliderOpen).toBe(false);
//     });

//     it('should have called editNotesToggle method', () => {
//         const note = {
//             comment: 'aaaaa',
//             createdat: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//             flagged: null,
//             flaggeddate: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//             id: '01930013',
//             noteId: '04514459',
//             noteid: 1930013,
//             product: '1730939',
//             student: [],
//             students: [],
//             type: 'notes',
//             types: 'notes',
//             updatedat: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//         };
//         component.editNotesToggle(note);
//         fixture.detectChanges();
//         expect(component.content).not.toBeNull();
//     });


//     it('should have called deleteNotes method ', async () => {
//         component.deleteNoteIds = [{ noteId: '01930013' }];
//         customModalService = TestBed.get(ModalService);
//         const spy = spyOn(customModalService, 'getNotesConfirmation').and.returnValue(
//             of(true)
//         );
//         customModalService.getNotesConfirmation().subscribe(value => {
//             expect(value).toBe(true);
//         });
//         expect(spy).toHaveBeenCalled();
//         component.contentEditable = true;
//         component.deleteNotes();
//         fixture.detectChanges();
//     });

//     it('should have called set focus method', () => {

//         component.setFocus('done_button');
//         expect(component.setFocus).toBeDefined();

//     });

//     it('should have called set focus method', () => {

//         component.setFocus('', 'done_button');
//         expect(component.setFocus).toBeDefined();

//     });

//     it('should have called openVerticallyCentered', () => {

//         component.openVerticallyCentered();
//         expect(component.openVerticallyCentered).toBeDefined();

//     });

//     it('should have called expandStudents', () => {

//         component.expand = [true, false];
//         component.expandStudents(0);
//         expect(component.expandStudents).toBeDefined();
//     });

//     it('should get selectFocus method', () => {
//         accessibilityService = TestBed.get(AccessibilityService);
//         component.setFocus('addnote_done', '');
//         const spy = spyOn(accessibilityService, 'selectFocus');
//         accessibilityService.selectFocus('addnote_done', '');
//         expect(spy).toHaveBeenCalled();
//     });

// });

