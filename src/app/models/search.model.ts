export interface SearchDetails {
    searchdata: any;
}

export interface SearchedKeywordsCache {
    searchString: string;
    time?: any;
}

export interface SearchResult {
    type?: string;
    details?: any;
    searchdata?: any;
}
export interface AssessmentKeys {
    id: number;
    keywords: Array<string>;
}

export interface SearchedKeyword {
   AssessmentKeys: Array <AssessmentKeys>;
}

export interface NavigationDetails {
    assessment: any;
    assessmentitem: any;
    navigation: any;
}
