// src/business/checkout/checkout.service.ts

import { checkoutStore } from "./checkout.store";
import type { CheckoutItem } from "./checkout.types";

import { cartStore } from "@/business/cart/cart.store";
import { eventBus } from "@/core/event/event.bus";
import { orderService } from "@/business/order/order.service";
import { paymentService } from "../payment/payment.service";
import type { PaymentExecution } from "@/business/payment/payment.types";
import { bookingService } from "@/modules/booking/services/booking.service";

type BookingResult = {
    booking_id: string; // 🔥 dari backend
    expires_at?: string; // optional (UX)

    partner_id: number;
    partner_name: string;

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

            selectedPartnerId: booking.partner_id,
            selectedPartner: {
                id: booking.partner_id,
                name: booking.partner_name,
            },
        });

        // 🔥 optional event
        eventBus.emit("checkout.initialized", {
            source: "booking",
            itemsCount: items.length,
        });
    },

    /* ===========================
       🚀 CONFIRM PAYMENT
       =========================== */
    async confirmPayment(): Promise<PaymentExecution> {
        const state = checkoutStore.getState();

        /* ---------- VALIDATION ---------- */

        if (!state.items.length) {
            eventBus.emit("order.failed", {
                reason: "Tidak ada item",
            });
            throw new Error("Tidak ada item");
        }

        if (!state.selectedPartnerId) {
            throw new Error("Partner belum dipilih");
        }

        /* ---------- SET STATE ---------- */

        checkoutStore.setState({
            paymentStatus: "pending",
        });

        try {
            /* -------------------------
           1. CREATE ORDER
        ------------------------- */
            const order = await orderService.createOrder({
                items: state.items.map((i) => ({
                    id: Number(i.entityId),
                    qty: i.quantity,
                })),
                booking_id: state.bookingId,
                selected_partner_id: state.selectedPartnerId,
                address_id: state.addressId,
            });

            /* -------------------------
           2. CREATE PAYMENT
        ------------------------- */
            const execution = await paymentService.startPaymentExecution({
                order_id: String(order.id),
                payment_method: "",
            });

            return execution;
        } catch (err) {
            checkoutStore.setState({
                paymentStatus: "failed",
            });

            throw err;
        }
    },

    setAddress(addressId: number) {
        checkoutStore.setState({
            addressId,
        });
    },

    async cancelCurrentBooking() {
        const state = checkoutStore.getState();

        if (!state.bookingId) {
            throw new Error("Tidak ada booking aktif");
        }

        await bookingService.cancelBooking(state.bookingId);

        checkoutStore.setState({
            items: [],
            bookingId: null,
            paymentStatus: "idle",
            selectedPartnerId: null,
            selectedPartner: null,
            addressId: null,
            selectedAddress: null,
        });

        eventBus.emit("booking.canceled", {
            bookingId: state.bookingId,
        });
    },

    /* ===========================
       🔄 RESET
       =========================== */
    reset() {
        checkoutStore.setState({
            items: [],
            bookingId: null,
            paymentStatus: "idle",

            selectedPartnerId: null,
            selectedPartner: null,

            addressId: null,
            selectedAddress: null,
        });
    },
};
