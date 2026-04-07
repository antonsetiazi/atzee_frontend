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
        // 🔥 universal
        type?: "product" | "service";

        // 🔥 service-specific
        date?: string;
        slotLabel?: string;
        slotStart?: string;
        slotEnd?: string;
        duration?: number;
    };
}

export interface SelectedAddress {
    id: number;
    label: string;
    recipient_name: string;
    phone: string;
    address_line: string;
    city: string;
}

export interface SelectedPartner {
    id: number;
    name: string;
}

export interface CheckoutState {
    items: CheckoutItem[];
    bookingId: string | null;
    paymentStatus: PaymentStatus;

    selectedPartnerId: number | null;
    selectedPartner: SelectedPartner | null;

    addressId: number | null;
    selectedAddress?: SelectedAddress | null;
}
