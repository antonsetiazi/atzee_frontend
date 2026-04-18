// src/modules/notification/services/notification.navigate.ts

import type { Notification } from "../types/notification.types";

export function getNotificationUrl(item: Notification): string | null {
    // console.log(item);
    // Prioritas explicit payload url
    if (item.payload?.url) {
        return item.payload.url;
    }

    // Entity based routing
    if (item.entity_type && item.entity_id) {
        switch (item.entity_type) {
            case "order":
                switch (item.event) {
                    /**
                     * PARTNER SIDE
                     */
                    case "order.needs_approval":
                    case "payment.success":
                    case "partner.order.new":
                    case "partner.order.assigned":
                    case "partner.order.updated":
                        return `/partner/orders/${item.entity_id}`;

                    /**
                     * CUSTOMER SIDE
                     */
                    default:
                        return `/orders/${item.entity_id}`;
                }

            case "booking":
                return `/bookings/${item.entity_id}`;

            case "wallet":
                return `/wallet`;

            case "partner":
                return `/partners/${item.entity_id}`;
        }
    }

    // Event fallback
    switch (item.event) {
        case "promo_created":
            return "/promotions";

        case "wallet_updated":
            return "/wallet";
    }

    return null;
}
