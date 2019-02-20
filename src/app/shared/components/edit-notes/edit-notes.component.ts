import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AccessibilityService } from '../../services/accessibility.service';
import { CustomErrorHandlerService } from 'src/app/shared/services/custom.errorhandler.service';
import { LoggerService } from 'src/app/shared/logger.service';
import { MainPageFocusStatusService } from '../../mainpage-focus-status.service';
import { NotesService } from '../../services/notes.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NotesDetail, NoteFormModel } from 'src/app/models/notes.model';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Student } from 'src/app/models/student.model';
import { StudentService } from '../../services/student.service';
import { Subscription } from 'rxjs';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { TeacherClassModel } from '../../../models/class.model';
import { SlideInOutAnimation } from '../../animations/slide-in-out.animation';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.scss'],
  animations: SlideInOutAnimation.getAnimations('100%')

})
export class EditNotesComponent implements OnInit, OnDestroy {
  @ViewChild('content') element: ElementRef;
  @ViewChild('scrolltop') wrapperScroll: ElementRef;

  private _accessibilitySubscription$: Subscription;
  private _teacherClassSubscription$: Subscription;
  private _currentSelectedClass: TeacherClassModel;
  private _notePopupDetailSubscription$: Subscription;
  private _notePopupStateSubscription$: Subscription;
  private _taggedStudentIds: Array<string> = [];

