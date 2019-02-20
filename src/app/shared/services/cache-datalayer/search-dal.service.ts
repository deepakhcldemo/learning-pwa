// importing core components.
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// importing services.
import { IndexedDbService } from '../indexed.db.service';
import { UserService } from 'src/app/auth/user.service';
import { SearchedKeywordsCache } from 'src/app/models/search.model';
import { AssessmentService } from '../../services/assessment.service';

// importing models.
import { TeacherClassModel } from 'src/app/models/class.model';

// importing file constants
import { FileConstants } from '../../constants/file-constants';
@Injectable({
  providedIn: 'root'
})
export class SearchDalService {

  // private member variables
  private searchedKeywordsCache: Array<SearchedKeywordsCache> = [];
  private searchIndexObjCache: Subject<any> = new Subject();
  private newKeywordInsertSearchCache: Subject<any> = new Subject();


  constructor(
    private userService: UserService,
    private indexService: IndexedDbService,
    private assessmentService: AssessmentService
    ) { }

  /**
   *  Method uses current class id and call the processAssessment method to fetch assessments.
   * @param currentSelectedClass currentSelectedClass Object.
   */
  public setAssessmentByClass(currentSelectedClass: TeacherClassModel): void {
    this.assessmentService.setAssessmentClassDetailsMap(currentSelectedClass as TeacherClassModel);
  }

  /**
   * Method fetches searchkeyword with timestamp object from search IDB.
   */
  public getSearchKeywordsCache(): Observable<Array<SearchedKeywordsCache>> {
    this.indexService.getAll(FileConstants.constants.search, (searchData: Array<SearchedKeywordsCache>) => {
      this.searchedKeywordsCache = searchData;
      this.searchIndexObjCache.next(this.searchedKeywordsCache);
    }, `${FileConstants.constants.persistentDBName}_${this.userService.getCurrentUser().identityId}`);
    return this.searchIndexObjCache as Observable<Array<SearchedKeywordsCache>>;
  }

  /**
   * Method intitialize the search IDB and insert only first entry.
   * @param searchCustomIdbObj Custom search obj to insert or update into search IDB.
   */
  public searchIntializeIdb(searchCustomIdbObj: SearchedKeywordsCache): void {
    this.indexService.put(FileConstants.constants.search, searchCustomIdbObj,
      `${FileConstants.constants.persistentDBName}_${this.userService.getCurrentUser().identityId}`).subscribe(searchCache => { });
  }

  /**
   * Method inserts new custom search object into search IDB.
   * @param searchCustomIdbObj Custom search obj to insert or update into search IDB.
   */
  public insertNewSearchCacheKeyWord(searchCustomIdbObj: SearchedKeywordsCache): Observable<Array<SearchedKeywordsCache>> {
    this.indexService.put(FileConstants.constants.search, searchCustomIdbObj,
      `${FileConstants.constants.persistentDBName}_${this.userService.getCurrentUser().identityId}`).subscribe((newData) => {
        this.newKeywordInsertSearchCache.next(newData);
      });
    return this.newKeywordInsertSearchCache as Observable<Array<SearchedKeywordsCache>>;
  }

}
