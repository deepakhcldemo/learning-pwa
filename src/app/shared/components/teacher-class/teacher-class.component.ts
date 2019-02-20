import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';
import { TeacherClassService } from '../../services/teacher-class.service';
import { ProgramService } from '../../services/program.service';
import { TeacherClassModel } from 'src/app/models/class.model';

@Component({
  selector: 'app-teacher-class',
  templateUrl: './teacher-class.component.html',
  styleUrls: ['./teacher-class.component.scss']
})

export class TeacherClassComponent implements OnInit, OnDestroy {
  public allClasses: Array<TeacherClassModel> = [];
  public currentClass: TeacherClassModel;
  public classSelectorStatus = true;
  public classNameLength: number;
  public config: PerfectScrollbarConfigInterface = {};

  private _currentClassSubscription$: Subscription;
  private _allClassSubscription$: Subscription;

  constructor(private teacherClassService: TeacherClassService,
    private programService: ProgramService) { }

  /**
   * Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   */
  ngOnInit(): void {
    this.onWindowResize();
    this._currentClassSubscription$ = this.teacherClassService.getCurrentClass().subscribe(currentClass => {
      this.currentClass = currentClass;
    });
    this.getAllClasses();
  }

  /**
   * This function is triggered everytime window is resized to set the limit for
   * truncation of class name
   * @param event - Window resize event
   */
  @HostListener('window:resize', ['$event'])
  onWindowResize(event?) {
    if (window.innerWidth <= 768) {
      this.classNameLength = 30;
    } else {
      this.classNameLength = 15;
    }
  }

  /**
   * This function is used to get all class list from teacher class service.
   */
  private getAllClasses(): void {
    this._allClassSubscription$ = this.teacherClassService.getAllClasses().subscribe(classes => {
      if (!classes.length) {
        this.classSelectorStatus = false;
      } else {
        classes.sort((previousClass, currentClass) => previousClass.className.localeCompare(currentClass.className));
        this.allClasses = classes;
        if (this.allClasses.length === 1) {
          this.setCurrentClass(this.allClasses[0]);
        }
      }
    });
  }

  /**
   * This function is used to set the current class details in teacher class service
   * @param currentClass current class object
   */
  public setCurrentClass(currentClass: TeacherClassModel): void {
    if (this.currentClass.classId !== currentClass.classId) {
      this.programService.clearProgramFromSession();
      this.teacherClassService.setCurrentClass(currentClass);
    }
  }

  /**
   * Called once, before the instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this._currentClassSubscription$) {
      this._currentClassSubscription$.unsubscribe();
    }
    if (this._allClassSubscription$) {
      this._allClassSubscription$.unsubscribe();
    }
  }

}
