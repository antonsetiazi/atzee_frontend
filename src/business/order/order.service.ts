// src/business/order/order.service.ts

import { orderStore } from "./order.store";
import { eventBus } from "@/core/event/event.bus";
import { chatStore } from "@/business/chat/chat.store";

import { createOrderApi } from "./order.api";
import { paymentService } from "@/business/payment/payment.service";

export const orderService = {
    /* ===========================
       🚀 CREATE ORDER
    =========================== */
    async createOrder(payload: {
        items: { id: number; qty: number }[];
        booking_id?: string | null;
        selected_partner_id: number;
        address_id?: number | null;
    }) {
        const order = await createOrderApi(payload);

        eventBus.emit("order.created", {
            orderId: String(order.id),
            total: order.total,
            itemsCount: order.items?.length || payload.items.length,
        });

        return order;
    },

    /* ===========================
       💳 CREATE ORDER + PAYMENT
    =========================== */
    async createOrderWithPayment(payload: {
        items: { id: number; qty: number }[];
        booking_id?: string | null;
        payment_method: string;
        selected_partner_id: number;
        address_id?: number | null;
    }) {
        /* ---------- 1. ORDER ---------- */
        const order = await this.createOrder({
            items: payload.items,
            booking_id: payload.booking_id,
            selected_partner_id: payload.selected_partner_id, // ✅ FIX
            address_id: payload.address_id,
        });

        /* ---------- 2. PAYMENT ---------- */
        const payment = await paymentService.startPayment({
            order_id: String(order.id),
            payment_method: payload.payment_method,
        });

        return {
            order_id: String(order.id),
            payment_url: payment.payment_url,
            payment_token: payment.payment_token,
        };
    },
};

/* =====================================================
   🔁 EVENT LISTENERS (SIDE EFFECTS)
===================================================== */

export function registerOrderListeners() {
    // 🔥 ketika order berhasil dibuat
    eventBus.on("order.created", (data) => {
        const { orderId, total, itemsCount } = data;

        const orderIdStr = String(orderId);

        orderStore.addOrder({
            id: orderIdStr,
            order_number: orderIdStr.slice(0, 8),

            items: [], // akan sync dari API

            total: total,
            status: "pending",
            createdAt: new Date().toISOString(),
        });

        // ====================================
        // 💬 CHAT INTEGRATION
        // ====================================

        const roomId = `room_order_${orderIdStr}`;

        chatStore.createRoom({
            id: roomId,
            type: "transactional",
            participants: ["user_1", "ustadz_1"],

            context_type: "order",
            context_id: orderIdStr,

            last_message: "Order dibuat",
            last_timestamp: new Date().toISOString(),
        });

        chatStore.addSystemMessage(
            roomId,
            `Pesanan berhasil dibuat (${itemsCount} item)`,
        );
    });

    eventBus.on("order.failed", ({ reason }) => {
        console.warn("Order gagal:", reason);
    });
}
