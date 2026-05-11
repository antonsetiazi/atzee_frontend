// src/modules/finance/payables/dashboard/services/dashboard.service.ts

import { httpGet } from "@/core/http/http.client";
import type { PayablesDashboard } from "../types/dashboard.types";

export async function getPayablesDashboard() {
    return httpGet<PayablesDashboard>("/accounting/payables/dashboard/");
}
