// src/business/order/order.types.ts

import type { CheckoutItem } from "@/business/checkout/checkout.types";

export type OrderStatus =
    | "pending"
    | "paid"
    | "completed"
    | "failed"
    | "cancelled";

export interface Order {
    id: string;

    userId: string;
    userName: string;

    items: CheckoutItem[];

    total: number;

    paymentMethod: string;

    status: OrderStatus;

    createdAt: string;
}
