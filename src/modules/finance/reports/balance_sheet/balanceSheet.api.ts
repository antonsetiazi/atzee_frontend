// src/modules/finance/reports/balance_sheet/balanceSheet.api.ts

import { httpPost } from "@/core/http/http.client";
import type { BalanceSheetResponse } from "./balanceSheet.types";

export async function fetchBalanceSheet() {
    return httpPost<BalanceSheetResponse>(
        "/entities/accounting/accounting.balance.sheet/query/",
        {},
    );
}
