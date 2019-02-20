import { Student } from './notes.model';
import { TeacherClassModel } from './class.model';

export interface ReportsCheckListObservation {
  assessmentid?: number;
  students?: string;
  id?: string;
  parent?: string;
  assessmentitemid?: number;
}

export interface ReportCheckListComments {
  assessmentItem?: boolean;
  assessmentid: number;
  assessmentitemid: number;
  comments?: string;
  createdat: Date;
  ctype: string;
  deleted?: boolean;
  id: string;
  isobserved: boolean;
  mediaid: string;
  parent: string;
  students: string[];
  type: string;
  updatedat: Date;
}

export interface ReportCheckListComments {
  assessmentItem?: boolean;
  assessmentid: number;
  assessmentitemdetails: {
    benchmarks?: any[],
    id: number,
    mathpractices?: any[],
    title?: string
  };
  assessmentitemid: number;
  comments?: string;
  createdat: Date;
  ctype: string;
  deleted?: boolean;
  id: string;
  isobserved: boolean;
  mediaid: string;
  parent: string;
  students: string[];
  type: string;
  updatedat: Date;
}

export interface CommentsList {
  key: string;
  value: any;
  parent?: string;
}
// new addedd Interface
export interface IHirerachyData {
  assessmentPath: string;
  assessmentUrl: string;
  criteria: Array<any>;
  id: string;
  keywords: Array<string>;
  parent: string;
  path: string;
  title: string;
  type: string;
}


export interface IProgramList {
  productId: string;
  program?: {
    attachmentURL: string,
    contentType: string,
    displayOrder: string,
    identifier: string,
    mediaType: string,
    titleInSequence: string,
    version: string
  };
  teacherClass: TeacherClassModel;
  firstLevelHirerachy?: boolean;
  showArrow?: boolean;
}

export interface IAssessment {
  hierarchyDetails: Array<any>;
  productProgramId: string;
  criteria: Array<any>;
  path: string;
  parent: string;
  tags: Array<any>;
  id: string;
}

export interface ITagAssessent {
  parent: string;
  tags: Array<any>;
  assessmentItemID: string;
}

export interface ITagsForProgram {
  title: string;
  description: string;
  assessmentItem: string;
  assessmentItemID?: string | number;
  applyBorder?: boolean;
}

export interface IHirerachies {
  parent: string;
  tags?: Array<ITagsForProgram>;
  assessmentId: string;
  type?: string;
}

export interface IStudentAssessment {
  detail: Student;
  assessmentitem: Array<any>;
  showStudent?: boolean;
}

export interface ICommentList {
  assessmentid: string;
  id: string;
  assessmentitemdetails: {
    id: string, sequence: Number,
    tags: [{
      description: string,
      title: string
    }],
    title: string
  };
  assessmentitemid: string;
  classid: string;
  comments: string;
  createdat: { seconds: Number, nanoseconds: Number };
  ctype: string;
  deleted: boolean;
  isobserved: boolean;
  mediaid: string;
  parent: string;
  path: string;
  productid: string;
  programid: string;
  students: Array<string>;
  type: string;
  updatedat: { seconds: Number, nanoseconds: Number };
}


