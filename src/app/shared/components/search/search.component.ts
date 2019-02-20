// import for core components from angular library
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// import for services.
import { LoggerService } from '../../logger.service';
import { AccessibilityService } from '../../services/accessibility.service';
import { StudentService } from '../../services/student.service';
import { TeacherClassService } from '../../services/teacher-class.service';
import { SearchDalService } from '../../services/cache-datalayer/search-dal.service';


// import for models.
import { SearchedKeywordsCache, SearchResult } from 'src/app/models/search.model';
import { AssessmentDetail } from 'src/app/models/assessment-detail.model';
import {
  MediaMetaDataWithStudentsList,
} from 'src/app/models/media.model';
import { Student } from 'src/app/models/student.model';
import { NotesDetail } from 'src/app/models/notes.model';
import { TeacherClassModel } from 'src/app/models/class.model';

// import for inheriting constants from constant file.
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { HierarchyAssessment } from 'src/app/models/assessment-detail.model';
import { SearchService } from './search.service';
import { SlideInOutAnimation } from '../../animations/slide-in-out.animation';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: SlideInOutAnimation.getAnimations('100%')
})
export class SearchComponent implements OnInit, OnDestroy {
  /**
   *  major variables used within code
   */
  private _assessmentFromIDbSubsription: Subscription;
  private _searchListSubscription: Subscription;
  private _classSubscription: Subscription;
  private _searchStatusSubscription: Subscription;
  private assessmentChecklist: Array<HierarchyAssessment> = [];
  private students: Student;
  private currentSelectedClass: TeacherClassModel;
  private searchedKeywords: Array<SearchedKeywordsCache> = []; // global Array

  /**
   * variables to calculate today and week date
   */
  private date = new Date();
  private yesterday: number = this.date.getTime() - 3600 * 24 * 1000;
  private weekStamp: number = this.date.getTime() - 6 * 24 * 3600 * 1000;


  // public variables
  public NoResultString = FileConstants.constants.NoResultString;
  public todayHeading = FileConstants.constants.today;
  public weekHeading = FileConstants.constants.thisWeek;
  public searchKeyword = '';
  public toggleSearch: boolean;
  public searchItems: Array<SearchResult> = [];
  public today: boolean;
  public week: boolean;
  public searchOnKeyword: boolean;
  public suggestKeys: Array<SearchedKeywordsCache> = [];
  public suggest: boolean;
  public searchTabIndexStatus = true;
  public todaySearchedKey: SearchedKeywordsCache;
  public weeklySearchKey: SearchedKeywordsCache;
  public searchedWord: SearchResult;
  public suggestKeyword: SearchedKeywordsCache;
  public todaySearchKeywords = [];
  public weeklySearchedKeywords = [];
  public resultString = FileConstants.constants.Loading;
  public result = false;

  constructor(
    private searchServiceCache: SearchDalService,
    private accessibilityService: AccessibilityService,
    private studentService: StudentService,
    private teacherClassService: TeacherClassService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.getClassAssessments();
    this.getSearchPanelStatus();
    this.getSearchListToSearch();
    this.studentService.getAllStudentDetail((student: Student) => {
      this.students = student;
    });

    this.accessibilityService
      .getTabIndexSecondLevelStatus()
      .subscribe((status: boolean) => {
        this.searchTabIndexStatus = status;
      });
  }

  /**
   *  method invokes search service to fetch status.
   */
  private getSearchPanelStatus(): void {
    this._searchStatusSubscription = this.searchService
      .getSearchStatus()
      .subscribe(
        () => {
          this.openSearchSidebar();
        },
        error => {
          LoggerService.error(error.message, {});
          this.unSubscribeAll();
        }
      );
  }

  /**
   * Method invokes search service for fetching search result as list.
   */
  private getSearchListToSearch(): void {
    this._searchListSubscription = this.searchService.getSearchList().subscribe(
      (searchResultArr: Array<SearchResult>) => {
        this.searchItems = searchResultArr;
      },
      error => {
        LoggerService.error(error.message, {});
        this.unSubscribeAll();
      }
    );
  }

  /**
   * Gets class assessments subscription
   */
  private getClassAssessments(): void {
    this._classSubscription = this.teacherClassService
      .getCurrentClass()
      .subscribe(
        (currentClass: TeacherClassModel) => {
          if (currentClass) {
            this.currentSelectedClass = currentClass;
            this.getAssessmentsCache(this.currentSelectedClass);
          }
        },
        error => {
          LoggerService.error(error.message, {});
          this.unSubscribeAll();
        }
      );
  }

  /**
   * Clear search history on click event
   */
  public clearSearchkeyword(): void {
    this.searchKeyword = '';
    this.searchItems.length = 0;
    this.searchOnKeyword = false;
    this.initializeFromSearchCache();
    this.today = true;
    this.week = true;
    this.suggest = false;
    this.result = false;
  }

