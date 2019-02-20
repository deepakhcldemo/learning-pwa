import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// Spinner Loader Component
import { NgxSpinnerService } from 'ngx-spinner';
// service imports
import { AccordionService } from '../../shared/services/accordion.service';
import { AssessmentService } from '../../shared/services/assessment.service';
import { MediaService } from '../../shared/services/media.service';
import { ModalService } from '../../shared/components/global-modal/modal.service';
import { AccessibilityService } from '../../shared/services/accessibility.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { LoggerService } from 'src/app/shared/logger.service';
// Models Import
import { AssessmentDetail, AssessmentItem, AssessmentComment } from '../../models/assessment-detail.model';
import { Student } from '../../models/student.model';
import { StudentModel } from 'src/app/models/report.model';
import { TeacherClassModel } from 'src/app/models/class.model';
import { ProgramClassModel } from 'src/app/models/program.model';
// File Constant
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { StudentDetailService } from '../components/student-detail/student-detail.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-ongoing-assessment',
  templateUrl: './ongoing-assessment.component.html',
  styleUrls: ['./ongoing-assessment.component.scss']
})

export class OngoingAssessmentComponent implements OnInit, OnDestroy {
  public currentAssessment: AssessmentDetail;
  public studentList: Array<Student> = [];
  public currentStudent: Student;
  public popupType = '';
  public assessmentPath: string;
  public toggleStudentObservation = false;
  public ongoingTabIndexStatus = true;
  public alphabetsArray = [];
  public selectedLink: string = FileConstants.constants.assessmentTitle;
  public currentAssessmentItem: AssessmentItem;
  public isMobileView = false;
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};

  private _currentSelectedClass: TeacherClassModel;
  private _currentSelectedClassProgram: ProgramClassModel;

  private _commentSubscription$: Subscription;
  private _allMediaSubscription$: Subscription;
  private _classSubscription$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private accordionService: AccordionService,
    private router: Router,
    private ngxSpinnerService: NgxSpinnerService,
    private modalService: ModalService,
    private assessmentService: AssessmentService,
    private mediaService: MediaService,
    private accessibilityService: AccessibilityService,
    private studentService: StudentService,
    private commentService: CommentService,
    private teacherClassService: TeacherClassService,
    private programService: ProgramService,
    private studentDetailService: StudentDetailService,
  ) { }

  /**
   * Initialize the student assessment item comment and assessment item media on load.
   * @name ngOnInit
   * @returns void
   */
  ngOnInit(): void {
    try {
      this.onWindowResize();
      this.ngxSpinnerService.show();
      this.currentAssessment = this.assessmentService.getCurrentAssessment();
      this.studentDetailService.setAssessmentDetails(this.currentAssessment);
      if (this.accordionService.getBreadcrumb() && this.currentAssessment) {
        this.currentAssessmentItem = this.currentAssessment.criteria[0];
        this.studentDetailService.setAssessmentItemDetails(this.currentAssessmentItem);
        this.initializeLandingPageData();
      } else {
        this.router.navigate(['pages/dashboard']);
      }
      this.ngxSpinnerService.hide();
    } catch (error) {
      // this.ngxSpinnerService.hide();
      this.router.navigate(['pages/dashboard']);
      LoggerService.error('Failed to load the assessment title and assessment items', error);
    }
  }
  /**
 * Triggered everytime window is resized
 */
  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    if (window.innerWidth <= 768) {
      // this.classSelectorStatus = true;
      this.isMobileView = true;
    } else {
      // this.classSelectorStatus = false;
      this.isMobileView = false;
    }
  }

  /**
   * inititialize the student comments and media list for the particular assessment item
   * @name initializeLandingPageData call while component initialize.
   * @returns void
   */
  private initializeLandingPageData(): void {
    try {
      this.assessmentPath = this.accordionService.getBreadcrumb().split('|').join(' >');
      this.accessibilityService.getTabIndexFirstLevelStatus().subscribe(status => {
        this.ongoingTabIndexStatus = status;
      });
      this.alphabetsArray = this.assessmentService.getAssessmentAlphabets();
      this._currentSelectedClassProgram = this.programService.getCurrentProgramData();
      this._classSubscription$ = this.teacherClassService.getCurrentClass().subscribe(currentClass => {
        this._currentSelectedClass = currentClass;
        if (!this._currentSelectedClass) {
          this._currentSelectedClass = JSON.parse(sessionStorage.getItem(FileConstants.constants.currentClass));
        }
        this.getStudentListByCurrentClass();
        // Get all media from firebase and set all media inside setter.
        this._allMediaSubscription$ = this.mediaService.getMediaByClassId(
          this._currentSelectedClass.classId
        ).subscribe((mediaData) => {
          this.mediaService.setAllMedia(mediaData);
        });
      });
    } catch (error) {
      LoggerService.error('Unable to get the assessment path and alphabets', error);
    }
  }

  /**
   * Function for populating the list of student based on the chosen current class
   * @name getStudentListByCurrentClass
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
          this.getCommentListByAssessmentId();
        });
      }
    } catch (error) {
      LoggerService.error('Unable to get the students in Assessment', error);
    }
  }

  /**
   * Get comment and media list for selected assessment
   * @name getCommentListByAssessmentId
   * @returns void
   */
  private getCommentListByAssessmentId(): void {
    try {
      // this function is used to get assessment comment and media data
      this._commentSubscription$ = this.commentService.getCommentByAssessmentIdAndItemId(
        this.currentAssessment.id,
        this.currentAssessmentItem.id,
        this.currentAssessment.parent,
        this._currentSelectedClass,
        this._currentSelectedClassProgram
      ).subscribe((assessmentCommentItem) => {
        this.mapStudentWithAssessmentComment(assessmentCommentItem as Array<AssessmentComment>);
        // this.ngxSpinnerService.hide();
        const currentFocussedStudent = this.studentService.getCurrentStudent();
        if (currentFocussedStudent) {
          // Focus the curent observed student.
          this.focusOnRecentObservedStudentForDesktop(currentFocussedStudent);
        }
      }, err => {
        // this.ngxSpinnerService.hide();
      });
    } catch (error) {
      LoggerService.error('Unable to get the comment list in assessment', error);
    }
  }

  /**
   * This function is used to focus the recent assessment student on the basis of student id for desktop.
   *
   * @param focusElementId student user id.
   */
  private focusOnRecentObservedStudentForDesktop(focusElementId: string) {
    focusElementId = 'id' + '_' + focusElementId.toLowerCase();
    const element = document.getElementById(focusElementId);
    if (element) {
        element.focus();
    }
  }

  /**
   * Mapp student with their corresponding media and comment to display at assessment page.
   * @name mapStudentWithAssessmentComment
   * @param assessmentCommentItem comment/media list
   * @returns void
   */
  private mapStudentWithAssessmentComment(assessmentCommentItem: Array<AssessmentComment>): void {
    try {
      if (assessmentCommentItem.length >= 0) {
        let assessmentCommentData = [];
        assessmentCommentData = this.setMediaDetailInAssessmentComment(assessmentCommentItem);
        assessmentCommentData = this.sortAssessmentCommentByDate(assessmentCommentData);
        this.studentList.map((studentData: StudentModel) => {
          studentData['comment'] = [];
          if (assessmentCommentData.length > 0) {
            assessmentCommentData.map((commentItemData) => {
              if (commentItemData && commentItemData.students && commentItemData.students.indexOf(studentData.userId) > -1) {
                studentData['comment'].push(commentItemData);
              }
            });
          }
        });
      }
    } catch (error) {
      LoggerService.error('Unable to map the students with assessment', error);
    }
  }

  /**
   * This function is used to set the media detail in assessment comment object.
   *
   * @name setMediaDetailInAssessmentComment
   * @param assessmentCommentItem comment detail object.
   * @returns array assessment comment data with media details.
   */
  private setMediaDetailInAssessmentComment(assessmentCommentItem: Array<AssessmentComment>): Array<AssessmentComment> {
    try {
      const studentAssessmentCommentData = [];
      assessmentCommentItem.map((assessmentData: AssessmentComment) => {
        if (assessmentData && assessmentData.ctype) {
          if (assessmentData.ctype === FileConstants.constants.media) {
            assessmentData['mediaData'] = this.mediaService.getMediaById(assessmentData.mediaid);
          }
          studentAssessmentCommentData.push(assessmentData);
        }
      });
      return studentAssessmentCommentData as Array<AssessmentComment>;
    } catch (error) {
      LoggerService.error('Unable to set the media in assessment', error);
    }
  }

  /**
   * This function is used to sort the assessment comment data by date.
   *
   * @name sortAssessmentCommentByDate
   * @param assessmentComment assessment comment data.
   * @returns array sorted assessment comment data by date.
   */
  private sortAssessmentCommentByDate(assessmentComment: Array<AssessmentComment>): Array<AssessmentComment> {
    try {
      assessmentComment = assessmentComment.sort((previous: AssessmentComment, next: AssessmentComment) => {
        if (previous.updatedat && next.updatedat) {
          return previous.updatedat.seconds - next.updatedat.seconds;
        } else if (previous.createdat && next.createdat) {
          return previous.createdat.seconds - next.createdat.seconds;
        }
      });
      return assessmentComment as Array<AssessmentComment>;
    } catch (error) {
      LoggerService.error('Unable to sort the assessment by date', error);
    }
  }

  /**
   * Function Used To Get The Assessments Based on selected alphabets(A-Z)
   *
   * @name setFocusForAlphabetSorting
   * @param focusElementId passes particular alphabet from alphabet sorting array
   * @returns void
   */
  public setFocusForAlphabetSorting(focusElementId: string): void {
    try {
      const element = document.getElementById(focusElementId.toLowerCase());
      if (element) {
        const elementPosition = element.getBoundingClientRect();
        let horizonatalPosition = elementPosition.left;
        if (horizonatalPosition > 0) {
          horizonatalPosition = horizonatalPosition - 588;
        } else {
          horizonatalPosition = horizonatalPosition - 588;
        }
        document.getElementById('student-list').scrollBy(
          horizonatalPosition, 0
        );
        const focusId = document.getElementById(focusElementId.toLowerCase()).getAttribute('data-studentid');
        this.focusOnRecentObservedStudentForDesktop(focusId as string);
      }
    } catch (error) {
      LoggerService.error('Unable to focus the respective students to the selected alphabets', error);
    }
  }

  /**
    * Function Used To change the student details view
    * on click of tab button for different resolution
    * @name isStudentDetails
    * @returns void
   */
  public isStudentDetails(): boolean {
    try {
      if (!this.selectedLink) {
        return false;
      }
    } catch (error) {
      LoggerService.error('Unable to fetch the selected tab from the menu list', error);
    }
  }

  /**
   * Function Used To open the Student Assessment popup based on the
   * current assessment item to display the
   * comment and media list
   *
   * @name openStudentAssessmentItemDetails
   * @param currentAssessmentItem current assessment item object.
   * @param studentindex student index.
   * @returns void
   */
  public openStudentAssessmentItemDetails(currentAssessmentItem: AssessmentItem, studentindex: number): void {
    try {
      if (screen.width < 1000) {
        this.accessibilityService.setTabIndexLevelStatus(false, true, false);
      } else {
        this.accessibilityService.setTabIndexLevelStatus(true, false, false);
      }
      this.currentAssessmentItem = currentAssessmentItem;
      this.setCurrentStudent(studentindex as number);
      this.toggleStudentObservation = true;
    } catch (error) {
      LoggerService.error('Unable to open the students assessment item details', error);
    }
  }

  /**
  * close popup view of assessemnt item detail view
  *
  * @name closeStudentAssessmentItemDetails
  * @returns void
  */
  public closeStudentAssessmentItemDetails(): void {
    try {
      if (screen.width < 1000) {
        this.accessibilityService.setTabIndexLevelStatus(true, false, false);
      } else {
        this.accessibilityService.setTabIndexLevelStatus(true, false, false);
      }
      this.toggleStudentObservation = false;
    } catch (error) {
      LoggerService.error('Unable to close the students assessment item details', error);
    }
  }

  /**
  * Set The Student List based on selected student
  *
  * @name setCurrentStudent
  * @param studentindex student index.
  * @returns void
  */
  public setCurrentStudent(studentindex: number | string): void {
    try {
      this.currentStudent = this.studentList[studentindex];
    } catch (error) {
      LoggerService.error('Unable to set the current student in assessment', error);
    }
  }

  /**
   * Fumction Used Used To Unsubscribe The Subscriptions on completion
   * Called once, before the instance is destroyed.
   * Add 'implements OnDestroy' to the class.
   *
   * @name ngOnDestroy
   * @returns void
   */
  ngOnDestroy(): void {
    this.route.snapshot.queryParams = {};
    if (this._commentSubscription$) {
      this._commentSubscription$.unsubscribe();
    }
    if (this._allMediaSubscription$) {
      this._allMediaSubscription$.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
    this.modalService.closeModal();
  }

}

