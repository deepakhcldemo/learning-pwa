import { Injectable } from '@angular/core';
import { AssessmentDalService } from './cache-datalayer/assessment-dal.service';
import { FileConstants } from '../constants/file-constants';
import { HierarchyAssessment, AssessmentDetail } from 'src/app/models/assessment-detail.model';
import { ProgramClassModel } from 'src/app/models/program.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { TeacherClassModel } from 'src/app/models/class.model';
import { ProgramModel } from 'src/app/models/product-program.model';
import { ProgramDalService } from './cache-datalayer/program-dal.service';
import { HierarchyDalService } from './cache-datalayer/hierarchy-dal.service';
import { Hierarchy } from 'src/app/models/accordion.model';

/**
 * This service provides the navigation, related assessment and its items
 */
@Injectable()
export class AssessmentService {
  private _currentAssessment: any;
  public _cachedNavigationTreeList = [];
  private programAssessmentCounter: number;
  private programAssessmentLength: number;
  private classAssessmentCounter: number;
  private classProgramAssessmentLength: number;
  private _assessmentProgramMapDetails: Subject<Array<HierarchyAssessment>> = new Subject();
  private _allAssessmentProgram: Subject<Array<HierarchyAssessment>> = new Subject();
  private _assessmentClassMapDetails: Subject<Array<HierarchyAssessment>> = new Subject();
  private assessmentClassDetailsMapSubscription$: Subscription;

  constructor(
    private assessmentDalService: AssessmentDalService,
    private programDalService: ProgramDalService,
    private hierarchyDalService: HierarchyDalService
  ) {
  }

  /**
   * This function is used to set the current assessment
   */
  setCurrentAssessment(value: AssessmentDetail) {
    this._currentAssessment = value;
    sessionStorage.setItem('currentAssessment', JSON.stringify(value));
    // this.setProductIdByAssessmentParent();
  }

  /**
   * This function is used to get the current assessment
   */
  getCurrentAssessment() {
    if (this._currentAssessment) {
      return this._currentAssessment;
    } else if (sessionStorage.getItem('currentAssessment')) {
      return JSON.parse(sessionStorage.getItem('currentAssessment'));
    }
  }

  /**
   * This function is used to return the alphabets.
   */
  getAssessmentAlphabets(): Array<string> {
    return FileConstants.constants.alphabetsString.split('');
  }

  private appendAssessment(_assessmentList: Array<HierarchyAssessment>, assessment: HierarchyAssessment, type: string): void {
    _assessmentList.forEach((assessList: HierarchyAssessment) => {
      if (assessList.assessmentUrl === assessment.assessmentPath) {
        this.incrementCounter(type as string);
        assessList = Object.assign(assessList, { ...assessment });
      }
    });
  }
  /**
 * Increments counter
 * @param type
 */
  private incrementCounter(type: string): void {
    switch (type) {
      case FileConstants.constants.class:
        this.classAssessmentCounter++;
        break;
      default:
        this.programAssessmentCounter++;
        break;
    }
  }
  /**
 * Sets assessment program map Details for selected program
 * @param programClass
 * @returns assessment program map Details for selected program
 */
  public setAssessmentProgramMapDetails(programClass: ProgramClassModel, type?: string): void {
    if (programClass && programClass.program && programClass.program.identifier) {
      const product_programId = programClass.productId + '_' + programClass.program.identifier;
      this.setAssessmentListForSelectedProgram(product_programId as string, type);
    }
  }

  /**
 * Sets assessment list for selected program
 * @param programClass
 */
  private setAssessmentListForSelectedProgram(product_programId: string, type?: string): void {
    this.assessmentDalService.getSelectedProgramAssessment(FileConstants.constants.programAssessmentMapping as string,
      product_programId as string,
      (assessmentList: HierarchyAssessment) => {
        if (assessmentList && assessmentList['programAssessmentList'].length > 0) {
          this.programAssessmentCounter = 0;
          this.programAssessmentLength = assessmentList['programAssessmentList'].length;
          const _programAssessmentList: Array<HierarchyAssessment> = [];
          assessmentList['programAssessmentList'].forEach((hierarchyAssessment: HierarchyAssessment) => {
            _programAssessmentList.push(hierarchyAssessment as HierarchyAssessment);
            this.assessmentDalService.getAssessmentFromAssessmentCache(hierarchyAssessment['assessmentUrl'] as string,
              (assessment: HierarchyAssessment) => {
                this.appendAssessment(
                  _programAssessmentList as Array<HierarchyAssessment>,
                  assessment as HierarchyAssessment,
                  FileConstants.constants.program as string
                );
                if (this.programAssessmentCounter === this.programAssessmentLength) {
                  if (type === 'accordian') {
                    this._allAssessmentProgram.next(_programAssessmentList as Array<HierarchyAssessment>);
                  } else {
                    this._assessmentProgramMapDetails.next(_programAssessmentList as Array<HierarchyAssessment>);
                  }
                }
              });
          });
        }
      });
  }

