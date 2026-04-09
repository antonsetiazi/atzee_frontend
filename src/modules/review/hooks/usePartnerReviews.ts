// src/modules/review/hooks/usePartnerReviews.ts

import { useEffect, useState } from "react";
import { reviewApi } from "../api/reviewApi";
import type { Review } from "../types/review.types";

export function usePartnerReviews(partnerId: number) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        reviewApi
            .getPartnerReviews(partnerId)
            .then(setReviews)
            .finally(() => setLoading(false));
    }, [partnerId]);

    return { reviews, loading };
}
