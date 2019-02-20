// Core imports
import {
  Component, ViewEncapsulation, OnInit, Output,
  EventEmitter, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener
} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
// Service imports
import { MediaPopupService } from './media-popup.service';
import { MainPageFocusStatusService } from '../../mainpage-focus-status.service';
import { ModalService } from '../global-modal/modal.service';
import { AccessibilityService } from '../../services/accessibility.service';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { StudentService } from '../../services/student.service';
import { LoggerService } from '../../logger.service';
import { TeacherClassService } from '../../services/teacher-class.service';
// Model imports
import { Student } from 'src/app/models/student.model';
import { MediaMetaDataWithStudentsList, MediaTabStatus } from 'src/app/models/media.model';
import { MediaUpdateDetails } from 'src/app/models/media.model';
import { TeacherClassModel } from 'src/app/models/class.model';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SlideInOutAnimation } from '../../animations/slide-in-out.animation';
@Component({
  selector: 'app-media-popup',
  templateUrl: './media-popup.component.html',
  styleUrls: ['./media-popup.component.scss'],
  providers: [NgbModalConfig, NgbModal],
  encapsulation: ViewEncapsulation.None,
  animations: SlideInOutAnimation.getAnimations('100%')
})
export class MediaPopupComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('scrollTopMediaPopup') wrapperScroll: ElementRef;
  @ViewChild('content') public element: ElementRef;
  // Private variables
  private _mode: string = FileConstants.constants.view;
  private _allStudents: Array<Student> = [];
  private _description: string;
  private _allStudentIndex: number;
  private _tabIndexSubscription$: Subscription;
  private _mediaPopupServiceSubscription$: Subscription;
  private _previousTabIndexLevel: number;
  private _currentSelectedClass: TeacherClassModel;
  private _classSubscription$: Subscription; public mediaDetail: MediaMetaDataWithStudentsList;
  // Public variables
  public openMediaPopupState = false;
  public taggedStudents: Array<Student> = [];
  public untaggedStudents: Array<Student> = [];
  public tabIndexStatus = false;
  public mediaCaption = '';
  public enableMobileViewControl = true;
  public studentList: Array<Student> = [];
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};
  public isMobileView = false;
  /**
   * Function to get the media details object for the particular student
   */
  get mediaDetails() {
    return this.mediaDetail;
  }

  @Output() closeMediaSideBar = new EventEmitter<boolean>();

  constructor(
    private mediaPopupService: MediaPopupService,
    private mainPageFocusStatusService: MainPageFocusStatusService,
    private customModalService: ModalService,
    private accessibilityService: AccessibilityService,
    private studentService: StudentService,
    private teacherClassService: TeacherClassService
  ) {
  }

  ngOnInit() {
    this.onWindowResize();
    this.init();
  }

  /**
   * Initializes media popup component
   */
  private init(): void {
    this.tabIndexInit();
    this.mediaPopupServiceInit();
  }
  /**
   * Hosts listener
   * @param event window's resize
   */
  @HostListener('window:resize', ['$event'])
  onWindowResize(event?) {
    if (window.innerWidth <= 768) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
  }

  /**
   * Tabs index initilization
   */
  private tabIndexInit(): void {
    this._tabIndexSubscription$ =
      this.accessibilityService.getMediaPopUpTabIndexStatus().subscribe((tabStatus: MediaTabStatus) => {
        this.tabIndexStatus = tabStatus.currentLevel;
        this._previousTabIndexLevel = tabStatus.parentLevel;
      });
  }

  /**
   * Medias popup service initilization
   */
  private mediaPopupServiceInit(): void {
    this._mediaPopupServiceSubscription$ =
      this.mediaPopupService.getMediaPopupState().subscribe((flag: boolean) => {
        if (flag) {
          this.mediaDetail = this.mediaPopupService.getMediaDetails();
          this._description = this.mediaDetail.media.mediaDescription;
          this.mediaCaption = this.mediaDetail.media.caption;
          this._classSubscription$ =
            this.teacherClassService.getCurrentClass().subscribe((currentClass: TeacherClassModel) => {
              this.processClassLevels(currentClass as TeacherClassModel);
            });
        }
        this.openMediaPopupState = flag;
      });
  }

  /**
   * Function to close the media popup and set media popup state to false if mode is not editable
   */
  public closeMediaPopup(): void {
    this._mode = FileConstants.constants.view;
    try {
      this.mediaCaption = '';
      this.setTabIndex();
      if (this._description === '') {
        this.mediaDetail.media.mediaDescription = '';
      }
      if (this._mode === FileConstants.constants.view) {
        this.mediaPopupService.setMediaPopupState(false);
      }
      this.mainPageFocusStatusService.setMainPageFocusStatus(false);
      this.customModalService.closeModal();
      this.wrapperScroll.nativeElement.scrollTop = 0;
      this.pauseVideoAfterPopUpClose();
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Sets up tab index level status for aria
   */
  private setTabIndex(): void {
    this.accessibilityService.setMediaPopUpTabIndexStatus(false, 1);
    let firstLevel: boolean, secondLevel: boolean, thirdLevel: boolean;
    switch (this._previousTabIndexLevel) {
      case 1:
        firstLevel = true;
        secondLevel = thirdLevel = false;
        this.mediaDetail.parent = '';
        break;
      case 2:
        this.mediaDetail.parent = '';
        if (screen.width < 1000) {
          firstLevel = thirdLevel = false;
          secondLevel = true;
        } else {
          firstLevel = true;
          secondLevel = thirdLevel = false;
        }
        break;
      case 3:
        firstLevel = thirdLevel = false;
        secondLevel = true;
        break;
    }
    this.accessibilityService.setTabIndexLevelStatus(firstLevel as boolean, secondLevel as boolean, thirdLevel as boolean);
  }

  /**
   * Pauses video when media pop-up is closed
   */
  private pauseVideoAfterPopUpClose(): void {
    const desktopMediaVideo = <HTMLVideoElement>document.getElementById('video_section');
    const mobileMediaVideo = <HTMLVideoElement>document.getElementById('video_section_mobile');
    if (desktopMediaVideo) {
      desktopMediaVideo.pause();
    }
    if (mobileMediaVideo) {
      mobileMediaVideo.pause();
    }
  }

  /**
   * Switching back todesktop view
   */
  public closeMobileView(): void {
    this.enableMobileViewControl = true;
    this._mode = FileConstants.constants.view;
  }
  /**
   * Function to set the media to editable mode
   */
  public editMedia(): void {
    this.enableMobileViewControl = false;
    this._mode = FileConstants.constants.edit;
  }

  /**
   * Function to get the student list based on the current user id and tagged status
   */
  private getTagedUntagedStudents(): void {
    this._allStudents = Object.assign([], this.mediaDetail.students as Array<Student>);
    this.taggedStudents = [];
    this.untaggedStudents = [];
    this._allStudents.map((student: Student) => {
      if (this.mediaDetail.media.students.indexOf('' + student.userId) > -1) {
        student['tagged'] = true;
        this.taggedStudents.push(student as Student);
      } else {
        student['tagged'] = false;
        this.untaggedStudents.push(student as Student);
      }
    });
  }

  /**
   * Function Used To Check The event And Display The Student List
   *
   * @param event event refers to the checked event
   * @param student student is the Student List
   */
  public addStudent(event: Event, student: Student): void {
    this._allStudentIndex = this._allStudents.indexOf(student);
    if (event.target['checked']) {
      // insert the note id if checkbox is checked.
      this._allStudents[this._allStudentIndex].tagged = true;
    } else {
      this._allStudents[this._allStudentIndex].tagged = false;
    }
  }

  /**
   * This function is used to update the media description and caption
   *
   * @param mediaDesc get the image description from textarea
   * @param caption image caption
   */
  public updateMedia(mediaDesc: string, caption: string): void {
    try {
      this.enableMobileViewControl = true;
      const media: MediaUpdateDetails = {
        caption: caption,
        mediaDescription: mediaDesc,
        students: this.filterTaggedStudents(),
        updatedat: new Date()
      };
      this.mediaPopupService.updateMedia(this.mediaDetail.media.mediaId as string, media as MediaUpdateDetails).then(() => {
        this.onAfterMediaUpdateSuccess(mediaDesc as string, caption as string);
      });
      this.mediaPopupService.setMediaPopupState(false);
      this.wrapperScroll.nativeElement.scrollTop = 0;
      this.closeMediaPopup();
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * @param mediaDesc updated media description
   * @param caption updated media caption
   */
  private onAfterMediaUpdateSuccess(mediaDesc: string, caption: string): void {
    this._mode = FileConstants.constants.view;
    this.mediaDetail.media.students = this.filterTaggedStudents();
    this.mediaDetail.media.caption = caption;
    this.mediaDetail.media.mediaDescription = mediaDesc;
    this.mediaPopupService.setMediaDetails(this.mediaDetail as MediaMetaDataWithStudentsList);
  }
  /**
   * Method used to set focus on starting element of page (for cyclic tabbing)
   * @param elementToFocus, [elementToFocusSmallScreen] : name of element where focus should go.
   */
  public setFocus(elementToFocus: string, elementToFocusSmallScreen?: string) {
    const video = document.getElementById(elementToFocus as string);
    if (video) {
      this.accessibilityService.selectFocus(elementToFocus as string);
    } else {
      this.accessibilityService.selectFocus(elementToFocusSmallScreen as string);
    }
  }

  /**
   * Gets tagged students list
   * @returns tagged students list
   */
  private filterTaggedStudents(): Array<string> {
    const selectedStudent: Array<string> = [];
    this._allStudents.filter((student: Student) => {
      if (student.tagged === true) {
        selectedStudent.push(student.userId as string);
      }
    });
    return selectedStudent;
  }
  /**
    * Process media, initialize variables
    * base on currentClass.
    */
  private processClassLevels(currentClass: TeacherClassModel): void {
    try {
      if (!currentClass) {
        if (!this._currentSelectedClass) {
        }
      } else {
        this._currentSelectedClass = currentClass;
        this.studentService.getStudentsDetailByStudentsId(
          this._currentSelectedClass.studentIds as Array<string>, (student: Array<Student>) => {
            this.studentList = student;
          });
        this.getStudentsByCurrentClass();
      }
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }
  /**
   * Gets student list by current class
   */
  private getStudentsByCurrentClass(): void {
    try {
      this.studentList = [];
      if (this._currentSelectedClass && this._currentSelectedClass.studentIds && this._currentSelectedClass.studentIds.length) {
        this.studentService.getStudentsDetailByStudentsId(
          this._currentSelectedClass.studentIds as Array<string>, (studentList: Array<Student>) => {
            this.studentList = studentList;
            this.mediaDetails.students = Array.from(studentList);
            this.getTagedUntagedStudents();
          });
      }
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  ngAfterViewInit() {
    this.customModalService.setMediaPopupRef(this.element as ElementRef);
  }
  ngOnDestroy() {
    if (this._mediaPopupServiceSubscription$) {
      this._mediaPopupServiceSubscription$.unsubscribe();
    }
    if (this._tabIndexSubscription$) {
      this._tabIndexSubscription$.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
    this.customModalService.closeModal();
  }
}
