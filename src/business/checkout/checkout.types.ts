// src/business/checkout/checkout.types.ts

export type PaymentStatus = "idle" | "pending" | "paid" | "failed";

export interface CheckoutItem {
    id: string;

    entityId: string; // 🔥 WAJIB (ini kunci)
    entityType: "product" | "service";

    name: string;
    price: number;
    quantity: number;

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
