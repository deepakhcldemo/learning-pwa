// core imports
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// services imports
import { AssessmentService } from '../../../../shared/services/assessment.service';
import { AccordionService } from '../../../../shared/services/accordion.service';
import { LoggerService } from '../../../../shared/logger.service';
import { TelemetryService } from 'src/app/shared/services/telemetry.service';
import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { HierarchyAssessment } from 'src/app/models/assessment-detail.model';
import { CommentsList } from '../../../../models/report-checklist.model';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { AssessmentChecklistService } from '../assessment-checklist/assessment-checklist.service';

// fileConstan and Model imports
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { TeacherClassModel } from 'src/app/models/class.model';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  public comments: Array<CommentsList> = [];
  public tabIndexStatus = true;
  public secondTabIndexStatus = false;
  public trackTitle = '';
  public  selectedTag = '';
  private assessmentChecklist: Array<HierarchyAssessment> = [];
  private currentSelectedClass: TeacherClassModel;
  private _assessmentRecord$: Subscription;
  private _classSubscription$: Subscription;
  private accessibilitySubscription$: Subscription;

  @Input('assessmentItem')
  set assessmentItem(commentsPerStudentList) {
    if (commentsPerStudentList && commentsPerStudentList.length !== 0) {
      this.comments = this.groupAssessmentItemBasedOnProperty(commentsPerStudentList, 'parent');
    }
  }
  constructor(
    private router: Router,
    private assessmentService: AssessmentService,
    private accordionService: AccordionService,
    private productService: ProductService,
    private telemetryService: TelemetryService,
    private accessibilityService: AccessibilityService,
    private studentService: StudentService,
    private teacherClassService: TeacherClassService,
    private assessmentChecklistService: AssessmentChecklistService
  ) {
  }
/**
 * calling setAccessbility and currentStudentList based on component and calling telemetry serice Intialization
 */
  ngOnInit() {
    this.SetaccessbilityAccordingToLevel();
    this.getCurrentSelectedClass();
    this.trackTitle = this.assessmentChecklistService.getTrackIndex();
    const productID = this.productService.getProductId();
    // calling telemetry service
    this.telemetryService.sendTelemetryEvent({
      verb: { id: FileConstants.constants.view },
      object: {
        extensions: {
          assessment: {
            type: FileConstants.constants.checklistTitle,
            id: productID,
            name: name
          },
          reportType: FileConstants.constants.checklistTypeReport
        }, definition: { name: FileConstants.constants.reports }
      }
    }).then(telemetryData => {
      console.log(telemetryData);
    }).catch(error => {
      this.telemetryService.sendTelemetryExceptionEvent(FileConstants.constants.httpError, error.message);
    });
  }
  /**
     * @name SetaccessbilityAccordingToLevel Method to set accessbility level.
     * @returns void
     */
  private SetaccessbilityAccordingToLevel(): void {
    this.accessibilitySubscription$ = this.accessibilityService.getTabIndexFirstLevelStatus().subscribe((accessbilityFirstlevelStatus) => {
      this.tabIndexStatus = accessbilityFirstlevelStatus;
    });
    this.accessibilityService.getTabIndexSecondLevelStatus().subscribe((accessbilitySecondLevelStatus) => {
      this.secondTabIndexStatus = accessbilitySecondLevelStatus;
    });
  }
  /**
   * @name getCurrentSelectedClass method to get current selected class and getting
   * hierarchy depending upon class ID
   * @returns void
   */
  private getCurrentSelectedClass(): void {
    this._classSubscription$ = this.teacherClassService.getCurrentClass().subscribe((currentClass: TeacherClassModel) => {
      if (currentClass) {
        this.currentSelectedClass = currentClass;
        this.assessmentChecklistService.getAllAssessmentsByClassId(this.currentSelectedClass).subscribe((allAssessmentBasesOnClassSelection:
          Array<HierarchyAssessment>) => {
          this.assessmentChecklist = allAssessmentBasesOnClassSelection;
        },
          (error) => {
            if (error && error.message) {
              LoggerService.error(error.message, {});
            }
          });
      }
    }, error => {
      if (error && error.message) {
        LoggerService.error(error.message, {});
      }
    });
  }
  /**
   * grouping all the  assessments and comments based upon the property
   * @name - groupAssessmentItemBasedOnProperty
   * @param Assessments assessments.
   *  @param fieldname property for which its grouping
   */
  private groupAssessmentItemBasedOnProperty(Assessments, fieldname) {
    const groupingdObjectBasedOnProperty = Assessments.reduce((accumulatedAssessment, currrentAssessment) => {
      if (!accumulatedAssessment[currrentAssessment[fieldname]]) {
        accumulatedAssessment[currrentAssessment[fieldname]] = [currrentAssessment];
      } else {
        accumulatedAssessment[currrentAssessment[fieldname]].push(currrentAssessment);
      }
      return accumulatedAssessment;
    }, {});
    return Object.keys(groupingdObjectBasedOnProperty).map(key => ({ key, value: groupingdObjectBasedOnProperty[key] }));
  }
  /**
  * method to set current assessment and navigate to particular assessment depending upon its type
  * @name navigateToAssessmentDetailsBasedOnItsType method name
  * @param comment - get the individual assessment item for particular student
  * @return void
  */
  public navigateToAssessmentDetailsBasedOnItsType(comment): void {
    this.assessmentChecklist.map((assessmentItem) => {
      if (assessmentItem.id === comment.comment.assessmentid && comment.comment.parent === assessmentItem.parent) {
        this.setAssessmentAndRouteToStudent(assessmentItem, comment);
      }
    });
  }
  /**
  * method used for for setting single matched assessment to services and routing toparticular student
  * @name setAssessmentAndRouteToStudent
  * @param assessmentItem - particular assessment item
  * @param comment - get the details of student where its being rediect
  * @return void
  */
  private setAssessmentAndRouteToStudent(assessmentItem, comment): void {
    // setting the values to the services before navigating it to assessment
    this.assessmentService.setCurrentAssessment(assessmentItem);
    this.accordionService.setBreadcrumb(assessmentItem.path);
    this.studentService.setCurrentStudent(comment.comment.students['0']);
    // navigation to Assessment checkklist or ongoing depending upon the time
    if (comment.comment.type = FileConstants.constants.checklist) {
      this.router.navigate(['/pages/checklist']);
    } else {
      this.router.navigate(['/pages/ongoing']);
    }
  }

  /**
   * Unsubscribing all the subscription on component destroy
   * @return void
   */
  ngOnDestroy(): void {
    if (this._assessmentRecord$) {
      this._assessmentRecord$.unsubscribe();
    }
    if (this.accessibilitySubscription$) {
      this.accessibilitySubscription$.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
  }

}
