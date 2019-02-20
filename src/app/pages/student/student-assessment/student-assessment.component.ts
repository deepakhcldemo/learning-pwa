import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerService } from 'ngx-spinner';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { ObservationDalService } from 'src/app/shared/services/realtime-datalayer/observation-dal.service';
import { AssessmentService } from 'src/app/shared/services/assessment.service';
import { AccordionService } from 'src/app/shared/services/accordion.service';
import { ExportService } from 'src/app/shared/export.service';
import { ModalService } from 'src/app/shared/components/global-modal/modal.service';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
import { StudentComponentService } from '../student-component.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { GlobalService } from 'src/app/global.service';

import { TeacherClassModel } from 'src/app/models/class.model';
import { Student } from 'src/app/models/student.model';
import { CsvDataArray } from 'src/app/models/csv-data-array';
import { AssessmentDetail, Assessmentitemobservation } from 'src/app/models/assessment-detail.model';

import { FileConstants } from 'src/app/shared/constants/file-constants';
import { ProgramService } from 'src/app/shared/services/program.service';



@Component({
  selector: 'app-student-assessment',
  templateUrl: './student-assessment.component.html',
  styleUrls: ['./student-assessment.component.scss']
})
export class StudentAssessmentComponent implements OnInit, OnDestroy {
  private getStudentIds: Array<Assessmentitemobservation> = [];
  private studentDetails: Student;
  private currentClass: TeacherClassModel;
  private _programSubscription$: Subscription;
  private _studentAssessmentSubscription$: Subscription;
  private _currentClassSubscription$: Subscription;
  private _selectedIndexSubscription$: Subscription;
  private _accessibilityService$: Subscription;

