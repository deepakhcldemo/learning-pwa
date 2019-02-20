import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaService } from '../../services/media.service';
import { AccessibilityService } from '../../services/accessibility.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { ClassModel } from 'src/app/models/class.model';
import { TeacherClassService } from '../../services/teacher-class.service';
import { SearchService } from '../search/search.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public hasClassList = false;
  public showCameraIcon = true;
  headerTitle = 'Dashboard';
  headerBorderToggle = true;
  headerpageTabIndex = true;
  classSelectorStatus = true;
  currentSelectedClass: ClassModel;
  public classSubscription$: Subscription;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mediaService: MediaService,
    private accessibilityService: AccessibilityService,
    private teacherClassService: TeacherClassService,
    private spinner: NgxSpinnerService

  ) {
  }

  ngOnInit() {
    this.setHeaderTitleByActivateRoute();
    this.hasClassList = this.teacherClassService.hasClassContext();
    this.accessibilityService
      .getTabIndexFirstLevelStatus()
      .subscribe(firstLayerIndex => {
        this.headerpageTabIndex = firstLayerIndex;
      });
    this.classSubscription$ = this.teacherClassService.getCurrentClass().subscribe(currentClass => {
      this.currentSelectedClass = currentClass;
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (this.headerTitle === '') {
      this.classSelectorStatus = false;
      this.headerBorderToggle = false;
      if (window.innerWidth <= 768) {
        this.showCameraIcon = false;
      }
    } else {
      if (window.innerWidth <= 768) {
        this.classSelectorStatus = false;
        this.headerBorderToggle = false;
      } else {
        this.classSelectorStatus = true;
        this.headerBorderToggle = true;
      }
    }
  }
  private setHeaderTitle(title: string): void {
    this.headerTitle = title;
    this.onWindowResize();
  }
  private setHeaderTitleByActivateRoute(): void {
    this.activatedRoute.url.subscribe(() => {
      switch (location.pathname) {
        case '/pages/dashboard':
          this.setHeaderTitle(FileConstants.constants.dashboardTitle);
          break;
        case '/pages/notes':
          this.setHeaderTitle(FileConstants.constants.noteTitle);
          break;
        case '/pages/media':
          this.setHeaderTitle(FileConstants.constants.mediaTitle);
          break;
        case '/pages/student':
          this.setHeaderTitle(FileConstants.constants.studentsHeaderTitle);
          break;
        case '/pages/report':
          this.setHeaderTitle(FileConstants.constants.reports);
          break;
        case '/pages/report/observation':
          this.setHeaderTitle(FileConstants.constants.observationReport);
          break;
        case '/pages/report/check-list':
          this.setHeaderTitle(FileConstants.constants.reportCheckListHeading);
          break;
        case '/pages/checklist':
          this.setHeaderTitle(FileConstants.constants.assessmentChecklistTitle);
          break;
        case '/pages/ongoing':
          this.setHeaderTitle(FileConstants.constants.ongoingAssessmentTitle);
          break;
        default:
          this.setHeaderTitle('');
      }
    });
  }

  /**
   * This function is used to open the search box using observer
   */
  openSearch(): void {
    this.accessibilityService.setAvatarTabIndexStatus(false);
    this.searchService.setSearchStatus(true);
    this.accessibilityService.setTabIndexLevelStatus(false, true, false);
  }

  /**
   * This function is used to browse the media and sets the media to the appropriate url
   *
   * @param mediaEvent current media
   */
  triggerCamera(uploadedMedia): void {
    this.spinner.show();
    try {
      this.mediaService.processUploadedMedia(uploadedMedia, this.currentSelectedClass,
        () => {
          this.spinner.hide();
        });
    } catch (error) {
      this.spinner.hide();
    }
  }

  /**
   * Fuction To Navigate to Dashboard Home page on click of the Logo.
   */
  navigatetoDashboard(): void {
    if (this.headerTitle !== '') {
      this.router.navigate(['/pages/dashboard']);
    }
  }

  /**
   * Function used to unsubscribe the subscription when component destroys
   */
  ngOnDestroy() {
    if (this.classSubscription$) {
      this.classSubscription$.unsubscribe();
    }
  }
}
