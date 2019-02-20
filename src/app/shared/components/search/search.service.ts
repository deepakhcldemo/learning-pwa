// importing core components.
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

// importing required services
import { NotesService } from '../../services/notes.service';
import { MediaPopupService } from '../media-popup/media-popup.service';
import { AssessmentService } from '../../services/assessment.service';
import { AccordionService } from '../../services/accordion.service';
import { UserService } from 'src/app/auth/user.service';
import { IndexedDbService } from '../../services/indexed.db.service';
import { SearchDalService } from '../../services/cache-datalayer/search-dal.service';
import { LoggerService } from '../../logger.service';
import { MediaService } from '../../services/media.service';
import { TeacherClassService } from '../../services/teacher-class.service';

// importing required models
import { HierarchyAssessment } from 'src/app/models/assessment-detail.model';
import { TeacherClassModel } from 'src/app/models/class.model';
import { MediaMetaDataWithStudentsList, MediaDetail, MediaMetaData } from 'src/app/models/media.model';
import { Student, NotesDetail, Note } from 'src/app/models/notes.model';
import { AssessmentDetail } from 'src/app/models/assessment-detail.model';
import { SearchedKeywordsCache, SearchResult } from 'src/app/models/search.model';
// importing constants from constant file.
import { FileConstants } from '../../constants/file-constants';
import { environment } from 'src/environments/environment.perf';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // private member variables
  private _allAssessment: Subject<Array<HierarchyAssessment>> = new Subject();
  private allClassAssessments: Array<HierarchyAssessment>;
  private assessmentChecklist: Array<HierarchyAssessment>;
  private _searchResultIdb: Subject<Array<SearchedKeywordsCache>> = new Subject();
  private searchedAssesments: Array<SearchResult> = [];
  private keywords: Array<string>;
  private assessmentData: Array<HierarchyAssessment>;

  // public variables
  public _searchStatus: Subject<boolean> = new Subject();
  public notesList: Array<Note> = [];
  public mediaList: Array<MediaDetail> = [];
  public _searchList = new Subject<Array<SearchResult>>();
  public filteredList: Array<SearchResult> = [];

  constructor(
    private router: Router,
    private db: AngularFirestore,
    private mediaPopupService: MediaPopupService,
    private notesService: NotesService,
    private assessmentService: AssessmentService,
    private accordionService: AccordionService,
    private indexService: IndexedDbService,
    private userService: UserService,
    private searchServiceCache: SearchDalService,
    private mediaService: MediaService,
  ) {
  }

  /**
  * get search status
  */
  public getSearchStatus(): Observable<Boolean> {
    return this._searchStatus;
  }

  /**
   * set search status
   * @param value search status
   */
  public setSearchStatus(searchedStatus: boolean): void {
    this._searchStatus.next(searchedStatus);
  }

  /**
   * get search item list
   */
  public getSearchList(): Observable<Array<SearchResult>> {
    return this._searchList.asObservable();
  }

  /**
   *set search item list
   * @param searclResultList search items
   */
  public setSearchList(searchResultList: Array<SearchResult>): void {
    this._searchList.next(searchResultList);
  }

  /**
   * search item by keywords
   * @param keyword search keyword
   * @param assessment assessment list
   */
  public searchItemByKeyword(keyword: string, assessment: Array<HierarchyAssessment>, classId: string): Observable<Array<SearchResult>> {
    // To Do search from assessment, notes,Media
    this.filteredList.length = 0;
    this.assessmentData = assessment;
    this.keywords = keyword.split(' ');
    this.setNotesListByClassId(this.keywords as string[], classId as string);
    return this._searchList as Observable<Array<SearchResult>>;
  }

  /**
   * get and search notes list by keywords
   * @param keyword search key
   */
  private setNotesListByClassId(keyword: string[], classId: string): void {
    this.db.collection(environment.firebasedb.userisbn).doc(this.userService.getCurrentUser().identityId);
    this.notesService.getNotesList(classId).subscribe((noteList: Array<NotesDetail>) => {
      if (noteList) {
        this.setNotesListSubscribe(noteList, keyword, classId);
      } else {
        LoggerService.error('Notes are not available');
      }
    }, error => {
      LoggerService.error(error.message, {});
    });
  }


  /**
   * Method called from setNotesList subscriber...
   * @param noteList Array of notes
   * @param keyword Keyword to search
   */
  private setNotesListSubscribe(noteList: Array<NotesDetail>, keyword: string[], classId: string): void {
    this.notesList.length = 0;
    if (noteList.length) {
      let counter = 0;
      noteList.filter((noteInstance: NotesDetail) => {
        const tempStore = [];
        counter++;
        keyword.forEach((alphabetsInSerachString: string) => {
          this.searchIntoSingleNote(noteInstance, alphabetsInSerachString, tempStore);
        });
      });
      if (noteList.length === counter) {
        if (this.filteredList.length > 0) {
          this.filteredList = [...this.filteredList, ...this.notesList as any];
        } else {
          this.filteredList = [...this.notesList as any];
        }
        this.setMediaListByClassId(this.keywords, classId);
      }
    } else {
      this.setMediaListByClassId(keyword, classId);
    }
  }


  /**
   * Method searches for searched alphabets in notes instance
   * @param noteInstance Single note Instance
   * @param alphabetsInSerachString  Alphabets of search string
   * @param tempStore temporary array to store notes id
   */
  private searchIntoSingleNote(noteInstance: NotesDetail, alphabetsInSerachString: string, tempStore: Array<string>): void {
    const element = alphabetsInSerachString;
    if (noteInstance.comment.toLowerCase().indexOf(element.toLowerCase()) > -1) {
      if (this.notesList.length) {
        this.searchIntoNoteIfNoteListExist(noteInstance);
      } else {
        if (this.notesList.indexOf({ 'type': FileConstants.constants.notes, 'details': noteInstance }) === -1) {
          this.notesList.push({ 'type': FileConstants.constants.notes, 'details': noteInstance });
          tempStore.push(noteInstance.id);
        }
      }
    }
  }

  /**
   * Searchs into note if note list exist
   * @param noteInstance NoteDetail
   */
  private searchIntoNoteIfNoteListExist(noteInstance: NotesDetail): void {
    this.notesList.forEach((noteObj: Note) => {
      if (noteObj.details.id !== noteInstance.id) {
        if (this.notesList.indexOf({ 'type': FileConstants.constants.notes, 'details': noteInstance }) === -1) {
          this.notesList.push({ 'type': FileConstants.constants.notes, 'details': noteInstance });
        }
      }
    });

  }

  /**
   * get and search media list by keyword
   * @param keyword search key
   */
  public setMediaListByClassId(keyword: string[], classId: string): void {
    this.db.collection(environment.firebasedb.userisbn).doc(this.userService.getCurrentUser().identityId);
    this.mediaService.getMediaByClassId(classId as string).subscribe((mediaList: Array<MediaMetaData>) => {
      this.setMediaListSubsriber(keyword, mediaList);
    }, error => {
      LoggerService.error(error.message, {});
    }
    );
  }


  /**
   *  Method filter medialist to fetch matched string
   * @param keyword  searchedKeyWord
   * @param mediaList  whole medialist
   */
  private setMediaListSubsriber(keyword: string[], mediaList: Array<MediaMetaData>): void {
    this.mediaList.length = 0;
    if (mediaList.length) {
      this.searchMediaListIfLengthExist(keyword, mediaList);
    } else {
      this.searchIntoAssessment(keyword, this.assessmentData);
      this.setSearchList(this.filteredList as Array<SearchResult>);
    }
  }

  /**
   *  Method searches into medialist and prepare an array
   * @param keyword array of alphabets of entered serached string.
   * @param mediaList array of media items fetched from firebase.
   */
  private searchMediaListIfLengthExist(keyword: string[], mediaList: Array<MediaMetaData>): void {
    let counter = 0;
    mediaList.map((mediaDetailInstance: MediaMetaData) => {
      counter++;
      keyword.forEach((searchKeywordAlphabets: string) => {
        const element = searchKeywordAlphabets;
        if (mediaDetailInstance.caption !== undefined) {
          if (mediaDetailInstance.caption.toLowerCase().indexOf(element.toLowerCase()) > -1) {
            this.mediaList.push({ 'type': FileConstants.constants.media, 'details': mediaDetailInstance });
          }
        }
      });
    });
    if (mediaList.length === counter) {
      if (this.filteredList.length > 0) {
        this.filteredList = [...this.filteredList, ...this.mediaList as Array<MediaDetail>];
      } else {
        this.filteredList = this.mediaList as Array<MediaDetail>;
      }
      this.searchIntoAssessment(keyword, this.assessmentData);
      this.setSearchList(this.filteredList as Array<SearchResult>);
    }
  }


  /**
   * filter assessment list by keyword
   * @param keyword keyword to search into assessments
   * @param studentAssessments all assessments associated with selected student
   */
  private searchIntoAssessment(keyword: string[], studentAssesssments: Array<HierarchyAssessment>): Array<SearchResult> {
    this.searchedAssesments.length = 0;
    if (studentAssesssments.length) {
      studentAssesssments.filter((studentAssessment) => {
        keyword.forEach((alphabetsInSearchedStr: string) => {
          const element = alphabetsInSearchedStr;
          {
            studentAssessment['keywords'].forEach((storekeyword) => {
              if (storekeyword.toLowerCase().indexOf(element.toLowerCase()) > -1) {
                this.searchedAssesments.push({ 'type': studentAssessment.type, 'searchdata': studentAssessment });
              }
            });
          }
        });
      });
      this.filteredList = [...this.filteredList, ...this.searchedAssesments as any];
      return this.filteredList as Array<SearchResult>;
    } else {
      return this.filteredList as Array<SearchResult>;
    }
  }


  /**
   * Sets class
   * @param currentClass  current selected class object
   */
  private setAssessmentClass(currentClass: TeacherClassModel): void {
    this.assessmentService.setAssessmentClassDetailsMap(currentClass as TeacherClassModel);
  }

  /**
   * Gets all assessments for a class.
   * @param currentClass current class object
   * @returns all assessments
   */
  public getAllAssessments(currentClass: TeacherClassModel): Observable<Array<HierarchyAssessment>> {
    this.assessmentService.getAssessmentClassDetailsMap().subscribe((assessments: Array<HierarchyAssessment>) => {
      this.allClassAssessments = assessments;
      this._allAssessment.next(this.allClassAssessments);
    });
    this.setAssessmentClass(currentClass as TeacherClassModel);
    return this._allAssessment.asObservable() as Observable<Array<HierarchyAssessment>>;
  }

  /**
   * Edits media toggle or open media page for selected media.
   * @param idbMedia  media object
   * @param students  student instance
   */
  public editMediaToggle(idbMedia: MediaMetaDataWithStudentsList, student?: Student): void {
    this.mediaPopupService.openMediaPopup(idbMedia as MediaMetaDataWithStudentsList);
  }

  /**
   * Edits note toggle open note page for selected note.
   * @param note note instance
   */
  public editNoteToggle(note: NotesDetail): void {
    const noteContent: NotesDetail = note;
    this.notesService.setNoteDetails(noteContent as NotesDetail);
    this.notesService.setNotePopupState(true);
  }

  public openSelectedAssessment(checklist: AssessmentDetail, assessmentChecklist: Array<HierarchyAssessment>): void {
    this.assessmentChecklist = assessmentChecklist;
    this.assessmentChecklist.map((item: HierarchyAssessment) => {
      if ((item.parent === checklist.parent) && (item.parent === checklist.parentid)) {
        checklist['title'] = item.title;
      }
    });
    this.assessmentService.setCurrentAssessment(checklist as AssessmentDetail);
    this.accordionService.setBreadcrumb(checklist.path);
    if (checklist.type === FileConstants.constants.checklist) {
      this.redirectTo('/pages/checklist');
      // this.router.navigate(['/pages/checklist'], { queryParams: { id: checklist.id }});
    } else {
      this.redirectTo('/pages/ongoing');
      // this.router.navigate(['/pages/ongoing'], { queryParams: { id: checklist.id }});
    }
  }

  /**
   * Redirects to
   * @param uri
   */
  private redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri])
    );
  }

  /**
   * Search update idb
   * @param searchkeyword searched string
   */
  public searchUpdateCache(searchkeyword: SearchedKeywordsCache): void {
    this.indexService.getAll(FileConstants.constants.search, searchObjCache => {
      const indexedKeyword = searchObjCache.filter((item: SearchedKeywordsCache) => {
        return item.searchString.indexOf(searchkeyword.searchString) > -1;
      }, `${FileConstants.constants.persistentDBName}_${this.userService.getCurrentUser().identityId}`);
      if (indexedKeyword.length > 0) {
        this.indexService.putUpdate(FileConstants.constants.search,
          searchkeyword.time, searchkeyword.searchString,
          `${FileConstants.constants.persistentDBName}_${this.userService.getCurrentUser().identityId}`)
          .subscribe();
      }
    }, `${FileConstants.constants.persistentDBName}_${this.userService.getCurrentUser().identityId}`);
  }

  /**
   * Gets search instances from idb
   * @returns search instances from idb
   */
  public getSearchInstancesFromCache(): Observable<Array<SearchedKeywordsCache>> {
    this.searchServiceCache.getSearchKeywordsCache().subscribe((searchIdbResults: Array<SearchedKeywordsCache>) => {
      this._searchResultIdb.next(searchIdbResults);
    });
    return this._searchResultIdb as Observable<Array<SearchedKeywordsCache>>;
  }

}
