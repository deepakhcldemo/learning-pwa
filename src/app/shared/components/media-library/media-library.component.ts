import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
// imports service
import { StudentDetailService } from 'src/app/pages/components/student-detail/student-detail.service';
import { MediaService } from '../../services/media.service';
import { TeacherClassService } from '../../services/teacher-class.service';
import { ProgramService } from '../../services/program.service';
// imports model
import { ProgramClassModel } from 'src/app/models/program.model';
import { TeacherClassModel } from 'src/app/models/class.model';
import { MediaMetaData } from 'src/app/models/media.model';
import { Student } from 'src/app/models/student.model';
import { AssessmentDetail, AssessmentItem, AssessmentComment } from 'src/app/models/assessment-detail.model';
// import File Constant
import { FileConstants } from '../../constants/file-constants';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-media-library',
  templateUrl: './media-library.component.html',
  styleUrls: ['./media-library.component.scss']
})
export class MediaLibraryComponent implements OnInit, OnDestroy {

  @Output() updateMediaCount: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteMediaCount: EventEmitter<number> = new EventEmitter<number>();
  public selectedMediaLink: string;
  public displayMedia: Array<MediaMetaData> = [];
  public studentDetails: Student;
  public allMedia: Array<MediaMetaData>;

  private _currentAssessment: AssessmentDetail;
  private _assessmentItem: AssessmentItem;
  private _currentSelectedClassProgram: ProgramClassModel;
  private _currentSelectedClass: TeacherClassModel;
  private _assessmentItemMedia: Array<AssessmentComment>;

  private _classSubscription$: Subscription;
  private _studentDetailSubcriber$: Subscription;

  constructor(
    private studentDetailService: StudentDetailService,
    private mediaService: MediaService,
    private teacherClassService: TeacherClassService,
    private programService: ProgramService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    // get current program
    this._currentSelectedClassProgram = this.programService.getCurrentProgramData();
    // get current assessment detail.
    this._currentAssessment = this.studentDetailService.getAssessmentDetails();
    // get current assessment item detail.
    this._assessmentItem = this.studentDetailService.getAssessmentItemDetails();
    // get current student detail.
    this._studentDetailSubcriber$ = this.studentDetailService.getStudentDetailSubscriber().subscribe((studentDetail) => {
      // reset the student media library.
      this.displayMedia = [];
      this.studentDetails = studentDetail;
      // get current class.
      this._classSubscription$ = this.teacherClassService.getCurrentClass().subscribe((currentClass) => {
        this._currentSelectedClass = currentClass;
        // get all the media.
        this.mediaService.getMediaByClassId(this._currentSelectedClass.classId).subscribe(mediaList => {
          this.selectedMediaLink = FileConstants.constants.studentMedia;
          this.allMedia = mediaList;
          // get all the mapped assessment media.
          this.getAllMappedAssessmentImages();
        });
      });
    });
  }


  /**
   * Gets all mapped assessment images with student
   * @name getAllMappedAssessmentImages
   * @returns void
   */
  private getAllMappedAssessmentImages(): void {
    this.commentService.getAssessmentCommentsByStudentId(
      this._currentAssessment.id,
      this._assessmentItem.id,
      this._currentAssessment.parent,
      this.studentDetails.userId,
      this._currentSelectedClass,
      this._currentSelectedClassProgram
    ).subscribe((commentResult) => {
      this._assessmentItemMedia = commentResult as Array<AssessmentComment>;
      if (this.allMedia && this.allMedia.length > 0) {
        this.allMedia.map(mediaItem => {
          if (this._assessmentItemMedia && this._assessmentItemMedia.length > 0) {
            this._assessmentItemMedia.map(assessmentItem => {
              if ((assessmentItem.students.indexOf(this.studentDetails.userId) > -1) && (assessmentItem.mediaid === mediaItem.mediaId)) {
                mediaItem['mapped'] = true;
                mediaItem['mediadocid'] = assessmentItem.id;
              }
            });
          }
        });
      }
      this.displayMedia = Array.from(this.allMedia);
      // display media that are associated with students.
      this.displayMedia = this.displayMedia.filter(displayMediaObj => {
        return displayMediaObj.students.indexOf(this.studentDetails.userId) > -1;
      });
    });
  }

  /**
   * Displays student or all media on the basis of selected tab.
   * @name displayStudentOrAllMedia
   * @param selectedTab parameter used to check which tab is seleted.
   * @returns void
   */
  public displayStudentOrAllMedia(selectedTab: string): void {
    this.displayMedia = [];
    this.selectedMediaLink = selectedTab;
    // check if seleted link is selected to student
    if (selectedTab === FileConstants.constants.studentMedia) {
      // Display Student Media.
      this.displayMedia = Array.from(this.allMedia);
      this.displayMedia = this.displayMedia.filter(itm => {
        return itm.students.indexOf(this.studentDetails.userId) > -1;
      });
    } else {
      // Display All Media
      this.displayMedia = this.allMedia;
    }
  }

 /**
  * Updates media item on the basis of select/deselect checkbox
  * @name updateMediaItem
  * @param checkboxEvent checkbox event
  * @param mediaItem media item object
  * @returns void
  */
  public updateMediaItem(checkboxEvent, mediaItem: MediaMetaData): void {
    if (checkboxEvent.target.checked) {
      const commentData = Object.assign({}, new AssessmentComment(
        this._currentAssessment,
        this._assessmentItem,
        this._currentSelectedClass,
        this._currentSelectedClassProgram,
        this._currentAssessment.type,
        '',
        this.studentDetails.userId,
        FileConstants.constants.media,
        mediaItem.mediaId
      ));
      this.commentService.saveAssessmentItemComment(commentData);
      this.mediaService.getMediaByStudentAndMediaId(mediaItem.mediaId,
      this.studentDetails.userId).subscribe((mediaByStudentData) => {
        if (mediaByStudentData.length === 0) {
          this.mediaService.tagStudentInMedia(mediaItem, this.studentDetails.userId);
        }
      });
      // update the media count while upload the image from media library.
      this.updateMediaCount.emit(FileConstants.constants.media);
    } else {
      this.commentService.deleteAssessmentItemCommentById(mediaItem.mediadocid as string);
      // delete the media count while uncheck the checkbox.
      this.deleteMediaCount.emit(1);
    }
  }

  /**
   * This function is used to unsubscribe the subscriptions when component destroys
   *
   * @name ngOnDestroy
   * @returns void
   */
  ngOnDestroy(): void {
    if (this._studentDetailSubcriber$) {
      this._studentDetailSubcriber$.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
  }

}
