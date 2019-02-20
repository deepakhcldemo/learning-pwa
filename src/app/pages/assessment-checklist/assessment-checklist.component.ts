import { Component, OnInit, OnDestroy, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// Spinner Loader Component
import { NgxSpinnerService } from 'ngx-spinner';
// service imports
import { AccordionService } from '../../shared/services/accordion.service';
import { AssessmentService } from '../../shared/services/assessment.service';
import { ModalService } from '../../shared/components/global-modal/modal.service';
import { StudentDetailService } from '../components/student-detail/student-detail.service';
import { TelemetryService } from '../../shared/services/telemetry.service';
import { AccessibilityService } from '../../shared/services/accessibility.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { LoggerService } from 'src/app/shared/logger.service';
// Models Import
import { AssessmentDetail, Assessmentitemobservation, AssessmentItem } from '../../models/assessment-detail.model';
import { Student } from '../../models/student.model';
import { TeacherClassModel } from 'src/app/models/class.model';
import { ProgramClassModel } from 'src/app/models/program.model';
// File Constant
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { ObservationService } from 'src/app/shared/services/observation.service';

// SlideInOutAnimation
import { SlideInOutAnimation } from 'src/app/shared/animations/slide-in-out.animation';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-assessment-checklist',
  templateUrl: './assessment-checklist.component.html',
  styleUrls: ['./assessment-checklist.component.scss'],
  animations: SlideInOutAnimation.getAnimations('-100%')
})

