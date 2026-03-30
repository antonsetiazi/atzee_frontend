// src/business/order/order.api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpGet, httpPost } from "@/core/http/http.client";
import type { Order } from "./order.types";

export async function createOrderApi(payload: any): Promise<Order> {
    return httpPost("/marketplace/orders/create/", payload);
}

export async function getOrdersApi(): Promise<Order[]> {
    const res = await httpGet<any[]>("/marketplace/orders/");

    return res.map(mapOrder);
}

export async function getOrderDetailApi(id: string): Promise<Order> {
    const item = await httpGet<any>(`/marketplace/orders/${id}`);
    return mapOrder(item);
}

/* =========================
   🔥 CENTRALIZED MAPPER
   ========================= */
function mapOrder(item: any): Order {
    return {
        id: String(item.id),
        order_number: item.order_number,

        items: (item.items || []).map((i: any) => ({
            id: String(i.id),
            name: i.name,
            quantity: i.quantity,
            price: i.price,
        })),

        total: item.total_amount || 0,

        status: item.status,

        createdAt: item.created_at,

        bookingId: item.booking_id || null, // 🔥 IMPORTANT
    };
}
