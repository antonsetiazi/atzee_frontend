export interface LoginPayload {
    username: string;
    password: string;
    tenant_code: string;
}

export interface LoginResponse {
    tokens: {
        access: string;
        refresh: string;
    };
    user: {
        id: string;
        username: string;
        full_name: string;
        tenant_id: string;
    };
}
