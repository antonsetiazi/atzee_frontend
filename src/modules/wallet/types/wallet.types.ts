// src/modules/wallet/types/wallet.types.ts

export interface WalletSummary {
    available_balance: number;
    held_balance: number;
}

export type WalletTransactionType =
    | "topup"
    | "payment"
    | "escrow_hold"
    | "escrow_release"
    | "refund";

export interface WalletTransaction {
    id: number;
    amount: number;
    transaction_type: WalletTransactionType;
    reference_type?: string;
    reference_id?: string;
    description?: string;
    created_at: string;
}
