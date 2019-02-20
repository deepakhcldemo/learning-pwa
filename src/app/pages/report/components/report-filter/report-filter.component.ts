import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CustomErrorHandlerService } from '../../../../shared/services/custom.errorhandler.service';
import { OptionSelected, FilterOption } from '../../../../models/report.model';
import { AccessibilityService } from '../../../../shared/services/accessibility.service';
import { Subscription } from 'rxjs';
import { ErrorMessageConstants } from 'src/app/shared/constants/error-message-constants';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { LoggerService } from 'src/app/shared/logger.service';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { TeacherClassModel } from 'src/app/models/class.model';
import { ProgramService } from 'src/app/shared/services/program.service';
import { ProgramClassModel } from 'src/app/models/program.model';
@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss']
})
export class ReportFilterComponent implements OnInit, OnDestroy {
  @Output() showFilter = new EventEmitter<boolean>();
  private classSubscription$: Subscription;
  private accessibilitySubscription$: Subscription;
  private programListSubscription$: Subscription;

  public viewSelection: string;
  public setFlag = true;
  public fromDate = new NgbDate(0, 0, 0);
  public toDate = new NgbDate(0, 0, 0);
  public maxDate = new NgbDate(0, 0, 0);
  public tabIndexStatus = true;
  public optionSelected: OptionSelected = {
    view: '',
    when: '',
    sort: '',
    from: '',
    to: '',
    program: ''
  };
  public view: Array<FilterOption> = [
    { key: 'checklist', value: 'Assessment Checklist' },
    { key: 'ongoing', value: 'Ongoing Assesments' }
  ];
  public sortBy: Array<FilterOption> = [
    { key: 'student', value: 'Student' },
    { key: 'observations', value: 'Observations' }
  ];
  public filterWeek: Array<FilterOption> = [
    { key: '7', value: 'Last 7 days' },
    { key: '14', value: 'Last 14 days' },
    { key: '30', value: 'Last 30 days' },
    { key: '60', value: 'Last 60 days' },
    { key: 'all', value: 'All days' },
    { key: 'custom', value: 'Custom range' }
  ];

  public allProgramList: Array<ProgramClassModel> = [];
  constructor(private filterService: FilterService,
    private errorHandler: CustomErrorHandlerService,
    private accessibilityService: AccessibilityService,
    private teacherClassService: TeacherClassService,
    private programService: ProgramService
  ) {
  }
  /**
   * Initialize default filter parameter and max date.
   */
  ngOnInit() {
    if (this.classSubscription$) {
      this.classSubscription$.unsubscribe();
    }
    this.classSubscription$ = this.teacherClassService.getCurrentClass().subscribe((currentClass: TeacherClassModel) => {
      if (currentClass) {
        this.programService.setProgramsByClass(currentClass);
        this.currentClassOnSuccess();
      }
    }, (error) => {
      LoggerService.log(error);
    });

    try {
      this.accessibilitySubscription$ = this.accessibilityService.getTabIndexFirstLevelStatus().subscribe((levelStatus) => {
        this.tabIndexStatus = levelStatus;
      });
    } catch (error) {
      LoggerService.error(error.message, error);
    }
    this.optionSelected.view = this.view[0];
    this.optionSelected.sort = this.sortBy[0];
    this.optionSelected.when = this.filterWeek[this.filterWeek.length - 1];
    this.maxDate['month'] = Number(new Date().getMonth() + 1);
    this.maxDate['day'] = Number(new Date().getDate());
    this.maxDate['year'] = Number(new Date().getFullYear());
    this.viewSelection = FileConstants.constants.checklistTypeReport;
  }

  private currentClassOnSuccess() {
    try {
      if (this.programListSubscription$) {
        this.programListSubscription$.unsubscribe();
      }
      this.programListSubscription$ = this.programService.getProgramList().subscribe((programs: Array<ProgramClassModel>) => {
        this.allProgramList = programs;
        if (this.allProgramList.length > 0) {
          this.optionSelected.program = this.allProgramList[0];
          this.onProgramSelected();
        }
      });
    } catch (error) {
      LoggerService.error(error.message, error);
    }

  }

  /**
   * Default selection of view.
   */
  ngOnViewInit(): void {
    this.optionSelected.view = 'assesment';
  }

  /**
   * Function used to select current program
   */
  public onProgramSelected() {
    this.filterService.setCurrentProgram(this.optionSelected.program);
  }

  /**
   * Function used to select from date
   * @param date From Date selection.
   */
  public onFromDateSelection(fromDate: NgbDate): void {
    this.fromDate = fromDate;
    this.optionSelected.from = this.fromDate.month + '/' + this.fromDate.day + '/' + this.fromDate.year;
    if (!this.isDateRangeValidated()) {
      return;
    }
    this.filterService.setDateRange(this.optionSelected);
  }

  /**
   * Function used to select to date
   * @param date To Date selection.
   */
  public onToDateSelection(toDate: NgbDate): void {
    this.toDate = toDate;
    this.optionSelected.to = this.toDate.month + '/' + this.toDate.day + '/' + this.toDate.year;
    if (!this.isDateRangeValidated()) {
      return;
    }
    this.filterService.setDateRange(this.optionSelected);
  }

  /**
   * From Date and To Date validation
   */
  private isDateRangeValidated(): boolean {
    if (this.optionSelected.from && this.optionSelected.to) {
      if (new Date(this.optionSelected.from) <= new Date(this.optionSelected.to)) {
        return true;
      }
      const error = {
        'message': ErrorMessageConstants.errorMessages.calendarWarning
      };
      this.errorHandler.handleError(error);
    }
    return false;
  }

  /**
   * Set "view" filter.
   */
  public onViewOptionsSelected(): void {
    this.viewSelection = this.optionSelected.view.value;
    this.filterService.setViewOptionsSelected(this.optionSelected.view);
  }

  /**
   * Set "When" filter.
   */
  public onWhenOptionsSelected(): void {
    if (this.optionSelected.when['key'] !== 'custom') {
      this.optionSelected.to = null;
      this.optionSelected.from = null;
      this.fromDate = new NgbDate(0, 0, 0);
      this.toDate = new NgbDate(0, 0, 0);
    }
    this.filterService.setWhenOptionsSelected(this.optionSelected.when);
  }

  /**
   * Set "Sort by" filter.
   */
  public onSortByOptionsSelected(): void {
    this.filterService.setSortByOptionsSelected(this.optionSelected.sort);
  }

  /**
   * Toggle filter for mobile view.
   */
  public toggleForm(): void {
    this.showFilter.emit(this.setFlag);
  }

  /**
   * This function is used to unsubscribe all subscription when component destroys
   */
  ngOnDestroy() {
    if (this.accessibilitySubscription$) {
      this.accessibilitySubscription$.unsubscribe();
    }
    if (this.classSubscription$) {
      this.classSubscription$.unsubscribe();
    }
    if (this.programListSubscription$) {
      this.programListSubscription$.unsubscribe();
    }
  }

}
