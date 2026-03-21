// src/core/ui/views/review/review.types.ts

export interface Review {
    id: string;

    entityType: "product" | "service";
    entityId: string;

    userName: string;
    userAvatar?: string;

    rating: number; // 1 - 5
    comment: string;

    isVerified?: boolean;

    createdAt: string;
}

export interface ReviewSummaryData {
    averageRating: number;
    totalReviews: number;

    breakdown: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}
