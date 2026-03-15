// src/core/tenant/tenant.api.ts

import { httpGet } from "@/core/http/http.client";
import type { Tenant } from "./tenant.types";

export async function fetchCurrentTenant(): Promise<Tenant> {
    return httpGet("/tenants/current/");
}
