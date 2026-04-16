// src/business/order/order.types.ts

export type OrderStatus =
    | "pending"
    | "accepted"
    | "on_going"
    | "completed_by_partner"
    | "completed"
    | "cancelled"
    | "paid"
    | "failed";

export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;

    // entityId: string;
    // entityType: "product" | "service";
}

export interface OrderCustomer {
    id: string;
    name: string;
    phone?: string;
}

export interface OrderAddress {
    label?: string;
    recipient_name?: string;
    phone?: string;
    address_line?: string;
    notes?: string;
    latitude?: number;
    longitude?: number;
}

export interface OrderPartner {
    id: number;
    name: string;
    phone?: string;
}

export interface OrderBooking {
    id: string;
    start_time: string;
    end_time: string;
    duration?: number;
    status: string;
}

export interface Order {
    id: string;
    order_number: string;
    items: OrderItem[];
    total: number;
    partner_earning?: number;
    status: OrderStatus;
    payment_status: string;

    createdAt: string;

    paymentMethod?: string;
    userId?: string;
    userName?: string;

    // 🔥 SESSION-BASED
    bookingId?: string | null;
    booking?: OrderBooking | null;

    partner?: OrderPartner | null;

    selectedPartner?: {
        id: number;
        name: string;
    } | null;

    customer?: OrderCustomer | null;
    address?: OrderAddress | null;
    fulfillment_type?: string;
}

export type PartnerOrderStatus =
    | "pending"
    | "accepted"
    | "on_going"
    | "completed_by_partner"
    | "completed"
    | "cancelled";
