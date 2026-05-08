// src/modules/finance/reports/trial_balance/trialBalance.api.ts

import { httpPost } from "@/core/http/http.client";

import type { TrialBalanceResponse } from "./trialBalance.types";

export async function fetchTrialBalance() {
    return httpPost<TrialBalanceResponse>(
        "/entities/accounting/accounting.trial.balance/query/",
        {},
    );
}
