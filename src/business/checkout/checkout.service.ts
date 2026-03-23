// src/business/checkout/checkout.service.ts

import { checkoutStore } from "./checkout.store";
import type { CheckoutItem } from "./checkout.types";

import { cartStore } from "@/business/cart/cart.store";
import { bookingStore } from "@/business/booking/booking.store";
import { eventBus } from "@/core/event/event.bus";

export const checkoutService = {
    // 🛒 dari cart
    initFromCart() {
        const cartItems = cartStore.getItems();

        const items: CheckoutItem[] = cartItems.map((item) => ({
            id: item.id,
            entityId: item.productId, // 🔥 FIX
            entityType: "product",
            name: item.name,
            price: item.price,
            quantity: item.quantity,
        }));

        checkoutStore.setState({
            items,
            paymentStatus: "idle",
            selectedPaymentMethodId: null,
        });

        // 🔥 optional event
        eventBus.emit("checkout.initialized", {
            source: "cart",
            itemsCount: items.length,
        });
    },

    // 📅 dari booking
    initFromBooking() {
        const booking = bookingStore.getState();

        if (!booking.selectedDate || !booking.selectedSlotId) {
            throw new Error("Booking belum lengkap");
        }

        const slot = booking.slots.find((s) => s.id === booking.selectedSlotId);

        if (!slot) {
            throw new Error("Slot tidak ditemukan");
        }

        const items: CheckoutItem[] = [
            {
                id: "booking",
                entityId: booking.serviceId || "service-1", // 🔥 WAJIB (sesuaikan!)
                entityType: "service",
                name: "Service Booking",
                price: 50000, // nanti dari backend/service
                quantity: 1,

                meta: {
                    date: booking.selectedDate,
                    slotLabel: slot.label,
                },
            },
        ];

        checkoutStore.setState({
            items,
            paymentStatus: "idle",
            selectedPaymentMethodId: null,
        });

        // 🔥 optional event
        eventBus.emit("checkout.initialized", {
            source: "booking",
            itemsCount: items.length,
        });
    },

    selectPaymentMethod(id: string) {
        checkoutStore.setState({
            selectedPaymentMethodId: id,
        });
    },

    confirmPayment() {
        const state = checkoutStore.getState();

        if (!state.items.length) {
            eventBus.emit("order.failed", {
                reason: "Tidak ada item",
            });
            throw new Error("Tidak ada item");
        }

        if (!state.selectedPaymentMethodId) {
            eventBus.emit("order.failed", {
                reason: "Pilih metode pembayaran",
            });
            throw new Error("Pilih metode pembayaran");
        }

        // 🔥 set pending dulu
        checkoutStore.setState({
            paymentStatus: "pending",
        });

        eventBus.emit("checkout.payment.started", {
            methodId: state.selectedPaymentMethodId,
        });

        // simulasi API payment
        setTimeout(() => {
            const success = Math.random() > 0.2;

            if (success) {
                checkoutStore.setState({
                    paymentStatus: "paid",
                });

                // 🔥 SUCCESS → ORDER CREATED
                eventBus.emit("order.created", {
                    orderId: generateOrderId(),
                    total: calculateTotal(state.items),
                    itemsCount: state.items.length,
                });
            } else {
                checkoutStore.setState({
                    paymentStatus: "failed",
                });

                // 🔥 FAILED
                eventBus.emit("order.failed", {
                    reason: "Pembayaran gagal",
                });
            }
        }, 1500);
    },

    reset() {
        checkoutStore.setState({
            items: [],
            paymentStatus: "idle",
            selectedPaymentMethodId: null,
        });
    },
};

// helper
function generateOrderId() {
    return "ORD-" + Math.floor(Math.random() * 10000);
}

function calculateTotal(items: CheckoutItem[]) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
