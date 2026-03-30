// src/business/checkout/checkout.service.ts

import { checkoutStore } from "./checkout.store";
import type { CheckoutItem } from "./checkout.types";

import { cartStore } from "@/business/cart/cart.store";
import { eventBus } from "@/core/event/event.bus";
import { createOrderApi } from "@/business/order/order.api";

type BookingResult = {
    booking_id: string; // 🔥 dari backend
    expires_at?: string; // optional (UX)

    serviceId: string;
    date: string;

    offerings: {
        id: number;
        name: string;
        price: number;
        duration: number;
    }[];
};

export const checkoutService = {
    /* ===========================
       🛒 INIT FROM CART (PRODUCT)
       =========================== */
    initFromCart() {
        const cartItems = cartStore.getItems();

        const items: CheckoutItem[] = cartItems.map((item) => ({
            id: item.id,
            entityId: item.listingId, // 🔥 FIX
            entityType: "product",
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            meta: {
                type: "product",
            },
        }));

        checkoutStore.setState({
            items,
            bookingId: null,
            paymentStatus: "idle",
            selectedPaymentMethodId: null,
        });

        // 🔥 optional event
        eventBus.emit("checkout.initialized", {
            source: "cart",
            itemsCount: items.length,
        });
    },

    /* ===========================
       📅 INIT FROM BOOKING (SERVICE)
       =========================== */
    initFromBooking(booking: BookingResult) {
        const items: CheckoutItem[] = booking.offerings.map((off) => ({
            id: `service-${off.id}`,
            entityId: String(off.id),
            entityType: "service",

            name: off.name,
            price: off.price,
            quantity: 1,

            meta: {
                type: "service",
                date: booking.date,
                duration: off.duration,
            },
        }));

        checkoutStore.setState({
            items,
            bookingId: booking.booking_id,
            paymentStatus: "idle",
            selectedPaymentMethodId: null,
        });

        // 🔥 optional event
        eventBus.emit("checkout.initialized", {
            source: "booking",
            itemsCount: items.length,
        });
    },

    /* ===========================
       💳 SELECT PAYMENT
       =========================== */
    selectPaymentMethod(id: string) {
        checkoutStore.setState({
            selectedPaymentMethodId: id,
        });
    },

    /* ===========================
       🚀 CONFIRM PAYMENT
       =========================== */
    async confirmPayment() {
        const state = checkoutStore.getState();

        /* ---------- VALIDATION ---------- */

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

        /* ---------- SET PENDING ---------- */

        checkoutStore.setState({
            paymentStatus: "pending",
        });

        eventBus.emit("checkout.payment.started", {
            methodId: state.selectedPaymentMethodId,
        });

        try {
            /* ---------- BUILD PAYLOAD ---------- */
            const payload = {
                items: state.items.map((i) => ({
                    id: Number(i.entityId),
                    qty: i.quantity,
                })),
                payment_method: state.selectedPaymentMethodId,
                booking_id: state.bookingId,
            };

            /* ---------- API CALL ---------- */
            const order = await createOrderApi(payload);

            /* ---------- SUCCESS ---------- */
            checkoutStore.setState({
                paymentStatus: "paid",
            });

            // 🔥 tetap emit untuk ecosystem lain (chat, dll)
            eventBus.emit("order.created", {
                orderId: String(order.id),
                total: order.total,
                itemsCount: order.items?.length || state.items.length,
            });
        } catch (err) {
            console.error(err);

            checkoutStore.setState({
                paymentStatus: "failed",
            });

            eventBus.emit("order.failed", {
                reason: "API error",
            });
        }
    },

    /* ===========================
       🔄 RESET
       =========================== */
    reset() {
        checkoutStore.setState({
            items: [],
            bookingId: null,
            paymentStatus: "idle",
            selectedPaymentMethodId: null,
        });
    },
};
