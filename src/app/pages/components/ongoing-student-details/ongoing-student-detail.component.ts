import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
// Spinner Loader Component
import { NgxSpinnerService } from 'ngx-spinner';
// service imports
import { AssessmentService } from '../../../shared/services/assessment.service';
import { TelemetryService } from '../../../shared/services/telemetry.service';
import { AccessibilityService } from '../../../shared/services/accessibility.service';
import { MediaService } from '../../../shared/services/media.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { LoggerService } from 'src/app/shared/logger.service';
// Models Import
import { TeacherClassModel } from 'src/app/models/class.model';
import { AssessmentComment, Assessmentitemobservation, AssessmentDetail, AssessmentItem } from '../../../models/assessment-detail.model';
import { Student } from '../../../models/notes.model';
import { ProgramClassModel } from 'src/app/models/program.model';
// File Constant
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { StudentDetailService } from '../student-detail/student-detail.service';
import { ModalService } from 'src/app/shared/components/global-modal/modal.service';
import { CommentPopupComponent } from 'src/app/shared/components/comment-popup/comment-popup.component';
import { CommentService } from 'src/app/shared/services/comment.service';
import { ObservationService } from 'src/app/shared/services/observation.service';
import { MediaMetaData } from 'src/app/models/media.model';
import { MediaPopupService } from 'src/app/shared/components/media-popup/media-popup.service';

@Component({
  selector: 'app-ongoing-student-detail',
  templateUrl: './ongoing-student-detail.component.html',
  styleUrls: ['./ongoing-student-detail.component.scss']
})

export class OngoingStudentDetailComponent implements OnInit, OnDestroy {
  public studentComment = '';
  public studentDetails: Student;
  public editable = false;
  public ongoingStudentTabIndexStatus: boolean;
  public popupType = '';
  public headerTitle = FileConstants.constants.attachMedia;

  private _deleteItemIds: Array<AssessmentComment> = [];
  private _assessmentDetail: AssessmentDetail;
  private _assessmentItem: AssessmentItem;
  private _currentSelectedClass: TeacherClassModel;
  private _currentSelectedClassProgram: ProgramClassModel;

  private _assessmentRef$: Subscription;
  private _currentStuentActionSubscription$: Subscription;
  private _classSubscription$: Subscription;

  @Output() closeSideBar = new EventEmitter<boolean>();
  @Output() setEditMode = new EventEmitter<boolean>();

  @ViewChild(CommentPopupComponent) commentPopup: CommentPopupComponent;

  @Input('studentDetail')
  set studentDetail(currentStudent: Student) {
    this.studentDetails = currentStudent;
    this._currentStuentActionSubscription$ = this.studentDetailService.getCurrentStudentAction().subscribe(student => {
      if (this.studentDetails && this.studentDetails.userId !== student) {
        this.editable = false;
      }
    });
  }

  /**
   * Function Used To Get The Details Of The Students
   *
   * @name studentDetail
   */
  get studentDetail(): Student {
    return this.studentDetails;
  }

  constructor(
    private spinner: NgxSpinnerService,
    private assessmentService: AssessmentService,
    private mediaService: MediaService,
    private telemetryService: TelemetryService,
    private accessibilityService: AccessibilityService,
    private studentService: StudentService,
    private teacherClassService: TeacherClassService,
    private programService: ProgramService,
    private studentDetailService: StudentDetailService,
    private modalService: ModalService,
    private commentService: CommentService,
    private observationService: ObservationService,
    private mediaPopupService: MediaPopupService
  ) { }

  /**
   * Initialize the student assessment item comment and assessment item media on load.
   *
   * @name ngOnInit
   * @returns void
   */
  ngOnInit(): void {
    try {
      if (screen.width < 1000) {
        this.ongoingStudentTabIndexStatus = false;
      } else {
        this.ongoingStudentTabIndexStatus = true;
      }
      this._assessmentDetail = this.assessmentService.getCurrentAssessment();
      this._classSubscription$ = this.teacherClassService.getCurrentClass().subscribe((currentClass) => {
        this._currentSelectedClass = currentClass;
      });
      this._currentSelectedClassProgram = this.programService.getCurrentProgramData();
      if (this._assessmentDetail && this._assessmentDetail.criteria) {
        this._assessmentItem = this._assessmentDetail.criteria[0];
      }
      if (screen.width < 1000) {
        this.accessibilityService.getTabIndexSecondLevelStatus().subscribe(status => {
          this.ongoingStudentTabIndexStatus = status;
        });
      } else {
        this.accessibilityService.getTabIndexFirstLevelStatus().subscribe(status => {
          this.ongoingStudentTabIndexStatus = status;
        });
      }
    } catch (error) {
      LoggerService.error('Failed to get the current assessment class and program data', error);
    }
  }

