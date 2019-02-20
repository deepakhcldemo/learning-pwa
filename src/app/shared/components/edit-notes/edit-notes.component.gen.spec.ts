// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { CustomErrorHandlerService } from 'src/app/shared/services/custom.errorhandler.service';
// import { FormBuilder } from '@angular/forms';
// import { NotesService } from '../../services/notes.service';
// import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
// import { MainPageFocusStatusService } from '../../mainpage-focus-status.service';
// import { AccessibilityService } from '../../services/accessibility.service';
// import { StudentService } from '../../services/student.service';
// import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
// import { TeacherClassModel } from '../../../models/class.model';
// import { EditNotesComponent } from './edit-notes.component';
// describe('EditNotesComponent', () => {
//   let component: EditNotesComponent;
//   let fixture: ComponentFixture<EditNotesComponent>;
//   beforeEach(() => {
//     const customErrorHandlerServiceStub = { handleError: () => ({}) };
//     const formBuilderStub = {};
//     const notesServiceStub = {
//       getAddEditOperation: () => ({ subscribe: () => ({}) }),
//       getNotePopupState: () => ({ subscribe: () => ({}) }),
//       getNoteDetails: () => ({ subscribe: () => ({}) }),
//       setNotePopupState: () => ({}),
//       updateNoteByNoteId: () => ({}),
//       saveNote: () => ({})
//     };
//     const ngbDateStub = {};
//     const mainPageFocusStatusServiceStub = {
//       setMainPageFocusStatus: () => ({})
//     };
//     const accessibilityServiceStub = {
//       getTabIndexSecondLevelStatus: () => ({ subscribe: () => ({}) }),
//       setTabIndexLevelStatus: () => ({}),
//       selectFocus: () => ({})
//     };
//     const studentServiceStub = { getStudentsDetailByStudentsId: () => ({}) };
//     const teacherClassServiceStub = {
//       getCurrentClass: () => ({ subscribe: () => ({}) })
//     };
//     const teacherClassModelStub = {};
//     TestBed.configureTestingModule({
//       schemas: [NO_ERRORS_SCHEMA],
//       declarations: [EditNotesComponent],
//       providers: [
//         {
//           provide: CustomErrorHandlerService,
//           useValue: customErrorHandlerServiceStub
//         },
//         { provide: FormBuilder, useValue: formBuilderStub },
//         { provide: NotesService, useValue: notesServiceStub },
//         { provide: NgbDate, useValue: ngbDateStub },
//         {
//           provide: MainPageFocusStatusService,
//           useValue: mainPageFocusStatusServiceStub
//         },
//         { provide: AccessibilityService, useValue: accessibilityServiceStub },
//         { provide: StudentService, useValue: studentServiceStub },
//         { provide: TeacherClassService, useValue: teacherClassServiceStub },
//         { provide: TeacherClassModel, useValue: teacherClassModelStub }
//       ]
//     });
//     fixture = TestBed.createComponent(EditNotesComponent);
//     component = fixture.componentInstance;
//   });
//   it('can load instance', () => {
//     expect(component).toBeTruthy();
//   });
//   it('commentRequired defaults to: false', () => {
//     expect(component.commentRequired).toEqual(false);
//   });
//   it('openNotePopupState defaults to: false', () => {
//     expect(component.openNotePopupState).toEqual(false);
//   });
//   it('showDate defaults to: true', () => {
//     expect(component.showDate).toEqual(true);
//   });
//   it('secondTabIndexStatus defaults to: false', () => {
//     expect(component.secondTabIndexStatus).toEqual(false);
//   });
//   it('cacheAllStudents defaults to: []', () => {
//     expect(component.cacheAllStudents).toEqual([]);
//   });
//   it('taggedStudents defaults to: []', () => {
//     expect(component.taggedStudents).toEqual([]);
//   });
//   it('untaggedStudents defaults to: []', () => {
//     expect(component.untaggedStudents).toEqual([]);
//   });
//   it('addEditOperation defaults to: Edit', () => {
//     expect(component.addEditOperation).toEqual('Edit');
//   });
//   describe('ngOnInit', () => {
//     it('makes expected calls', () => {
//       const notesServiceStub: NotesService = fixture.debugElement.injector.get(
//         NotesService
//       );
//       const accessibilityServiceStub: AccessibilityService = fixture.debugElement.injector.get(
//         AccessibilityService
//       );
//       const teacherClassServiceStub: TeacherClassService = fixture.debugElement.injector.get(
//         TeacherClassService
//       );
//       spyOn(notesServiceStub, 'getAddEditOperation');
//       spyOn(notesServiceStub, 'getNotePopupState');
//       spyOn(accessibilityServiceStub, 'getTabIndexSecondLevelStatus');
//       spyOn(teacherClassServiceStub, 'getCurrentClass');
//       component.ngOnInit();
//       expect(notesServiceStub.getAddEditOperation).toHaveBeenCalled();
//       expect(notesServiceStub.getNotePopupState).toHaveBeenCalled();
//       expect(
//         accessibilityServiceStub.getTabIndexSecondLevelStatus
//       ).toHaveBeenCalled();
//       expect(teacherClassServiceStub.getCurrentClass).toHaveBeenCalled();
//     });
//   });
// });
