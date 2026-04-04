// src/business/payment/payment.types.ts

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
