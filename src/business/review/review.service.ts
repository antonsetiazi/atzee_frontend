// src/business/review/review.service.ts

import { eventBus } from "@/core/event/event.bus";
import { REVIEW_CREATED } from "./review.events";
import { reviewStore } from "./review.store";
import type { CreateReviewInput, Review } from "./review.types";

function generateId() {
    return "r_" + Math.random().toString(36).slice(2, 9);
}

class ReviewService {
    create(input: CreateReviewInput) {
        // ✅ enforce rule di business layer
        const alreadyReviewed = reviewStore.hasReviewedByUser(
            input.entityType,
            input.entityId,
            input.userId,
        );

        if (alreadyReviewed) {
            console.warn("User already reviewed this entity");
            return null;
        }

        const review: Review = {
            id: generateId(),

            entityType: input.entityType,
            entityId: input.entityId,

            userId: input.userId,
            userName: input.userName,
            userAvatar: input.userAvatar,

            rating: input.rating,
            comment: input.comment,

            isVerified: true,
            createdAt: new Date().toISOString(),
        };

        reviewStore.add(review);

        eventBus.emit(REVIEW_CREATED, review);
    }

    getByEntity(entityType: string, entityId: string) {
        return reviewStore.getByEntity(entityType, entityId);
    }
}

export const reviewService = new ReviewService();
