// src/business/order/order.service.ts

import { orderStore } from "./order.store";
import { checkoutStore } from "@/business/checkout/checkout.store";
import type { Order } from "./order.types";

export const orderService = {
    createFromCheckout() {
        const checkout = checkoutStore.getState();

        if (checkout.paymentStatus !== "paid") {
            throw new Error("Payment belum selesai");
        }

        const total = checkout.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
        );

        const order: Order = {
            id: crypto.randomUUID(),
            items: checkout.items,
            total,
            paymentMethod: checkout.selectedPaymentMethodId!,
            status: "paid",
            createdAt: new Date().toISOString(),
        };

        orderStore.addOrder(order);

        return order;
    },
};
