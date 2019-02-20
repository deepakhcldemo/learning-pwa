import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
// import services
import { MediaService } from '../../../shared/services/media.service';
import { ModalService } from '../../../shared/components/global-modal/modal.service';
import { StudentDetailService } from './student-detail.service';
import { TelemetryService } from '../../../shared/services/telemetry.service';
import { AccessibilityService } from '../../../shared/services/accessibility.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { ProgramService } from 'src/app/shared/services/program.service';
// import models
import { AssessmentComment, AssessmentItem, Assessmentitemobservation, AssessmentDetail } from '../../../models/assessment-detail.model';
import { Student } from '../../../models/student.model';
import { TeacherClassModel } from 'src/app/models/class.model';
import { ProgramClassModel } from 'src/app/models/program.model';
// import constants
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { CommentPopupComponent } from 'src/app/shared/components/comment-popup/comment-popup.component';
import { LoggerService } from 'src/app/shared/logger.service';
import { ObservationService } from 'src/app/shared/services/observation.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { MediaMetaData } from 'src/app/models/media.model';
import { MediaPopupService } from 'src/app/shared/components/media-popup/media-popup.service';
@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})

export class StudentDetailComponent implements OnInit, OnDestroy {
  public popupStatus = false;
  public allComment: Array<AssessmentComment> = [];
  public studentComment = '';
  public studentDetails: Student;
  public assessmentDetail: AssessmentDetail;
  public editable = false;
  public tabIndexStatus = false;
  public popupType = '';
  public headerTitle = '';

  private _currentSelectedClass: TeacherClassModel;
  private _currentSelectedClassProgram: ProgramClassModel;
  private _commentDetails: Array<AssessmentComment> = [];
  private _assessmentItem: AssessmentItem;
  private _deleteItemIds: Array<AssessmentComment> = [];
  private _updatedComment = '';

  private _commentSubscription$: Subscription;
  private _allMediaSubscription$: Subscription;
  private _popupSubscription$: Subscription;
  private _classSubscription$: Subscription;

  @Input() isEditable: boolean;
  @Output() closeSideBar = new EventEmitter<boolean>();
  // load the comment popup component reference.
  @ViewChild(CommentPopupComponent) commentPopup: CommentPopupComponent;

  constructor(
    private spinner: NgxSpinnerService,
    private mediaService: MediaService,
    private customModalService: ModalService,
    private studentDetailService: StudentDetailService,
    private observationService: ObservationService,
    private telemetryService: TelemetryService,
    private accessibilityService: AccessibilityService,
    private studentService: StudentService,
    private teacherClassService: TeacherClassService,
    private programService: ProgramService,
    private commentService: CommentService,
    private mediaPopupService: MediaPopupService
  ) { }

  /**
   * Initialize The Assessment Details From The Firebase, Get The Media List
   * And Subscribe The Student Details
   */
  ngOnInit() {
    this.accessibilityService.getTabIndexSecondLevelStatus().subscribe(levelStatus => {
      this.tabIndexStatus = levelStatus;
    });
    this._classSubscription$ = this.teacherClassService.getCurrentClass().subscribe((currentClass) => {
      this._currentSelectedClass = currentClass;
      // get media by class id.
      this._allMediaSubscription$ = this.mediaService.getMediaByClassId(
        this._currentSelectedClass.classId
      ).subscribe((mediaData) => {
        this.mediaService.setAllMedia(mediaData);
      });
    });
    this._currentSelectedClassProgram = this.programService.getCurrentProgramData();
    this._popupSubscription$ = this.studentDetailService.getPopupStatus().subscribe(studentPopupStatus => {
      this.popupStatusSubscriber(studentPopupStatus);
    });
    this.studentDetailService.setPopupStatus(true);
  }