  /**
   * Gets assessment program map Details
   * @returns assessment program map Details
   */
  public getAssessmentProgramMapDetails(): Observable<Array<HierarchyAssessment>> {
    return this._assessmentProgramMapDetails.asObservable();
  }
  /**
   * Gets assessment program map Details
   * @returns assessment program map Details
   */
  public getAllAssessmentProgram(): Observable<Array<HierarchyAssessment>> {
    return this._allAssessmentProgram.asObservable();
  }

  /**
   * Gets assessment class Details map
   * @returns assessment class Details map
   */
  public getAssessmentClassDetailsMap(): Observable<Array<HierarchyAssessment>> {
    return this._assessmentClassMapDetails.asObservable();
  }

  /**
   * Sets assessment class Details map
   * @param classes as TeacherClassModel
   */
  public setAssessmentClassDetailsMap(currentSelectedClass: TeacherClassModel): void {
    if (this.assessmentClassDetailsMapSubscription$) {
      this.assessmentClassDetailsMapSubscription$.unsubscribe();
    }
    this.programDalService.getAllPrograms(FileConstants.constants.productProgram, (allPrograms: Array<ProgramClassModel>) => {
      if (allPrograms.length > 0) {
        allPrograms = this.filterProgramsByCurrentClass(allPrograms as Array<ProgramClassModel>, currentSelectedClass as TeacherClassModel);
        this.processPrograms(allPrograms as Array<ProgramClassModel>);
      }
    });
  }
  /**
   * Filters programs by current class
   * @param allPrograms
   * @param currentSelectedClass
   * @returns programs by current class
   */
  private filterProgramsByCurrentClass(allPrograms: Array<ProgramClassModel>,
    currentSelectedClass: TeacherClassModel): Array<ProgramClassModel> {
    const selectedClassProducts: Array<string> = currentSelectedClass.productIds;
    return allPrograms.filter((program: ProgramClassModel) => {
      return selectedClassProducts.includes(program.productId as string);
    });
  }

  /**
   * Process programs
   * @param allPrograms as array of ProgramClassModel
   */
  private processPrograms(allPrograms: Array<ProgramClassModel>): void {
    const _classAssessmentList: Array<HierarchyAssessment> = [];
    allPrograms[0]['programDetails'].forEach((programClass: ProgramModel) => {
      this.classAssessmentCounter = 0;
      this.classProgramAssessmentLength = 0;
      const product_programId = allPrograms[0].productId + '_' + programClass.identifier;
      this.collectDetails(product_programId as string, _classAssessmentList as Array<HierarchyAssessment>);
    });
  }

  /**
   * Collects Details
   * @param programClass as model of ProgramClassModel
   */
  private collectDetails(product_programId: string, _classAssessmentList: Array<HierarchyAssessment>): void {
    this.assessmentDalService.getSelectedProgramAssessment(FileConstants.constants.programAssessmentMapping as string,
      product_programId as string, (assessmentList: HierarchyAssessment) => {
        if (assessmentList && assessmentList['programAssessmentList'].length > 0) {
          this.classProgramAssessmentLength = assessmentList['programAssessmentList'].length;
          assessmentList['programAssessmentList'].forEach((hierarchyAssessment: HierarchyAssessment) => {
            _classAssessmentList.push(hierarchyAssessment as HierarchyAssessment);
            this.assessmentDalService.getAssessmentFromAssessmentCache(hierarchyAssessment['assessmentUrl'] as string,
              (assessment) => {
                this.appendAssessment(_classAssessmentList as Array<HierarchyAssessment>,
                  assessment as HierarchyAssessment, FileConstants.constants.class as string);
                if (this.classAssessmentCounter === this.classProgramAssessmentLength) {
                  this._assessmentClassMapDetails.next(_classAssessmentList as Array<HierarchyAssessment>);
                }
              });
          });
        }
      });
  }

  getProgramHierarchy(seletedProgram: ProgramClassModel, callBack: Function): void {
    this.hierarchyDalService.getHierarchyByProgram(seletedProgram, (hierarchy: Hierarchy) => {
      callBack(hierarchy as Hierarchy);
    });
  }
}
