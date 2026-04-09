// src/modules/review/types/review.types.ts

export interface Review {
    id: number;
    booking_id: number;
    rating: number;
    comment: string;
    created_at: string;
    user_name: string;
}

export interface CreateReviewPayload {
    booking_id: number;
    rating: number;
    comment: string;
}