  /**
   * This function is used to call when student detail popup status get subscribed.
   * @name popupStatusSubscriber
   * @param studentPopupStatus popup status when student details opens
   * @returns void
   */
  private popupStatusSubscriber(studentPopupStatus: boolean): void {
    if (studentPopupStatus) {
      this.allComment.length = 0;
      this.studentDetails = this.studentDetailService.getStudentDetail();
      this.assessmentDetail = this.studentDetailService.getAssessmentDetails();
      this._assessmentItem = this.studentDetailService.getAssessmentItemDetails();
      // this.spinner.show();
      this._commentSubscription$ = this.commentService.getAssessmentCommentsByStudentId(
        this.assessmentDetail.id,
        this._assessmentItem.id,
        this.assessmentDetail.parent,
        this.studentDetails.userId,
        this._currentSelectedClass,
        this._currentSelectedClassProgram
      ).subscribe((commentResult) => {
        this.getCommentResult(commentResult as Array<AssessmentComment>);
      }, err => {
        this.customModalService.setAssessmentItemMedia([]);
      });
    }
    // this.spinner.hide();
    this.popupStatus = studentPopupStatus;
  }

  /**
   * This function is used to get all assessment item comments.
   * @name getCommentResult
   * @param commentResult all assessment comment array from firebase.
   * @returns void
   */
  private getCommentResult(commentResult: Array<AssessmentComment>): void {
    this._commentDetails = commentResult;
    this.allComment.length = 0;
    if (this._commentDetails && this._commentDetails.length > 0) {
      this.customModalService.setAssessmentItemMedia(commentResult);
      this.allComment = this.setMediaDetailInAssessmentComment(commentResult);
      this.allComment = this.sortAssessmentCommentByDate(this.allComment);
      // this.spinner.hide();
    } else {
      this._updatedComment = '';
      this.customModalService.setAssessmentItemMedia([]);
      // this.spinner.hide();
    }
  }

  /**
   * This function is used to set the media detail in assessment comment object.
   * @name setMediaDetailInAssessmentComment
   * @param assessCommentItem comment detail object.
   * @returns array assessment comment data with media details.
   */
  private setMediaDetailInAssessmentComment(assessCommentItem: Array<AssessmentComment>): Array<AssessmentComment> {
    const studentAssessmentCommentData = [];
    assessCommentItem.map((value: AssessmentComment) => {
      if (value && value.ctype) {
        if (value.ctype === FileConstants.constants.media) {
          // fetch media detail and append inside assessment comment.
          value['mediaData'] = this.mediaService.getMediaById(value.mediaid);
        } else if (value.ctype === FileConstants.constants.comment) {
          // get the updated comment.
          this._updatedComment = value.comments;
        }
        studentAssessmentCommentData.push(value);
      }
    });

    return studentAssessmentCommentData;
  }

  /**
   * This function is used to sort the assessment comment data by date.
   * @name sortAssessmentCommentByDate
   * @param assessmentComment assessment comment data.
   * @returns array sorted assessment comment data by date.
   */
  private sortAssessmentCommentByDate(assessmentComment: Array<AssessmentComment>): Array<AssessmentComment> {
    assessmentComment = assessmentComment.sort((previous, next) => {
      if (previous.updatedat && next.updatedat) {
        return previous.updatedat.seconds - next.updatedat.seconds;
      } else if (previous.createdat && next.createdat) {
        return previous.createdat.seconds - next.createdat.seconds;
      }
    });

    return assessmentComment;
  }

  /**
   * Removes css class to enable the event while student details close.
   * @name removeCssClassToEnableClickEvent
   * @param selector
   * @void no return type only remove css on existing class
   */
  private removeCssClassToEnableClickEvent(selector: string): void {
    Array.from(document.querySelectorAll(selector)).forEach((ele) => {
      ele.classList.remove('disable-click');
    });
  }

  /**
   * This function is used to close the student detail popup.
   * @name closeStudentPopup
   * @returns void
   */
  public closeStudentPopup(): void {
    this.removeCssClassToEnableClickEvent('.student-item');
    this.removeCssClassToEnableClickEvent('.students-style');
    // this.renderer.removeClass(document.querySelectorAll('.student-item'), 'disable-click');
    this.studentDetailService.setPopupStatus(false);
    this.accessibilityService.setTabIndexLevelStatus(true, false, false);
  }

