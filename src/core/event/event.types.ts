// src/core/event/event.types.ts
import type { Review } from "@/business/review/review.types";
import type {
    AuthLoggedInPayload,
    AuthLoggedOutPayload,
} from "@/app/auth/auth.events";

export type EventMap = {
    // AUTH
    "auth.logged_in": AuthLoggedInPayload;
    "auth.logged_out": AuthLoggedOutPayload;

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

    // REVIEW
    "review.created": Review;
};
