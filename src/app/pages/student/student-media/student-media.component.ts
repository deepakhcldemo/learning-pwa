import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { MediaService } from 'src/app/shared/services/media.service';
import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
import { MediaPopupService } from 'src/app/shared/components/media-popup/media-popup.service';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { StudentComponentService } from '../student-component.service';

import { TeacherClassModel } from 'src/app/models/class.model';
import { Student } from 'src/app/models/notes.model';
import { MediaMetaData, MediaMetaDataWithStudentsList } from 'src/app/models/media.model';

import { FileConstants } from 'src/app/shared/constants/file-constants';


@Component({
  selector: 'app-student-media',
  templateUrl: './student-media.component.html',
  styleUrls: ['./student-media.component.scss']
})
export class StudentMediaComponent implements OnInit, OnDestroy {
  private selectedIndex: number;
  private _studentMediaSubscription$: Subscription;
  private _selectedIndexSubscription$: Subscription;
  private _currentClassSubscription$: Subscription;
  private _accessibilityService$: Subscription;

  public students: Array<Student> = [];
  public studentMedia: Array<MediaMetaData> = [];
  public noResult = FileConstants.constants.noMediaMsg;
  public showNoMedia = false;
  public currentClass: TeacherClassModel;
  public mediaDetails: MediaMetaDataWithStudentsList;
  public tabIndexStatus = true;
  public studentDetailsStatus = false;
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};

  constructor(private studentService: StudentService,
    private spinner: NgxSpinnerService,
    private studentComponentService: StudentComponentService,
    private mediaService: MediaService,
    private accessibilityService: AccessibilityService,
    private mediaPopupService: MediaPopupService,
    private teacherClassService: TeacherClassService,
  ) {
  }

  ngOnInit(): void {
    this.tabIndexStatusSubscriber();
    this._selectedIndexSubscription$ = this.studentComponentService.getCurrentStudentIndex().subscribe(index => {
      this.selectedIndex = index;
    });
    this._currentClassSubscription$ = this.teacherClassService.getCurrentClass().subscribe(currentClass => {
      this.currentClass = currentClass;
    });
    this.getStudents();
  }

  /**
   * This function is used to subscribe to tab index status
   */
  private tabIndexStatusSubscriber() {
    this._accessibilityService$ = this.accessibilityService.getTabIndexFirstLevelStatus().subscribe(status => {
      this.tabIndexStatus = status;
    });
  }

  /**
  * Function used to get the student list
  */
  private getStudents(): void {
    if (this.currentClass) {
      this.studentService.getStudentsDetailByStudentsId(this.currentClass.studentIds, this.studentsDetailCallback);
    }
  }

  /**
   * This function assigns the student list returned by service in a variable
   * @param students - student object array
   */
  private studentsDetailCallback = (students: Array<Student>): void => {
    if (students && students.length) {
      this.students = students;
      this.getStudentMedia();
    }
    this.spinner.hide();
  }

  /**
  * Subscribe and save the Media on which a particular student is
  * tagged in an array
  */
  private getStudentMedia(): void {
    this.studentMedia.length = 0;
    this.spinner.show();
    this._studentMediaSubscription$ = this.mediaService
      .getStudentMedia(this.students[this.selectedIndex].userId, this.currentClass.classId).subscribe(mediaData => {
        this.studentMedia.length = 0;
        this.prepareMediaList(mediaData);
        if (this.studentMedia.length === 0) {
          this.showNoMedia = true;
        } else {
          this.showNoMedia = false;
        }
        this.spinner.hide();
      }, (error: Error) => {
        this.spinner.hide();
      });
  }

  /**
   * This function is used to prepare media list for selected student
   * @param mediaData - Media Details
   */
  private prepareMediaList(mediaData: Array<MediaMetaData>): void {
    mediaData.map(media => {
      let tempMedia: MediaMetaData;
      tempMedia = media;
      tempMedia['type'] = FileConstants.constants.media;
      this.studentMedia.push(tempMedia);
      if (!tempMedia) {
        this.showNoMedia = true;
      } else {
        this.showNoMedia = false;
      }
    });
  }


  /**
 * Sets the data of selected media in mediapopup service and opens it in editable form in a slider
 * @param param contains the media object
 */
  public openMediaPopup(mediaObj: MediaMetaDataWithStudentsList): void {
    this.accessibilityService.setTabIndexLevelStatus(false, true, false);
    this.accessibilityService.setMediaPopUpTabIndexStatus(true, 1);
    this.mediaPopupService.openMediaPopup(mediaObj as MediaMetaDataWithStudentsList);
  }

  /**
   * This function is used to unsubscribe all subscriber.
   */
  ngOnDestroy(): void {
    if (this._studentMediaSubscription$) {
      this._studentMediaSubscription$.unsubscribe();
    }
    if (this._selectedIndexSubscription$) {
      this._selectedIndexSubscription$.unsubscribe();
    }
    if (this._currentClassSubscription$) {
      this._currentClassSubscription$.unsubscribe();
    }
    if (this._accessibilityService$) {
      this._accessibilityService$.unsubscribe();
    }
  }
}