  /**
   * Function Used To Save The New Comment For The Particular Student Assessment
   * @name saveNewComment
   * @returns void
   */
  public saveNewComment(): void {
    if (this.studentComment.trim() !== '') {
      this.spinner.show();
      this._updatedComment = this.studentComment;
      const commentData = Object.assign({}, new AssessmentComment(
        this.assessmentDetail,
        this._assessmentItem,
        this._currentSelectedClass,
        this._currentSelectedClassProgram,
        FileConstants.constants.checklist,
        this._updatedComment,
        this.studentDetails.userId,
        FileConstants.constants.comment
      ));
      this.commentService.saveAssessmentItemComment(commentData);
      // calling telemetry service
      this.telemetryService.sendTelemetryEvent(
        this.telemetryService.formatTelemetryCommentObject(this.assessmentDetail, this.studentDetails.userId)
      ).then(data => {
        console.log(data);
      }).catch(error => {
        this.telemetryService.sendTelemetryExceptionEvent(FileConstants.constants.httpError, error.message);
      });
      this.saveIsObserved(FileConstants.constants.comment);
    }
    this.spinner.hide();
  }

  /**
  * Function used for saving the Observation status
  * @name saveIsObserved
  * @returns void
  */
  public saveIsObserved(commentType: string): void {
    const assessmentRef = this.observationService.getObservationForStudent(
      this.assessmentDetail.id,
      this._assessmentItem.id,
      this.assessmentDetail.parent,
      this.studentDetails.userId,
      this._currentSelectedClass,
      this._currentSelectedClassProgram
    ).subscribe(assessmentObservedData => {
      this.saveItemObservation(assessmentObservedData, commentType);
      this.studentComment = '';
      assessmentRef.unsubscribe();
    });
    // set the current student to focus to scrol at current student.
    this.studentService.setCurrentStudent(this.studentDetails.userId);
  }


  /**
   * This function is used to save item in item observation table.
   *
   * @name saveItemObservation
   * @param assessmentObservedData assessment observation data.
   * @param commentType comment type(media/text)
   * @returns void
   */
  private saveItemObservation(assessmentObservedData: Array<Assessmentitemobservation>, commentType: string): void {
    if (assessmentObservedData.length === 0) {
      // save new entry in database for observation.
      this.createObservation(commentType);
    } else if (assessmentObservedData.length > 0) {
      // update observation and count for observation.
      const observedData = assessmentObservedData[0];
      if (commentType === FileConstants.constants.comment) {
        // update comment count for text comment.
        observedData.updatedComment = this._updatedComment;
        observedData.commentCount = observedData.commentCount + 1;
      } else if (commentType === FileConstants.constants.media) {
        // update comment count for media comment.
        observedData.mediaCommentCount = observedData.mediaCommentCount + 1;
      }
      observedData.updatedat = new Date();
      this.observationService.updateObservation(observedData);
    }
  }


  /**
   * Creates observation
   * @param commentType string comment type either it is media or text.
   * @returns void
   */
  private createObservation(commentType: string): void {
    let commentCount = 0;
    let commentMediaCount = 0;
    if (commentType === FileConstants.constants.comment) {
      commentCount = 1;
    } else if (commentType === FileConstants.constants.media) {
      commentMediaCount = 1;
    }
    const assessmentObservationObj: Assessmentitemobservation = {
      assessmentid: this.assessmentDetail.id,
      assessmentitemid: this._assessmentItem.id,
      createdat: new Date(),
      updatedat: new Date(),
      path: this.assessmentDetail.path,
      isobserved: false,
      parent: this.assessmentDetail.parent,
      students: this.studentDetails.userId,
      classid: this._currentSelectedClass.classId,
      programid: this._currentSelectedClassProgram.program.identifier,
      productid: this._currentSelectedClassProgram.productId,
      type: FileConstants.constants.checklist,
      commentCount: commentCount,
      mediaCommentCount: commentMediaCount,
      updatedComment: this._updatedComment
    };
    this.observationService.saveObservation(assessmentObservationObj);
  }

