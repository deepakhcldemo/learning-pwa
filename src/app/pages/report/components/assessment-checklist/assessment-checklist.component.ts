import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaService } from '../../../../shared/services/media.service';
import {
  ReportsCheckListObservation,
  IProgramList,
  IAssessment,
  ITagsForProgram,
  IHirerachies,
  IStudentAssessment,
  ICommentList,
} from '../../../../models/report-checklist.model';
import { Student } from '../../../../models/student.model';
import { AssessmentChecklistService } from './assessment-checklist.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from '../../../../shared/logger.service';
import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { ProgramService } from 'src/app/shared/services/program.service';

import { FileConstants } from 'src/app/shared/constants/file-constants';
import { TeacherClassModel } from 'src/app/models/class.model';
import { ProgramClassModel } from 'src/app/models/program.model';
import { Hierarchy } from 'src/app/models/program-hierarchies.model';
import { AssessmentService } from 'src/app/shared/services/assessment.service';
@Component({
  selector: 'app-assessment-checklist',
  templateUrl: './assessment-checklist.component.html',
  styleUrls: ['./assessment-checklist.component.scss']
})
export class AssessmentChecklistComponent implements OnInit, OnDestroy {
  public toggleNavigation: String = '';
  private _classSubscription$: Subscription;
  private _programSubscription$: Subscription;
  private _mediaListSubscription$: Subscription;
  private _assessmentAnswer$: Subscription;
  public _accessibilitySubscription$: Subscription;
  private _commentSubscription$: Subscription;
  private reportCheckListMedia = FileConstants.constants.media;
  public studentList: Array<Student> = [];
  public students: Array<IStudentAssessment> = [];
  private commentList: Array<ICommentList> = [];
  public alphabetsArray = [];
  private allCommentList;
  private studentAssessmentData = [];
  private currentSelectedClass: TeacherClassModel;
  public selectedTitle = '';
  public noRecord = true;
  public noRecordForMobile = false;
  public asessmentNavigationHeading = FileConstants.constants.asessmentNavigationHeading;
  public selectedIndex: Number = 0;
  public selectedPracticeType: boolean;
  public singleSelectedPracticeType: String = '';
  public selectedTags: String = '-1';
  public tabIndexStatus = true;
  public secondTabIndexStatus = false;
  public getAllObservation: Array<ReportsCheckListObservation>;
  public currentSelectedClassProgram: ProgramClassModel;
  public firstLevelAssessment: Array<Hierarchy>;
  public programListByClassId: Array<IProgramList>;
  public secondLevelAssessment: Array<IAssessment>;
  public hirerachyData: Array<IHirerachies>;
  public tagsForProgram: Array<ITagsForProgram>;
  public showAssessment = false;
  public removeSideBar = false;
  public removeAssessment = false;
  public selectTags = '-1';
  public classSelectorStatus = true;
  constructor(
    private mediaService: MediaService,
    private assessmentCheckList: AssessmentChecklistService,
    private spinner: NgxSpinnerService,
    private accessibilityService: AccessibilityService,
    private teacherClassService: TeacherClassService,
    private programService: ProgramService,
    private assessmentService: AssessmentService,
  ) { }

