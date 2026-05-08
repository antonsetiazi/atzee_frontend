// src/modules/finance/reports/cash_flow/cashFlow.types.ts

export type CashFlowItem = {
    account_code: string;
    account_name: string;
    amount: number;
};

export type CashFlowResponse = {
    operating: CashFlowItem[];
    investing: CashFlowItem[];
    financing: CashFlowItem[];

    total_operating: number;
    total_investing: number;
    total_financing: number;

    net_cash_flow: number;
};
