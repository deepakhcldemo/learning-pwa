import { Component, OnInit, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';

import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { StudentComponentService } from './student-component.service';

import { TeacherClassModel } from 'src/app/models/class.model';
import { Student } from 'src/app/models/student.model';

import { FileConstants } from 'src/app/shared/constants/file-constants';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit, OnDestroy {
  private currentClass: TeacherClassModel;
  private allAssessmentSubscription$: Subscription;
  private _currentClassSubscription$: Subscription;
  private accessibilityService$: Subscription;
  private _currentStudentIndexSubscription$: Subscription;

  public selectedLink = FileConstants.constants.selectedLink;
  public noStudentMsg = FileConstants.constants.noStudentMsg;
  public current: number;
  public selectedTab = '';
  public selectedIndex: number;
  public students: Array<Student> = [];
  public setStudentId = {};
  public tabindexStatus = true;
  public studentDetailsStatus = false;
  public mob_studentDetailsStatus = false;
  public classSelectorStatus = true;
  public isMobileView: boolean;
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};

  constructor(
    private spinner: NgxSpinnerService,
    private accessibilityService: AccessibilityService,
    private studentService: StudentService,
    private teacherClassService: TeacherClassService,
    private studentComponentService: StudentComponentService,
  ) { }

  /**
   * Initialize The Student Details From The Firebase
   */
  ngOnInit(): void {
    this.onWindowResize();
    this.tabIndexStatusSubscriber();
    this.currentClassSubscriber();
    this.selectedStudentIndexSubscriber();
    this.spinner.show();
  }

  /**
   * Triggered everytime window is resized
   * @param event - window resize event
   */
  @HostListener('window:resize', ['$event'])
  onWindowResize(event?): void {
    if (window.innerWidth <= 768) {
      this.classSelectorStatus = true;
      this.isMobileView = true;
    } else {
      this.classSelectorStatus = false;
      this.isMobileView = false;
    }
  }

  /**
  * This function is used to subscribe to current class from teacher class service.
  */
  private currentClassSubscriber(): void {
    this._currentClassSubscription$ = this.teacherClassService.getCurrentClass().subscribe(currentClass => {
      this.studentComponentService.setCurrentStudentIndex(0);
      this.currentClass = currentClass;
      this.selectedLink = FileConstants.constants.selectedLink;
      this.getStudents();
    });
  }

  /**
  * This function is used to subscribe the selected student index from student component service.
  */
  private selectedStudentIndexSubscriber(): void {
    this._currentStudentIndexSubscription$ = this.studentComponentService.getCurrentStudentIndex().subscribe(index => {
      this.selectedIndex = index;
      this.selectedLink = FileConstants.constants.selectedLink;
    });
  }

  /**
   * This function is used to subscribe to tab index status
   */
  private tabIndexStatusSubscriber(): void {
    this.accessibilityService$ = this.accessibilityService.getTabIndexFirstLevelStatus().subscribe(status => {
      this.tabindexStatus = status;
    });
  }

  /**
   * This method is called when a tab is clicked and it sets the current tab
   * @param tabName name of the tab
   * @param tabValue name of the selected tab
   */
  public setTabStatus(tabName: string, tabValue: string): void {
    this.selectedLink = tabName;
    if (tabValue && tabValue.length) {
      this.selectedTab = tabValue;
    } else {
      this.selectedTab = '';
    }
  }

  /**
  * Function used to get the student list
  */
  private getStudents(): void {
    if (this.currentClass) {
      this.studentService.getStudentsDetailByStudentsId(this.currentClass.studentIds, (students: Array<Student>) =>
        this.studentsDetailCallback(students));
    } else {
      this.spinner.hide();
    }
  }

  /**
   * This function assigns the student list returned by service in a variable
   * @param students - student object array
   */
  private studentsDetailCallback(students: Array<Student>): void {
    if (students && students.length) {
      this.students = students;
    } else {
      this.students.length = 0;
    }
    this.spinner.hide();
  }

  /**
   * Sets the index of current student in selectedIndex
   * @param index - index of the student which is currently selected in students array
   */
  public setSelectedStudentIndex(index: number): void {
    this.studentComponentService.setCurrentStudentIndex(index);
    this.selectedIndex = index;
    this.selectedTab = '';
    if (window.screen.width < 768) {
      this.mob_studentDetailsStatus = true;
      this.studentDetailsStatus = false;
      setTimeout(() => {
        const element = document.getElementById('m_studentDetails');
        if (element) {
          element.focus();
        }
      }, 1000);
    } else {
      this.studentDetailsStatus = true;
      this.mob_studentDetailsStatus = false;
      const element = document.getElementById('studentDetails');
      if (element) {
        element.focus();
      }
    }
  }

  /**
   * Saves the details of the selected student based on the index
   */
  public getContactInfo(): void {
    this.setStudentId = this.students[this.selectedIndex];
  }



  /**
   * This function is used to unsubscribe all subscriber.
   */
  ngOnDestroy(): void {
    if (this._currentClassSubscription$) {
      this._currentClassSubscription$.unsubscribe();
    }
    if (this.accessibilityService$) {
      this.accessibilityService$.unsubscribe();
    }
    if (this._currentStudentIndexSubscription$) {
      this._currentStudentIndexSubscription$.unsubscribe();
    }
    if (this.allAssessmentSubscription$) {
      this.allAssessmentSubscription$.unsubscribe();
    }
  }
}
