// src/core/event/event.types.ts
import type { Review } from "@/business/review/review.types";

export type EventMap = {
    // CART
    "cart.item.added": {
        productId: string;
        quantity: number;
    };

    // ORDER
    "order.created": {
        orderId: string;
        total: number;
        itemsCount: number;
    };

    "order.failed": {
        reason: string;
    };

    "order.completed": {
        orderId: string;
    };

    // CHECKOUT
    "checkout.payment.started": {
        methodId: string;
    };

    "checkout.initialized": {
        source: "cart" | "booking";
        itemsCount: number;
    };

    // BOOKING
    "booking.created": {
        bookingId: string;
        schedule: string;
    };

    "booking.canceled": {
        bookingId: string;
    };

    // REVIEW
    "review.created": Review;

    "withdrawal.created": {
        amount: number;
    };

    "withdrawal.failed": {
        message: string;
    };

    "withdrawal.processing": {
        id: string;
    };

    "withdrawal.completed": {
        id: string;
        amount: number;
    };

    // WALLET
    "wallet.topup.success": {
        amount: number;
    };

    "wallet.topup.pending": {
        amount: number;
    };

    "wallet.topup.failed": {
        message?: string;
    };
};
