// src/modules/finance/reports/profit_loss/profitLoss.types.ts

export type ProfitLossItem = {
    account_code: string;
    account_name: string;
    amount: number;
};

export type ProfitLossResponse = {
    revenues: ProfitLossItem[];
    expenses: ProfitLossItem[];

    total_revenue: number;
    total_expense: number;

    net_profit: number;
};