  /**
   * This function is used to delete the assessment item comment and assessment item media.
   * @name deleteComment
   * @returns void
   */
  public deleteComment(): void {
    try {
      let deleteMediaCount = 0;
      let deleteCommentCount = 0;
      this.isEditable = true;
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
      this.assessmentDetail.id,
      this._assessmentItem.id,
      this.assessmentDetail.parent,
      this.studentDetails.userId,
      this._currentSelectedClass,
      this._currentSelectedClassProgram
    ).subscribe(assessmentObservedData => {
      if (assessmentObservedData.length > 0) {
        const observedData = assessmentObservedData[0];
        observedData.updatedComment = this._updatedComment;
        observedData.commentCount = +observedData.commentCount - deleteCommentCount;
        observedData.mediaCommentCount = +observedData.mediaCommentCount - deleteMediaCount;
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
    this._deleteItemIds = [];
  }

  /**
   * Function Used To Get The media library for student
   * @name getMediaList
   * @returns void
   */
  public getMediaList(): void {
    this.popupType = FileConstants.constants.media;
    this.headerTitle = FileConstants.constants.attachMedia;
    this.customModalService.setPopupType(FileConstants.constants.media);
    this.studentDetailService.setStudentDetail(this.studentDetails);
    const element = this.customModalService.getElement();
    this.customModalService.openModal(element);
  }

  /**
   * This function is used to toggle between the edit and cancel, remove buttons
   * @name toggleEdit
   * @returns void
   */
  public toggleEdit(): void {
    this.isEditable = true;
    this.editable = !this.editable;
  }

  /**
   * This function is used to push all the checked student comment id into array.
   * @name pushStudentCommentIds
   * @param event checkbox event
   * @param commentId assessment item comment and assessment item media id
   * @returns void
   *
   */
  public pushStudentCommentIds(event, comment: AssessmentComment): void {
    const index = this._deleteItemIds.indexOf(comment);
    if (event.target.checked) {
      // insert the assesment comment id if checkbox is checked.
      this._deleteItemIds.push(comment);
    } else {
      // Remove the assesment comment id if checkbox is unchecked.
      this._deleteItemIds.splice(index, 1);
    }
  }

  /**
   * This function is used to upload the media captured from frontend.
   * @name onFileSelected
   * @param captureMedia file object captured from UI
   * @returns void
   */
  public onFileSelected(captureMedia): void {
    this.spinner.show();
    this.mediaService.processUploadedMedia(captureMedia, this._currentSelectedClass, (mediaId: string) => {
      // update student in media.
      this.mediaPopupService.updateMedia(mediaId, {students: [this.studentDetails.userId]});
      const commentData = Object.assign({}, new AssessmentComment(
        this.assessmentDetail,
        this._assessmentItem,
        this._currentSelectedClass,
        this._currentSelectedClassProgram,
        FileConstants.constants.checklist,
        '',
        this.studentDetails.userId,
        FileConstants.constants.media,
        mediaId
      ));
      this.commentService.saveAssessmentItemComment(commentData as AssessmentComment);
      this.saveIsObserved(FileConstants.constants.media);
      this.spinner.hide();
      // calling telemetry service
        this.telemetryService.sendTelemetryEvent(this.telemetryService.formatTelemetryMediaObject(
          this.assessmentDetail, this.studentDetails.userId,
          captureMedia.target.files[0].type.split('/')[0], FileConstants.constants.checklistTitle)).then(data => {
          console.log(data);
        }).catch(error => {
          this.telemetryService.sendTelemetryExceptionEvent(FileConstants.constants.httpError, error.message);
        });
    });
  }

  /**
   * get selected comment and media item and open the comment/media popup
   * @name getComment
   * @param comment comment item object
   * @returns void
   */
  public getComment(comment: AssessmentComment): void {
    try {
      if (comment.ctype === FileConstants.constants.comment) {
        this.commentPopup.commentText = comment.comments;
        this.commentPopup.commentId = comment.id as string;
        this.customModalService.openModal(this.commentPopup.element);
      } else if (comment.ctype === FileConstants.constants.media) {
        this.mediaPopupService.openMediaPopup(comment.mediaData as MediaMetaData);
      }
    } catch (error) {
      LoggerService.error('Unable to get the selected comment and media', error);
    }
  }

  /**
   * Method used to set focus on starting element of page (for cyclic tabbing)
   * @name setAccessibilityFocus
   * @param focusElement name of element where focus should go.
   * @returns void
   */
  public setAccessibilityFocus(focusElement: string): void {
    this.accessibilityService.selectFocus(focusElement);
  }

  /**
   * This function will unsubscribe all the subscriptions when component destroys
   */
  ngOnDestroy() {
    if (this._popupSubscription$) {
      this._popupSubscription$.unsubscribe();
    }
    if (this._commentSubscription$) {
      this._commentSubscription$.unsubscribe();
    }
    if (this._allMediaSubscription$) {
      this._allMediaSubscription$.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
  }
}
