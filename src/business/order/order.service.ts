// src/business/order/order.service.ts

import { orderStore } from "./order.store";
import { checkoutStore } from "@/business/checkout/checkout.store";
import { eventBus } from "@/core/event/event.bus";
import type { Order } from "./order.types";
import { chatStore } from "@/business/chat/chat.store";

export function registerOrderListeners() {
    // 🔥 ketika order berhasil dibuat (dari checkout)
    eventBus.on("order.created", ({ orderId, total, itemsCount }) => {
        const checkout = checkoutStore.getState();

        const order: Order = {
            id: orderId,
            userId: "user_1",
            userName: "User Demo",
            items: checkout.items,
            total,
            paymentMethod: checkout.selectedPaymentMethodId!,
            status: "paid",
            createdAt: new Date().toISOString(),
        };

        orderStore.addOrder(order);

        // ====================================
        // 🔥 CHAT INTEGRATION START
        // ====================================

        const roomId = `room_order_${orderId}`;

        chatStore.createRoom({
            id: roomId,
            type: "transactional",
            participants: ["user_1", "ustadz_1"],

            context_type: "order",
            context_id: orderId,

            last_message: "Order dibuat",
            last_timestamp: new Date().toISOString(),
        });

        // 🔥 system message pertama
        chatStore.addSystemMessage(
            roomId,
            `Pesanan berhasil dibuat (${itemsCount} item)`,
        );

        // ====================================
        // 🔥 CHAT INTEGRATION END
        // 🔥 lanjutkan lifecycle
        // ====================================
        simulateOrderLifecycle(order.id);
    });

    // 🔥 gagal (opsional logging)
    eventBus.on("order.failed", ({ reason }) => {
        console.warn("Order gagal:", reason);
    });
}

// 🔥 simulasi lifecycle
function simulateOrderLifecycle(orderId: string) {
    // pending → paid sudah lewat

    // paid → completed
    setTimeout(() => {
        orderStore.updateStatus(orderId, "completed");

        eventBus.emit("order.completed", { orderId });
    }, 3000);
}
