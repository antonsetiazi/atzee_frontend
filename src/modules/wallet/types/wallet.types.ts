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

export interface WalletTransactionMeta {
    flow?: "topup" | "payment" | "escrow" | "payout" | "refund" | "system";

    source?: "midtrans" | "wallet" | "system";
    channel?: string;

    status?: "pending" | "success" | "failed" | "expired";

    order_id?: string;
    booking_id?: string;

    actor?: "user" | "system" | "partner";

    note?: string;

    breakdown?: {
        subtotal?: number;
        partner_receive?: number;
        platform_fee?: number;
    };
}

export interface WalletTransaction {
    id: number;
    amount: number;
    transaction_type: WalletTransactionType;
    reference_type?: string;
    reference_id?: string;
    description?: string;
    meta?: WalletTransactionMeta;
    created_at: string;
}
