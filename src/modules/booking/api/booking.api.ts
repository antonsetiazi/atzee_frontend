// src/modules/booking/api/booking.api.ts

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

export interface BookingItem {
    id: string;
    resource_id: string;

    start_time: string;
    end_time: string;

    status: string;
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

    getMyBookings() {
        return httpGet<BookingItem[]>("/business/booking/my");
    },

    getDetail(id: string) {
        return httpGet<BookingItem>(`/business/booking/${id}`);
    },
};
