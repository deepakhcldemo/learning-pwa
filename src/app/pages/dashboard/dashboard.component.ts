// CORE Imports
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs';
// Third Party Lib Imports
import { NgxSpinnerService } from 'ngx-spinner';
// Model Imports
import { MediaMetaDataWithStudentsList } from '../../models/media.model';
import { NotesDetail } from '../../models/notes.model';
import { TeacherClassModel } from 'src/app/models/class.model';
// Service Imports
import { MediaPopupService } from '../../shared/components/media-popup/media-popup.service';
import { MainPageFocusStatusService } from '../../shared/mainpage-focus-status.service';
import { AccessibilityService } from '../../shared/services/accessibility.service';
import { FirebaseDbService } from 'src/app/shared/services/firebase.db.service';
import { NotesService } from 'src/app/shared/services/notes.service';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { CarouselService } from 'src/app/shared/components/carousel/carousel.service';
// Dependent Component Import
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { SlideInOutAnimation } from 'src/app/shared/animations/slide-in-out.animation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: SlideInOutAnimation.getAnimations('100%')
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(CarouselComponent) carousel: CarouselComponent;

  private content = null;
  public recent = false;
  public showRecent = true;
  public dashboardTabindexStatus = true;
  public tabindexStatus = true;
  public classSelectorStatus = true;
  public toggleAssessment = false;
  public mediaPopupCondition = false;
  public openMediaPopup = false;
  public currentSelectedClass: TeacherClassModel;

  private _classSubscription$: Subscription;
  private _carouselSubscription$: Subscription;

  constructor(
    private ngxSpinnerService: NgxSpinnerService,
    private mediaPopupService: MediaPopupService,
    private notesService: NotesService,
    private mainPageFocusStatusService: MainPageFocusStatusService,
    private accessibilityService: AccessibilityService,
    private firebaseDbService: FirebaseDbService,
    private teacherClassService: TeacherClassService,
    private carouselService: CarouselService,
    private cd: ChangeDetectorRef
  ) { }

  /**
   * This Function is used to get student details by product id from user service
   * by matching it with product id from assessment service on component loads.
   */
  ngOnInit(): void {
    if (window.innerWidth <= 768) {
      this.classSelectorStatus = true;
    } else {
      this.classSelectorStatus = false;
    }
    this.ngxSpinnerService.show();
    this.accessibilityService
      .getTabIndexFirstLevelStatus()
      .subscribe(firstLayerStatus => {
        this.dashboardTabindexStatus = firstLayerStatus;
      });
    this.accessibilityService.setTabIndexLevelStatus(true, false, false);
    this.firebaseDbService.initUserCollectionInFirebase();
    this._classSubscription$ = this.teacherClassService
      .getCurrentClass()
      .subscribe(currentClass => {
        this.currentSelectedClass = currentClass;
      });
    this._carouselSubscription$ = this.carouselService
      .getCurrentSlideShowFlag()
      .subscribe(recentShowFlag => {
        this.showRecent = recentShowFlag;
        this.cd.detectChanges();
      });
    this.ngxSpinnerService.hide();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth <= 768) {
      this.classSelectorStatus = true;
    } else {
      this.classSelectorStatus = false;
    }
  }

  /**
   * This Function is used to toggle between Assessment Checklist and Ongoing Assessment.
   */
  public toggleAssessSideBarAcordian(): void {
    if (this.toggleAssessment) {
      this.accessibilityService.setTabIndexLevelStatus(true, false, false);
    } else {
      this.accessibilityService.setTabIndexLevelStatus(false, true, false);
    }
    this.toggleAssessment = !this.toggleAssessment;
  }

  /**
   * This Function is used to open the Recent activity section from dashboard.
   */
  public goToMostRecent(): void {
    this.showRecent = false;
    this.recent = true;
    this.carouselService.setCurrentSlideShowFlag(false);
    this.carousel.getAllCarouselNodes();
  }

  /**
   * This Function is used for calling edit notes popup from Recent Activity and To-Do's tab
   *
   * @param event selected note
   */
  public toggleEditNote(event: Event): void {
    // this is used to set the ARIA hidden for dashboard so that it will not focus on dashboard.
    this.notesService.setAddEditOperation('Edit');
    this.mainPageFocusStatusService.setMainPageFocusStatus(true);
    this.content = event as NotesDetail;
    this.notesService.setNoteDetails(this.content);
    this.notesService.setNotePopupState(true);
  }

  /**
   * This Function is used for calling media popup from Recent Activity tab
   *
   * @param event selected media
   */
  public toggleEditMedia(mediaObj: MediaMetaDataWithStudentsList): void {
    // this is used to set the ARIA hidden for dashboard so that it will not focus on dashboard.
    this.mainPageFocusStatusService.setMainPageFocusStatus(true);
    this.mediaPopupCondition = true;
    this.mediaPopupService.openMediaPopup(
      mediaObj as MediaMetaDataWithStudentsList
    );
  }

  /**
   * This Function is used for closing media popup from Recent Activity tab.
   */
  public closeMediaSideBar(): void {
    this.openMediaPopup = false;
  }

  /**
   * This Function is used to unsubscribe all the subscriptions
   */
  ngOnDestroy(): void {
    if (this._carouselSubscription$) {
      this._carouselSubscription$.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
  }
}
