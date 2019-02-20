import { TeacherClassModel } from './class.model';
import { ProgramClassModel } from './program.model';
import { MediaMetaData } from './media.model';


export interface AssessmentItem {
    id?: string;
    title?: string;
    tags?: Array<Tag>;
    sequence?: number;
}

export interface Tag {
    description: string;
    title: string;
}

export interface Assessment {
    criteria?: Array<AssessmentItem>;
    id?: number;
    title?: string;
    type?: string;
    assessmentitemid?: number;
    parent?: string;
    templatekind?: string;
    assessmentPath?: string;
    keywords?: Array<string>;
}

export interface AssessmentDetail {
    id?: string;
    assessment?: HierarchyAssessment;
    assessmentItem?: Assessment;
    assessmenttype?: string;
    parent: string;
    path: string;
    type: string;
    classid?: string;
    commentCount?: string;
    isobserved?: boolean;
    mediaCommentCount?: string;
    createdat?: any;
    updatedat?: any;
    sequence?: number;
    shortname?: string;
    parentid?: string;
    title?: string;
    students?: any;
    assessmentItemId?: number | string ;
    nodes?: Array<NavNode>;
    progressCount?: number;
    productId?: string;
    programid?: string;
    updatedComment?: string;
    templatekind?: string;
    criteria?: Array<any>;
    assessmentPath?: string;
    assessmentUrl?: string;
    keywords?: Array<string>;
}

export interface NavNode {
    id: string;
    sequence: number;
    shortname: string;
    title: string;
    practice?: Array<any>;
    nodes?: Array<NavNode>;
    assessments?: Array<Number>;
    parent?: string;
    path?: string;
    isbn?: Array<string>;
    progressCount?: number;
}

export class AssessmentComment {
    assessmentid?: string;
    assessmentitemdetails?: AssessmentItem;
    assessmentitemid: string;
    comments: string;
    comment?: any;
    createdat?: any;
    ctype: string;
    deleted: boolean;
    id?: number | string;
    isobserved: boolean;
    mediaid?: string;
    parent: string;
    path: string;
    students?: Array<string>;
    type?: string;
    updatedat?: any;
    productId?: string;
    classid: string;
    programid: string;
    productid?: string;
    mediaData?: MediaMetaData;

    constructor(
        assessment: AssessmentDetail,
        assessmentItem: AssessmentItem,
        classObject: TeacherClassModel,
        programClassObject: ProgramClassModel,
        type: string,
        comments: string,
        studentUserId: string,
        ctype: string,
        mediaid = ''
    ) {
        this.comments = comments;
        this.assessmentid = assessment.id;
        this.assessmentitemid = assessmentItem.id;
        this.createdat = new Date();
        this.updatedat = new Date();
        this.deleted = false;
        this.isobserved = false;
        this.type = type;
        this.parent = assessment.parent;
        this.path = assessment.path;
        this.students = [studentUserId];
        this.ctype = ctype;
        this.mediaid = mediaid;
        this.assessmentitemdetails = assessmentItem;
        this.classid = classObject.classId;
        this.programid = programClassObject.program.identifier;
        this.productid = programClassObject.productId;
        // this.id = '';
    }
}

export interface Assessmentitemobservation {
    id?: string | number;
    assessmentid: string;
    assessmentitemid: string;
    createdat?: Date;
    isobserved?: boolean;
    parent?: string;
    path?: string;
    students?: string;
    updatedat?: Date;
    type?: string;
    classid?: string;
    programid: string;
    productid?: string;
    types?: string;
    commentCount?: number;
    mediaCommentCount?: number;
    updatedComment?: string;
}

export interface AssessmentobservedList {
    assessmentitemid: string;
    isObserved: boolean;
    id: any;
}

export interface Product {
    name: string;
    productID: string;
}

export interface AssessmentCommentCount {
    assessmentid?: number;
    assessmentitemid?: number;
    createdat?: Date;
    updatedat?: Date;
    classid?: string;
    programid?: string;
    commentCount?: number;
    mediaCommentCount?: number;
    studentid?: string;
}

export interface AssessmentData {
    assessmentid?: string;
    assessmentitemdetails?: AssessmentItem;
    assessmentitemid: string;
    comments: string;
    createdat?: any;
    ctype: string;
    deleted: boolean;
    id?: number | string;
    isobserved: boolean;
    mediaid?: string;
    parent: string;
    path: string;
    students?: Array<string>;
    type?: string;
    updatedat?: any;
    productId?: string;
    classid: string;
    programid: string;
    productid?: string;
}
export interface HierarchyAssessment {
    assessmentPath?: string;
    assessmentUrl?: string;
    criteria?: Array<AssessmentItem>;
    id?: string | number;
    keywords?: Array<string>;
    title?: string;
    type?: string;
    progressCount?: number;
    parent?: string;
    path?: string;
}
