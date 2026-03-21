// src/business/order/order.types.ts

import type { CheckoutItem } from "@/business/checkout/checkout.types";

export type OrderStatus = "pending" | "paid" | "failed" | "cancelled";

export interface Order {
    id: string;

    items: CheckoutItem[];

    total: number;

    paymentMethod: string;

    status: OrderStatus;

    createdAt: string;
}