  /**
   * toggle search slider on click event
   */
  public toggleSearchSideBar(): void {
    this.toggleSearch = !this.toggleSearch;
    this.initializeFromSearchCache();
    this.accessibilityService.setTabIndexLevelStatus(true, false, false);
  }

  /**
   * This method open search slider
   */
  private openSearchSidebar(): void {
    this.intializeGloballyTemplateValues();
    this.today = true;
    this.week = true;
    this.result = false;
    this.searchOnKeyword = false;
    this.suggest = false;
    this.clearSearchkeyword();
    this.toggleSearch = true;
    this.accessibilityService.setTabIndexLevelStatus(false, true, false);
  }

  /**methods sort indexed db data as per timestamp */
  private sortByDueDate(): void {
    this.searchedKeywords.sort((a, b) => {
      return (a.time - b.time) as number;
    });
  }

  /**
   *  Initializing array from indexed db
   */
  private initializeFromSearchCache(): void {
    this.searchService.getSearchInstancesFromCache().subscribe((searchIdbResults: Array<SearchedKeywordsCache>) => {
      if (searchIdbResults) {
        searchIdbResults.forEach((searchIdbInstance, index) => {
          this.searchedKeywords.splice(index, 1, searchIdbInstance);
        });
      }
      this.sortByDueDate();
      this.intializeTodayWeekValues(this.searchedKeywords);
    });
  }

  /**
   * Method intialize today and week array binded on template
   * @param searchedKeywords search Objects from Index Db
   */
  private intializeTodayWeekValues(searchedKeywords: Array<SearchedKeywordsCache>): void {
    let m = 0;
    let k = 0;
    searchedKeywords.reverse().forEach((searchIdbInstance) => {
      if (searchIdbInstance.time > this.yesterday) {
        this.todaySearchKeywords.splice(k, 1, searchIdbInstance);
        k++;
      } else if (
        searchIdbInstance.time < this.yesterday &&
        searchIdbInstance.time > this.weekStamp
      ) {
        this.weeklySearchedKeywords.splice(m, 1, searchIdbInstance);
        m++;
      }
    });
  }

  /**
   * Gets assessments from idb
   * @param currentSelectedClass Selected Class object
   */
  private getAssessmentsCache(currentSelectedClass: TeacherClassModel): void {
    this._assessmentFromIDbSubsription = this.searchService
      .getAllAssessments(currentSelectedClass)
      .subscribe(
        (allIdbAssessments: Array<HierarchyAssessment>) => {
          this.assessmentChecklist = allIdbAssessments;
        },
        error => {
          LoggerService.error(error.message, {});
          this.unSubscribeAll();
        }
      );
  }

  /*
   * This method is called to intialize a Global array from Indexed Database
   *
   * */
  private intializeGloballyTemplateValues(): void {
    this.today = true;
    this.week = true;
    this.result = false;
    this.suggest = false;
    this.searchOnKeyword = false;
    this.initializeFromSearchCache();
  }

  /**
   * This method  is bind with click event using angular directive to search
   * on click
   * @param searchKey searched string
   */
  public searchOnClick(searchKey: string): void {
    this.result = false;
    this.today = false;
    this.week = false;
    this.suggest = false;
    this.searchOnKeyword = true;
    this.searchService
      .searchItemByKeyword(
        searchKey.trim(),
        this.assessmentChecklist,
        this.currentSelectedClass.classId
      )
      .subscribe(searchResult => {
        if (searchResult.length === 0) {
          this.result = true;
        }
      });
    if (this.searchItems.length >= 0) {
      this.insertIntoCache(searchKey.trim());
    }
    this.initializeFromSearchCache();
  }

  /**
   *  this method is called on Enter Event.g
   */
  public searchOnEnter(): void {
    this.searchOnKeyword = true;
    this.result = false;
    this.today = false;
    this.week = false;
    this.suggest = false;
    this.searchService
      .searchItemByKeyword(
        this.searchKeyword.trim(),
        this.assessmentChecklist,
        this.currentSelectedClass.classId
      )
      .subscribe(searchResult => {
        if (searchResult.length === 0) {
          this.result = true;
        }
      });
    if (this.searchItems.length >= 0) {
      this.insertIntoCache(this.searchKeyword.trim());
    }
    this.initializeFromSearchCache();
  }

