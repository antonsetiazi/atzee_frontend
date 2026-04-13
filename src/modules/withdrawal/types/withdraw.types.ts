// src/modules/withdrawal/types/withdraw.types.ts

export type WithdrawalStatus =
    | "pending"
    | "processing"
    | "completed"
    | "failed"
    | "cancelled";

export interface Withdrawal {
    id: string;
    amount: number;
    fee: number;
    status: WithdrawalStatus;
    destination: {
        bank_name?: string;
        account_number?: string;
        account_name?: string;
    };
    created_at: string;
    processed_at?: string;
}
