// src/business/order/order.service.ts

import { orderStore } from "./order.store";
import { eventBus } from "@/core/event/event.bus";
import { chatStore } from "@/business/chat/chat.store";

export function registerOrderListeners() {
    // 🔥 ketika order berhasil dibuat (dari checkout)
    eventBus.on("order.created", (data) => {
        const { orderId, total, itemsCount } = data;

        const orderIdStr = String(orderId);

        orderStore.addOrder({
            id: orderIdStr,
            order_number: orderIdStr.slice(0, 8),

            items: [], // 🔥 biarkan kosong (akan sync dari API)

            total: total,
            status: "pending",
            createdAt: new Date().toISOString(),
        });

        // ====================================
        // 🔥 CHAT INTEGRATION START
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

        // 🔥 system message pertama
        chatStore.addSystemMessage(
            roomId,
            `Pesanan berhasil dibuat (${itemsCount} item)`,
        );
    });

    // 🔥 gagal (opsional logging)
    eventBus.on("order.failed", ({ reason }) => {
        console.warn("Order gagal:", reason);
    });
}
