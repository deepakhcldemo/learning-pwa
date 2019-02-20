// importing core components
import { Injectable } from '@angular/core';
import { Subscription, Subject, Observable } from 'rxjs';

// importing require services
import { ObservationDalService } from './services/realtime-datalayer/observation-dal.service';
import { MediaService } from './services/media.service';
import { CommentDalService } from './services/realtime-datalayer/comment-dal.service';

// importing models
import { Assessmentitemobservation, AssessmentDetail, AssessmentItem } from '../models/assessment-detail.model';
import { Comment } from '../models/comment.model';
import { Student } from '../models/student.model';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { CsvDataArray } from '../models/csv-data-array';
import { TeacherClassModel } from '../models/class.model';
import { TeacherClassService } from './services/teacher-class.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  public commentArray: Array<Comment> = [];
  public exportAssessmentCustomFormat: Array<CsvDataArray> = [];
  public assessmentCommentsSubscription: Subscription;
  public itemObservationSubscription: Subscription;
  public grade: string;
  // public assessmentObservedData: Array<Assessmentitemobservation> = [];
  public assessmentArrayData: Array<AssessmentDetail> = [];
  public storeSplitAssessmentPath: string[] = [];
  public temporaryStoreSplittedAssessmentPath: string[] = [];
  public fullDate: string;
  public studentDetails: Student;
  private iterateExportDetails: Subject<Array<CsvDataArray>> = new Subject();
  private currentClassMediaDetails = [];
  private currentClass: TeacherClassModel;
  private currentClassAndStudentBasedObservedDetails = [];
  private commentsDetails = [];
  private headers = {
    name: 'Student',
    grade: 'Grade',
    unit: 'Unit',
    investigation: 'Investigation',
    session: 'Session',
    assessmenttype: 'Assessment Type',
    assessmentTitle: 'Assessment Title'.replace(/,/g, ''), // remove commas to avoid
    assessmentItem: 'Assessment Item',
    date: 'Date',
    checkmark: 'Checkmark',
    comment: 'Observation',
  };


  constructor(private observationDalService: ObservationDalService,
    private mediaService: MediaService,
    private commentDalService: CommentDalService,
    private teacherClassService: TeacherClassService) {
    this.getCurrentClassAndGetSetMediaDetails();
  }

  /**
   * Gets current class and get set media details
   */
  private getCurrentClassAndGetSetMediaDetails(): void {
    this.teacherClassService.getCurrentClass().subscribe(currentClass => {
      if (currentClass != null) {
        this.currentClass = currentClass;
        this.mediaService.getMediaByClassId(currentClass.classId).subscribe((media) => {
          this.currentClassMediaDetails = media;
        });
      }
    });
  }

  /**
   * Gets observed assessment details by class id and student id.
   * @param studentDetails  Current selected student details.
   * @param currentClassId Current selected class id.
   */
  private getObservedAssessmentDetailsByClassIDAndStudentId(studentDetails: Student, currentClassId: string): void {
    this.itemObservationSubscription = this.getObservationByStudentId(studentDetails.userId as string, currentClassId as string)
      .subscribe((observations) => {
        this.currentClassAndStudentBasedObservedDetails = observations;
      });
  }

  /**
   * Prepares csvformat data
   * @param studentDetails Selected Student Details
   * @param assessmentArrayData  Assessments for selected Student
   * @param currentClassId selecetd Class ID
   * @returns csvformat data  returns Fomatted Object that will be mapped to XL Sheet
   */
  public prepareCSVFormatData(studentDetails: Student, assessmentArrayData: Array<AssessmentDetail>):
    Observable<Array<CsvDataArray>> {
    this.assessmentArrayData = assessmentArrayData;
    this.studentDetails = studentDetails;
    this.commentArray.length = 0;
    this.exportAssessmentCustomFormat.length = 0;
    this.getObservedAssessmentDetailsByClassIDAndStudentId(studentDetails as Student, this.currentClass.classId as string);
    this.commentDalService.getCommentsByClassIdAndStudentId(studentDetails.userId as string, this.currentClass.classId)
      .subscribe((commentsDetail) => {
        this.prepareAllCommentAndMediaList(commentsDetail as Array<Comment>, this.currentClass.classId as string);
        this.iterateOverAssessmentArray(studentDetails as Student, assessmentArrayData as Array<AssessmentDetail>);
      });
    return this.iterateExportDetails as Observable<Array<CsvDataArray>>;
  }


  /**
   *  Method iterate over comment array and assigning associated media instace based on mediaId
   * @param commentData Current comments array
   * @param currentClassId Current selected class Id as string.
   */
  private prepareAllCommentAndMediaList(commentData: Array<Comment>, currentClassId: string): void {
    let _incrCommentCounter = 0;
    commentData.forEach(commentInst => {
      if (commentInst.ctype === FileConstants.constants.comment) {
        this.commentArray.splice(_incrCommentCounter, 1, commentInst);
      }
      if (commentInst.ctype === FileConstants.constants.media) {
        const _incr2CommentCounter = _incrCommentCounter;
        this.currentClassMediaDetails.map((mediaDetail) => {
          if (mediaDetail.mediaId === commentInst.mediaid) {
            commentInst['mediaData'] = mediaDetail;
          }
        });
        this.commentArray.splice(_incr2CommentCounter, 1, commentInst);
      }
      _incrCommentCounter++;
    });
  }

  /**
   * Function to fetch observation data from assessmentItemObservation
   * @param studentId Current student id.
   * @param currentClassId current class id.
   * */
  private getObservationByStudentId(studentId: string, currentClassId: string): Observable<Array<Assessmentitemobservation>> {
    return this.observationDalService.getObserveInformation(studentId, currentClassId) as Observable<Array<Assessmentitemobservation>>;
  }

  /**
   *  this Function assigns grade via iterating over storeSplitArray
   * @param storeSplitArray array contains path as string
   */
  private fetchGrade(storeSplitArray: string[]): string {
    if (storeSplitArray.length === 7 && storeSplitArray[0].startsWith(FileConstants.constants.Kindergarten)) {
      if (storeSplitArray[0] === FileConstants.constants.Kindergarten) {
        this.grade = 'k';
      }
    } else if (storeSplitArray.length >= 7) {
      if (storeSplitArray[0].startsWith(FileConstants.constants.Grade)) {
        this.grade = storeSplitArray[1];
      }
    }
    return this.grade as string;
  }

  /**
   * method iterate over assessment array.
   * @param studentDetails selected Student Object
   * @param assessmentArrayData  Assessment Array Data.
   */
  private iterateOverAssessmentArray(studentDetails: Student, assessmentArrayData: Array<AssessmentDetail>): void {
    assessmentArrayData.forEach((assessmentDataInstance: AssessmentDetail) => {
      const parent = assessmentDataInstance.parent;
      this.splitAssessmentPath(assessmentDataInstance.path as string);
      this.fetchGrade(this.storeSplitAssessmentPath);
      // iterating for each assessmentItemID
      this.iterateForCriteria(studentDetails, this.currentClassAndStudentBasedObservedDetails, assessmentDataInstance, parent);
    });
  }

  /**
  *  this function parses and breaks the input parameter into tokens of string
  *   and stored into array
  * @param pathTosplit  navigation path
  */
  private splitAssessmentPath(pathTosplit: string): string[] {
    this.storeSplitAssessmentPath.length = 0;
    const arr = pathTosplit.split('>');
    let counter = 0;
    arr.forEach((item) => {
      this.temporaryStoreSplittedAssessmentPath = item.split(' ');
      this.temporaryStoreSplittedAssessmentPath.forEach(element => {
        if (element !== '') {
          this.storeSplitAssessmentPath.splice(counter, 1, element);
          counter++;
        }
      });
    });
    return this.storeSplitAssessmentPath as string[];
  }

  /**
   * this function iterate over sub-array contain within each assessment type,
   * containing data for each assessment type.
   * @param currentClassAndStudentBasedObservedDetails  observation data array
   * @param assessmentData      assessment array for studnet
   * @param assessmentId        assessmnet id for studnet
   * @param parent  parent id for particular assessmnet type
   */
  private iterateForCriteria(studentDetails: Student, currentClassAndStudentBasedObservedDetails: Array<Assessmentitemobservation>,
    assessmentDataInstance: AssessmentDetail, parent: string): void {
    assessmentDataInstance.assessment.criteria.forEach((assessmentItemDetail) => {
      let tempString = '';
      // when comment are there for a assessment and it is observed
      if (assessmentDataInstance.assessmentItemId === assessmentItemDetail.id) {
        tempString = this.setAssessmentTitle(assessmentDataInstance, assessmentItemDetail);
        this.iterateObservedData(studentDetails, currentClassAndStudentBasedObservedDetails,
          assessmentItemDetail, assessmentDataInstance, tempString
          , parent);
      }
    });
  }
  /**
   *  Method assigns the assessment item title using regular expression..
   * @param assessmentDataInstance  assessment Instance
   * @param assessmentItemDetail  assessmentItemDetail instance from criteria
   */
  private setAssessmentTitle(assessmentDataInstance: AssessmentDetail, assessmentItemDetail: AssessmentItem): string {
    let tempText = ' ';
    if (assessmentDataInstance.assessment.type === 'ongoing') {
      tempText = (assessmentItemDetail.title).replace(/[^\w\s]/gi, '');
    }
    if (assessmentDataInstance.assessment.type === 'checklist') {
      tempText = (assessmentItemDetail.title).replace(/[^\w\s]/gi, '');
    }
    return tempText as string;
  }

  /**
   *  This Function accepts the following parameters and iterate over array   containing observation data
   *  for particular assessment item type.
   * @param assessmentItemdetail  assessmentitemdetails instance from criteria array
   * @param assessmentData   individual assessment type
   * @param tempText       string that contains title and text of assessment item
   * @param assessmentId  assessment id
   * @param parent parent id
   * @param assessmentObservedData data as observed assessment array
   */
  private iterateObservedData(studentDetails: Student, currentClassAndStudentBasedObservedDetails: Array<Assessmentitemobservation>,
    assessmentItemDetail: AssessmentItem, assessmentDataInstance: AssessmentDetail, tempText: string
    , parent: string): void {
    // iteration over observed data instance
    currentClassAndStudentBasedObservedDetails.forEach((assessmentObserveInstance) => {
      let observedState: string|boolean;
      if (assessmentItemDetail.id === assessmentObserveInstance.assessmentitemid
        && assessmentObserveInstance.parent === parent) {
        observedState = this.setObservedStateByAssessmentType(studentDetails, assessmentDataInstance, assessmentObserveInstance);
        this.getIterateOverCommentObservedTrue(studentDetails, assessmentDataInstance, assessmentItemDetail, tempText,
          parent, observedState);
      }
    });
  }

  /**
   *  Method assigns observation type
   * @param studentDetails selected Student Object
   * @param assessmentDataInstance  assessment instance
   * @param assessmentObserveInstance  assessmentObservation Instance
   */
  private setObservedStateByAssessmentType(studentDetails: Student, assessmentDataInstance: AssessmentDetail,
    assessmentObserveInstance: Assessmentitemobservation): string {
    let observedState: string|boolean;
    if (assessmentDataInstance.assessment.type === 'ongoing') {
      observedState = '';
    }
    if (assessmentDataInstance.assessment.type === 'checklist') {
      observedState = assessmentObserveInstance.isobserved;
    }
    return observedState as string ;
  }

  /**
    *  Iterate over comment array based data, only if assessmentItemObservation table
    * contain entry for associated assessmenrt items. i.e. for checkmark is true
    * @param assessmentObserveData   assessment observation instance
    * @param assessmentData    assessment instance
    * @param assessmentItemdetail   assessment item data
    * @param tempText  string that contains text and title for assessment item
    * @param parent parent id
    * @param observedState Observation state i.e. whether item is observed or not.
    */
  private getIterateOverCommentObservedTrue(studentDetails: Student, assessmentData: AssessmentDetail, assessmentItemDetail:
    AssessmentItem, tempText: string,
    parent: string, observedState: string): void {
    let commentType = '';
    this.commentArray.forEach((commentInstance: Comment) => {
      if (commentInstance.assessmentitemid === assessmentItemDetail.id
        && parent === commentInstance.parent && commentInstance.assessmentid
        === assessmentData.assessment.id) {
        this.convertTimeStamp(commentInstance.createdat);
        commentType = this.checkCommentTypeAndAssignComment(commentInstance);
        this.exportAssessmentCustomFormat.push({
          name: studentDetails.fullName,
          grade: 'k',
          unit: this.storeSplitAssessmentPath[3],
          investigation: this.storeSplitAssessmentPath[5],
          session: this.storeSplitAssessmentPath[7],
          assessmentType: assessmentData.assessment.type,
          assessmentTitle: assessmentData.assessment.title.replace(/[^\w\s]/gi, ''),
          assessmentItem: tempText,
          date: this.fullDate,
          checkmark: observedState,
          comment: commentType
        });
      }
    });
    this.prepareObservedAssessmentList(studentDetails, assessmentData, assessmentItemDetail, tempText,
      parent, observedState, commentType);
    this.iterateExportDetails.next(this.exportAssessmentCustomFormat);
  }

  /**
   * Checks comment type and assign value of comment
   * @param commentInstance Comment Istance
   * @returns comment type and assign value.
   */
  private checkCommentTypeAndAssignComment(commentInstance: Comment): string {
    let commentType: string;
    if (commentInstance.ctype === FileConstants.constants.comment) {
      commentType = commentInstance.comments;
    } else
      if (commentInstance.ctype === FileConstants.constants.media) {
        if (commentInstance.mediaData) {
          commentType = commentInstance.mediaData.mediakind;
        }
      }
    return commentType as string;
  }


  /**
  *  this function covert the  timestamp object to  date
  * @param time timeStamp
  */
  private convertTimeStamp(time): string {
    if (time) {
      const dt = new Date(time.seconds * 1000 + time.nanoseconds / 1000000000);
      const dateNum = dt.getDate();
      const month = dt.getMonth() + 1;
      const year = dt.getFullYear();
      this.fullDate = (dateNum + '/' + month + '/' + year);
    } else {
      this.fullDate = undefined;
    }
    return this.fullDate as string;
  }

  /**
   * Method is called, when only observed, no coments for an assessment item id..
   * @param studentDetails Student Details
   * @param assessmentData Assessmet Object
   * @param assessmentItemDetail Assessment item Object
   * @param tempText Assessment Title
   * @param parent Assessment parent
   * @param observedState Observation state
   * @param commentType Commment type i.e. media or comment.
   */
  private prepareObservedAssessmentList(studentDetails: Student, assessmentData: AssessmentDetail,
    assessmentItemDetail: AssessmentItem, tempText: string, parent: string, observedState: string,
    commentType: string): void {
    if (assessmentData.assessmentItemId === assessmentItemDetail.id && observedState === 'true' && commentType === '') {
      this.exportAssessmentCustomFormat.push({
        name: studentDetails.fullName,
        grade: this.grade,
        unit: this.storeSplitAssessmentPath[3],
        investigation: this.storeSplitAssessmentPath[5],
        session: this.storeSplitAssessmentPath[7],
        assessmentType: assessmentData.assessment.type,
        assessmentTitle: assessmentData.assessment.title.replace(/[^\w\s]/gi, ''),
        assessmentItem: tempText,
        date: '',
        checkmark: observedState,
        comment: commentType,
      });
    }
  }


  /**
   *  part of funtion to convert the dat into CSV
   * @param stringFormatItems object of final data that will be exported as csv
   */
  private convertToCSV(stringFormatItems: string): string {
    const array = typeof stringFormatItems !== FileConstants.constants.object ? JSON.parse(stringFormatItems) : stringFormatItems;
    let str = '';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const k of Object.keys(array[i])) {
        if (line !== '') {
          line += ' ,';
        }
        line += array[i][k];
      }
      str += line + '\r\n';
    }
    return str as string;
  }




  /**
   *  Function to export data as CSV , call sinternally convertToCSV() method
   * @param assessmentItems assessmentItems array contains dat for export
   * @param fileTitle student name for file title..
   */
  private exportToCSVFormat(assessmentItems: Array<CsvDataArray>, fileTitle: string): void {
    if (this.headers) {
      assessmentItems.unshift(this.headers);
    }

    /**
  * Convert Object to JSON
  */
    const stringFormatItems = JSON.stringify(assessmentItems);
    const csv = this.convertToCSV(stringFormatItems);
    const exportedFilename = fileTitle + '.csv' || 'export.csv';
    const blob = new Blob([csv], { type: FileConstants.constants.csvType });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilename);
    } else {
      const link: HTMLAnchorElement = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        const encodeUri = encodeURI(url);
        link.setAttribute(FileConstants.constants.href, encodeUri);
        link.setAttribute(FileConstants.constants.download, exportedFilename);
        link.style.visibility = FileConstants.constants.hidden;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }

  }


  /**
   * Downloads csv
   * @param items Formatted Array that will convert into xl
   * @param fileTitle title of file, nam of student name
   */
  public downloadCSV(assessmentItems: Array<CsvDataArray>, fileTitle: string): void {
    this.exportToCSVFormat(assessmentItems.reverse() as Array<CsvDataArray>, fileTitle as string);
    assessmentItems.shift();
  }


}
