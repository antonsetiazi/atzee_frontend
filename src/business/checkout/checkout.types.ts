// src/business/checkout/checkout.types.ts

export type PaymentStatus = "idle" | "pending" | "paid" | "failed";

export interface CheckoutItem {
    id: string;
    name: string;
    price: number;
    quantity: number;

    type: "product" | "service";

    meta?: {
        date?: string;
        slotLabel?: string;
    };
}

export interface CheckoutState {
    items: CheckoutItem[];

    selectedPaymentMethodId: string | null;
    paymentStatus: PaymentStatus;
}
