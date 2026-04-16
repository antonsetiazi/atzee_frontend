// src/modules/notification/services/notification.listener.ts

import { eventBus } from "@/core/event/event.bus";
import { notificationService } from "./notification.service";

export function registerNotificationListeners() {
    // 🛒 Cart
    eventBus.on("cart.item.added", ({ quantity }) => {
        notificationService.toast.success(
            `${quantity} item berhasil ditambahkan ke cart`,
        );

        notificationService.inbox.add({
            title: "Cart Updated",
            message: `${quantity} item ditambahkan ke cart`,
            type: "success",
            event: "cart_item_added",
            payload: { quantity },
        });
    });

    // 💳 Checkout
    eventBus.on("checkout.payment.started", () => {
        notificationService.toast.info("Memproses pembayaran...");

        notificationService.inbox.add({
            title: "Payment Started",
            message: "Pembayaran sedang diproses",
            type: "info",
            event: "checkout_payment_started",
        });
    });

    // 📦 Order success
    eventBus.on("order.created", ({ orderId, total }) => {
        notificationService.toast.success(
            `Order berhasil dibuat (Total: Rp ${total})`,
        );

        notificationService.inbox.add({
            title: "Order Created",
            message: `Total pembayaran Rp ${total}`,
            type: "success",
            event: "order_created",
            entity_type: "order",
            entity_id: orderId,
            payload: { total },
        });
    });

    // ❌ Order failed
    eventBus.on("order.failed", ({ reason }) => {
        notificationService.toast.error(`Order gagal: ${reason}`);

        notificationService.inbox.add({
            title: "Order Failed",
            message: reason,
            type: "error",
            event: "order_failed",
        });
    });

    // ✅ Order completed
    eventBus.on("order.completed", ({ orderId }) => {
        notificationService.toast.success("Order selesai 🎉");

        notificationService.inbox.add({
            title: "Order Completed",
            message: "Pesanan telah selesai",
            type: "success",
            event: "order_completed",
            entity_type: "order",
            entity_id: orderId,
        });
    });

    // 📅 Booking
    eventBus.on("booking.created", ({ bookingId }) => {
        notificationService.toast.success("Booking berhasil dibuat");

        notificationService.inbox.add({
            title: "Booking Created",
            message: "Booking berhasil dibuat",
            type: "success",
            event: "booking_created",
            entity_type: "booking",
            entity_id: bookingId,
        });
    });

    // ⭐ Review
    eventBus.on("review.created", ({ rating, id }) => {
        notificationService.toast.success(
            `Review berhasil dikirim (⭐ ${rating})`,
        );

        notificationService.inbox.add({
            title: "Review Submitted",
            message: `Rating diberikan: ⭐ ${rating}`,
            type: "success",
            event: "review_created",
            entity_type: "review",
            entity_id: id,
            payload: { rating },
        });
    });

    eventBus.on("withdrawal.created", ({ amount }) => {
        notificationService.toast.success(
            `Penarikan berhasil diajukan (${amount.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            })})`,
        );

        notificationService.inbox.add({
            title: "Withdrawal Requested",
            message: `Penarikan dana sebesar ${amount.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            })} sedang diproses`,
            type: "info",
            event: "withdrawal_created",
            entity_type: "wallet_withdrawal",
            payload: { amount },
        });
    });

    eventBus.on("withdrawal.failed", ({ message }) => {
        notificationService.toast.error(message || "Gagal melakukan penarikan");

        notificationService.inbox.add({
            title: "Withdrawal Failed",
            message: message || "Terjadi kesalahan saat penarikan",
            type: "error",
            event: "withdrawal_failed",
        });
    });

    eventBus.on("withdrawal.processing", ({ id }) => {
        notificationService.toast.info("Penarikan sedang diproses");

        notificationService.inbox.add({
            title: "Withdrawal Processing",
            message: "Penarikan sedang diproses",
            type: "info",
            event: "withdrawal_processing",
            entity_type: "wallet_withdrawal",
            entity_id: id,
        });
    });

    eventBus.on("withdrawal.completed", ({ id, amount }) => {
        notificationService.toast.success(
            `Penarikan berhasil (${amount.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            })})`,
        );

        notificationService.inbox.add({
            title: "Withdrawal Completed",
            message: "Dana telah berhasil ditransfer",
            type: "success",
            event: "withdrawal_completed",
            entity_type: "wallet_withdrawal",
            entity_id: id,
            payload: { amount },
        });
    });

    // 💰 Wallet Topup
    eventBus.on("wallet.topup.success", ({ amount }) => {
        notificationService.toast.success(
            `Topup berhasil (${amount.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            })})`,
        );

        notificationService.inbox.add({
            title: "Topup Berhasil",
            message: `Saldo bertambah sebesar ${amount.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            })}`,
            type: "success",
            event: "wallet_topup_success",
            entity_type: "wallet",
            payload: { amount },
        });
    });

    eventBus.on("wallet.topup.pending", ({ amount }) => {
        notificationService.toast.info("Menunggu pembayaran");

        notificationService.inbox.add({
            title: "Topup Diproses",
            message: `Topup sebesar ${amount.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            })} sedang menunggu pembayaran`,
            type: "info",
            event: "wallet_topup_pending",
            entity_type: "wallet",
            payload: { amount },
        });
    });

    eventBus.on("wallet.topup.failed", ({ message }) => {
        notificationService.toast.error(message || "Topup gagal");

        notificationService.inbox.add({
            title: "Topup Gagal",
            message: message || "Terjadi kesalahan saat topup",
            type: "error",
            event: "wallet_topup_failed",
        });
    });
}
