// src/business/order/order.api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpGet, httpPost } from "@/core/http/http.client";
import type { Order } from "./order.types";

export async function previewOrderApi(payload: any) {
    return httpPost("/marketplace/orders/preview/", payload);
}

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

export async function completeOrderApi(orderId: string) {
    return httpPost(`/marketplace/orders/${orderId}/complete/`, {});
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
        payment_status: item.payment_status,
        paymentMethod: item.payment_method || "-",
        createdAt: item.created_at,
        bookingId: item.bookingId || null, // 🔥 IMPORTANT

        // 🔥 WAJIB TAMBAH INI
        partner: item.partner
            ? {
                  id: item.partner.id,
                  name: item.partner.name,
                  phone: item.partner.phone,
              }
            : null,

        selectedPartner: item.selected_partner
            ? {
                  id: item.selected_partner.id,
                  name: item.selected_partner.name,
              }
            : null,
    };
}
