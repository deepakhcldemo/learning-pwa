import { ProgramClassModel } from './program.model';

/**
 * Hierarchy Model
 */
export interface Hierarchy {
    programProduct: ProgramClassModel;
    hierarchyDetails: HierarchyDetails;
    programProductId?: string;
}
/**
 * Hierarchy details model
 */
export interface HierarchyDetails {
    identifier: string;
    displayOrder: string;
    titleInSequence: string;
    contentType: string;
    mediaType: string;
    attachmentURL: string;
    version: number;
    children: Array<HierarchyDetails>;
    parent?: string;
    path?: string;
}
