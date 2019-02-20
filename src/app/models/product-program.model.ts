import { TeacherClassModel } from './class.model';

export interface ProductProgramModel {
    productId: string;
    programDetails: Array<ProgramModel>;
}

export interface ProgramModel {
    attachmentURL?: string;
    contentType?: string;
    displayOrder?: string;
    identifier?: string;
    mediaType?: string;
    navigationId?: Array<string>;
    titleInSequence?: string;
    version?: string;
}
