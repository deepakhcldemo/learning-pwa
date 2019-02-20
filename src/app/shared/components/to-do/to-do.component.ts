import { Component, OnInit, OnDestroy, EventEmitter, Output, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomErrorHandlerService } from '../../services/custom.errorhandler.service';
import { NotesDetail } from '../../../models/notes.model';
import { Student } from '../../../models/student.model';
import { AccessibilityService } from '../../services/accessibility.service';
import { StudentService } from '../../services/student.service';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { ClassModel, TeacherClassModel } from 'src/app/models/class.model';
import { TeacherClassService } from '../../services/teacher-class.service';
import { ToDoService } from '../../services/realtime-datalayer/todo-dal.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})

export class ToDoComponent implements OnInit, OnDestroy {
  @Output() valueChange = new EventEmitter<object>();
  private _todoDataSubscription: Subscription;
  private _classSubscription$: Subscription;
  private _studentsList: Array<Student> = [];
  private _currentSelectedClass: TeacherClassModel;
  public toDoActivityHeading: string = FileConstants.constants.toDoHeading;
  public contentHidden = true;
  public recenttoDo: Array<NotesDetail> = [];
  public todoTabindexStatus = true;
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};
  public isMobileView = false;
  constructor(
    private errorHandler: CustomErrorHandlerService,
    private accessibilityService: AccessibilityService,
    private toDoService: ToDoService,
    private studentService: StudentService,
    private teacherClassService: TeacherClassService
  ) { }

  /**
   * Initializes the Student Details from the Firebase and call the setToDoList()
   */
  ngOnInit() {
    if (window.innerWidth <= 768) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }

    this.accessibilityService.getTabIndexFirstLevelStatus().subscribe(status => {
      this.todoTabindexStatus = status;
    });
    this._classSubscription$ = this.teacherClassService.getCurrentClass().subscribe(currentClass => {
      if (currentClass) {
        this._currentSelectedClass = currentClass;
        this.studentService.getStudentsDetailByStudentsId(this._currentSelectedClass.studentIds, (studentResponseData) => {
          this._studentsList = studentResponseData;
          this.studentService.setTotalStudentCount(studentResponseData.length);
          this.setToDoList(this._currentSelectedClass.classId);
        });
      }
    });
    this.accessibilityService.setTabIndexLevelStatus(true, false, false);
  }
  /**
   * Triggered everytime window is resized
   * @param event - window resize event
   */
  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    if (window.innerWidth <= 768) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
  }

  /**
   * Function to set the To-Do Notes list and map this to the respective student
   */
  private setToDoList(classid: string): void {
    if (classid) {
      this._todoDataSubscription = this.toDoService.getRecentToDoList(classid).subscribe(noteList => {
        this.getRecentToDoSubscriber(noteList);
      }, error => {
        this.errorHandler.handleError(error);
      });
    }
  }

  private getRecentToDoSubscriber(noteList: Array<NotesDetail>): void {
    this.recenttoDo = [];
    if (noteList && (noteList.length > 0)) {
      noteList.map(notesItem => {
        let todoObj;
        todoObj = notesItem;
        todoObj['student'] = this._studentsList.filter(student => {
          return notesItem['students'].indexOf(student.userId) > -1;
        });
        this.recenttoDo.push(todoObj);
      });
    }
    // sort recent todo by date descending
    this.recenttoDo.sort(function (previous, next) {
      return next.flaggeddate.seconds - previous.flaggeddate.seconds;
    });
  }

  /**
   * This function is used to hide and toggle the content for more and less
   * button in mobile view
   */
  public toggleContentHidden(): void {
    this.contentHidden = !this.contentHidden;
  }

  /**
   * Toggle over the edit notes section
   *
   * @param noteObj contain the note data object.
   */
  public editNotesToggle(noteObj: NotesDetail): void {
    this.valueChange.emit(noteObj);
    this.accessibilityService.setTabIndexLevelStatus(false, true, false);
  }

  /**
   * Function used to unsubscribe the subscription when component destroys
   */
  ngOnDestroy() {
    if (this._todoDataSubscription) {
      this._todoDataSubscription.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
  }
}
