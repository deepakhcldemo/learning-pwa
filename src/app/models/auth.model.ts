export interface Authentication {
    access_token: string;
    clientId: string;
    createdDate: Date;
    expires_in: number;
    scope: string[];
    token_type: string;
    userId: string;
}
