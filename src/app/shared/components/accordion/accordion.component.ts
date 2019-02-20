// Core imports
import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// Service imports
import { AssessmentService } from '../../services/assessment.service';
import { AccordionService } from '../../services/accordion.service';
import { AccessibilityService } from '../../services/accessibility.service';
import { TeacherClassService } from '../../services/teacher-class.service';
import { AssessmentDalService } from '../../services/cache-datalayer/assessment-dal.service';
import { ProgramService } from '../../services/program.service';
// Model imports
import { ProgramClassModel } from 'src/app/models/program.model';
import { HierarchyDetails, Hierarchy } from '../../../models/accordion.model';
import { TeacherClassModel } from 'src/app/models/class.model';
import { HierarchyAssessment, AssessmentItem, AssessmentDetail } from 'src/app/models/assessment-detail.model';
// Constants import
import { FileConstants } from '../../constants/file-constants';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  providers: [NgbAccordionConfig]
})

export class AccordionComponent implements OnInit, AfterViewInit, OnDestroy {

  // Public variables
  public noData = false;
  public isUnit = true;
  public childGrids: Array<HierarchyDetails>;
  public openedGridsStack: Array<HierarchyDetails> = [];
  public assessments: Array<HierarchyAssessment> = [];
  public accordionTabIndexStatusFlag = false;
  public allAssessments: Array<HierarchyAssessment> = [];
  public selectedView = FileConstants.constants.toc;
  @Input() public checkList;

  // Private variables
  private _classSubscription$: Subscription;
  private _accordion: any;
  private _currentProgram: ProgramClassModel;
  private _programSubscription$: Subscription;
  private _assessmentRecordSubscription$: Subscription;
  private _accessibilityService$: Subscription;

  constructor(config: NgbAccordionConfig, private router: Router,
    private assessmentService: AssessmentService,
    private accordionService: AccordionService,
    private accessibilityService: AccessibilityService,
    private teacherClassService: TeacherClassService,
    private assessmentDALService: AssessmentDalService,
    private programService: ProgramService) {
    config.closeOthers = true;
    config.type = FileConstants.constants.info;
  }

  ngOnInit() {
    this.init();
    this.childGrids = [];
    this.openedGridsStack = [];
    this.assessments = [];
  }


  /**
   * Initializes subscription
   */
  private init(): void {
    this._accessibilityService$ =
      this.accessibilityService.getTabIndexSecondLevelStatus().subscribe((levelStatusFlag: boolean) => {
        this.accordionTabIndexStatusFlag = levelStatusFlag;
      });
    this._classSubscription$ =
      this.teacherClassService.getCurrentClass().subscribe((currentClass: TeacherClassModel) => {
        this.initializeProgramSubscription();
        this.selectedView = FileConstants.constants.toc;
      });
  }
  /**
   * Initializes program subscription
   */
  private initializeProgramSubscription(): void {
    this._programSubscription$ =
      this.programService.getCurrentProgram().subscribe((currentProgram: ProgramClassModel) => {
        this._currentProgram = currentProgram;
        this.initializeAssessmentRecordSubscription();
        // Classid based hierarchy
        this.assessmentService.getProgramHierarchy(
          this._currentProgram as ProgramClassModel,
          (hierarchy: Hierarchy) => {
            this._accordion = hierarchy.hierarchyDetails;
            this.expandGrids(this._accordion as HierarchyDetails);
          });
        // end
      });
  }

  /**
   * Initializes assessment record subscription
   */
  private initializeAssessmentRecordSubscription(): void {
    this.allAssessments.length = 0;
    this._assessmentRecordSubscription$ =
      this.assessmentService.getAllAssessmentProgram().subscribe((assessments: Array<HierarchyAssessment>) => {
        this.allAssessments = this.sortAccordion(assessments as Array<HierarchyAssessment>, FileConstants.constants.id as string);
        if (this._assessmentRecordSubscription$) {
          this._assessmentRecordSubscription$.unsubscribe();
        }
      });
    this.assessmentService.setAssessmentProgramMapDetails(this._currentProgram as ProgramClassModel, 'accordian');
  }

  /**
   * Function Used To Close The Accordion Based On The Current Index
   *
   * @param hierarchyToClose current hierarchy
   */
  public closeAccordion(hierarchyToClose: HierarchyDetails): void {
    this.assessments = [];
    for (let index = 0; index < this.openedGridsStack.length; index++) {
      if (hierarchyToClose.titleInSequence === this.openedGridsStack[index].titleInSequence) {
        if (index - 1 >= 0) {
          this.childGrids = Array.from(this.openedGridsStack[index - 1].children);
          if (this.openedGridsStack[index - 1].attachmentURL) {
            this.assessmentDALService.getAssessmentFromAssessmentCache(this.openedGridsStack[index - 1].attachmentURL as string,
              (assessment: HierarchyAssessment) => {
                this.assessments.push(assessment as HierarchyAssessment);
              });
            this.noData = true;
          }
        } else {
          this.childGrids = Array.from(this._accordion);
        }
        this.openedGridsStack.splice(index as number, this.openedGridsStack.length as number);
      }
    }
  }

  /**
   * Function Used To Expand The Grids Based On The Assessment
   *
   * @param grid grid
   */
  public expandGrids(grid: HierarchyDetails): void {
    this.assessments = [];
    this.isUnit = true;
    this.childGrids = Array.from(this.sortAccordion(grid as HierarchyDetails, FileConstants.constants.displayOrder as string));
    this.accessibilityService.setTabIndexLevelStatus(false, true, false);
    // checking whether the data have children
    if (grid.children && grid.children.length > 0) {
      this.expandAccordionWithChildren(grid as HierarchyDetails);
    } if (grid.attachmentURL && grid.children.length < 1) {
      /* checking whether the data have assessments but not further children to iterate */
      this.expandAccordionWithoutChildren(grid as HierarchyDetails);
    }
  }

