// src/business/checkout/checkout.service.ts

import { checkoutStore } from "./checkout.store";
import type { CheckoutItem } from "./checkout.types";

import { cartStore } from "@/business/cart/cart.store";
import { bookingStore } from "@/business/booking/booking.store";

export const checkoutService = {
    // 🛒 dari cart
    initFromCart() {
        const cartItems = cartStore.getItems();

        const items: CheckoutItem[] = cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            type: "product",
        }));

        checkoutStore.setState({
            items,
            paymentStatus: "idle",
            selectedPaymentMethodId: null,
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
                name: "Service Booking",
                price: 50000, // nanti dari backend/service
                quantity: 1,
                type: "service",
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
    },

    selectPaymentMethod(id: string) {
        checkoutStore.setState({
            selectedPaymentMethodId: id,
        });
    },

    confirmPayment() {
        const state = checkoutStore.getState();

        if (!state.items.length) {
            throw new Error("Tidak ada item");
        }

        if (!state.selectedPaymentMethodId) {
            throw new Error("Pilih metode pembayaran");
        }

        // 🔥 set pending dulu
        checkoutStore.setState({
            paymentStatus: "pending",
        });

        // simulasi API payment
        setTimeout(() => {
            const success = Math.random() > 0.2;

            checkoutStore.setState({
                paymentStatus: success ? "paid" : "failed",
            });
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
