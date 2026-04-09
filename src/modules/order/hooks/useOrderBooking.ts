// src/modules/order/hooks/useOrderBooking.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { bookingApi } from "@/modules/booking/api/booking.api";

export function useOrderBooking(order: any) {
    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                if (!order?.bookingId) return;

                const res = await bookingApi.getDetail(order.bookingId);
                setBooking(res);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [order]);

    return { booking, loading };
}
