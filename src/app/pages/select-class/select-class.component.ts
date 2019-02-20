import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { FooterService } from 'src/app/shared/components/footer/footer.service';
import { UserService } from 'src/app/auth/user.service';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';

import { TeacherClassModel } from 'src/app/models/class.model';

import { FileConstants } from 'src/app/shared/constants/file-constants';

@Component({
  selector: 'app-select-class',
  templateUrl: './select-class.component.html',
  styleUrls: ['./select-class.component.scss']
})

export class SelectClassComponent implements OnInit, OnDestroy {
  private _allClassSubscription$: Subscription;
  public allClasses: Array<TeacherClassModel>;
  public classNameLength: number;
  public hasClassList = false;
  public overlayStatus = true;

  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    if (window.innerWidth < 1366) {
      this.overlayStatus = false;
    } else {
      this.overlayStatus = true;
    }
  }

  constructor(
    private footerService: FooterService,
    private teacherClassService: TeacherClassService,
    private router: Router,
    private userService: UserService,
  ) {
    if (screen.availWidth < 1366) {
      this.overlayStatus = false;
    }
  }

  ngOnInit(): void {
    if (window.innerWidth < 1366) {
      this.overlayStatus = false;
    }
    const user = this.userService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
    } else {
      if (window.innerWidth <= 768) {
        this.classNameLength = 20;
      } else {
        this.classNameLength = 35;
      }
      this.footerService.updateFooterStatus(false);
      this.teacherClassService.setToggleForClassSelector(false);
      this.getAllClasses();
      this.teacherClassService.setAllClasses();
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    if (window.innerWidth <= 768) {
      this.classNameLength = 20;
    } else {
      this.classNameLength = 35;
    }
  }

  /**
   * This function is used to get all class list.
   */
  private getAllClasses(): void {
    this._allClassSubscription$ = this.teacherClassService.getAllClasses().subscribe(classes => {
      classes.sort((previousClass, currentClass) => previousClass.className.localeCompare(currentClass.className));
      this.allClasses = classes;
      if (this.teacherClassService.hasClassContext()) {
        this.hasClassList = true;
      }
    });
  }

  /**
   * This function is used to set current class and redirect to dashboard page.
   * @param currentClass Current class details
   */
  public setCurrentClass(currentClass: TeacherClassModel): void {
    this.teacherClassService.setCurrentClass(currentClass);
    this.footerService.updateFooterStatus(true);
    this.teacherClassService.setToggleForClassSelector(true);
    this.router.navigate([FileConstants.constants.pages + FileConstants.constants.dashboardTitle]);
  }

  ngOnDestroy(): void {
    this.footerService.updateFooterStatus(true);
    if (this._allClassSubscription$) {
      this._allClassSubscription$.unsubscribe();
    }
  }
}
