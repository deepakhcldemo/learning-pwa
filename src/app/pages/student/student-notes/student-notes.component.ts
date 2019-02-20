import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, Observable } from 'rxjs';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { StudentComponentService } from '../student-component.service';
import { NotesService } from 'src/app/shared/services/notes.service';

import { TeacherClassModel } from 'src/app/models/class.model';
import { Student } from 'src/app/models/student.model';
import { Note, NotesDetail, StudentNoteDetails } from 'src/app/models/notes.model';

import { FileConstants } from 'src/app/shared/constants/file-constants';


@Component({
  selector: 'app-student-notes',
  templateUrl: './student-notes.component.html',
  styleUrls: ['./student-notes.component.scss']
})
export class StudentNotesComponent implements OnInit, OnDestroy {
  private content = null;
  private toggleEditNotes = false;
  private _deleteNotes: Array<Note> = [];
  private currentClass: TeacherClassModel;
  private _studentNotesSubscription$: Subscription;
  private _selectedIndexSubscription$: Subscription;
  private _currentClassSubscription$: Subscription;
  private _accessibilityService$: Subscription;

  public selectedIndex: number;
  public students: Array<Student> = [];
  public noteList: Array<Note> = [];
  public showNoRec = false;
  public noResult = FileConstants.constants.noNotesMsg;
  public editable = false;
  public tabIndexStatus = true;
  public studentDetailsStatus = false;
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};

  constructor(private studentService: StudentService,
    private spinner: NgxSpinnerService,
    private studentComponentService: StudentComponentService,
    private notesService: NotesService,
    private accessibilityService: AccessibilityService,
    private teacherClassService: TeacherClassService
  ) { }

  ngOnInit(): void {
    this.tabIndexStatusSubscriber();
    this._selectedIndexSubscription$ = this.studentComponentService.getCurrentStudentIndex().subscribe(index => {
      this.selectedIndex = index;
    });
    this._currentClassSubscription$ = this.teacherClassService.getCurrentClass().subscribe(currentClass => {
      this.currentClass = currentClass;
    });
    this.getStudents();
  }

  /**
   * This function is used to subscribe to tab index status
   */
  private tabIndexStatusSubscriber(): void {
    this._accessibilityService$ = this.accessibilityService.getTabIndexFirstLevelStatus().subscribe(status => {
      this.tabIndexStatus = status;
    });
  }

  /**
  * Function used to get the student list
  */
  private getStudents(): void {
    if (this.currentClass) {
      this.studentService.getStudentsDetailByStudentsId(this.currentClass.studentIds, (students) => this.studentsDetailCallback(students));
    }
  }

  /**
   * This function assigns the student list returned by service in a variable
   * @param students - student object array
   */
  private studentsDetailCallback(students: Array<Student>): void {
    if (students && students.length) {
      this.students = students;
      this.selectStudentNotes();
    }
    this.spinner.hide();
  }

  /**
  * Function Used To Toggle the edit screen
  */
  public toggleEdit(): void {
    this.editable = !this.editable;
  }


  /**
  * Returns notes list on which a particular student is tagged
  */
  private getNotesByStudentId(): Observable<Array<StudentNoteDetails>> {
    return this.notesService.getStudentNotesList(this.students[this.selectedIndex].userId, this.currentClass.classId);
  }

  /**
   * Subscribe and save the Notes in an array returned by getNotesByStudentId()
   */
  private selectStudentNotes(): void {
    this.spinner.show();
    this._studentNotesSubscription$ = this.getNotesByStudentId().subscribe((notesInstance) => {
      this.noteList.length = 0;
      if (notesInstance && notesInstance.length > 0) {
        notesInstance.map(note => {
          note.data.id = note.id;
          this.studentService.getStudentsDetailByStudentsId(note.data.students, (students: Array<Student>) => {
            note.data.student = students;
          });
          this.noteList.push(note);
        });
        // this.noteList = notesInstance as any;
      }

      if (this.noteList.length === 0) {
        this.showNoRec = true;
      } else {
        this.showNoRec = false;
      }
      this.spinner.hide();
    }, (error: Error) => {
      this.spinner.hide();
    });
  }

  /**
 * Sets the data of the note which is selected in notePopupService
 * @param noteObj - contains the selected note details
 */
  public editStudentNotes(noteObj: Note): void {
    this.accessibilityService.setTabIndexLevelStatus(false, true, false);
    this.content = noteObj.data as NotesDetail;
    this.toggleEditNotes = !this.toggleEditNotes;
    this.notesService.setNoteDetails(this.content);
    this.notesService.setNotePopupState(true);
  }

  /**
 * Function Used To Remove the Selected Notes based on the user id
 */
  public removeNotes(): void {
    if (this._deleteNotes.length > 0) {
      this._deleteNotes.map(noteInstance => {
        if (noteInstance.data.students.indexOf(this.students[this.selectedIndex].userId) > -1) {
          const deleteIndex = noteInstance.data.students.indexOf(this.students[this.selectedIndex].userId);
          noteInstance.data.students.splice(deleteIndex, 1);
          noteInstance.data.student.splice(deleteIndex, 1);
          this.notesService.removeNotes(noteInstance, this.prepareNoteForDeletion(noteInstance));
        }
      });
      this._deleteNotes.length = 0;
    }
  }

  /**
   * This function is used to prepare note option which is to be deleted
   * @param noteInstance - note object to delete
   */
  private prepareNoteForDeletion(noteInstance: Note): NotesDetail {
    const noteData = {
      classid: noteInstance.data.classid,
      comment: noteInstance.data.comment,
      flagged: noteInstance.data.flagged,
      noteid: noteInstance.data.noteid,
      flaggeddate: new Date(noteInstance.data.flaggeddate.seconds * 1000),
      createdat: noteInstance.data.createdat,
      updatedat: new Date(),
      students: noteInstance.data.students
    };
    return noteData;
  }

  /**
 * Creates List of selected note
 * @param event checkbox event
 * @param noteObj Details of selected note
 */
  public prepareNotesToDelete(event: any, noteObj: Note): void {
    if (event.target.checked) {
      this._deleteNotes.push(noteObj);
    } else {
      const indexNuber = this._deleteNotes.indexOf(noteObj);
      this._deleteNotes.splice(indexNuber, 1);
    }
  }

  /**
   * This function is used to unsubscribe all subscriber.
   */
  ngOnDestroy(): void {
    if (this._studentNotesSubscription$) {
      this._studentNotesSubscription$.unsubscribe();
    }
    if (this._selectedIndexSubscription$) {
      this._selectedIndexSubscription$.unsubscribe();
    }
    if (this._currentClassSubscription$) {
      this._currentClassSubscription$.unsubscribe();
    }
    if (this._accessibilityService$) {
      this._accessibilityService$.unsubscribe();
    }
  }
}
