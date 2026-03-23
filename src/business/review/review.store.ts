// src/business/review/review.store.ts

import { loadFromStorage, saveToStorage } from "@/core/storage/localStorage";
import type { Review } from "./review.types";

type Listener = (reviews: Review[]) => void;

class ReviewStore {
    private reviews: Review[] = loadFromStorage<Review[]>("reviews", []);
    private listeners: Listener[] = [];

    getAll() {
        return this.reviews;
    }

    getByEntity(entityType: string, entityId: string) {
        return this.reviews.filter(
            (r) => r.entityType === entityType && r.entityId === entityId,
        );
    }

    getByEntityAndUser(entityType: string, entityId: string, userId: string) {
        return this.reviews.find(
            (r) =>
                r.entityType === entityType &&
                r.entityId === entityId &&
                r.userId === userId,
        );
    }

    // ========================
    // RULES
    // ========================

    hasReviewed(entityType: string, entityId: string) {
        return this.reviews.some(
            (r) => r.entityType === entityType && r.entityId === entityId,
        );
    }

    hasReviewedByUser(entityType: string, entityId: string, userId: string) {
        return this.reviews.some(
            (r) =>
                r.entityType === entityType &&
                r.entityId === entityId &&
                r.userId === userId,
        );
    }

    // ========================
    // MUTATION
    // ========================
    add(review: Review) {
        const alreadyExists = this.getByEntityAndUser(
            review.entityType,
            review.entityId,
            review.userId,
        );

        if (alreadyExists) {
            console.warn("User already reviewed this entity");
            return;
        }

        this.reviews.push(review);
        this.emit();
    }

    // ========================
    // SUBSCRIBE
    // ========================
    subscribe(listener: Listener) {
        this.listeners.push(listener);

        // ✅ return unsubscribe
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    // ========================
    // INTERNAL
    // ========================
    private emit() {
        saveToStorage("reviews", this.reviews);

        this.listeners.forEach((l) => l(this.reviews));
    }
}

export const reviewStore = new ReviewStore();