  public addEditOperation = 'Edit';
  public allStudentList: Array<Student> = [];
  public commentRequired = false;
  public noteDetail: NotesDetail;
  public noteForm: NoteFormModel;
  public notePopupStatus = false;
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};
  public todoDate = new NgbDate(0, 0, 0);
  public secondTabIndexStatus = false;
  public showDate = true;
  public taggedStudents: Array<Student> = [];
  public untaggedStudents: Array<Student> = [];

  constructor(
    private accessibilityService: AccessibilityService,
    private errorHandler: CustomErrorHandlerService,
    private mainPageFocusStatusService: MainPageFocusStatusService,
    private notesService: NotesService,
    private studentService: StudentService,
    private teacherClassService: TeacherClassService) {
    this.todoDate.month = Number(new Date().getMonth() + 1);
    this.todoDate.day = Number(new Date().getDate());
    this.todoDate.year = Number(new Date().getFullYear());
  }

  /**
   * Initializing The Notes Form And Calling The Notes Popup Service Based On The Flag Set
   */
  ngOnInit() {
    this.noteForm = {
      comment: '',
      noteFlag: false,
      flaggedDate: ''
    };
    this._accessibilitySubscription$ = this.accessibilityService.getTabIndexSecondLevelStatus().subscribe((levelStatus) => {
      this.secondTabIndexStatus = levelStatus;
    });

    this.notesService.getAddEditOperation().subscribe((mode: string) => { this.addEditOperation = mode; });

    this._teacherClassSubscription$ = this.teacherClassService.getCurrentClass().subscribe(
      (currentClass: TeacherClassModel) => this.onSuccessCurrentClass(currentClass));

    this._notePopupStateSubscription$ = this.notesService.getNotePopupState().subscribe(
      (popupStatus: boolean) => this.onSuccessNotePopupState(popupStatus));
  }

  /**
   * set popup state
   * @param popupStatus popup state
   */
  private onSuccessNotePopupState(popupStatus: boolean): void {
    this.notePopupStatus = popupStatus;
    if (popupStatus) {
      this._teacherClassSubscription$ = this.teacherClassService.getCurrentClass().subscribe(
        (currentClass: TeacherClassModel) => this.onSuccessCurrentClass(currentClass),
        (error) => LoggerService.error('Unable to get current class', error));
    }
  }

  /**
   * Callback function for polulating notes and students
   * @param currentClass: this is current chosen class
   */
  private onSuccessCurrentClass(currentClass: TeacherClassModel): void {
    this._currentSelectedClass = currentClass;
    this.populateStudents();
    if (this.addEditOperation === 'Edit') {
      if (this._notePopupDetailSubscription$) {
        this._notePopupDetailSubscription$.unsubscribe();
      }
      this._notePopupDetailSubscription$ = this.notesService.getNoteDetails().subscribe((noteDetail: NotesDetail) => {
        if (noteDetail) {
          this.noteDetailSubscriber(noteDetail);
        }
      }, error => LoggerService.error('Unable to get note detail', error));
    } else {
      this.showDate = false;
    }
  }
  /**
   * Data is set based on the flag.
   * @param noteDetail is note data
   */
  private noteDetailSubscriber(noteDetail: Object): void {
    this.taggedStudents = [];
    this.untaggedStudents = [];
    this.noteDetail = noteDetail;
    this.setNoteForm();
    this.getStudentData();
    this.showDate = this.noteDetail.flagged;
  }

  /**
   * Function Used To Set The To-Do Notes With The Flagged Date and Comment
   */
  private setNoteForm(): void {
    try {
      if (this.noteDetail) {

        const editDate = new Date(this.noteDetail.flaggeddate.seconds * 1000);
        this.noteForm = {
          comment: this.noteDetail.comment,
          noteFlag: this.noteDetail.flagged,
          flaggedDate: editDate.toString()
        };

        if (this.noteDetail.flaggeddate.seconds === 0) {
          this.todoDate.month = Number(new Date().getMonth() + 1);
          this.todoDate.day = Number(new Date().getDate());
          this.todoDate.year = Number(new Date().getFullYear());
        } else {
          this.todoDate.month = Number(editDate.getMonth() + 1);
          this.todoDate.day = Number(editDate.getDate());
          this.todoDate.year = Number(editDate.getFullYear());
        }
      }
    } catch (error) {
      LoggerService.error('Unable to set Note', error);
    }
  }

  /**
   * Function for populating the list of student based on the chosen current class
   */
  private populateStudents(): void {
    if (this._currentSelectedClass && this._currentSelectedClass.studentIds && this._currentSelectedClass.studentIds.length) {
      this.studentService.getStudentsDetailByStudentsId(this._currentSelectedClass.studentIds, this.studentListCallback);
    } else {
      this.allStudentList = [];
    }
  }

  private studentListCallback = (studentList: Array<Student>) => {
    this.allStudentList = studentList;
    if (this.allStudentList && this.allStudentList.length) {
      this.taggedStudents.length = 0;
      this.allStudentList.map(student => {
        student['tagged'] = false;
        if (this.noteDetail && this.noteDetail.students.indexOf(student.userId) > -1) {
          student['tagged'] = true;
          this.taggedStudents.push(student);
        } else {
          this.untaggedStudents.push(student);
        }
      });
    }
  }
  /**
   * Function Used To Get The Student Data For The Particular Student
   */
  private getStudentData(): void {
    this.taggedStudents.length = 0;
    this.untaggedStudents.length = 0;

    if (this.noteDetail && this.noteDetail.students && this.noteDetail.students.length) {
      this._taggedStudentIds = JSON.parse(JSON.stringify(Object.assign([], this.noteDetail.students)));
    }
  }

  /**
   * Function Used To Check The event And Display The Student List
   * @param event event refers to the checked event
   * @param student student is the Student List
   */
  public taggedUntaggedStudent(event: Event, studentId: string): void {
    let index = 0;
    if (this.addEditOperation === 'Edit') {
      index = this._taggedStudentIds.indexOf(studentId);
      if (event && event.target['checked']) {
        this._taggedStudentIds.push(studentId);
        this.setTaggedFlag(studentId, true);
      } else {
        this.setTaggedFlag(studentId, false);
        this._taggedStudentIds.splice(index, 1);
      }
    } else {
      index = this._taggedStudentIds.indexOf(studentId);
      if (event.target['checked']) {
        this._taggedStudentIds.push(studentId);
      } else {
        this._taggedStudentIds.splice(index, 1);
      }
    }
  }

  /**
   * function for setting tagged flag.
   * @param studentId: this is refer to student ID
   * @param status: this is boolean parameter.
   */
  private setTaggedFlag(studentId: string, status: boolean): void {
    try {
    this.allStudentList.map(student => {
      if (student.userId === studentId) {
        student.tagged = status;
      }
    });
  } catch (error) {
    LoggerService.error('Unable to set tagged student', error);
  }
  }

  /**
   * Function Used To Save The Student Notes into the Firebase
   */
  public saveNote(addEditOperation: String): void {
    try {
      if (!this.noteForm.comment.trim()) {
        this.commentRequired = true;
        return;
      }
      this.commentRequired = false;

      if (addEditOperation === 'Edit') {
        this.updateNote(); // for edit operation
      } else {
        this.addNote(); // for add operation
      }
      this.resetNoteForm();
      this.accessibilityService.setTabIndexLevelStatus(true, false, false);
      this.wrapperScroll.nativeElement.scrollTop = 0;
      this.notesService.setNotePopupState(false);
    } catch (error) {
      LoggerService.error('Unable to save note', error);
    }
  }

  /**
   * Function for updating the edited values.
   */
  private updateNote(): void {
    try {
      const saveDate = this.todoDate.month.toString() + '/' + this.todoDate.day.toString() + '/' + this.todoDate.year.toString();
      const noteData = this.setNoteDetail(this.noteDetail.classid);
      if (saveDate) {
        noteData['flaggeddate'] = new Date(saveDate);
      } else {
        noteData['flaggeddate'] = new Date();
      }
      this.notesService.updateNoteByNoteId(this.noteDetail.id, noteData);
      this.noteDetail = null;
    } catch (error) {
      LoggerService.error('Unable to get update note', error);
    }
  }

  /**
   * Function for addding the new note
   */
  private addNote(): void {
    try {
      const noteData = this.setNoteDetail(this._currentSelectedClass.classId);
      if (!this.noteForm.flaggedDate) {
        noteData['flaggeddate'] = new Date();
      }
      this.notesService.saveNote(noteData);
    } catch (error) {
      LoggerService.error('Unable to get add note', error);
    }
  }

  /**
   * Setting the note details for saving the note value in database.
   * @param teacherClassId: current chosen class.
   */
  private setNoteDetail(teacherClassId: string) {
    return {
      comment: this.noteForm.comment.trim(),
      flagged: (this.noteForm.noteFlag) ? this.noteForm.noteFlag : false,
      flaggeddate: new Date(this.todoDate.month.toString() + '/' +
        this.todoDate.day.toString() + '/' + this.todoDate.year.toString()),
      createdat: new Date(),
      updatedat: new Date(),
      students: this._taggedStudentIds,
      classid: teacherClassId
    };
  }

  /**
   * function used to reset the add/edit note form.
   */
  private resetNoteForm(): void {
    this.noteForm = {
      comment: '',
      noteFlag: false,
      flaggedDate: ''
    };
    this._taggedStudentIds.length = 0;
  }

  /**
   * Function Used To Close The Sidebar Popup And Reset The Notes Form
   */
  public closePopup(): void {
    this.todoDate = new NgbDate(0, 0, 0);
    this.commentRequired = false;
    this.notesService.setNotePopupState(false);
    this.resetNoteForm();
    this.mainPageFocusStatusService.setMainPageFocusStatus(false);
    this.accessibilityService.setTabIndexLevelStatus(true, false, false);
    this.wrapperScroll.nativeElement.scrollTop = 0;
    this.taggedStudents.length = 0;
    this.untaggedStudents.length = 0;
    this.noteDetail = null;
    this.showDate = false;
  }

  /**
   * Function Used To Check The Clicked event and sets the flag value
   * @param event event refers to the checked event
   */
  public checkToDo(event: Event): void {
    if (event.target['checked']) {
      this.showDate = true;
      this.todoDate.month = Number(new Date().getMonth() + 1);
      this.todoDate.day = Number(new Date().getDate());
      this.todoDate.year = Number(new Date().getFullYear());
    } else {
      this.showDate = false;
    }
  }

  /**
   * Method used to set focus on starting element of page (for cyclic tabbing)
   * @param elementName1, elementName2 : name of element where focus should go.
   */
  public setFocus(focusElement1: string, focusElement2?: string): void {
    const videoElement = document.getElementById(focusElement1);
    if (videoElement) {
      this.accessibilityService.selectFocus(focusElement1);
    } else {
      this.accessibilityService.selectFocus(focusElement2);
    }
  }

  /**
   * on date selection event
   * @param date selected date
   */
  public todoDateSelection(selectedDate: NgbDate): void {
    this.todoDate = new NgbDate(0, 0, 0);
    setTimeout(() => {
      this.todoDate = selectedDate;
    }, 1);
  }

  public ngOnDestroy() {

    if (this._accessibilitySubscription$) {
      this._accessibilitySubscription$.unsubscribe();
    }
    if (this._notePopupDetailSubscription$) {
      this._notePopupDetailSubscription$.unsubscribe();
    }
    if (this._notePopupStateSubscription$) {
      this._notePopupStateSubscription$.unsubscribe();
    }
    if (this._teacherClassSubscription$) {
      this._teacherClassSubscription$.unsubscribe();
    }
  }
}
