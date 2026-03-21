// src/core/ui/views/checkout/checkout.types.ts

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

export interface PaymentMethodType {
    id: string;
    label: string;
}
