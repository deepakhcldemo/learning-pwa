import { Component, ElementRef, HostListener, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
import { CustomErrorHandlerService } from 'src/app/shared/services/custom.errorhandler.service';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { GlobalService } from 'src/app/global.service';
import { ModalService } from 'src/app/shared/components/global-modal/modal.service';
import { NotesService } from 'src/app/shared/services/notes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Student, NotesDetail, NotesId } from 'src/app/models/notes.model';
import { StudentService } from 'src/app/shared/services/student.service';
import { Subscription, timer } from 'rxjs';
import { TeacherClassModel } from 'src/app/models/class.model';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  @ViewChild('scrollTopAddNote') wrapperScroll: ElementRef;

  private _accessibilitySubscription$: Subscription;
  private _teacherClassSubscription$: Subscription;
  private _currentClassStudents: Array<Student> = [];
  private _currentTab = FileConstants.constants.allNotes;
  private _displayNotes: Array<NotesDetail> = [];
  private _notesConfirmationSubscription$: Subscription;
  private _notesSubscription$: Subscription;
  private _notes: Array<NotesDetail> = [];
  private _cloneStudents: Array<Student> = [];
  private _todoDate = new NgbDate(0, 0, 0);
  private _delayFocusSubscription$: Subscription;

  public classSelectorStatus = true;
  public displayAllNotes: Array<NotesDetail> = [];
  public isEditable = false;
  public isEnableCheckboxes = false;
  public expandStudents: Array<boolean> = [];
  public isAddNote = true;
  public isAddSliderOpen = false;
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};
  public tabIndexStatus = true;
  public selectedNotes: Array<NotesId> = [];

  constructor(
    private accessibilityService: AccessibilityService,
    private customModalService: ModalService,
    private errorHandler: CustomErrorHandlerService,
    private globalService: GlobalService,
    private ngxSpinnerService: NgxSpinnerService,
    private notesService: NotesService,
    private studentService: StudentService,
    private teacherClassService: TeacherClassService
  ) {
    this._todoDate['month'] = Number(new Date().getMonth() + 1);
    this._todoDate['day'] = Number(new Date().getDate());
    this._todoDate['year'] = Number(new Date().getFullYear());
  }

  /**
   * Function Used To Initialize The Notes List From The Firebase For The Particular Student
   */
  ngOnInit() {
    this.notesService.setAddEditOperation('Add');
    this.onWindowResize();
    try {
      this._accessibilitySubscription$ = this.accessibilityService
        .getTabIndexFirstLevelStatus()
        .subscribe(levelStatus => {
          this.tabIndexStatus = levelStatus;
        });
      this.ngxSpinnerService.show();
      this._teacherClassSubscription$ = this.teacherClassService.getCurrentClass().subscribe(currentClass => {
        if (currentClass) {
          this.populateNotesWithTaggedStudents(currentClass);
        }
      });
      this.ngxSpinnerService.hide();
    } catch (e) {
      this.ngxSpinnerService.hide();
    }
  }

  /**
   * Function for populating the list of student based on the chosen current class
   * @param currentClass : Object of chosen current class
   */
  private populateNotesWithTaggedStudents(currentClass: TeacherClassModel): void {
    this._currentClassStudents = [];
    if (currentClass && currentClass.studentIds && currentClass.studentIds.length) {
      this.studentService.getStudentsDetailByStudentsId(currentClass.studentIds, (studentList) => {
        this._cloneStudents = JSON.parse(
          JSON.stringify(Object.assign([], studentList))
        );
        this._currentClassStudents = studentList;
        this.setNotesList(currentClass.classId);
      });
    } else {
      this.setNotesList(currentClass.classId);
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event?) {
    if (window.innerWidth <= 768) {
      this.classSelectorStatus = true;
    } else {
      this.classSelectorStatus = false;
    }
  }

  /**
  * Function Used To Select The Particular Option ie.
   @Notes
  @ToDo's
  */
  public setCurrentTab(tabName: string): void {
    this.selectedNotes.length = 0;
    this._currentTab = tabName;
    this.filterNotesBasedOnCurrentTab(tabName);
    this.isEnableCheckboxes = false;
    this.isEditable = false;
    this.isAddNote = true;
  }

  /**
   * Filter notes based On current tab
   * @param tab Current selected tab
   */
  private filterNotesBasedOnCurrentTab(tab: string): void {
    this.displayAllNotes = this._displayNotes;
    if (tab === FileConstants.constants.toDo) {
      this.displayAllNotes = this._notes.filter((note) => {
        if (note.flagged) {
          return true;
        }
      });
    } else {
      this.displayAllNotes = this._notes;
    }
  }

  /**
   * Function used to open the note slider on clicking of Add Note button or particular note
   * @param AddEditOperation: this should be either Add or Edit
   * @param note: optional parameter, Note argument pass for Edit note.
   */
  public openAddEditSlider(AddEditOperation: string, note: any = ''): void {
    this.notesService.setAddEditOperation(AddEditOperation);
    (AddEditOperation === 'Edit') ? (this.notesService.setNoteDetails(note as NotesDetail)) : (this.clearCheckBox());
    this.notesService.setNotePopupState(true);
    this.accessibilityService.setTabIndexLevelStatus(false, true, false);
  }

  /**
   * Function Used To Enable CheckBoxes On Click Of Edit.
   */
  public toggleEdit(): void {
    this.selectedNotes.length = 0;
    this.isEditable = !this.isEditable;
    this.isAddNote = !this.isAddNote;
    this.isEnableCheckboxes = !this.isEnableCheckboxes;
    this.setFocusEditCancelButton();
  }
  private setFocusEditCancelButton(): void {
    this.selectedNotes.length = 0;
    if (this._delayFocusSubscription$) {
      this._delayFocusSubscription$.unsubscribe();
    }
    this._delayFocusSubscription$ = timer(200).subscribe(() => {
      if (document.getElementById('cancel')) {
        document.getElementById('cancel').focus();
      } else {
        document.getElementById('edit').focus();
      }
    });
  }

  /**
   * Function Used To Set The Notes List For Mapped Student(Filtering).
   * @param classid : value of current selected class.
   */
  private setNotesList(classid: string): void {
    if (classid) {
      this._notesSubscription$ = this.notesService.getNotesList(classid).subscribe(
        (noteList) => this.onSuccessNotesList(noteList),
        (error) => this.onErrorHandler(error)
      );
    }
  }

  /**
   * Function on successfully recieved notelist.
   * @param noteList: only passing paramater.
   */
  private onSuccessNotesList(noteList: Array<NotesDetail>): void {
    this._notes = [];
    if (noteList && noteList.length > 0) {
      noteList.map(note => {
        let tempNote;
        tempNote = note;
        tempNote['type'] = FileConstants.constants.notes;
        tempNote['student'] = this._currentClassStudents.filter(student => {
          if (note && note['students']) {
            return note['students'].indexOf(student.userId) > -1;
          }
        });
        this._notes.push(tempNote);
      });
    }
    this._notes = this.globalService.customSort(this._notes, 'createdat', 'DESC', 'seconds');
    this._displayNotes = this._notes;
    this.setCurrentTab(this._currentTab);
  }

  /**
   *  Function for error handling.
   * @param error: only passing paramater.
   */
  private onErrorHandler(error: any): void {
    this.errorHandler.handleError(error);
  }

  /**
   * This Function Is Used To Refresh The Student list
   */
  private clearCheckBox(): void {
    this._currentClassStudents.length = 0;
    this._currentClassStudents = Object.assign([], this._cloneStudents);
  }

  /**
   * This function is used to delete the notes on the basis of note id.
   */
  public deleteNotes(): void {
    if (this.selectedNotes.length > 0) {
      this.openDeleteConfirmationPopup();
      this._notesConfirmationSubscription$ = this.customModalService.getNotesConfirmation().subscribe(
        (successFlag) => this.onSuccessNotesConfirmation(successFlag),
        (error) => this.onErrorHandler(error)
      );
    }
  }

  /**
   * Function on delete note confirmation success.
   * @param successFlag: only passing paramater.
   */
  private onSuccessNotesConfirmation(successFlag: boolean): void {
    if (successFlag) {
      if (successFlag && this.selectedNotes.length > 0) {
        this.selectedNotes.map((note) => {
          this.notesService.deleteNoteByNoteId(note.noteId);
          this.clearSelectedNotes();
          this.toggleEdit();
        });
        this.customModalService.closeModal();
      }
    }
  }



  /**
   * This Function Is Used To Clear The Delete Notes Array.
   */
  private clearSelectedNotes(): void {
    this.selectedNotes = [];
  }

  /**
   * This Function Is Used To Push All The Checked Note Id Into Array.
   * @param event selected notes
   * @param noteId : nodeId which need to remove.
   */
  public checkedUncheckedToDeleteNotes(event: Event, noteId: string): void {
    const index = this.selectedNotes.indexOf({ noteId: noteId });
    if (event.target['checked']) {
      // insert the note id if checkbox is checked.
      this.selectedNotes.push({ noteId: '' + noteId });
    } else {
      // Remove the note id if uncheck the checkbox.
      this.selectedNotes.splice(index, 1);
    }
  }

  /**
   * Function Used To Open The bootstrap modal on click
   */
  private openDeleteConfirmationPopup(): void {
    const element = this.customModalService.getElement();
    this.customModalService.openModal(element, 'sm');
  }

  /**
   * No of students displaying in mobile view.
   * @param index Count of students.
   */
  public expandTaggedStudents(index: number): void {
    this.expandStudents[index] = !this.expandStudents[index];
  }

  ngOnDestroy() {
    this.notesService.setNotePopupState(false);
    if (this._notesSubscription$) {
      this._notesSubscription$.unsubscribe();
    }
    if (this._notesConfirmationSubscription$) {
      this._notesConfirmationSubscription$.unsubscribe();
    }
    if (this._accessibilitySubscription$) {
      this._accessibilitySubscription$.unsubscribe();
    }
    if (this._teacherClassSubscription$) {
      this._teacherClassSubscription$.unsubscribe();
    }
    if (this._delayFocusSubscription$) {
      this._delayFocusSubscription$.unsubscribe();
    }
  }
}
