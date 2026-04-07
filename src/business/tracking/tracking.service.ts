// src/business/tracking/tracking.service.ts

import { fetchOrderTracking } from "./tracking.api";

export const trackingService = {
    async getOrderTracking(orderId: number) {
        return fetchOrderTracking(orderId);
    },
};
