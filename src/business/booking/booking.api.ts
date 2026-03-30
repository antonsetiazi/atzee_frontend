// src/business/booking/booking.api.ts

import { httpPost, httpGet } from "@/core/http/http.client";

export interface HoldBookingPayload {
    resource_type: string;
    resource_id: string;
    start_time: string;
    end_time: string;
}

export interface HoldBookingResponse {
    booking_id: string;
    status: string;
    expires_at: string;
}

export interface AvailabilitySlot {
    start_time: string;
    end_time: string;
    is_available: boolean;
}

export const bookingApi = {
    hold(payload: HoldBookingPayload) {
        return httpPost<HoldBookingResponse>("/business/booking/hold", payload);
    },

    getAvailability(params: {
        resource_type: string;
        resource_id: string;
        date: string; // YYYY-MM-DD
        duration: number;
    }) {
        return httpGet<AvailabilitySlot[]>("/business/booking/availability", {
            query: params, // ✅ FIX DI SINI
        });
    },
};
