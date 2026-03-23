// src/business/review/review.types.ts

export interface Review {
    id: string;

    entityType: "product" | "service";
    entityId: string;

    userId: string;

    userName: string;
    userAvatar?: string;

    rating: number;
    comment: string;

    isVerified?: boolean;

    createdAt: string;
}

export interface CreateReviewInput {
    entityType: "product" | "service";
    entityId: string;

    rating: number;
    comment: string;

    userId: string;

    userName: string;
    userAvatar?: string;
}