export class AssessmentChecklistComponent implements OnInit, OnDestroy {
  public studentList: Array<Student> = [];
  public assessmentPath: string;
  public currentAssessment: AssessmentDetail;
  public selectedStudent: string;
  public selectedAssessmentItem?: string | number;
  public alphabetsArray = [];
  public tabIndexStatus = true;
  public currentAssessmentIndex: number;
  public isMobileView = false;
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};

  private _currentStudent: Student;
  private _currentAssessmentItem: AssessmentItem;
  private _observedAssessment: Array<Assessmentitemobservation> = [];
  private _currentSelectedClass: TeacherClassModel;
  private _currentSelectedClassProgram: ProgramClassModel;

  private _assessmentObservationSubscription$: Subscription;
  private _classSubscription$: Subscription;
  private _studentPopupSubscription$: Subscription;
  private _observationSubscription$: Subscription;

  constructor(
    private accordionService: AccordionService,
    private router: Router,
    private ngxSpinnerService: NgxSpinnerService,
    private assessmentService: AssessmentService,
    private modalService: ModalService,
    private studentDetailService: StudentDetailService,
    private telemetryService: TelemetryService,
    private accessibilityService: AccessibilityService,
    private studentService: StudentService,
    private teacherClassService: TeacherClassService,
    private programService: ProgramService,
    private observationService: ObservationService
  ) { }

  /**
   * For initializing the assessment data bases on the user id
   */
  ngOnInit() {
    this.onWindowResize();
    this.ngxSpinnerService.show();
    this.currentAssessment = this.assessmentService.getCurrentAssessment();
    try {
      // check if current assessment is selected.
      if (this.accordionService.getBreadcrumb() && this.currentAssessment) {
        this.initializeLandingPageData();
        this.ngxSpinnerService.hide();
      } else {
        this.router.navigate(['pages/dashboard']);
      }
    } catch (error) {
      this.ngxSpinnerService.hide();
      this.router.navigate(['pages/dashboard']);
      LoggerService.error('Failed to load the assessment title and assessment items', error);
    }
  }
  /**
* Triggered everytime window is resized
* @param event - window resize event
*/
  @HostListener('window:resize', ['$event'])
  onWindowResize(event?): void {
    if (window.innerWidth <= 768) {
      // this.classSelectorStatus = true;
      this.isMobileView = true;
    } else {
      // this.classSelectorStatus = false;
      this.isMobileView = false;
    }
  }

  /**
   * inititialize the assessment component.
   * @name initializeLandingPageData call while component initialize.
   * @returns void
   */
  private initializeLandingPageData(): void {
    try {
      this.accessibilityService.getTabIndexFirstLevelStatus().subscribe(levelStatus => {
        this.tabIndexStatus = levelStatus;
      });
      this._classSubscription$ = this.teacherClassService.getCurrentClass().subscribe(currentClass => {
        this._currentSelectedClass = currentClass;
        // get all student list from current class.
        this.getStudentListByCurrentClass();
      });
      this._currentSelectedClassProgram = this.programService.getCurrentProgramData();
      this.alphabetsArray = this.assessmentService.getAssessmentAlphabets();
      this.assessmentPath = this.accordionService.getBreadcrumb().split('|').join(' > ');
      this._studentPopupSubscription$ = this.studentDetailService.getPopupStatus().subscribe(studentPopupStatus => {
        if (studentPopupStatus === false) {
          // reset the selected student details and assessment item after close the student popup.
          this.selectedStudent = '';
          this.selectedAssessmentItem = '0';
        }
      });
    } catch (error) {
      LoggerService.error('Unable to get the assessment path and alphabets', error);
    }
  }

  /**
   * This function is used to get all student associated with current class.
   * @name getStudentListByCurrentClass get all student by class.
   * @returns void
   */
  private getStudentListByCurrentClass(): void {
    try {
      this.studentList = [];
      if (this._currentSelectedClass && this._currentSelectedClass.studentIds && this._currentSelectedClass.studentIds.length) {
        this.studentService.getStudentsDetailByStudentsId(this._currentSelectedClass.studentIds, (studentList) => {
          if (this.studentService.getCurrentStudentFromStudentList()) {
            this.studentList.push(this.studentService.getCurrentStudentFromStudentList());
            // Reset the student.
            this.studentService.setCurrentStudentFromStudentList('');
          } else {
            this.studentList = studentList;
          }
          // set assessment observation checked for student assessment.
          this.getAssessmentObservations();
        });
      }
    } catch (error) {
      LoggerService.error('Unable to get the students in Assessment', error);
    }
  }

  /**
   * Get all assessment observations item data to check item is observed or not.
   * @name getAssessmentObservations get all assessment observation
   * @returns void
   */
  private getAssessmentObservations(): void {
    try {
      this._assessmentObservationSubscription$ = this.observationService.getObservationByClassAndProgramId(
        this._currentSelectedClass, this._currentSelectedClassProgram).subscribe(assessmentObservations => {
          this.mapAssessmentObservationsWithStudent(assessmentObservations as Array<Assessmentitemobservation>);
          // focus on recently observed student.
          this.focusOnRecentObservedStudent();
        });
    } catch (error) {
      LoggerService.error('Failed to get the Assessment Observations', error);
    }
  }

  /**
   * This function is used to map the assessment observation with student details.
   * @name observedAssessmentSubscription on sucess of assessment observation.
   * @param observation assessment observation object.
   * @returns void
   */
  private mapAssessmentObservationsWithStudent(assessmentObservations: Array<Assessmentitemobservation>): void {
    try {
      this._observedAssessment = assessmentObservations;
      this.studentList.map(studentItem => {
        studentItem['observed'] = [];
        this._observedAssessment.map(observedData => {
          if ((studentItem.userId === observedData.students) && this.currentAssessment.parent === observedData.parent) {
            const observedObject = {
              assessmentitemid: observedData.assessmentitemid,
              isObserved: false,
              id: observedData.id,
              commentCount: observedData.commentCount,
              mediaCommentCount: observedData.mediaCommentCount,
              updatedComment: observedData.updatedComment
            };
            if (observedData.isobserved) {
              observedObject.isObserved = true;
            }
            studentItem.observed.push(observedObject);
          }
        });
      });
    } catch (error) {
      LoggerService.error('Unable to map the observed assessment with student', error);
    }
  }

  /**
   * This function is used to focus on recently observed student.
   * @name focusOnRecentObservedStudent
   * @returns void
   */
  private focusOnRecentObservedStudent(): void {
    try {
      // get the recently observed student.
      const selectedStudent = this.studentService.getCurrentStudent();
      if (selectedStudent) {
        // focusing  of particular student for desktop view
        this.focusOnRecentObservedStudentForDesktop(selectedStudent);
        // focusing  of particular student for mobile view
        this.focusOnRecentObservedStudentForMobile(selectedStudent);
      }
    } catch (error) {
      LoggerService.error('Unable to focus on recent observed student in assessment', error);
    }
  }

  /**
   * This function is used to focus the recent assessment student on the basis of student id for mobile.
   * @param focusElementId student user id.
   * @returns void
   */
  private focusOnRecentObservedStudentForMobile(focusElementId): void {
    focusElementId = focusElementId + '_id';
    const selectedStudentElement = document.getElementById(focusElementId);
    if (selectedStudentElement) {
      // opening carousel for particular student in mobile view
      selectedStudentElement.click();
    }
  }

  /**
   * This function is used to focus the recent assessment student on the basis of student id for desktop.
   * @param focusElementId student user id.
   * @returns void
   */
  private focusOnRecentObservedStudentForDesktop(focusElementId: string): void {
    focusElementId = 'id' + '_' + focusElementId.toLowerCase();
    const element = document.getElementById(focusElementId);
    if (element) {
      element.focus();
    }
  }

  /**
   * Function used for saving the Observation status
   * @name saveIsObserved
   * @param currentAssessment assessment item id
   * @param assessmentItem assessment item
   * @param student current student
   * @param isSaved for setting the status
   * @returns void
   */
  public saveIsObserved(
    currentAssessment: AssessmentDetail,
    assessmentItem: AssessmentItem,
    student: string,
    isSaved: boolean,
  ): void {
    try {
      this.ngxSpinnerService.show();
      // get all the assessment observation.
      this._observationSubscription$ = this.observationService.getObservationForStudent(
        currentAssessment.id,
        assessmentItem.id,
        currentAssessment.parent,
        student,
        this._currentSelectedClass,
        this._currentSelectedClassProgram
      ).subscribe(assessmentObservedData => {
        // process observation to mark as observed/not observed.
        this.updateObservationStatus(
          currentAssessment, assessmentItem, student, isSaved, assessmentObservedData
        );
      });
      this.telemetryService.sendTelemetryEvent(
        this.telemetryService.formatTelemetryCriteriaObject(currentAssessment)).then(data => {
        }).catch(error => {
          this.telemetryService.sendTelemetryExceptionEvent(FileConstants.constants.httpError, error.message);
        });
      this.ngxSpinnerService.hide();
      // set the current student to focus to scrol at current student.
      this.studentService.setCurrentStudent(student);
    } catch (error) {
      LoggerService.error('Unable to save the observation status in assessment', error);
    }
  }

  /**
   * Observed subscriber
   * @param currentAssessment current assessment
   * @param assessmentItem current assessment item
   * @param student student user id
   * @param isSaved check status is observed or not
   * @param assessmentObservedData observation subscription object.
   */
  private updateObservationStatus(
    currentAssessment: AssessmentDetail,
    assessmentItem: AssessmentItem, student: string, isSaved: boolean, assessmentObservedData: Array<Assessmentitemobservation>) {
    try {
      // check observation data is present in database if not create a new record.
      if (assessmentObservedData.length === 0) {
        // save new observation record.
        const assessmentObservationObj: Assessmentitemobservation = {
          assessmentid: currentAssessment.id,
          assessmentitemid: assessmentItem.id,
          createdat: new Date(),
          updatedat: new Date(),
          path: currentAssessment.path,
          isobserved: true,
          parent: currentAssessment.parent,
          students: student,
          classid: this._currentSelectedClass.classId,
          programid: this._currentSelectedClassProgram.program.identifier,
          productid: this._currentSelectedClassProgram.productId,
          type: FileConstants.constants.checklist,
          commentCount: 0,
          mediaCommentCount: 0,
          updatedComment: ''
        };
        this.observationService.saveObservation(assessmentObservationObj);
      } else if (assessmentObservedData.length > 0) {
        // update observation record.
        const observedData: Assessmentitemobservation = assessmentObservedData[0];
        // toggle the observation status.
        observedData.isobserved = isSaved;
        observedData.updatedat = new Date();
        this.observationService.updateObservation(observedData);
      }
      this._observationSubscription$.unsubscribe();
    } catch (error) {
      LoggerService.error('Unable to update the observation status in assessment', error);
    }
  }

  /**
   * Function used to focus the element.
   * @name setFocusForAlphabetSorting
   * @param focusElementId element id
   * @returns void
   */
  public setFocusForAlphabetSorting(focusElementId: string): void {
    try {
      focusElementId = focusElementId.toLowerCase();
      const focusElement = document.getElementById(focusElementId.toLowerCase());
      if (focusElement) {
        const elementPosition = focusElement.getBoundingClientRect();
        let horizonatlPos = elementPosition.left;
        if (horizonatlPos > 0) {
          horizonatlPos = horizonatlPos - 588;
        } else {
          horizonatlPos = horizonatlPos - 588;
        }
        document.getElementById('student-list').scrollBy(
          horizonatlPos, 0
        );
        const focusId = document.getElementById(focusElementId.toLowerCase()).getAttribute('data-studentid');
        this.focusOnRecentObservedStudentForDesktop(focusId);
      }
    } catch (error) {
      LoggerService.error('Unable to focus the respective students to the selected alphabets', error);
    }
  }

  /**
   * Adds css class to disable the event while student detail open.
   * @name addCssClassToDisableEvent
   * @param selector
   * @void no return type only add css on existing class
   */
  private addCssClassToDisableEvent(selector: string): void {
    Array.from(document.querySelectorAll(selector)).forEach((ele) => {
      ele.classList.add('disable-click');
    });
  }

  /**
  * Function used to open the student assessment item details.
  * @name openStudentAssessmentItemDetails
  * @param currentAssessmentItem currentAssessmentItem
  * @param studentIndex student index
  * @returns void
  */
  public openStudentAssessmentItemDetails(currentAssessmentItem: AssessmentItem, studentIndex: string): void {
    try {
      this.addCssClassToDisableEvent('.student-item');
      this.addCssClassToDisableEvent('.students-style');
      // this.renderer.addClass(document.querySelectorAll('.student-item'), 'disable-click');
      this._currentAssessmentItem = currentAssessmentItem;
      this.setCurrentStudent(studentIndex);
      this.studentDetailService.setAssessmentDetails(this.currentAssessment);
      this.studentDetailService.setAssessmentItemDetails(this._currentAssessmentItem);
      this.selectedAssessmentItem = this._currentAssessmentItem.id;
      this.studentDetailService.setStudentDetail(this._currentStudent);
      this.accessibilityService.setTabIndexLevelStatus(false, true, false);
    } catch (error) {
      LoggerService.error('Unable to open the students assessment item details', error);
    }
  }

  /**
    * This function is used to close the student assessment items details.
    * @name closeStudentAssessmentItemDetails
    * @returns void
    */
  public closeStudentAssessmentItemDetails(): void {
    try {
      this._currentStudent = this.studentList[-1];
    } catch (error) {
      LoggerService.error('Unable to close the students assessment item details', error);
    }
  }

  /**
    * This function is used to set the current student.
    * @name setCurrentStudent
    * @param index current student index
    * @returns void
    */
  private setCurrentStudent(studentindex: string): void {
    try {
      this._currentStudent = this.studentList[studentindex];
      this.selectedStudent = this._currentStudent.userId;
    } catch (error) {
      LoggerService.error('Unable to set the current student in assessment', error);
    }
  }

  /**
    * This function is used to set the current assessment item.
    * @name setCurrentAssessmentItem
    * @param assessmentItem current assessment item
    * @returns void
    */
  public setCurrentAssessmentItem(assessmentItem: AssessmentItem): void {
    try {
      this._currentAssessmentItem = assessmentItem;
    } catch (error) {
      LoggerService.error('Unable to set the current assessment item', error);
    }
  }

  /**
   * This function is used to unsubscribe all subscription when component destroys
   */
  ngOnDestroy() {
    if (this._assessmentObservationSubscription$) {
      this._assessmentObservationSubscription$.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
    if (this._studentPopupSubscription$) {
      this._studentPopupSubscription$.unsubscribe();
    }
    if (this._observationSubscription$) {
      this._observationSubscription$.unsubscribe();
    }
    this.modalService.closeModal();
  }
}
