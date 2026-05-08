// src/modules/finance/receivables/dashboard/services/dashboard.service.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpGet } from "@/core/http/http.client";

export async function getReceivableDashboard() {
    return httpGet<any>("/accounting/receivables/dashboard/");
}
