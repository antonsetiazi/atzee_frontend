// src/modules/review/hooks/useBookingReview.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { reviewApi } from "../api/reviewApi";

export function useBookingReview(bookingId: number) {
    const [review, setReview] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load() {
            if (!bookingId || Number.isNaN(bookingId)) {
                setReview(null);
                return;
            }

            try {
                setLoading(true);
                const res = await reviewApi.getBookingReview(bookingId);
                setReview(res);
            } catch (err) {
                console.error(err);
                setReview(null);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [bookingId]);

    return {
        review,
        loading,
        refresh: async () => {
            if (!bookingId || Number.isNaN(bookingId)) return;

            const res = await reviewApi.getBookingReview(bookingId);
            setReview(res);
        },
    };
}
