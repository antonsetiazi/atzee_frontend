// src/core/session/session.types.ts

export interface SessionUser {
    id: string;
    username: string;
    full_name?: string;
    tenant_id: string;
    avatar_url?: string;

    role_id?: string;
}

export interface SessionState {
    token: string | null;
    user: SessionUser | null;
    isAuthenticated: boolean;
    vertical: string | null;
    isHydrated: boolean;
}
