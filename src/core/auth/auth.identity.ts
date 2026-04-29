// src/core/auth/auth.identity.ts

import { jwtDecode } from "jwt-decode";
import type { SessionUser } from "@/core/session/session.types";

interface JwtPayload {
    user_id: string;
    username: string;
    role_id?: string;
    active_tenant: string;
}

export function buildUserFromAccessToken(access: string): SessionUser {
    const jwt = jwtDecode<JwtPayload>(access);

    return {
        id: jwt.user_id,
        username: jwt.username,
        tenant_id: jwt.active_tenant,
        role_id: jwt.role_id,
    };
}
