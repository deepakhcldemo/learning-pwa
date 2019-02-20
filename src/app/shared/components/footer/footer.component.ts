import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaService } from '../../services/media.service';
import { AccessibilityService } from '../../services/accessibility.service';
import { FooterService } from './footer.service';
import { Subscription } from 'rxjs';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { ClassModel } from 'src/app/models/class.model';
import { TeacherClassService } from '../../services/teacher-class.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit, OnDestroy {
  private _classSubscription$: Subscription;
  private _footerSubscription: Subscription;
  public footerTabIndexStatus = true;
  public activeNavItem = 'Dashboard';
  public currentSelectedClass: ClassModel;
  public status = true;
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private footerService: FooterService,
    private mediaService: MediaService,
    private accessibilityService: AccessibilityService,
    private teacherClassService: TeacherClassService,
    private spinner: NgxSpinnerService) {
    this._classSubscription$ = this.teacherClassService.getCurrentClass().subscribe(currentClass => {
      this.currentSelectedClass = currentClass;
    });
  }

  ngOnInit() {
    this.setFooterNavItemByActivateRoute();
    this.accessibilityService.getTabIndexFirstLevelStatus().subscribe(firstLayerStatus => {
      this.footerTabIndexStatus = firstLayerStatus;
    });
    this.footerService.getFooterStatus().subscribe((status) => {
      this.status = status;
    });
  }
  private setFooterNavItem(item: string): void {
    this.activeNavItem = item;
  }

  private setFooterNavItemByActivateRoute(): void {
    this.activatedRoute.url.subscribe(() => {
      switch (location.pathname) {
        case '/pages/dashboard':
          this.setFooterNavItem(FileConstants.constants.dashboardTitle);
          break;
        case '/pages/notes':
          this.setFooterNavItem(FileConstants.constants.noteTitle);
          break;
        case '/pages/media':
          this.setFooterNavItem(FileConstants.constants.mediaTitle);
          break;
        case '/pages/student':
          this.setFooterNavItem(FileConstants.constants.studentsHeaderTitle);
          break;
        case '/pages/report':
          this.setFooterNavItem(FileConstants.constants.reports);
          break;
      }
    });
  }

  /**
   * This Function is used to navigate to the appropriate page
   *
   * @param currentPage navigate to current page
   */
  goToPage(currentPage: string): void {
    this.router.navigate([FileConstants.constants.pages + currentPage]);
  }

  /**
   * This Function is used to browse the media and sets the media to the appropriate url
   *
   * @param mediaFile current media file
   */
  triggerCamera(mediaFile): void {
    this.spinner.show();
    try {
      this.mediaService.processUploadedMedia(mediaFile, this.currentSelectedClass,
        () => {
          this.spinner.hide();
        });
    } catch (error) {
      this.spinner.hide();
    }
  }
  ngOnDestroy() {
    if (this._footerSubscription) {
      this._footerSubscription.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
  }
}
