export interface ProgramHierarchies {
    hierarchies: Hierarchy[];
}

export interface Hierarchy {
    identifier:      string;
    displayOrder:    string;
    titleInSequence: string;
    contentType:     ContentType;
    mediaType:       MediaType;
    attachmentURL?:   string;
    version:         number;
    path?: string;
    parent?: string;
    children:        Hierarchy[];
}

export enum ContentType {
    ObservationalAssessment = 'Observational Assessment',
    Sequence = 'Sequence',
}

export enum MediaType {
    AssessmentChecklist = 'Assessment Checklist',
    OngoingAssessment = 'Ongoing Assessment',
    Tier = 'Tier',
}
