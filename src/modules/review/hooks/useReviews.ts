// src/modules/review/hooks/useReviews.ts

import { useEffect, useState } from "react";
import { reviewStore } from "@/business/review/review.store";
import type { Review } from "@/business/review/review.types";

export function useReviews(entityType: string, entityId: string) {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const update = () => {
            setReviews(reviewStore.getByEntity(entityType, entityId));
        };

        update();
        reviewStore.subscribe(update);
    }, [entityType, entityId]);

    return reviews;
}
