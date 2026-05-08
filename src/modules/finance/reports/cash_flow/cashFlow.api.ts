// src/modules/finance/reports/cash_flow/cashFlow.api.ts

import { httpPost } from "@/core/http/http.client";

import type { CashFlowResponse } from "./cashFlow.types";

export async function fetchCashFlow() {
    return httpPost<CashFlowResponse>(
        "/entities/accounting/accounting.reports.cash_flow/query/",
        {},
    );
}
