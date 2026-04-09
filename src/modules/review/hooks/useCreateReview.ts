// src/modules/review/hooks/useCreateReview.ts

import { useState } from "react";
import { reviewApi } from "../api/reviewApi";
import type { CreateReviewPayload } from "../types/review.types";

export function useCreateReview() {
    const [loading, setLoading] = useState(false);

    async function submit(payload: CreateReviewPayload) {
        setLoading(true);
        try {
            return await reviewApi.create(payload);
        } finally {
            setLoading(false);
        }
    }

    return { submit, loading };
}
