// src/modules/review/api/reviewApi.ts

import { httpGet, httpPost } from "@/core/http/http.client";

import type { Review, CreateReviewPayload } from "../types/review.types";

export const reviewApi = {
    create(payload: CreateReviewPayload): Promise<Review> {
        return httpPost<Review>("/business/reviews/", payload);
    },

    getBookingReview(bookingId: number): Promise<Review | null> {
        return httpGet<Review | null>(
            `/business/reviews/booking/${bookingId}/`,
        );
    },

    getPartnerReviews(partnerId: number): Promise<Review[]> {
        return httpGet<Review[]>(`/business/reviews/partner/${partnerId}/`);
    },
};
