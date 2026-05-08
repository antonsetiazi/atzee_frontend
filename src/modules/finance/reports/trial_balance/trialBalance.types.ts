// src/modules/finance/reports/trial_balance/trialBalance.types.ts

export type TrialBalanceItem = {
    account_id: string;
    account_code: string;
    account_name: string;
    debit: number;
    credit: number;
};

export type TrialBalanceResponse = {
    items: TrialBalanceItem[];

    total_debit: number;
    total_credit: number;

    is_balanced: boolean;
};
