// src/modules/finance/reports/profit_loss/profitLoss.api.ts

import { httpPost } from "@/core/http/http.client";

import type { ProfitLossResponse } from "./profitLoss.types";

export async function fetchProfitLoss() {
    return httpPost<ProfitLossResponse>(
        "/entities/accounting/accounting.profit.loss/query/",
        {},
    );
}