  /**
   * Function Used To Save The Comments For The Particular Student.
   *
   * @name saveNewComment
   * @param studentDetails save new comment for the particular student
   * @returns void
   */
  public saveNewComment(studentDetails: Student): void {
    try {
      if (this.studentComment.trim() !== '') {
        // set current student.
        this.studentDetails = studentDetails;
        this.spinner.show();
        const commentData = Object.assign({}, new AssessmentComment(
          this._assessmentDetail,
          this._assessmentItem,
          this._currentSelectedClass,
          this._currentSelectedClassProgram,
          FileConstants.constants.ongoing,
          this.studentComment,
          studentDetails.userId,
          FileConstants.constants.comment
        ));
        this.commentService.saveAssessmentItemComment(commentData);
        // calling telemetry service
        this.telemetryService.sendTelemetryEvent(
          this.telemetryService.formatTelemetryCommentObject(this._assessmentDetail, studentDetails.userId)
        ).then(data => {
          console.log(data);
        }).catch(error => {
          this.telemetryService.sendTelemetryExceptionEvent(FileConstants.constants.httpError, error.message);
        });
        this.saveIsObserved(FileConstants.constants.comment);
        // set the current student to focus to scrol at current student.
        this.studentService.setCurrentStudent(studentDetails.userId);
        this.spinner.hide();
      }
    } catch (error) {
      LoggerService.error('Unable to save the new comments in assessment', error);
    }
  }

  /**
   * Function used for saving the Observation status
   *
   * @name saveIsObserved
   * @returns void
   */
  public saveIsObserved(commentType: string): void {
    try {
      this._assessmentRef$ = this.observationService.getObservationForStudent(
        this._assessmentDetail.id,
        this._assessmentItem.id,
        this._assessmentDetail.parent,
        this.studentDetails.userId,
        this._currentSelectedClass,
        this._currentSelectedClassProgram
      ).subscribe(assessmentObservedData => {
        this.saveItemObservation(assessmentObservedData as Array<Assessmentitemobservation>, commentType);
        this._assessmentRef$.unsubscribe();
      });
    } catch (error) {
      LoggerService.error('Unable to save the observation status in assessment', error);
    }
  }

  /**
   * This function is used to save item in item observation table.
   *
   * @name saveItemObservation
   * @param assessmentObservedData assessment observation data.
   * @returns void
   */
  private saveItemObservation(assessmentObservedData: Array<Assessmentitemobservation>, commentType: string): void {
    try {
      if (assessmentObservedData.length === 0) {
        // save new entry in database for observation.
        this.createObservation(commentType);
      } else if (assessmentObservedData.length > 0) {
        // update observation and count for observation.
        const observedData = assessmentObservedData[0];
        if (commentType === FileConstants.constants.comment) {
          // update comment count for text comment.
          observedData.updatedComment = this.studentComment;
          observedData.commentCount = observedData.commentCount + 1;
        } else if (commentType === FileConstants.constants.media) {
          // update comment count for media comment.
          observedData.mediaCommentCount = observedData.mediaCommentCount + 1;
        }
        observedData.updatedat = new Date();
        this.observationService.updateObservation(observedData);
      }
      this.studentComment = '';
    } catch (error) {
      LoggerService.error('Unable to save the item in observation table', error);
    }
  }

