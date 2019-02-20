// Core imports
import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
// Service imports
import { MediaService } from '../../shared/services/media.service';
import { UploadFileService } from '../../shared/services/upload-file.service';
import { CustomErrorHandlerService } from '../../shared/services/custom.errorhandler.service';
import { MediaPopupService } from '../../shared/components/media-popup/media-popup.service';
import { ModalService } from '../../shared/components/global-modal/modal.service';
import { LoggerService } from '../../shared/logger.service';
import { AccessibilityService } from '../../shared/services/accessibility.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
// Model imports
import { MediaMetaDataWithStudentsList, MediaMetaData } from '../../models/media.model';
import { Student } from '../../models/student.model';
import { TeacherClassModel } from 'src/app/models/class.model';
// File Constant imports
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit, OnDestroy {

  @Input() public isEditable: boolean;
  // Private variables
  private _selectedLink = FileConstants.constants.allMedia;
  private _currentSelectedClass: TeacherClassModel;
  private _classSubscription$: Subscription;
  private _getMediaSubscription$: Subscription;
  private _accessibilityService$: Subscription;
  private _deleteMediaIds: Array<string> = [];
  private _mediaFromOnlineandOfflineStorage: Array<MediaMetaData> = [];
  private _allMedia: Array<MediaMetaData> = [];

  // Public variables
  public allMedia: Array<MediaMetaData> = [];
  public editable: boolean;
  public tabIndexStatus = true;
  public noMedia = true;
  public classSelectorStatus = true;
  public noClassFlag = false;
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};
  public isMobileView = false;
  public students: Array<Student> = [];

  constructor(
    private mediaService: MediaService,
    private errorHandler: CustomErrorHandlerService,
    private mediaPopupService: MediaPopupService,
    private customModalService: ModalService,
    private accessibilityService: AccessibilityService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private studentService: StudentService,
    private teacherClassService: TeacherClassService,
    private uploadService: UploadFileService) {
  }

  /**
   * Hook used to initialize the media from the firebase based on identity id
   */
  ngOnInit() {
    try {
      if (window.innerWidth <= 768) {
        this.classSelectorStatus = true;
        this.isMobileView = true;
      } else {
        this.classSelectorStatus = false;
        this.isMobileView = false;
      }
      this.editable = false;
      this.init();
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Hosts listener
   * @param event window's resize
   */
  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    if (window.innerWidth <= 768) {
      this.classSelectorStatus = true;
      this.isMobileView = true;
    } else {
      this.classSelectorStatus = false;
      this.isMobileView = false;
    }
  }

  /**
   * Initializes subscription from the init method of Component Lifecycle
   */
  private init(): void {
    try {
      this._accessibilityService$ =
        this.accessibilityService.getTabIndexFirstLevelStatus().subscribe((indexFlag: boolean) => {
          this.tabIndexStatus = indexFlag;
        });
      this._classSubscription$ =
        this.teacherClassService.getCurrentClass().subscribe((currentClass: TeacherClassModel) => {
          this.processClassLevelMedia(currentClass as TeacherClassModel);
        });
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Gets student list by current class
   */
  private getStudentByCurrentClass(): void {
    try {
      this.students = [];
      if (this._currentSelectedClass && this._currentSelectedClass.studentIds && this._currentSelectedClass.studentIds.length) {
        this.studentService.getStudentsDetailByStudentsId(
          this._currentSelectedClass.studentIds as Array<string>, (student: Array<Student>) => {
            this.students = student;
          });
      }
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Function to select media type tab
   * @param name selcted tab name
   */
  public isSelected(name: string): boolean {
    if (!this._selectedLink) {
      return false;
    }
    return (this._selectedLink === name);
  }

  /**
   * Function Used To Get The Media From The Firebase.
   */
  public getMedia(): void {
    try {
      this.allMedia.length = 0;
      this._mediaFromOnlineandOfflineStorage.length = 0;
      if (this._currentSelectedClass.classId) {
        this._getMediaSubscription$ = this.mediaService.getMediaByClassId(
          this._currentSelectedClass.classId as string).subscribe((media: Array<MediaMetaData>) => {
            this.populateMediaToDisplayInView(media as Array<MediaMetaData>);
            this.checkForSelectedTab();
            try {
              this.fetchLocalMediaAndSetStatus();
            } catch (error) {
              LoggerService.error(error.message as string, error as Object);
            }
          }, error => {
            this.errorHandler.handleError(error);
          });
      }
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * This Function deletes the Media from the databases based on media Id.
   */
  public deleteMedia(): void {
    try {
      if (this._deleteMediaIds && this._deleteMediaIds.length > 0) {
        this.spinner.show();
        this.mediaService.deleteMedia(this._deleteMediaIds as Array<string>);
        this.spinner.hide();
      }
      this.clearMediaIdsToBeDeleted();
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Function Used To Clear The ID Of The Student
   */
  private clearMediaIdsToBeDeleted(): void {
    this._deleteMediaIds = [];
  }

  /**
    * Function To Toggle The Edit Screen On Click.
    */
  public toggleEdit(): void {
    this.isEditable = true;
    this.editable = !this.editable;
    this.clearMediaIdsToBeDeleted();
  }

  /**
   * Function To Filter The Media Based On Selected Tab (All, Image, Video).
   * @param selectedTab [string] selected tab.
   */
  public flterMediaOnTabSelect(selectedTab: string): void {
    try {
      this.editable = false;
      this._selectedLink = selectedTab;
      switch (selectedTab) {
        case FileConstants.constants.image:
          this.getFilteredMedia(FileConstants.constants.image as string);
          break;
        case FileConstants.constants.Video:
          this.getFilteredMedia(FileConstants.constants.video as string);
          break;
        default:
          /* this.allMedia = this._allMedia.filter(media => {
            if (media.mediakind === FileConstants.constants.image || media.mediakind === FileConstants.constants.video) {
              return true;
            }
          }); */
          this.allMedia = Array.from(this._allMedia);
          break;
      }
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Gets filtered media
   * @param mediaType string
   */
  private getFilteredMedia(mediaType: string): void {
    try {
      this.allMedia = this._allMedia.filter(media => {
        if (media.mediakind === mediaType) {
          return true;
        }
      });
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /** Filter the media in template media list array base on the selected media tab
   * tabs can be 'all Meddia', 'images', 'videos'
   */
  public checkForSelectedTab(): void {
    try {
      if (this._selectedLink !== FileConstants.constants.allMedia) {
        this.flterMediaOnTabSelect(this._selectedLink as string);
      }
      if (this._selectedLink === FileConstants.constants.allMedia) {
        this.allMedia = Object.assign([], this.allMedia as Array<MediaMetaData>);
      }
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Function opens media in enlarged view, with details of
   * tagged and untagged students.
   * @param media mediaMetaData object having details of selected media.
   */
  public editMedia(media: MediaMetaDataWithStudentsList): void {
    try {
      this.customModalService.closeModal();
      this.mediaPopupService.openMediaPopup(media as MediaMetaDataWithStudentsList);
      this.accessibilityService.setTabIndexLevelStatus(false, true, false);
      this.accessibilityService.setMediaPopUpTabIndexStatus(true, 1);
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Function to collect all selected media ids
   * Inserts the id if checkbox is checked.
   * Removes the id if uncheck the checkbox.
   * @param event click event
   * @param mediaId selected media id
   */
  public mediaToDelete(event: Event, mediaId: string): void {
    try {
      const index = this._deleteMediaIds.indexOf(mediaId as string);
      if (event.target['checked']) {
        this._deleteMediaIds.push(mediaId as string);
      } else {
        this._deleteMediaIds.splice(index as number, 1);
      }
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Function used to upload the media files
   * @param uploadedFile it is the event
   */
  public onMediaUpload(uploadedFile: FileReader): void {
    this.spinner.show();
    try {
      this.mediaService.processUploadedMedia(uploadedFile as FileReader, this._currentSelectedClass as TeacherClassModel, (callback) => {
        if (callback) {
          this.spinner.hide();
        }
      });
    } catch (error) {
      this.spinner.hide();
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Params media component
   * @param image contains the selected media
   */
  public uploadMedia(image: MediaMetaData): void {
    try {
      const media = Object.assign({}, image as MediaMetaData);
      media.encodedPath = media.encodedPath ? media.encodedPath : media.path;
      this.uploadService.uploadFileMetaDataToStorage(image.caption as string, media as MediaMetaData);
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * This method downloads media from online store
   * @param image is the mediaData to be processed
   */
  public downloadMedia(image: MediaMetaData): void {
    try {
      this.spinner.show();
      const media: MediaMetaData = Object.assign({}, image);
      media.encodedPath = media.path = '';
      this.getMediaInBase64(image.path as string).subscribe((mediaBlob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          media.encodedPath = <string>reader.result;
          this.uploadService.saveMediaInLocalDBForOfflineMode(media as MediaMetaData);
          this.fetchLocalMediaAndSetStatus();
        };
        reader.readAsDataURL(mediaBlob as Blob);
        this.spinner.hide();
      }, (err: Error) => {
        this.spinner.hide();
        this.errorHandler.handleError(err as Error);
        LoggerService.error(err['message'] as string, err as Object);
      });
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Converts the online firebucket path of media to base64 format
   * @param imageUrl [string] firebucket media url
   */
  private getMediaInBase64(mediaURL: string): Observable<Blob> {
    try {
      return this.httpClient.get(mediaURL as string, { responseType: 'blob' });
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Populates and sorts the media list
   * @param media list of firebase media metadata
   */
  private populateMediaToDisplayInView(media: Array<MediaMetaData>): void {
    try {
      this._mediaFromOnlineandOfflineStorage = [];
      media.map((mediaItem: MediaMetaData) => {
        this._mediaFromOnlineandOfflineStorage.push(mediaItem as MediaMetaData);
        this._mediaFromOnlineandOfflineStorage.sort((mediaItem1, mediaItem2) => {
          // sort by date descending
          return mediaItem2.updatedat.seconds - mediaItem1.updatedat.seconds;
        });
        this.allMedia = this._mediaFromOnlineandOfflineStorage;
      });
      this.allMedia = this._mediaFromOnlineandOfflineStorage;
      this._allMedia = Object.assign([], this.allMedia);
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Checks for media availability
   */
  private checkForMediaAvailability(): void {
    if (this.allMedia.length < 1) {
      this.noMedia = true;
    } else {
      this.noMedia = false;
    }
  }

  /** Check for media in local
   * and set its status accordingly
   */
  private fetchLocalMediaAndSetStatus(): void {
    try {
      this.mediaService.getAllMediaFromCache().subscribe((response: Array<MediaMetaData>) => {
        let IDBMedia: Array<MediaMetaData>;
        IDBMedia = response;
        this.allMedia = this.mediaService.setStatus(IDBMedia as Array<MediaMetaData>, this.allMedia as Array<MediaMetaData>);
        this.flterMediaOnTabSelect(this._selectedLink as string);
        this.checkForMediaAvailability();
      });
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * Process media, initialize variables
   * base on currentClass.
   */
  private processClassLevelMedia(currentClass: TeacherClassModel): void {
    try {
      if (!currentClass) {
        this.noClassFlag = true;
        if (!this._currentSelectedClass) {
        }
      } else {
        this.noClassFlag = false;
        this._currentSelectedClass = currentClass;
        this.getMedia();
        this.studentService.getStudentsDetailByStudentsId(
          this._currentSelectedClass.studentIds as Array<string>, (student: Array<Student>) => {
            this.students = student;
          });
        this.getStudentByCurrentClass();
      }
    } catch (error) {
      LoggerService.error(error['message'] as string, error as Object);
    }
  }

  /**
   * This hook is used to unsubscribe all subscription when component destroys.
   */
  ngOnDestroy() {
    if (this._getMediaSubscription$) {
      this._getMediaSubscription$.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
    if (this._accessibilityService$) {
      this._accessibilityService$.unsubscribe();
    }
    this.customModalService.closeModal();
  }
}