  public showNoAssessment = false;
  public exportStatus: boolean;
  public assessmentArrayData: Array<AssessmentDetail> = [];
  public students: Array<Student> = [];
  public selectedIndex: number;
  public noResult = FileConstants.constants.noObservationMsg;
  public studentName = '';
  public itemsFormatted: Array<CsvDataArray> = [];
  public tabIndexStatus = true;
  public studentDetailsStatus = false;
  public isMobileView: boolean;
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};

  constructor(private studentComponentService: StudentComponentService,
    private spinner: NgxSpinnerService,
    private observationDalService: ObservationDalService,
    private studentService: StudentService,
    private globalService: GlobalService,
    private assessmentService: AssessmentService,
    private accordionService: AccordionService,
    private router: Router,
    private exportService: ExportService,
    private customModalService: ModalService,
    private teacherClassService: TeacherClassService,
    private detectorService: DeviceDetectorService,
    private accessibilityService: AccessibilityService,
    private programService: ProgramService
  ) { }

  ngOnInit(): void {
    this.onWindowResize();
    this.spinner.show();
    this.tabIndexStatusSubscriber();
    this.toggleExportButtonVisibility();
    this.currentClassSubscriber();
  }


  /**
 * Triggered everytime window is resized
 * @param event - window resize event
 */
  @HostListener('window:resize', ['$event'])
  onWindowResize(event?): void {
    if (window.innerWidth <= 768) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
  }

  /**
 * This function is used to subscribe to tab index status
 */
  private tabIndexStatusSubscriber(): void {
    this._accessibilityService$ = this.accessibilityService.getTabIndexFirstLevelStatus().subscribe(status => {
      this.tabIndexStatus = status;
    });
  }

  /**
   * This function is used to subscribe to current class from teacher class service.
   */
  private currentClassSubscriber(): void {
    if (this._currentClassSubscription$) {
      this._currentClassSubscription$.unsubscribe();
    }
    this._currentClassSubscription$ = this.teacherClassService.getCurrentClass().subscribe(currentClass => {
      this.currentClass = currentClass;
      this.selectedIndex = -1;
      this.getStudents();
    });
  }

  /**
   * This function is used to subscribe the selected student index from student component service.
   */
  private selectedStudentIndexSubscriber(): void {
    if (this._selectedIndexSubscription$) {
      this._selectedIndexSubscription$.unsubscribe();
    }
    this._selectedIndexSubscription$ = this.studentComponentService.getCurrentStudentIndex().subscribe(index => {
      if (this.selectedIndex !== index) {
        this.selectedIndex = index;
        this.getStudentAssessments();
      }
    });
  }


  /**
   * This function is used to show/hide export button based on the device OS.
   */
  private toggleExportButtonVisibility(): void {
    const deviceType =
      this.detectorService.getDeviceInfo().os;
    if (deviceType === 'iOS') {
      this.exportStatus = false;
    } else {
      this.exportStatus = true;
    }
  }

  /**
  * Function used to get the student list
  */
  private getStudents(): void {
    this.assessmentArrayData.length = 0;
    this.showNoAssessment = false;
    if (this._selectedIndexSubscription$) {
      this._selectedIndexSubscription$.unsubscribe();
    }
    if (this.currentClass && this.currentClass.studentIds && this.currentClass.studentIds.length > 0) {
      this.studentService.getStudentsDetailByStudentsId(this.currentClass.studentIds, (students: Array<Student>) =>
        this.studentsDetailCallback(students));
    } else {
      this.spinner.hide();
    }
  }

  /**
   * This function assigns the student list returned by service in a variable
   * @param students - student object array
   */
  private studentsDetailCallback(students: Array<Student>): void {
    if (students && students.length) {
      this.students = students;
      this.selectedStudentIndexSubscriber();
    }
    this.spinner.hide();
  }

  /**
   * Subscribe and save the Assessments on which a particular student is observed
   */
  private getStudentAssessments(): void {
    this.spinner.show();
    this.assessmentArrayData = [];
    this._studentAssessmentSubscription$ = this.observationDalService.
      getObserveInformation(this.students[this.selectedIndex].userId, this.currentClass.classId).subscribe(assessmentDetails => {
        this.assessmentArrayData = [];
        this.prepareAssessmentsList(assessmentDetails);
        if (this.assessmentArrayData.length > 0) {
          this.showNoAssessment = false;
        } else {
          this.showNoAssessment = true;
        }
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    if (this.assessmentArrayData.length === 0) {
      this.showNoAssessment = true;
    } else {
      this.showNoAssessment = false;
    }
  }

  /**
   * This function is used to prepare assessment list
   * @param assessmentDetails - Observational Assessment details
   */
  private prepareAssessmentsList(assessmentDetails: firebase.firestore.DocumentData[]): void {
    const assessmentIds = [];
    if (assessmentDetails.length) {
      assessmentDetails.map(assessmentInstance => {
        if ((assessmentInstance.commentCount + assessmentInstance.mediaCommentCount) > 0) {
          this.getStudentIds.push(assessmentInstance as any);
          if (assessmentInstance.path) {
            assessmentInstance.path = assessmentInstance.path.split('|').join(' > ');
          }
          if (assessmentIds.length > 0) {
            if (assessmentIds.indexOf(assessmentInstance.assessmentid.toString()) === -1) {
              assessmentIds.push(assessmentInstance.assessmentid.toString());
            }
          } else {
            assessmentIds.push(assessmentInstance.assessmentid.toString());
          }
          this.assessmentArrayData.push(this.prepareAssessmentItem(assessmentInstance));
        }
      });
    }
  }

  /**
   * This function is used to prepare assessment details for selected student
   * @param assessment assessment details
   */
  private prepareAssessmentItem(assessment: firebase.firestore.DocumentData) {
    const assessmentItem: AssessmentDetail = {
      assessment: this.globalService.getAssessmentByIds([assessment.assessmentid])[0],
      createdat: assessment.createdat,
      path: assessment.path,
      parent: assessment.parent,
      students: assessment.students,
      type: FileConstants.constants.assessment,
      assessmentItemId: assessment.assessmentitemid,
      classid: assessment.classid,
      commentCount: assessment.commentcount,
      isobserved: assessment.isobserved,
      mediaCommentCount: assessment.mediaCommentCount,
      productId: assessment.productid,
      programid: assessment.programid,
      updatedComment: assessment.updatedComment
    };
    return assessmentItem;
  }

  /**
   * Sets the data of the selected assessment in assessment service and accordion service
   * redirect to the appropriate page
   * @param checklist contains the selected assessment object with details
   */
  public openAssessment(checklist: AssessmentDetail): void {
    // set the student to check that which user is selected at student list page.
    this.programService.setCurrentProgramData(this.programService.getProgramById(checklist.programid));
    this.studentService.setCurrentStudentFromStudentList(this.students[this.selectedIndex]);
    checklist.assessment.parent = checklist.parent;
    this.assessmentService.setCurrentAssessment(checklist.assessment as AssessmentDetail);
    this.accordionService.setBreadcrumb(checklist.path);
    if (checklist.assessment.type === FileConstants.constants.checklist) {
      this.router.navigate(['/pages/checklist']);
    } else {
      this.router.navigate(['/pages/ongoing']);
    }
  }

  /**
  * Function Used To Open The Modal Popup on click of Export Button
  */
  public openExportPopup(): void {
    this.studentDetails = this.students[this.selectedIndex];
    this.studentName = this.studentDetails.fullName;
    this.exportService.prepareCSVFormatData(this.studentDetails, this.assessmentArrayData).subscribe((dataToBeExport) => {
    });
    this.itemsFormatted = this.exportService.exportAssessmentCustomFormat;
    const statusRefGlobalPopUp = this.customModalService.getElement();
    this.customModalService.openModal(statusRefGlobalPopUp, 'sm');
  }

  /**
   * This function is used to unsubscribe all subscriber.
   */
  ngOnDestroy(): void {
    if (this._programSubscription$) {
      this._programSubscription$.unsubscribe();
    }
    if (this._selectedIndexSubscription$) {
      this._selectedIndexSubscription$.unsubscribe();
    }
    if (this._currentClassSubscription$) {
      this._currentClassSubscription$.unsubscribe();
    }
    if (this._studentAssessmentSubscription$) {
      this._studentAssessmentSubscription$.unsubscribe();
    }
    if (this._accessibilityService$) {
      this._accessibilityService$.unsubscribe();
    }
  }
}
