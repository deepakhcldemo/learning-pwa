import { Component, OnInit, OnDestroy, EventEmitter, Output, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomErrorHandlerService } from '../../services/custom.errorhandler.service';
import { AssessmentService } from '../../services/assessment.service';
import { NotesService } from '../../services/notes.service';
import { MediaService } from '../../services/media.service';
import { Router } from '@angular/router';
import { AccordionService } from '../../services/accordion.service';
import { ModalService } from '../global-modal/modal.service';
import { AssessmentDetail, Assessmentitemobservation } from '../../../models/assessment-detail.model';
import { MediaMetaData } from '../../../models/media.model';
import { AccessibilityService } from '../../services/accessibility.service';
import { ObservationDalService } from '../../services/realtime-datalayer/observation-dal.service';
import { GlobalService } from 'src/app/global.service';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { TeacherClassService } from '../../services/teacher-class.service';
import { ClassModel } from 'src/app/models/class.model';
import { HierarchyAssessment } from 'src/app/models/assessment-detail.model';
import { NotesDetail } from 'src/app/models/notes.model';
import { ProgramService } from '../../services/program.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UniqueArrayPipe } from '../../pipes/unique-array.pipe';
@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss']
})

export class RecentActivityComponent implements OnInit, OnDestroy {
  @Output() valueChange = new EventEmitter<object>();
  @Output() valueMediaPopupChange = new EventEmitter<object>();
  private _recentAssessmentSubscription: Subscription;
  private _recentNotesSubscription: Subscription;
  private _recentMediaSubscription: Subscription;
  private _classSubscription$: Subscription;
  private _currentSelectedClass: ClassModel;
  public recentActivityHeading: string = FileConstants.constants.recentActivity;
  public recentItem = [];
  public contentHidden: boolean;
  public recentTabIndexStatus = true;
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};
  public isMobileView = false;
  constructor(
    private errorHandler: CustomErrorHandlerService,
    private assessmentService: AssessmentService,
    private observationDalService: ObservationDalService,
    private notesService: NotesService,
    private mediaService: MediaService,
    private router: Router,
    private accordionService: AccordionService,
    private customModalService: ModalService,
    private accessibityService: AccessibilityService,
    private globalService: GlobalService,
    private teacherClassService: TeacherClassService,
    private programService: ProgramService
  ) { }

  /**
   * Initializes the Assessment list data from Firebase
   */
  ngOnInit() {
    // Intialize variable
    this.contentHidden = true;
    if (window.innerWidth <= 768) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
    this.accessibityService.getTabIndexFirstLevelStatus().subscribe(status => {
      this.recentTabIndexStatus = status;
    });
    this._classSubscription$ = this.teacherClassService.getCurrentClass().subscribe(currentClass => {
      if (currentClass) {
        this._currentSelectedClass = currentClass;
        this.setRecentItem(this._currentSelectedClass.classId);
      }
    });
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
   * This function is used to set the Assessment data, notes list and media list
   * for the particular tagged student
   */
  private setRecentItem(classid: string): void {
    const _assessmentData = [], _noteData = [], _mediaData = [];
    // get recent assessment items
    this.getRecentAssessment(_assessmentData, _noteData, _mediaData, classid);
    // get recent note items
    this.getRecentNotes(_assessmentData, _noteData, _mediaData, classid);
    // get recent media items
    this.getRecentMedia(_assessmentData, _noteData, _mediaData, classid);
  }

  /**
   * This function is used to subscribe recent assessment items
   *
   * @param _assessmentData recent assessment array
   * @param _noteData recent notes array
   * @param _mediaData recent media array
   */
  private getRecentAssessment(_assessmentData: Array<AssessmentDetail>, _noteData: Array<NotesDetail>,
    _mediaData: Array<MediaMetaData>, classid: string): void {
    this._recentAssessmentSubscription = this.observationDalService.
      getRecentlyObservedAssessmentItem(classid).subscribe(assessmentList => {
        this.setRecentAssessmentInsideComponent(_assessmentData, _noteData, _mediaData, assessmentList);
      }, error => {
        this.errorHandler.handleError(error);
      });
  }
  /**
   * This function is used to set recent item inside the component.
   *
   * @param _assessmentData assessment array
   * @param _noteData notes array
   * @param _mediaData media array
   * @param assessmentList assessmentList array subscribe data.
   */
  private setRecentAssessmentInsideComponent(_assessmentData: Array<AssessmentDetail>, _noteData: Array<NotesDetail>,
    _mediaData: Array<MediaMetaData>, assessmentList: Array<Assessmentitemobservation>): void {
    // initialize recent items
    this.recentItem.length = 0;
    // initialize assessment data
    _assessmentData.length = 0;
    if (assessmentList && (assessmentList.length > 0)) {
      const filterPipe = new UniqueArrayPipe();
      assessmentList = filterPipe.transform(assessmentList, 'parent');
      assessmentList.map(assessmentItemList => {
        if ((assessmentItemList.commentCount + assessmentItemList.mediaCommentCount > 0)) {
          // retrieve the Assessments by assessmentid
          let assessmentDetails;
          const assessmentDetailsArray = this.globalService.getAssessmentByIds([assessmentItemList['assessmentid']]);
          if (assessmentDetailsArray && assessmentDetailsArray.length > 0) {
            assessmentDetails = assessmentDetailsArray[0];
          }
          if (assessmentDetails) {
            const assessmentItem = {
              ...assessmentItemList,
              ...assessmentDetails,
              updatedat: assessmentItemList['updatedat'],
              assessmentItem: assessmentDetails.criteria.filter(criteria => {
                if (criteria) {
                  return criteria.id === assessmentItemList['assessmentitemid'];
                }
              })[0]
            };
            _assessmentData.push(assessmentItem);
          }
        }
      });
    }
    // push all the recent items(media, assessment, notes)
    this.recentItem.push(..._assessmentData, ..._noteData, ..._mediaData);
    // sorting the recent items
    this.sortRecentItems();
  }

  /**
   * This function is used to subscribe recent media items
   *
   * @param _assessmentData recent assessment array
   * @param _noteData recent notes array
   * @param _mediaData recent media array
   */
  private getRecentMedia(_assessmentData: Array<AssessmentDetail>, _noteData: Array<NotesDetail>,
    _mediaData: Array<MediaMetaData>, classid: string): void {
    if (classid) {
      this._recentMediaSubscription = this.mediaService.getRecentMediaList(classid).subscribe(mediaList => {
        this.setRecentMediaInsideComponent(_assessmentData, _noteData, _mediaData, mediaList);
      });
    }
  }

  /**
   * This function is used to set recent item inside the component.
   *
   * @param _assessmentData assessment array
   * @param _noteData notes array
   * @param _mediaData media array
   * @param mediaList media list subscribe data.
   */
  private setRecentMediaInsideComponent(_assessmentData: Array<AssessmentDetail>,
    _noteData: Array<NotesDetail>, _mediaData: Array<MediaMetaData>, mediaList: Array<MediaMetaData>): void {
    // initialize recent items
    this.recentItem.length = 0;
    // initialize media data
    _mediaData.length = 0;
    if (mediaList && (mediaList.length > 0)) {
      mediaList.map(media => {
        let tempMedia: MediaMetaData;
        tempMedia = media;
        tempMedia['type'] = FileConstants.constants.media;
        _mediaData.push(tempMedia);
      });
    }
    // push all the recent items(media, assessment, notes)
    this.recentItem.push(..._assessmentData, ..._noteData, ..._mediaData);
    // sorting the recent items
    this.sortRecentItems();
  }

  /**
   * This function is used to subscribe recent notes items
   *
   * @param _assessmentData recent assessment array
   * @param _noteData recent notes array
   * @param _mediaData recent media array
   */
  private getRecentNotes(_assessmentData: Array<AssessmentDetail>, _noteData: Array<NotesDetail>,
    _mediaData: Array<MediaMetaData>, classid: string): void {
    if (classid) {
      this._recentNotesSubscription = this.notesService.getRecentNotesList(classid).subscribe(noteList => {
        this.setRecentNoteInsideComponent(_assessmentData, _noteData, _mediaData, noteList);
        // initialize recent items
        this.recentItem.length = 0;
        // initialize notes data
        _noteData.length = 0;
        if (noteList && (noteList.length > 0)) {
          noteList.map(item => {
            let tempNote;
            tempNote = item;
            tempNote['type'] = 'notes';
            _noteData.push(tempNote);
          });
        }
        // push all the recent items(media, assessment, notes)
        this.recentItem.push(..._assessmentData, ..._noteData, ..._mediaData);
        // sorting the recent items
        this.sortRecentItems();
      });
    }
  }

  /**
   * This function is used to set recent item inside the component.
   *
   * @param _assessmentData assessment array
   * @param _noteData notes array
   * @param _mediaData media array
   * @param noteList note list subscribe data.
   */
  private setRecentNoteInsideComponent(_assessmentData: Array<AssessmentDetail>,
    _noteData: Array<NotesDetail>, _mediaData: Array<MediaMetaData>,
    noteList: Array<NotesDetail>): void {
    // initialize recent items
    this.recentItem.length = 0;
    // initialize notes data
    _noteData.length = 0;
    if (noteList && (noteList.length > 0)) {
      noteList.map(item => {
        let tempNote;
        tempNote = item;
        tempNote['type'] = 'notes';
        _noteData.push(tempNote);
      });
    }
    // push all the recent items(media, assessment, notes)
    this.recentItem.push(..._assessmentData, ..._noteData, ..._mediaData);
    // sorting the recent items
    this.sortRecentItems();
  }

  /**
   * This function is used to sort the recent items by date in descending order
   */
  private sortRecentItems(): void {
    this.recentItem.sort(function (previous, next) {
      return next.updatedat.seconds - previous.updatedat.seconds;
    });
  }

  /**
   * Function used to check the assessment type to Assessment Checklist/Ongoing Assessment
   * and navigate to the corresponding page respectively
   *
   * @param checklist Assessment Checklist/Ongoing Assessment
   */
  public openAssessment(checklist: AssessmentDetail): void {
    this.assessmentService.setCurrentAssessment(checklist);
    this.programService.setCurrentProgramData(this.programService.getProgramById(checklist.programid));
    this.accordionService.setBreadcrumb(checklist.path);
    if (checklist.type === FileConstants.constants.checklist) {
      this.router.navigate(['/pages/checklist']);
    } else {
      this.router.navigate(['/pages/ongoing']);
    }
  }

  /**
   * This function is used to hide and toggle the content for more and less
   * button in mobile view
   */
  public toggleContentHidden(): void {
    this.contentHidden = !this.contentHidden;
  }

  /**
   * Function to open the Notes and Media popup
   */
  public openVerticallyCentered(): void {
    const element = this.customModalService.getElement();
    this.customModalService.openModal(element);
  }

  /**
   * Function used to Toggle over the edit notes section
   *
   * @param noteObj contain data for note
   */
  public editNotesToggle(noteObj: NotesDetail): void {
    this.valueChange.emit(noteObj);
    this.accessibityService.setTabIndexLevelStatus(false, true, false);
  }

  /**
   * Function used to Toggle over the edit media section
   *
   * @param mediaObj contain data for media
   */
  public editMediaToggle(mediaObj: MediaMetaData): void {
    this.valueMediaPopupChange.emit(mediaObj);
    this.accessibityService.setTabIndexLevelStatus(false, true, false);
    this.accessibityService.setMediaPopUpTabIndexStatus(true, 1);
  }

  /**
  * Function used to unsubscribe all subscription when component destroy.
  */
  ngOnDestroy() {
    if (this._recentAssessmentSubscription) {
      this._recentAssessmentSubscription.unsubscribe();
    }
    if (this._recentNotesSubscription) {
      this._recentNotesSubscription.unsubscribe();
    }
    if (this._recentMediaSubscription) {
      this._recentNotesSubscription.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
  }
}