  /**
   * Creates observation
   * @param commentType string comment type either it is media or text.
   * @returns void
   */
  createObservation(commentType: string): void {
    let commentCount = 0;
    let commentMediaCount = 0;
    if (commentType === FileConstants.constants.comment) {
      commentCount = 1;
    } else if (commentType === FileConstants.constants.media) {
      commentMediaCount = 1;
    }
    const assessmentObservationObj: Assessmentitemobservation = {
      assessmentid: this._assessmentDetail.id,
      assessmentitemid: this._assessmentItem.id,
      createdat: new Date(),
      updatedat: new Date(),
      path: this._assessmentDetail.path,
      isobserved: false,
      parent: this._assessmentDetail.parent,
      students: this.studentDetails.userId,
      classid: this._currentSelectedClass.classId,
      programid: this._currentSelectedClassProgram.program.identifier,
      productid: this._currentSelectedClassProgram.productId,
      type: FileConstants.constants.ongoing,
      commentCount: commentCount,
      mediaCommentCount: commentMediaCount,
      updatedComment: this.studentComment
    };
    this.observationService.saveObservation(assessmentObservationObj);
  }

  /**
  * This function is used to delete the assessment item comment and assessment item media.
  *
  * @name deleteComment
  * @returns void
  */
  public deleteComment(): void {
    try {
      let deleteMediaCount = 0;
      let deleteCommentCount = 0;
      this.editable = !this.editable;
      this._deleteItemIds.map((assessmentComment) => {
        // delete the assesment item comment and media.
        this.commentService.deleteAssessmentItemCommentById(assessmentComment.id as string);
        if (assessmentComment.ctype === FileConstants.constants.media) {
          ++deleteMediaCount;
        } else if (assessmentComment.ctype === FileConstants.constants.comment) {
          ++deleteCommentCount;
        }
      });
      // delete comment count from observation.
      this.deleteCommentCount(deleteMediaCount, deleteCommentCount);
      // clear the deleted item array.
      this.clearCommentIdsInDeleteArray();
    } catch (error) {
      LoggerService.error('Unable to delete the comments and media in assessment', error);
    }
  }
  /**
     * Deletes comment count
     * @param deleteMediaCount deleted media count
     * @param deleteCommentCount deleted comment  count
     * @returns void
     */
  public deleteCommentCount(deleteMediaCount: number, deleteCommentCount: number): void {
    const observationReference = this.observationService.getObservationForStudent(
      this._assessmentDetail.id,
      this._assessmentItem.id,
      this._assessmentDetail.parent,
      this.studentDetails.userId,
      this._currentSelectedClass,
      this._currentSelectedClassProgram
    ).subscribe(assessmentObservedData => {
      if (assessmentObservedData.length > 0) {
        const observedData = assessmentObservedData[0];
        observedData.commentCount = (+observedData.commentCount > 0) ? +observedData.commentCount - deleteCommentCount : 0;
        observedData.mediaCommentCount = (+observedData.mediaCommentCount > 0) ? +observedData.mediaCommentCount - deleteMediaCount : 0;
        this.observationService.updateObservation(observedData);
      }
      observationReference.unsubscribe();
    });
  }

  /**
   * Deletes media comment while deselect the media from media library.
   * @name deleteMediaCommentFromLibrary
   * @param deleteMediaCount delete media count.
   * @returns void
   */
  public deleteMediaCommentFromLibrary(deleteMediaCount: number): void {
    this.deleteCommentCount(deleteMediaCount, 0);
  }

  /**
   * Clears comment ids in delete array
   * @name clearCommentIdsInDeleteArray
   * @returns void
   */
  private clearCommentIdsInDeleteArray(): void {
    try {
      this._deleteItemIds = [];
    } catch (error) {
      LoggerService.error('Unable to clear the IDs for the particular student', error);
    }
  }

  /**
  * Function Used To Close The Sidebar For The Particular Student
  *
  * @name closeStudentSidebar
  * @returns void
  */
  public closeStudentSidebar(): void {
    try {
      this.editable = false;
      this.closeSideBar.emit(false);
    } catch (error) {
      LoggerService.error('Unable to close the sidebar for the particular student', error);
    }
  }

  /**
  * Function Used To Toggle The Edit and cancel, remove button
  *
  * @name toggleEdit
  * @returns void
  */
  public toggleEdit(): void {
    try {
      this.editable = !this.editable;
      if (this.editable) {
        this.studentDetailService.setCurrentStudentAction(this.studentDetails.userId);
      } else {
        this.studentDetailService.setCurrentStudentAction('');
      }
    } catch (error) {
      LoggerService.error('Unable to toggle between edit and cancel in assessment', error);
    }
  }