  /**
   * Accordions data with children
   * @param grid selected accordion row
   */
  private expandAccordionWithChildren(grid: HierarchyDetails): void {
    this.addPadding(grid as HierarchyDetails, true);
    // if the data has children then are there any assessmets in data
    if (grid.attachmentURL !== '') {
      this.assessmentDALService.getAssessmentFromAssessmentCache
        (grid.attachmentURL as string, (assessment: HierarchyAssessment) => {
          this.assessments.push(assessment as HierarchyDetails);
        });
      // this.noData = true;
    } else {
    }
     this.childGrids = Array.from(grid.children);
     grid.children.forEach((currentGrid, index) => {
       if (currentGrid.attachmentURL !== '') {
         this.populateAssessmentsAsChildGrids(grid as HierarchyDetails, currentGrid as HierarchyDetails);
        this.childGrids.shift();
        } else if (currentGrid.children.length > 0) {
         // this.childGrids.push(currentGrid as HierarchyDetails);
       }
     });
    this.openedGridsStack.push(grid as HierarchyDetails);
  }

  /**
   * Accordions data without children
   * @param grid selected accordion row
   */
  private expandAccordionWithoutChildren(grid: HierarchyDetails): void {
    const parent = grid.parent;
    const path = grid.path;
    this.assessmentDALService.getAssessmentFromAssessmentCache
      (grid.attachmentURL as string, (assessment: AssessmentItem) => {
        assessment['parent'] = parent;
        assessment['path'] = path;
        this.assessments.push(assessment);
        this.addPadding(assessment as HierarchyDetails, false);
      });
    this.childGrids.length = 0;
    this.addPadding(grid as HierarchyDetails, false);
    // this.openedGridsStack.push(grid as HierarchyDetails);
    this.noData = true;
  }

  /**
   * Params accordion component
   * @param grid parent grid
   * @param currentGrid selected grid
   */
  private populateAssessmentsAsChildGrids(grid: HierarchyDetails, currentGrid: HierarchyDetails) {
    const parent = grid.parent;
    const path = grid.path;
    this.assessmentDALService.getAssessmentFromAssessmentCache
      (currentGrid.attachmentURL as string, (assessment: HierarchyAssessment) => {
        assessment['parent'] = parent;
        assessment['path'] = path;
        this.assessments.push(assessment as HierarchyDetails);
        // this.childGrids.length = 0;
        this.addPadding(assessment as HierarchyDetails, false);
        this.noData = true;
      });
  }

  /**
   * Function Used To Navigate To Ongoing Assessment Page Based On The Selected Item
   *
   * @param assessment assessmentType refers to Ongoing Assessment
   */
  public goToAssessment(assessment: HierarchyAssessment, assessmentType: string): void {
    this.assessmentService.setCurrentAssessment(assessment as AssessmentDetail);
    this.accordionService.setBreadcrumb(assessment.path as string);
    switch (assessmentType as string) {
      case FileConstants.constants.ongoing:
        this.router.navigate(['/pages/ongoing']);
        break;
      case FileConstants.constants.checklist:
        this.router.navigate(['/pages/checklist']);
        break;
    }

  }

  /**
   * Method used to set focus on starting element of page (for cyclic tabbing)
   * @param elementToFocus element to set focus
   * @param [elementToFocusSmallScreen] string optional element to set focus
   */
  public setFocus(elementToFocus: string, elementToFocusSmallScreen?: string): void {
    this.accessibilityService.selectFocus(elementToFocus as string, elementToFocusSmallScreen as string);
  }

  /**
   * Toggles selected view
   * @param clickedView
   */
  public toggleSelectedView(clickedView: string): void {
    this.selectedView = clickedView;
  }

  /**
   * Adds padding
   * @param grid selected row
   * @param isNodePresent check for child nodes
   */
  public addPadding(grid: HierarchyDetails, isNodePresent: boolean): void {
    grid['padding-left'] = this.openedGridsStack.length * 10 + 'px';
    if (isNodePresent) {
      grid.children.map(node => {
        node['padding-left'] = (this.openedGridsStack.length + 1) * 10 + 'px';
      });
    } else {
      if (!grid.attachmentURL) {
        grid['padding-left'] = (this.openedGridsStack.length - 1) * 10 + 'px';
      }
    }
  }

  /**
   * Sorts accordion
   * @param grids
   * @param sortBy
   * @returns accordion
   */
  private sortAccordion(grids: any, sortBy: string): any {
    let returnGrid: any;
    if (grids.length > 0) {
      returnGrid = grids;
    } else {
      returnGrid = grids.children;
    }
    returnGrid.sort((grid1, grid2) => {
      return grid1[sortBy] > grid2[sortBy] ? 1 : grid1[sortBy] < grid2[sortBy] ? -1 : 0;
    });
    return returnGrid;
  }

  ngAfterViewInit() {
    if (document.getElementById('lastnode-0')) {
      document.getElementById('lastnode-0').focus();
    }
    if (document.getElementById('assessment-0')) {
      document.getElementById('assessment-0').focus();
    }
  }

  ngOnDestroy() {
    if (this._assessmentRecordSubscription$) {
      this._assessmentRecordSubscription$.unsubscribe();
    }
    if (this._programSubscription$) {
      this._programSubscription$.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
    if (this._accessibilityService$) {
      this._accessibilityService$.unsubscribe();
    }
  }
}
