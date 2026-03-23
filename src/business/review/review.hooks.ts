// src/business/review/review.hooks.ts

import { useEffect, useState } from "react";
import { reviewStore } from "./review.store";

export function useHasReviewed(
    entityType: "product" | "service",
    entityId: string,
) {
    const [hasReviewed, setHasReviewed] = useState(false);

    useEffect(() => {
        const update = () => {
            setHasReviewed(reviewStore.hasReviewed(entityType, entityId));
        };

        update();

        const unsub = reviewStore.subscribe(update);

        return unsub;
    }, [entityType, entityId]);

    return hasReviewed;
}
