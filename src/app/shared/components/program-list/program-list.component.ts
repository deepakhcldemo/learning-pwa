// CORE Imports
import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
// Model Imports
import { TeacherClassModel } from 'src/app/models/class.model';
import { ProgramClassModel } from 'src/app/models/program.model';
// Service Imports
import { ProgramService } from '../../services/program.service';
import { TeacherClassService } from '../../services/teacher-class.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent implements OnInit, OnDestroy {
  @Input() selectedClass: TeacherClassModel;
  public allProgramList: Array<ProgramClassModel> = [];
  public classNameLength: number;
  public currentSelectedProgram: ProgramClassModel;

  private _currentClassSubscription$: Subscription;
  private _currentProgramSubscription$: Subscription;
  private _programListSubscription$: Subscription;
  private _productSubscription$: Subscription;

  constructor(private programService: ProgramService,
    private teacherClassService: TeacherClassService, private productService: ProductService) { }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth <= 768) {
      this.classNameLength = 30;
    } else {
      this.classNameLength = 15;
    }
  }

  ngOnInit(): void {
    if (window.innerWidth <= 768) {
      this.classNameLength = 30;
    } else {
      this.classNameLength = 15;
    }
    this._productSubscription$ = this.productService.getProcessProductIds().subscribe(products => {
      this._programListSubscription$ = this.programService.getProgramList().subscribe(programs => {
        this.allProgramList = programs;
        if (this.programService.getCurrentProgramFromSession()) {
          this.setCurrentProgram(this.programService.getCurrentProgramFromSession());
        } else if (this.allProgramList.length > 0) {
          this.setCurrentProgram(this.allProgramList[0]);
        }
      });
    });
    this.initializeProgramPageData();
  }
  /**
   * Initializes subscription
   */
  public initializeProgramPageData(): void {
    this._currentClassSubscription$ = this.teacherClassService.getCurrentClass().subscribe(currentClass => {
      if (currentClass) {
        this.programService.setProgramsByClass(currentClass);
      }
    });
    this._currentProgramSubscription$ = this.programService.getCurrentProgram()
      .subscribe(currentProgram => {
        this.currentSelectedProgram = currentProgram;
      });
  }

  /**
   * set current progarm
   * @param programObj current program object
   */
  private setCurrentProgram(programObj: ProgramClassModel): void {
    this.programService.clearProgramFromSession();
    this.programService.setCurrentProgram(programObj);
  }

  ngOnDestroy(): void {
    if (this._currentClassSubscription$) {
      this._currentClassSubscription$.unsubscribe();
    }
    if (this._currentProgramSubscription$) {
      this._currentProgramSubscription$.unsubscribe();
    }
    if (this._programListSubscription$) {
      this._programListSubscription$.unsubscribe();
    }
    if (this._productSubscription$) {
      this._productSubscription$.unsubscribe();
    }
  }
}
