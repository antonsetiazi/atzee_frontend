// src/business/payment/payment.types.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export type PaymentStatus =
    | "idle"
    | "redirecting"
    | "waiting"
    | "success"
    | "failed";

export interface StartPaymentPayload {
    order_id: string;
    payment_method: string;
}

export interface PaymentResponse {
    order_id: string;
    payment_url?: string;
    payment_token?: string;
    status: string;
}

export interface PaymentState {
    orderId: string | null;
    paymentUrl?: string;

    status: PaymentStatus;
    error?: string;
}

// 🔥 NEW: normalized execution (future-proof)
export type PaymentExecutionType =
    | "popup" // Midtrans Snap
    | "redirect" // external redirect
    | "instruction" // manual instruction
    | "direct"; // 🔥 wallet / internal instant payment

export interface PaymentExecution {
    payment_id: string;
    type: PaymentExecutionType;

    payload: {
        token?: string;
        url?: string;
        data?: any;
    };
}
