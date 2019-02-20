import { AssessmentDetail } from './assessment-detail.model';
export class Comment {
    assessmentid?: number | string;
    assessmentitemdetails?: AssessmentDetail;
    assessmentitemid?: string | number;
    comments?: string;
    createdat?: Date;
    ctype?: string;
    deleted?: boolean;
    isobserved?: boolean;
    mediaid?: string;
    students?: Array<string>;
    type?: string;
    updatedat?: Date;
    mediaData?: any;
    parent?: string;
}
