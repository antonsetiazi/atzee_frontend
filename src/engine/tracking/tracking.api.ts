// src/engine/tracking/tracking.api.ts

import { httpGet } from "@/core/http/http.client";
import type { OrderTrackingData } from "./tracking.types";

export function fetchOrderTracking(orderId: number) {
    return httpGet<OrderTrackingData>(`/tracking/order/${orderId}/`);
}
