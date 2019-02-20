// Core imports
import { Injectable } from '@angular/core';
// Service imports
import { IndexedDbService } from '../indexed.db.service';
// Model imports
import { HierarchyAssessment } from 'src/app/models/assessment-detail.model';
// Constants import
import { FileConstants } from '../../constants/file-constants';

@Injectable({
  providedIn: 'root'
})
export class AssessmentDalService {
  constructor(
    private indexedDbService: IndexedDbService
  ) { }

  /**
   * Inserts assessment into cache
   * @param assessments
   */
  public insertAssessmentIntoCache(assessments: HierarchyAssessment): void {
    this.insertIntoCache(
      FileConstants.constants.Assessment as string,
      assessments as HierarchyAssessment,
      FileConstants.constants.assessmentPersistantDB as string
    );
  }

  /**
   * Inserts assessment map into cache
   * @param assessmentMaps
   */
  public insertAssessmentMapIntoCache(assessmentMaps: Object): void {
    this.insertIntoCache(
      FileConstants.constants.programAssessmentMapping as string,
      assessmentMaps as Object,
      null
    );
  }

  /**
   * Inserts into cache
   * @param source
   * @param assessments
   * @param dbName
   */
  private insertIntoCache(source: string, assessments: Object, dbName: string): void {
    this.indexedDbService.put(source as string, assessments as Object, dbName as string)
      .subscribe();
  }

  /**
   * Gets assessment from assessment cache
   * @param assessmentPath
   * @param callBack
   */
  public getAssessmentFromAssessmentCache(assessmentPath: string, callBack: Function): void {
    this.indexedDbService.get(
      FileConstants.constants.Assessment as string,
      assessmentPath as string,
      (hierarchyAssessment: HierarchyAssessment) => {
        callBack(hierarchyAssessment as HierarchyAssessment);
      }, FileConstants.constants.assessmentPersistantDB as string);
  }

  /**
   * Gets all program assessment
   * @param store
   * @param callBack
   */
  public getAllProgramAssessment(store: string, callBack: Function): void {
    this.indexedDbService.getAll(store as string,
      (response: Object) => {
        callBack(response as Object);
      });
  }

  /**
   * Gets selected program assessment
   * @param store
   * @param id
   * @param callBack
   */
  public getSelectedProgramAssessment(store: string, id: string, callBack: Function): void {
    this.indexedDbService.get(store as string, id as string,
      (response: Object) => {
        callBack(response as Object);
      });
  }
}
