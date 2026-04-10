// src/modules/review/hooks/useBookingReview.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from "react";
import { reviewApi } from "../api/reviewApi";

export function useBookingReview(bookingId: number) {
    const [review, setReview] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const fetchReview = useCallback(async () => {
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
    }, [bookingId]);

    useEffect(() => {
        fetchReview();
    }, [fetchReview]);

    return {
        review,
        loading,
        refetch: fetchReview,
    };
}
