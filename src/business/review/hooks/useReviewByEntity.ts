// src/business/review/hooks/useReviewByEntity.ts

import { useEffect, useState } from "react";
import { reviewStore } from "../review.store";
import type { Review } from "../review.types";

export function useReviewByEntity(
    entityType: string,
    entityId: string,
    userId: string,
) {
    const [review, setReview] = useState<Review | null>(null);

    useEffect(() => {
        const update = () => {
            const r = reviewStore.getByEntityAndUser(
                entityType,
                entityId,
                userId,
            );
            setReview(r || null);
        };

        update();

        const unsub = reviewStore.subscribe(update);
        return () => unsub();
    }, [entityType, entityId, userId]);

    return review;
}
