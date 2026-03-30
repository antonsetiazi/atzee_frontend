// src/business/order/order.types.ts

export type OrderStatus = "pending" | "paid" | "completed" | "failed";

export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    order_number: string;

    items: OrderItem[];

    total: number;

    status: OrderStatus;

    createdAt: string;

    // 🔥 SESSION-BASED
    bookingId?: string | null;
}
