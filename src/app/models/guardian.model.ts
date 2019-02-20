export interface Guardian {
    camerapermission?: boolean;
    guardian?: Array<{
        email: string;
        mob: string;
        name: string;
    }>;
}