  /**
   *  Method insert or update the same search object into IDB.
   * @param searchkeyword searched string
   */
  private insertIntoCache(searchkeyword: string): void {
    const tempKeywords = [];
    const searchCustomIdb: SearchedKeywordsCache = {
      searchString: searchkeyword,
      time: new Date().getTime()
    };
    if (this.searchedKeywords.length === 0) {
      this.searchServiceCache.searchIntializeIdb(searchCustomIdb);
      this.initializeFromSearchCache();
    }
    this.searchedKeywords.forEach((searchIdbResult) => {
      tempKeywords.push(searchIdbResult.searchString);
    });
    if (
      this.searchedKeywords.length !== 0 &&
      tempKeywords.includes(searchkeyword)
    ) {
      tempKeywords.length = 0;
      this.searchUpdateCache(searchCustomIdb as SearchedKeywordsCache);
    } else if (!tempKeywords.includes(searchkeyword) && this.searchedKeywords[0]) {
      tempKeywords.length = 0;
      this.searchServiceCache.insertNewSearchCacheKeyWord(searchCustomIdb).subscribe((searchIdbResult) => { });
      this.initializeFromSearchCache();
    }
  }

  /**
   * Function updates search object on re-searching a same searchString  but with different timestamp
   * @param searchkeyword searched string
   */
  private searchUpdateCache(searchkeyword: SearchedKeywordsCache): void {
    this.searchService.searchUpdateCache(searchkeyword);
  }

  /**
   *  This function is to work with suggestions on writing some keywords
   */
  private intializeSuggestedKeywords(): void {
    this.suggestKeys.length = 0;
    this.result = false;
    this.today = false;
    this.week = false;
    this.searchOnKeyword = false;
    this.searchedKeywords.forEach((suggestKeywordIdb) => {
      if (suggestKeywordIdb.searchString.startsWith(this.searchKeyword)) {
        this.suggestKeys.push(suggestKeywordIdb);
      }
    });
    this.suggest = true;
  }

  /**
   * This function is called from template on generation of certain event
   * @param event event object, generated from search html
   */
  public searchOnKeyPress(event: KeyboardEvent): void {
    if (
      event.key === FileConstants.constants.backspace &&
      this.searchKeyword === ''
    ) {
      this.suggestKeys.length = 0;
      if (this.searchItems !== []) {
        this.searchItems.length = 0;
      }
      if (this.searchKeyword === '') {
        this.setTemplateVariable();
        this.result = false;
        this.initializeFromSearchCache();
      }
    } else if (
      this.searchKeyword !== '' &&
      event.key === FileConstants.constants.backspace
    ) {
      this.intializeSuggestedKeywords();
    } else if (
      this.searchKeyword !== '' &&
      event.key === FileConstants.constants.enter
    ) {
      this.initializeFromSearchCache();
      this.searchOnEnter();
    } else if (
      this.searchKeyword !== '' &&
      event.key !== FileConstants.constants.ArrowDown &&
      event.key !== FileConstants.constants.Tab
    ) {
      this.intializeSuggestedKeywords();
    } else if (
      this.searchKeyword === '' &&
      event.key === FileConstants.constants.enter
    ) {
      this.setTemplateVariable();
      this.result = false;
    }
  }

  /**
   * Function sets the template variable to show HTML content.
   */
  private setTemplateVariable(): void {
    this.today = true;
    this.week = true;
    this.searchOnKeyword = false;
    this.suggest = false;
  }

  /**
   * to migrate to notes page
   * @param note Selected note object
   */
  public editNotesToggle(note: NotesDetail): void {
    this.toggleSearch = !this.toggleSearch;
    this.searchService.editNoteToggle(note);
  }

  /** to migrate to media page
   * @param media selected media object
   */
  public editMediaToggle(localMedia: MediaMetaDataWithStudentsList): void {
    this.toggleSearch = !this.toggleSearch;
    this.searchService.editMediaToggle(localMedia, this.students);
  }

   /**
   *  Open assessment for user.
   * @param checklist assessments array.
   */
  public openAssessment(checklist: AssessmentDetail): void {
    this.toggleSearch = !this.toggleSearch;
    if (checklist.hasOwnProperty('searchdata')) {
      checklist = checklist['searchdata'];
    }
    this.searchService.openSelectedAssessment( checklist, this.assessmentChecklist);
  }

  /**
   * Method used to set focus on starting element of page (for cyclic tabbing)
   * @param elementName1, elementName2 : name of element where focus should go.
   */
  public setFocus(elementName1: string, elementName2?: string): void {
    this.accessibilityService.selectFocus(elementName1, elementName2);
  }

  /**
   * Function used to unsubscribe the subscription after completion of the activity
   */
  ngOnDestroy() {
    this.unSubscribeAll();
  }

  /**
   * Function unsubsribe when error occurred...
   */
  unSubscribeAll() {
    if (this._searchStatusSubscription) {
      this._searchStatusSubscription.unsubscribe();
    }
    if (this._searchListSubscription) {
      this._searchListSubscription.unsubscribe();
    }
    if (this._classSubscription) {
      this._classSubscription.unsubscribe();
    }
    if (this._assessmentFromIDbSubsription) {
      this._assessmentFromIDbSubsription.unsubscribe();
    }
  }
}
