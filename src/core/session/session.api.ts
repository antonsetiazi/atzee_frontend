// src/core/session/session.api.ts

import { httpGet } from "@/core/http/http.client";
import type { SessionUser } from "./session.types";

export async function fetchSession(): Promise<SessionUser> {
    return httpGet<SessionUser>("/auth/me/");
}
