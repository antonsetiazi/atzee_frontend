// src/business/order/order.service.ts

import { orderStore } from "./order.store";
import { checkoutStore } from "@/business/checkout/checkout.store";
import { eventBus } from "@/core/event/event.bus";
import type { Order } from "./order.types";

export function registerOrderListeners() {
    // 🔥 ketika order berhasil dibuat (dari checkout)
    eventBus.on("order.created", ({ orderId, total }) => {
        const checkout = checkoutStore.getState();

        const order: Order = {
            id: orderId,
            items: checkout.items,
            total,
            paymentMethod: checkout.selectedPaymentMethodId!,
            status: "paid",
            createdAt: new Date().toISOString(),
        };

        orderStore.addOrder(order);

        // 🔥 lanjutkan lifecycle
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
