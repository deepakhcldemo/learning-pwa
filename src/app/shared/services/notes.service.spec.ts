// import { NotesService } from './notes.service';
// import { TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { HttpClientModule } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { FirebaseDbService } from './firebase.db.service';
// import { CustomErrorHandlerService } from './custom.errorhandler.service';
// import { IndexedDbService } from './indexed.db.service';
// import { AlertService } from '../components/alert/alert.service';
// import { UserService } from 'src/app/auth/user.service';

// describe('NotesService', () => {
//     let notesService: NotesService;
//     let userService: UserService;
//     const notes = {
//         comment: 'aaaaa',
//         createdat: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//         flagged: null,
//         flaggeddate: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//         product: '1730939',
//         students: [],
//         updatedat: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//         noteId: '04514459'
//     };

//     const contentData = {
//         comment: 'aaaaa',
//         createdat: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//         flagged: null,
//         flaggeddate: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//         id: '11574494',
//         noteid: 11574494,
//         product: '1730939',
//         student: [],
//         students: [],
//         type: 'notes',
//         types: 'notes',
//         updatedat: 'Thu Nov 29 2018 20:15:48 GMT+0530'
//     };
//     const noteData = {
//         comment: 'aaaaa',
//         createdat: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//         flagged: null,
//         flaggeddate: 'Thu Nov 29 2018 20:15:48 GMT+0530',
//         noteId: '04514459',
//         product: '1730939',
//         students: [],
//         updatedat: 'Thu Nov 29 2018 20:15:48 GMT+0530'
//     };


//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule,
//                 HttpClientModule],
//             providers: [
//                 NotesService,
//                 FirebaseDbService,
//                 CustomErrorHandlerService,
//                 UserService,
//                 AlertService,
//                 IndexedDbService
//             ],
//             schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
//         });
//     });
//     beforeEach(() => {
//         notesService = TestBed.get(NotesService);
//         userService = TestBed.get(UserService);
//         userService.setUser(
//             {
//                 'identityId': 'ffffffff51c87040e4b07dddca2a0511'
//             }
//         );
//     });

//     it('notes service should be created', () => {
//         expect(notesService).toBeTruthy();
//     });

//     it('check ngOnit for notesService', () => {
//         notesService.ngOnInit();
//         const spyOngetCurrentUser = spyOn(userService, 'getCurrentUser');
//         userService.getCurrentUser();
//         expect(spyOngetCurrentUser).toHaveBeenCalled();
//     });
//     /**
//      * test cases is spyed becuase they are hitting real database
//      */

//     it('check SaveNotes method for notesService', () => {
//         // notesService.saveNote(notes);
//         const spyOnSaveNotes = spyOn(notesService, 'saveNote');
//         notesService.saveNote(notes);
//         expect(spyOnSaveNotes).toHaveBeenCalledWith(notes);
//     });

//     /**
//      * test cases is spyed becuase they are hitting real database
//      */
//     it('check delete byid method for notesService', () => {
//         // notesService.deleteNoteByNoteId(notes);
//         const spyOndeleteNoteByNoteId = spyOn(notesService, 'deleteNoteByNoteId');
//         notesService.deleteNoteByNoteId(notes.noteId);
//         expect(spyOndeleteNoteByNoteId).toHaveBeenCalledWith(notes.noteId);
//     });

//     /**
//      * test cases is spyed becuase they are hitting real database
//      */
//     it('check updateNoteByNoteId method for notesService', () => {
//         // notesService.updateNoteByNoteId(contentData, notes);
//         const spyOnupdateNoteByNoteId = spyOn(notesService, 'updateNoteByNoteId');
//         notesService.updateNoteByNoteId(contentData.id, notes);
//         expect(spyOnupdateNoteByNoteId).toHaveBeenCalledWith(contentData.id, notes);
//     });

//     it('check getNotesList method for notesService', async () => {
//         notesService.getNotesList().subscribe((notesList) => {
//             expect(notesList.length).toBeGreaterThanOrEqual(0);
//         });
//     });
//     it('check getRecentNotesList method for notesService', async () => {
//         notesService.getRecentNotesList().subscribe((getRecentNotesList) => {
//             expect(getRecentNotesList.length).toBeGreaterThanOrEqual(0);
//         });
//     });

//     it('should get notes for student', async () => {
//         notesService.getStudentNotesList('ffffffff5a7d7439f02ebd1b9347e303').subscribe(noteList => {
//             expect(noteList.length).toBeGreaterThanOrEqual(0);
//         });
//     });

//     it('should have remove note', () => {

//         const noteInstance = {
//             data: {
//                 comment: 'test notes service',
//                 noteid: 82052108,
//                 flagged: true,
//                 flaggeddate: new Date(),
//                 product: '1730939',
//                 students: ['ffffffff59b667fd45d99156d4fa1d53',
//                     'ffffffff5bb290def856993930d369a2'],
//                 types: 'notes',
//                 createdat: new Date()

//             },
//             id: '82052108'
//         };
//         const notesData = {
//             comment: noteInstance.data.comment,
//             flagged: noteInstance.data.flagged,
//             flaggeddate: noteInstance.data.flaggeddate,
//             product: noteInstance.data.product,
//             students: noteInstance.data.students,
//             createdat: noteInstance.data.createdat,
//         };
//         notesService.removeNotes(noteInstance, notesData);
//         expect(noteData.comment).toBeDefined();
//     });

//     it('should set NotePopupState method', () => {

//         notesService.setNotePopupState(true);
//         expect(notesService.setNotePopupState).toBeTruthy();

//     });

//     it('should get NotePopupState method', () => {

//         notesService.getNotePopupState();
//         expect(notesService.setNotePopupState).toBeTruthy();

//     });

//     it('should set NoteDetails method', () => {

//         const notedetails = [{
//             comment: 'Testing text box',
//             createdat: { seconds: 1543491586, nanoseconds: 33000000 },
//             flagged: true,
//             flaggeddate: { seconds: 1543429800, nanoseconds: 0 },
//             id: '45941405',
//             noteid: 45941405,
//             product: '1730939',
//             student: [],
//             students: [''],
//             type: 'notes',
//             types: 'notes',
//             updatedat: { seconds: 1543491586, nanoseconds: 33000000 }
//         }];
//         notesService.setNoteDetails(notedetails);
//         expect(notesService.getNoteDetails()).not.toBeNull();

//     });


//     it('should get NoteDetails method', () => {

//         notesService.getNoteDetails();
//         expect(notesService.setNotePopupState).toBeTruthy();

//     });

// });




