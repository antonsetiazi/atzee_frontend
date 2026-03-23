// src/core/permissions/permission.api.ts

import { httpGet } from "@/core/http/http.client";

export function getMyPermissions(): Promise<string[]> {
    return httpGet("/permissions/me/");
}