  ngOnInit() {
    this.onWindowResize();
    this.selectedPracticeType = false;
    this.alphabetsArray = this.assessmentService.getAssessmentAlphabets();
    this.setAccessbilityAccordingToLevel();
    this.assessmentCheckList.getProgramListByClassId((programList: Array<IProgramList>) => {
      this.programListByClassId = programList;
    });
    this.classAndProgramListSubcription();
    this._programSubscription$ = this.programService.getCurrentProgram().subscribe((currentProgram) => {
      this.currentSelectedClassProgram = currentProgram;
    }, error => {
      LoggerService.error(error.message, {});
    });
    this.getStudentListBySelectedClass();
    if (this.currentSelectedClass && this.currentSelectedClass.classId) {
      this._mediaListSubscription$ = this.mediaService.getMediaByClassId(this.currentSelectedClass.classId).subscribe((mediaData) => {
        this.mediaService.setAllMedia(mediaData);
      }, error => {
        LoggerService.error(error.message, {});
      });
    }
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize(event?) {
    if (window.innerWidth <= 768) {
      this.classSelectorStatus = true;
    } else {
      this.classSelectorStatus = false;
    }
  }
  /**
   * setting accessbility for first and second level according to the user action
   */
  private setAccessbilityAccordingToLevel(): void {
    this._accessibilitySubscription$ = this.accessibilityService.getTabIndexFirstLevelStatus().subscribe((accessbilityFirstlevelStatus) => {
      this.tabIndexStatus = accessbilityFirstlevelStatus;
    });
    this.accessibilityService.getTabIndexSecondLevelStatus().subscribe((accessbilitySecondLevelStatus) => {
      this.secondTabIndexStatus = accessbilitySecondLevelStatus;
    });
  }

  /**
   * method to get all the current class and programlist by class id
   */
  private classAndProgramListSubcription(): void {
    this._classSubscription$ = this.teacherClassService.getCurrentClass().subscribe((currentClass: TeacherClassModel) => {
      this.currentSelectedClass = currentClass;
      if (this.currentSelectedClass && this.currentSelectedClass.classId) {
        this._mediaListSubscription$ = this.mediaService.getMediaByClassId(
          this.currentSelectedClass.classId
        ).subscribe((mediaData: Array<any>) => {
          this.mediaService.setAllMedia(mediaData);
        }, error => {
          LoggerService.error(error.message, {});
        });
      }
    });
  }

  /**
   * method to get programlist based on the selected program
   * @param currentProgram current selected program object onthe click of programlist
   */
  public getCommentsForSelectedProgram(currentProgram: IProgramList) {
    this._commentSubscription$ = this.assessmentCheckList.getAllCommentsListByProgramId(currentProgram as IProgramList)
      .subscribe((assessCommentItem) => {
        assessCommentItem.sort((previous: any, current: any) => {
          if (previous['updatedat'] && previous['updatedat']) {
            return previous['updatedat']['seconds'] - current['updatedat']['seconds'];
          } else if (previous['createdat'] && current['createdat']) {
            return previous['createdat']['seconds'] - current['createdat']['seconds'];
          } else {
            return previous - current;
          }
        });
        this.allCommentList = assessCommentItem;
      }, error => {
        LoggerService.error(error.message, {});
        this.spinner.hide();
      });
  }
  /**
 * method to get all student list based on the  current class
 */
  private getStudentListBySelectedClass(): void {
    this.assessmentCheckList.studentDetailsByCurrentClass((studentList) => {
      this.studentList = studentList.sort(function (currentStudent: Student, nextStudent: Student) {
        const currentStudentName = currentStudent.firstName.toLowerCase();
        const nextStudentName = nextStudent.firstName.toLowerCase();
        if (currentStudentName < nextStudentName) { return -1; }
        if (currentStudentName > nextStudentName) { return 1; }
        return 0;
      });
    });
  }

  /**
   * get focus to particular student which is selected from character list.
   *
   * @param alphabetId id of elements which need to be focused
   */
  setFocusForStudentBasedOnAlphabetSelection(alphabetId: string): void {
    if ((window.innerWidth <= 1023)) {
      alphabetId = alphabetId.toLowerCase();
    } else {
      alphabetId = 'id' + '_' + alphabetId.toLowerCase();
    }
    const element = document.getElementById(alphabetId);
    if (element) {
      const elementPosition = element.getBoundingClientRect();
      const horizonatlPos = elementPosition.top;
     // const horizonatlPos = element.offsetTop;
     console.log('horizonatlPos', horizonatlPos);
      let studentList;
      if ((window.innerWidth <= 1023)) {
        studentList = document.getElementById('student-list-ids-mobile');
      } else {
        studentList = document.getElementById('student-list-ids');
      }
      studentList.scrollBy(
        0, horizonatlPos
      );
    }
  }
  /**
   * method to detect tab press when there is no record for particular tag
   */
  ontabOnForNoRecord(): void {
    if (this.students.length === 0) {
      this.selectedIndex = this.selectedIndex;
      const getNextSelectedId = this.selectedIndex.toString();
      const getAssessmentNoRecord = 'assessment_' + getNextSelectedId;
      const getNextFocusElement = document.getElementById(getAssessmentNoRecord);
      if (getNextFocusElement) {
        getNextFocusElement.focus();
      }
    }
  }
  /**
   * getting  mapped  Hirerachy data from program object;
   * @param programObj single seleted program object
   * @param event: Event from HTML
   */
  getHirerachyData(programObj: ProgramClassModel, event: Event): void {
    this.showAssessment = false;
    this.firstLevelAssessment = [];
    this.assessmentCheckList.getHirerachyDataByProgramID(programObj, (firstLevelAssessment: Array<Hierarchy>) => {
      this.firstLevelAssessment = firstLevelAssessment;
    });
    if (!programObj.firstLevelHirerachy) {
      this.programListByClassId.forEach((programListByClassIdItem) => {
        if (programListByClassIdItem === programObj) {
          programObj.firstLevelHirerachy = true;
        } else {
          programListByClassIdItem.firstLevelHirerachy = false;
        }
      });
    } else {
      programObj.firstLevelHirerachy = false;
    }
    event.stopPropagation();
  }
  /**
   * getAllAssessment data by Program object
   * @param programObj Specific program object
   * @param programChildObj second level Program object
   * @param event Event from HTML
   */
  getAssessmentDataByProgramID(programObj: ProgramClassModel, programChildObj: ProgramClassModel, event: Event,
    title: string, mainProgramObject, maintrackIndec): void {
    this.selectedTags = '-1';
    if (!programChildObj.showArrow) {
      this.assessmentCheckList.getAssessmentDataByProgramId(programObj, (secondLevelAssessment: Array<IAssessment>) => {
        this.secondLevelAssessment = secondLevelAssessment.slice();
        this.tagsForProgram = [];
        this.hirerachyData = [];
        this.secondLevelAssessment.map((secondLevelAssessmentItem) => {
          if (secondLevelAssessmentItem.path.includes(title)) {
            this.hirerachyData.push({
              'parent': secondLevelAssessmentItem.parent,
              'assessmentId': secondLevelAssessmentItem.id
            });
            this.filterOutTagsFromCriteria(secondLevelAssessmentItem);
          }
        });
      });
    }
    programChildObj.secondLevelHirerachy = !programChildObj.secondLevelHirerachy;
    programChildObj.showArrow = !programChildObj.showArrow;
    mainProgramObject.map((mainProgramObjectItem, mainProgramObjectIndex) => {
      if (mainProgramObjectIndex !== maintrackIndec) {
        mainProgramObjectItem.secondLevelHirerachy = false;
        mainProgramObjectItem.showArrow = false;
      }
    });
    event.stopPropagation();
  }

  /**
   * method to take out tags from specific Assessment Hirerachy data
   * @param singleHirerachyObject single hirerachy Object
   */
  private filterOutTagsFromCriteria(singleHirerachyObject: IAssessment): void {
    const collectSpecficTags = [];
    singleHirerachyObject.criteria.forEach((hirerachyObject, hirerachyIndex) => {
      hirerachyObject.tags.forEach((criteriaObject, criteriaTags) => {
        this.tagsForProgram.push(
          {
            ...hirerachyObject.tags[criteriaTags],
            'assessmentItemID': hirerachyObject.id
          }
        );
      });
    });
    const specifictagsForProgram = this.tagsForProgram.filter((tagItems) => {
      tagItems.applyBorder = false;
      if (collectSpecficTags.indexOf(tagItems.title) === -1) {
        collectSpecficTags.push(tagItems.title);
        return tagItems;
      }
    });
    this.hirerachyData[0].tags = specifictagsForProgram;
  }
  /**
   * method to get all comments for particular tag
   * @param event Event type
   * @param tagObj tag object
   */
  getAllCommentsForTag(event: Event, trackIndex: string, tagObject, trackParentTag, title): void {
    this.selectTags = trackIndex;
    this.hirerachyData[trackParentTag].tags.forEach((tagsItem) => {
      tagsItem.applyBorder = false;
    });
    tagObject.applyBorder = true;
    this.selectedTitle = tagObject.title;
    this.assessmentCheckList.setIndex(tagObject.title);
    this.removeSideBar = true;
    this.removeAssessment = false;
    this.noRecordForMobile = true;
    this.showAssessment = true;
    this.selectedTags = trackIndex;
    this.studentAssessmentData = [];
    this.students.length = 0;
    const assessmentItemPath = '';
    this.commentList = [];
    this.commentList.push(...this.allCommentList);
    this.commentList.map((comment) => {
      if (!comment['assessmentitemdetails'].id) {
        console.log('in return');
        return;
      }
      const assessmentitemdetails = comment['assessmentitemdetails'];
      let currentStudent: any;
      comment['students'].map(data => {
        currentStudent = data;
      });
      if (!this.studentAssessmentData[currentStudent]) {
        this.studentList.map(student => {
          if (student.userId === currentStudent) {
            this.students.push({ detail: student, assessmentitem: [] });
          }
        });
        this.studentAssessmentData[currentStudent] = [];
        this.sortStudentList();
      }
      this.checkingMediaTypeAndCreatingAssessmentItem
        (comment, currentStudent, assessmentItemPath, title);
    });
    this.checkForNoRecord();
    event.stopPropagation();
  }

  /**
   * method to check comment if its of media type and create assessment
   * @param comment specific comment from commentList
   * @param currentStudent: object of current student
   * @param assessmentItemPath assessment path
   */
  private checkingMediaTypeAndCreatingAssessmentItem(comment, currentStudent, assessmentItemPath: string, title) {
    let criteriaTag = 0;
    const selectedTitle = this.assessmentCheckList.getTrackIndex();
    if (comment && comment['ctype']) {
      if (comment['ctype'] === this.reportCheckListMedia) {
        const mediaItem = this.mediaService.getMediaById(comment['mediaid']);
        if (mediaItem) {
          comment['mediaData'] = mediaItem;
        }
      }
      comment.assessmentitemdetails.tags.forEach((item) => {
        if (item.title === selectedTitle) {
          criteriaTag++;
        }
      });
      if (comment.path.includes(title)) {
        this.students.map(student => {
          if (student.detail.userId === currentStudent && criteriaTag !== 0 && comment.type === FileConstants.constants.checklist) {
            student.assessmentitem.push({ parent: assessmentItemPath, comment: comment });
          }
        });
      }
    }
  }

  private checkForNoRecord() {
    let counter = 0;
      this.students.forEach((student) => {
        if (student.assessmentitem.length === 0 ) {
          counter++;
        }
      });
      if (counter === this.students.length) {
        this.noRecord = false;
        console.log('this.noRecord', this.noRecord);
      } else {
        this.noRecord = true;
      }
  }

  /**
   * method for sorting student list based on the their first name
   */
  private sortStudentList(): void {
    this.students = this.students.sort(function (currentStudent: IStudentAssessment, nextStudent: IStudentAssessment) {
      const currentStudentFirstName = currentStudent.detail.firstName.toLowerCase();
      const nextStudentFirstName = nextStudent.detail.firstName.toLowerCase();
      if (currentStudentFirstName < nextStudentFirstName) { return -1; }
      if (currentStudentFirstName > nextStudentFirstName) { return 1; }
      return 0;
    });
  }
  public backToAssessmentCheckList() {
    this.removeAssessment = true;
    this.removeSideBar = false;
    this.noRecord = false;
    this.noRecordForMobile = false;
  }

  public clearBorder() {
    this.selectTags = '-1';
  }
  /**
   * destroying all the subscriber
   */
  ngOnDestroy(): void {
    if (this._assessmentAnswer$) {
      this._assessmentAnswer$.unsubscribe();
    }
    if (this._commentSubscription$) {
      this._commentSubscription$.unsubscribe();
    }
    if (this._mediaListSubscription$) {
      this._mediaListSubscription$.unsubscribe();
    }
    if (this._accessibilitySubscription$) {
      this._accessibilitySubscription$.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
    if (this._programSubscription$) {
      this._programSubscription$.unsubscribe();
    }
  }

}

