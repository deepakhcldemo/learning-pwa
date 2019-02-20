export interface TeacherProduct {
    productId: string;
    productDisplayName: string;
    programs?: Array<string>;
}

export interface AuthorizedProduct {
    expiryDate: Date;
    hasAccess: boolean;
    moduleId: string;
    productId: string;
}
