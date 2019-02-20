export interface TeacherClassModel {
    classId: string;
    className: string;
    classDescription: string;
    classImageUrl?: string;
    status?: string;
    organizationId?: string;
    teacherIds?: Array<string>;
    productIds?: Array<string>;
    studentIds?: Array<string>;
    createdBy?: string;
    createdDate?: string;
    lastUpdatedBy?: string;
    lastUpdatedDate?: string;
    externalId?: string;
    externalSource?: string;
    firstTeacherId?: string;
    program?: Array<string>;
}

export interface RostersModel {
    rosters: Array<TeacherClassModel>;
}

export interface ClassModel {
    classId: string;
    className: string;
    classDescription: string;
}
