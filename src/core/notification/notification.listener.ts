// src/core/notification/notification.listener.ts

import { eventBus } from "@/core/event/event.bus";
import { notificationService } from "./notification.service";

export function registerNotificationListeners() {
    // 🛒 Cart
    eventBus.on("cart.item.added", ({ quantity }) => {
        notificationService.success(
            `${quantity} item berhasil ditambahkan ke cart`,
        );
    });

    // 💳 Checkout
    eventBus.on("checkout.payment.started", () => {
        notificationService.info("Memproses pembayaran...");
    });

    // 📦 Order success
    eventBus.on("order.created", ({ total }) => {
        notificationService.success(
            `Order berhasil dibuat (Total: Rp ${total})`,
        );
    });

    // ❌ Order failed
    eventBus.on("order.failed", ({ reason }) => {
        notificationService.error(`Order gagal: ${reason}`);
    });

    eventBus.on("order.completed", () => {
        notificationService.success("Order selesai 🎉");
    });

    // 📅 Booking
    eventBus.on("booking.created", () => {
        notificationService.success("Booking berhasil dibuat");
    });

    // ⭐ Review
    eventBus.on("review.created", ({ rating }) => {
        notificationService.success(`Review berhasil dikirim (⭐ ${rating})`);
    });
}