  /**
   * This function is used to push all the checked student comment id into array.
   *
   * @name pushStudentCommentIds
   * @param event checkbox event
   * @param commentId assessment item comment and assessment item media id
   * @returns void
   */
  public pushStudentCommentIds(event, comment: AssessmentComment): void {
    try {
      const index = this._deleteItemIds.indexOf(comment);
      if (event.target.checked) {
        // insert the assesment comment id if checkbox is checked.
        this._deleteItemIds.push(comment);
      } else {
        // Remove the assesment comment id if checkbox is unchecked.
        this._deleteItemIds.splice(index, 1);
      }
    } catch (error) {
      LoggerService.error('Unable to push all the checked comment id in array', error);
    }
  }

  /**
   * Determines whether file selected on
   *
   * @name onFileSelected
   * @param selectedMedia upload file object
   * @param studentDetails student detail object for which media is uploaded.
   * @returns void
   */
  public onFileSelected(selectedMedia, studentDetails: Student): void {
    try {
      this.spinner.show();
      // set current student.
      this.studentDetails = studentDetails;
      this.mediaService.processUploadedMedia(selectedMedia, this._currentSelectedClass, (mediaId: string) => {
        // update student in media.
        this.mediaPopupService.updateMedia(mediaId, { students: [studentDetails.userId] });
        const commentData = Object.assign({}, new AssessmentComment(
          this._assessmentDetail,
          this._assessmentItem,
          this._currentSelectedClass,
          this._currentSelectedClassProgram,
          FileConstants.constants.ongoing,
          '',
          studentDetails.userId,
          FileConstants.constants.media,
          mediaId
        ));
        this.commentService.saveAssessmentItemComment(commentData as AssessmentComment);
        this.saveIsObserved(FileConstants.constants.media);
        this.spinner.hide();
        this.telemetryService.sendTelemetryEvent(this.telemetryService.formatTelemetryMediaObject(
          this._assessmentDetail, this.studentDetails.userId,
          selectedMedia.target.files[0].type.split('/')[0], FileConstants.constants.observational
        )).then(data => {
          console.log(data);
        }).catch(error => {
          this.telemetryService.sendTelemetryExceptionEvent(FileConstants.constants.httpError, error.message);
        });
        // this.spinner.hide();
      });
    } catch (error) {
      LoggerService.error('Unable to browse the selected file in assessment', error);
    }
  }

  /**
   * Function Used To Get The Student Media details
   * @name getMediaList
   * @param studentDetails student object.
   * @returns void
   */
  public getMediaList(studentDetails: Student): void {
    try {
      this.studentDetails = studentDetails;
      this.popupType = FileConstants.constants.media;
      this.headerTitle = FileConstants.constants.attachMedia;
      // set current student detail.
      this.studentDetailService.setStudentDetail(studentDetails);
      const element = this.modalService.getElement();
      this.modalService.openModal(element);
    } catch (error) {
      LoggerService.error('Failed to get the student media details in assessment', error);
    }
  }

  /**
   * get selected comment and media item and open the comment/media popup
   *
   * @name getComment
   * @param comment comment item object
   * @returns void
   */
  public getComment(comment: AssessmentComment): void {
    try {
      if (comment.ctype === FileConstants.constants.comment) {
        this.commentPopup.commentText = comment.comments;
        this.commentPopup.commentId = comment.id as string;
        this.modalService.openModal(this.commentPopup.element);
      } else if (comment.ctype === FileConstants.constants.media) {
        this.mediaPopupService.openMediaPopup(comment.mediaData as MediaMetaData);
      }
    } catch (error) {
      LoggerService.error('Unable to get the selected comment and media', error);
    }
  }

  /**
   * Method used to set focus on starting element of page (for cyclic tabbing)
   *
   * @name setAccessibilityFocus
   * @param focusElement : name of element where focus should go.
   * @returns void
   */
  public setAccessibilityFocus(focusElement): void {
    try {
      this.accessibilityService.selectFocus(focusElement);
    } catch (error) {
      LoggerService.error('Failed to set the focus on starting element of page', error);
    }
  }

  /**
   * This function is used to unsubscribe the subscriptions when component destroys
   *
   * @name ngOnDestroy
   * @returns void
   */
  ngOnDestroy(): void {
    if (this._currentStuentActionSubscription$) {
      this._currentStuentActionSubscription$.unsubscribe();
    }
    if (this._assessmentRef$) {
      this._assessmentRef$.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
  }
}
