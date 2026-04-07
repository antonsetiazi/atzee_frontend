// src/business/order/order.types.ts

export type OrderStatus =
    | "pending"
    | "accepted"
    | "on_going"
    | "paid"
    | "completed"
    | "failed";

export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;

    // entityId: string;
    // entityType: "product" | "service";
}

export interface OrderPartner {
    id: number;
    name: string;
    phone?: string;
}

export interface Order {
    id: string;
    order_number: string;

    items: OrderItem[];

    total: number;

    status: OrderStatus;

    createdAt: string;

    paymentMethod?: string;
    userId?: string;
    userName?: string;

    // 🔥 SESSION-BASED
    bookingId?: string | null;

    partner?: OrderPartner | null;

    selectedPartner?: {
        id: number;
        name: string;
    } | null;
}

export type PartnerOrderStatus =
    | "pending"
    | "accepted"
    | "on_going"
    | "completed"
    | "cancelled";
