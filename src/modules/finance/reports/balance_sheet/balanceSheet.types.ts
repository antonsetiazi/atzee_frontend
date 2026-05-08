// src/modules/finance/reports/balance_sheet/balanceSheet.types.ts

export type BalanceItem = {
    account_code: string;
    account_name: string;
    amount: number;
};

export type BalanceSheetResponse = {
    assets: BalanceItem[];
    liabilities: BalanceItem[];
    equities: BalanceItem[];

    total_asset: number;
    total_liability: number;
    total_equity: number;

    is_balanced: boolean;
};
