import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { StudentModel, OptionSelected, Comment, ObservedAssessment, FilterOption } from '../../../../models/report.model';
import { TelemetryService } from '../../../../shared/services/telemetry.service';
import { Subscription } from 'rxjs';
import { LoggerService } from '../../../../shared/logger.service';
import { AccessibilityService } from '../../../../shared/services/accessibility.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { TeacherClassModel } from 'src/app/models/class.model';
import { ObservationService } from 'src/app/shared/services/observation.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { ProgramClassModel } from 'src/app/models/program.model';
@Component({
  selector: 'app-observation-chart',
  templateUrl: './observation-chart.component.html',
  styleUrls: ['./observation-chart.component.scss']
})
export class ObservationChartComponent implements OnInit, OnDestroy {
  private currentSelectedClass: TeacherClassModel;
  private _maxObservationCount = 0;
  private _optionSelected: OptionSelected = {
    view: 'checklist',
    when: '',
    sort: 'student',
    from: '',
    to: '',
    program: ''
  };
  private currentClass: TeacherClassModel;
  private _comments: Array<Comment> = [];
  private _formattedComments: Array<Comment> = [];
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};
  private _observedAssessment: Array<ObservedAssessment>;
  private currentProgramSubscription$: Subscription;
  private observedAssementItemsSubscription$: Subscription;
  private commentDataSubscription$: Subscription;
  private viewOptionsSubscription$: Subscription;
  private sortByOptionsSubscription$: Subscription;
  private whenOptionsSubscription$: Subscription;
  private updatedDataSubscription$: Subscription;
  private accessibilitySubscription$: Subscription;
  private classSubscription$: Subscription;

  public tabIndexStatus = true;
  public studentList: Array<StudentModel> = [];
  public totalScaleNumberCount: Array<number>[];
  public scaleInterval = 1;


  constructor(private filterService: FilterService,
    private telemetryService: TelemetryService,
    private accessibilityService: AccessibilityService,
    private studentService: StudentService,
    private teacherClassService: TeacherClassService,
    private observationService: ObservationService,
    private commentService: CommentService

  ) {
  }
  /**
   * Get all student list.
   */
  ngOnInit() {
    try {
      this.accessibilitySubscription$ = this.accessibilityService.getTabIndexFirstLevelStatus().subscribe((levelStatus: boolean) => {
        this.tabIndexStatus = levelStatus;
      });
      this.currentProgramSubscription$ = this.filterService.getCurrentProgram().subscribe((currentProgram: ProgramClassModel) => {
        if (currentProgram) {
          this._optionSelected['program'] = currentProgram.program.identifier;
        }
      });
    } catch (error) {
      LoggerService.log(error);
    }

    this.classSubscription$ = this.teacherClassService.getCurrentClass().subscribe((currentClass: TeacherClassModel) => {
      if (currentClass) {
        this.currentClass = currentClass;
        this.currentClassOnSuccess(currentClass);
      }
    }, (error) => {
      this.handleCurrentClassError(error);
    });
  }

  /**
   * set current class on success
   * @param currentClass
   */
  private currentClassOnSuccess(currentClass: TeacherClassModel): void {
    this.currentSelectedClass = currentClass;
    this.getStudentsDetailByStudentsId();
  }

  /**
   *handle current class error
   * @param error
   */
  private handleCurrentClassError(error: any): void {
    LoggerService.log(error);
  }

  /**
   * Getting student details based on student ids.
   */
  private getStudentsDetailByStudentsId(): void {
    if (this.currentSelectedClass && this.currentSelectedClass.studentIds) {
      this.studentList.length = 0;
      this.studentService.getStudentsDetailByStudentsId(this.currentSelectedClass.studentIds, (studentsData) => {
        this.studentList = this.studentService.sortStudentListBasedOnFirstName(studentsData);
        this.observedAssementItemsSubscription$ = this.observationService.getobservedAssementItems().subscribe(
          (assessment) => {
            this.observedAssementItemsOnSuccess(assessment);
          }, error => {
            LoggerService.error(error.message, error);
          });

        this.getCommentsList();
      });
    }
  }

  /**
   *
   * @param assessment observerd assesment item
   */
  private observedAssementItemsOnSuccess(assessment: Array<ObservedAssessment>): void {
    this._observedAssessment = [];
    this._observedAssessment.push(...assessment);
    this.mapObservedAssementItemsWithStudents(this._observedAssessment, this._optionSelected);
    this.getCommentsList();
    this.sendTelemetryEvent();
  }

  /**
   * Map observed assement items with students
   * @param assessment assesment items
   * @param optionSelected option selected
   */
  private mapObservedAssementItemsWithStudents(assessment: Array<ObservedAssessment>, optionSelected: OptionSelected): void {
    const observedAssessment = [];
    observedAssessment.push(...assessment);
    if (this.studentList && this.studentList.length) {
      this.studentList.map(student => {
        student['observed'] = [];
        observedAssessment.map(observedData => {
          if ((student.userId === observedData.students)) {
            if (observedData.isobserved && observedData['programid'] === optionSelected.program) {
              student.observed.push(
                observedData
              );
            }
          }
        });
      });
    }
  }

  /**
   * Get observation comment list.
   */
  private getCommentsList(): void {
    if (this.currentProgramSubscription$) {
      this.currentProgramSubscription$.unsubscribe();
    }
    if (this.commentDataSubscription$) {
      this.commentDataSubscription$.unsubscribe();
    }
    this.currentProgramSubscription$ = this.filterService.getCurrentProgram().subscribe((currentProgram: ProgramClassModel) => {
      this.commentDataSubscription$ = this.commentService.getAllCommentsListByClassAndProgramId(
        this.currentClass.classId, currentProgram.program.identifier
      ).subscribe(comments => {
        this.commentsDataOnSuccess(comments);
      }, error => {
        LoggerService.error(error.message, error);
      });
    });



  }

  /**
   * commentsDataOnSuccess
   * @param comments list of comments
   */
  private commentsDataOnSuccess(comments): void {
    this._comments = [];
    this._formattedComments = [];
    if (comments && comments.length) {
      comments.map(comment => {
        if (comment.students && comment.ctype) {
          comment.students.map(student => {
            comment['student'] = student;
            this._formattedComments.push(<Comment>comment);
          });
          this._comments.push(<Comment>comment);
        }

      });
    }
    this.applyReportFilters();
  }

  /**
   * Apply filtered parameter.
   */
  private applyReportFilters(): void {
    this.commentsCountForEachStudent(this._optionSelected['view']);
    this.filterStudentByObservationCount(this._optionSelected['sort']);
    try {
      this.currentProgramSubscription$ = this.filterService.getCurrentProgram().subscribe((currentProgram: ProgramClassModel) => {
        if (currentProgram) {
          this._optionSelected['program'] = currentProgram.program.identifier;
        }
        this.mapObservedAssementItemsWithStudents(this._observedAssessment, this._optionSelected);
      });
      this.viewOptionsSubscription$ = this.filterService.getViewOptionsSelected().subscribe((viewOption: FilterOption) => {
        if (viewOption.key) {
          this._optionSelected['view'] = viewOption.key;
          this.commentsCountForEachStudent(viewOption.key);
          if (this._optionSelected.from && this._optionSelected.to) {
            this.filterObservationBasedCalender();
          }
          this.filterStudentByObservationCount(this._optionSelected['sort']);
        }
      });
      this.sortByOptionsSubscription$ = this.filterService.getSortByOptionsSelected().subscribe((sortByOption: FilterOption) => {
        if (sortByOption.key) {
          this._optionSelected['sort'] = sortByOption.key;
          this.filterStudentByObservationCount(sortByOption.key);
        }
      });
      this.whenOptionsSubscription$ = this.filterService.getWhenOptionsSelected().subscribe((whenOption: FilterOption) => {
        if (whenOption.key !== 'custom') {
          this._optionSelected['when'] = whenOption.key;
          this.filterObservationCommentByWhen(whenOption.key);
          this.filterStudentByObservationCount(this._optionSelected['sort']);
        }
      });
      this.updatedDataSubscription$ = this.filterService.getUpdatedDateRange().subscribe((dateRange: OptionSelected) => {
        if (dateRange.from && dateRange.to) {
          this._optionSelected['from'] = dateRange.from;
          this._optionSelected['to'] = dateRange.to;
          this.filterObservationBasedCalender();
          this.filterStudentByObservationCount(this._optionSelected['sort']);
        }
      });
    } catch (error) {
      LoggerService.error(error.message, error);
    }

  }

  /**
   * Observation count for each student.
   * @param key get observation type.
   */
  private commentsCountForEachStudent(key: string): void {
    if (this.studentList && this.studentList.length) {
      this.studentList.map((student, index) => {
        let count = 0;
        this.studentList[index]['observationCount'] = 0;
        this._comments.map((comment, i) => {
          if (key === comment.type && comment.students.indexOf(student.userId) > -1) {
            count = 1;
            this.studentList[index]['observationCount'] += count;
          }
        });
        if (this._optionSelected['view'] !== 'ongoing') {
          let assesmentCount = 0;
          if (student && student.observed && student.observed.length) {
            student.observed.forEach((observedItem) => {
              if (observedItem.type === 'checklist') {
                assesmentCount = assesmentCount + 1;
              }
            });
            this.studentList[index]['observationCount'] += assesmentCount;
          }
        }
      });
    }
    this.scaleWithMaxCount();
  }

  /**
   * Get max observation count.
   */
  private getMaxObservation(): number {
    if (this.studentList && this.studentList.length) {
      return this.studentList.reduce((max, student) =>
        student.observationCount > max ? student.observationCount : max, this.studentList[0].observationCount);
    }

  }

  /**
   * sort student list
   * @param key sort by observation/assessment.
   */
  private filterStudentByObservationCount(key: string): void {
    let currentStudentObservationCount: number;
    let nextStudentObservationCount: number;
    if (key === 'observations') {
      this.studentList = this.studentList.sort(function (current, next) {
        currentStudentObservationCount = current.observationCount;
        nextStudentObservationCount = next.observationCount;
        return currentStudentObservationCount - nextStudentObservationCount;
      });
    } else {
      this.studentList = this.studentService.sortStudentListBasedOnFirstName(this.studentList);
    }
  }

  /**
   * Filter observation by "when" parameter.
   * @param key Key for "When" filter.
   */
  private filterObservationCommentByWhen(key: string): void {
    let filteredComment;
    if (key !== 'all') {
      const day = parseInt(key, 10);
      const from = new Date();
      from.setDate(from.getDate() - day);
      const today = new Date();
      today.setHours(23, 59, 59);
      filteredComment = this._comments.filter((comment, index, arr) => {
        if (comment && comment.updatedat) {
          return comment.updatedat.seconds * 1000 >= from.getTime() &&
            comment.updatedat.seconds * 1000 <= today.getTime();
        }

      });
    } else {
      filteredComment = this._comments;
    }
    this.mapObservationCount(filteredComment);
  }

  /**
   * Observation count for each student.
   * @param filteredComment filtered assessment comment.
   */
  private mapObservationCount(filteredComment): void {
    if (filteredComment && filteredComment.length) {
      this.studentList.map((student, index) => {
        let count = 0;
        this.studentList[index]['observationCount'] = 0;
        filteredComment.map((comment, i) => {
          if (this._optionSelected['view'] === comment.type && comment.students.indexOf(student.userId) > -1) {
            count = 1;
            this.studentList[index]['observationCount'] += count;
          }
        });
        if (this._optionSelected['view'] !== 'ongoing') {
          let assesmentCount = 0;
          if (student && student.observed && student.observed.length) {
            student.observed.forEach((observedItem) => {
              if (observedItem.type === 'checklist') {
                assesmentCount = assesmentCount + 1;
              }
            });
          }

          this.studentList[index]['observationCount'] += assesmentCount;
        }

      });
      this.scaleWithMaxCount();
    } else {
      this.setStudentCountZero();
    }
  }

  /**
   * send telemetry event
   */
  private sendTelemetryEvent(): void {
    // calling telemetry service
    if (this.telemetryService instanceof TelemetryService) {
      this.telemetryService.sendTelemetryEvent({
        verb: { id: FileConstants.constants.view },
        object: {
          extensions: {
            assessment: {
              type: FileConstants.constants.observational,
              id: '',
              name: ''
            },
            reportType: FileConstants.constants.observationalTypeReport
          }, definition: { name: FileConstants.constants.reports }
        }
      }).then(data => {
        console.log(data);
      }).catch(error => {
        this.telemetryService.sendTelemetryExceptionEvent(FileConstants.constants.httpError, error.message);
      });
    }
  }

  /**
   * Get filtered observation by calendar by "from" and "to" date.
   * @param optionSelected
   */
  private filterObservationBasedCalender(): void {
    let filteredComment;
    const from = new Date(this._optionSelected.from);
    const to = new Date(this._optionSelected.to);
    to.setHours(23, 59, 59);

    filteredComment = this._comments.filter((comment, index, arr) => {
      if (comment && comment.updatedat) {
        return ((comment.updatedat.seconds * 1000) >= from.getTime()) &&
          ((comment.updatedat.seconds * 1000) <= to.getTime());
      }

    });
    this.mapObservationCount(filteredComment);
  }

  /**
   * Set observation count as 0 when no filter matches.
   */
  private setStudentCountZero(): void {
    this.studentList.map((student, index) => {
      this.studentList[index]['observationCount'] = 0;
    });
    this.scaleWithMaxCount();
  }

  /**
   * Set chart scaling based on observation max count.
   */
  private scaleWithMaxCount(): void {
    this._maxObservationCount = this.getMaxObservation();
    if (this._maxObservationCount === 0) {
      this._maxObservationCount = 10;
    }
    this.totalScaleNumberCount = new Array(this._maxObservationCount);
    this.scaleInterval = Math.ceil(this.totalScaleNumberCount.length / 10);
    this.totalScaleNumberCount = new Array((this.scaleInterval * 10) / this.scaleInterval);
  }

  /**
   * This function is used to unsubscribe all subscription when component destroys
   */
  ngOnDestroy() {
    if (this.observedAssementItemsSubscription$) {
      this.observedAssementItemsSubscription$.unsubscribe();
    }
    if (this.commentDataSubscription$) {
      this.commentDataSubscription$.unsubscribe();
    }
    if (this.viewOptionsSubscription$) {
      this.viewOptionsSubscription$.unsubscribe();
    }
    if (this.sortByOptionsSubscription$) {
      this.sortByOptionsSubscription$.unsubscribe();
    }
    if (this.whenOptionsSubscription$) {
      this.whenOptionsSubscription$.unsubscribe();
    }
    if (this.updatedDataSubscription$) {
      this.updatedDataSubscription$.unsubscribe();
    }
    if (this.accessibilitySubscription$) {
      this.accessibilitySubscription$.unsubscribe();
    }
    if (this.classSubscription$) {
      this.classSubscription$.unsubscribe();
    }
    if (this.currentProgramSubscription$) {
      this.currentProgramSubscription$.unsubscribe();
    }
  }
}
