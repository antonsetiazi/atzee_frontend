// src/business/review/review.seed.ts

import { reviewStore } from "./review.store";

export function seedReviews() {
    reviewStore.add({
        id: "r1",
        entityType: "product",
        entityId: "1",
        userName: "Ahmad Fauzi",
        rating: 5,
        comment: "Produk sangat bagus",
        isVerified: true,
        createdAt: new Date().toISOString(),
    });
}
