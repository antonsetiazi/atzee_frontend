// src/modules/review/hooks/useHasReviewed.ts

import { useHasReviewed as useCore } from "@/business/review/review.hooks";

export function useHasReviewed(
    entityType: "product" | "service",
    entityId: string,
) {
    return useCore(entityType, entityId);
}
