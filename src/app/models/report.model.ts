export interface StudentModel {
    avatar: string;
    emailAddress: string;
    firstName: string;
    fullName: string;
    lastName: string;
    userId: string;
    observed?: Array<AssesmentItem>;
    observationCount?: number;
}

export interface AssesmentItem {
    assessmentitemid: number;
    isobserved: boolean;
    id: string;
    type?: string;
}

export interface OptionSelected {
    view: any;
    when: any;
    sort: any;
    from?: any;
    to?: any;
    program?: any;
}

export interface Comment {
    assessmentid?: number;
    assessmentitemdetails?: any;
    assessmentitemid: number;
    comments?: string;
    comment?: string;
    createdat?: any;
    ctype: string;
    deleted: boolean;
    isobserved: boolean;
    mediaid: string;
    parent: string;
    student: string;
    students: Array<string>;
    type: string;
    updatedat?: any;
}

export interface ObservedAssessment {
    assessmentid?: number;
    assessmentitemid: number;
    createdat?: any;
    id: string;
    path: string;
    isobserved: boolean;
    parent: string;
    students: string;
    updatedat?: any;
    type?: string;
}

export interface FilterOption {
    key: string;
    value: string;
}
