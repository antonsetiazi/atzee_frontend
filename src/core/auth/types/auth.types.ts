// src/core/auth/types/auth.types.ts

export interface LoginPayload {
    email: string;
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
        role_id?: string;
    };
}

export type AuthMethod = "otp" | "password";

export interface AuthConfig {
    methods: AuthMethod[];
    default_method: AuthMethod;
}

export interface RequestOtpPayload {
    phone: string;
}

export interface VerifyOtpPayload {
    phone: string;
    otp: string;
    tenant_code: string;
}
