// src/modules/partner_order/partner_order.api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpGet, httpPost } from "@/core/http/http.client";
import type { Order } from "@/business/order/order.types";

/* =========================
   📦 GET LIST
========================= */
export async function getPartnerOrdersApi(): Promise<Order[]> {
    const res = await httpGet<any[]>("/marketplace/partner/orders/");
    return res.map(mapOrder);
}

/* =========================
   📦 GET DETAIL
========================= */
export async function getPartnerOrderDetailApi(id: string): Promise<Order> {
    const item = await httpGet<any>(`/marketplace/partner/orders/${id}/`);
    return mapOrder(item);
}

/* =========================
   ⚡ ACTIONS
========================= */
export async function acceptOrderApi(orderId: string) {
    return httpPost(`/marketplace/orders/${orderId}/accept/`, {});
}

export async function rejectOrderApi(orderId: string) {
    return httpPost(`/marketplace/orders/${orderId}/reject/`, {});
}

export async function startOrderApi(orderId: string) {
    return httpPost(`/marketplace/orders/${orderId}/start/`, {});
}

/* =========================
   🔁 SHARED MAPPER (reuse)
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
        createdAt: item.created_at,
        bookingId: item.booking_id || null,

        customer: item.customer
            ? {
                  id: String(item.customer.id),
                  name: item.customer.name,
                  phone: item.customer.phone,
              }
            : null,

        address: item.address || null,
        fulfillment_type: item.fulfillment_type,

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
