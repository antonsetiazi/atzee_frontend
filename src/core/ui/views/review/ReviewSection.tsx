// src/core/ui/views/review/ReviewSection.tsx

import { useMemo } from "react";
import ReviewSummary from "./ReviewSummary";
import ReviewList from "./ReviewList";
import ReviewActionSection from "./ReviewActionSection";
import { useReviews } from "@/business/review/hooks/useReviews";

interface Props {
    entityType: "product" | "service";
    entityId: string;
    canReview?: boolean;
}

export default function ReviewSection({
    entityType,
    entityId,
    canReview = true,
}: Props) {
    const reviews = useReviews(entityType, entityId);

    const summary = useMemo(() => {
        const total = reviews.length;

        const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let totalRating = 0;

        reviews.forEach((r) => {
            breakdown[r.rating as 1 | 2 | 3 | 4 | 5]++;
            totalRating += r.rating;
        });

        return {
            averageRating: total === 0 ? 0 : totalRating / total,
            totalReviews: total,
            breakdown,
        };
    }, [reviews]);

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
            <h2
                className="text-xl font-semibold"
                style={{ color: "var(--text-primary)" }}
            >
                Ulasan Pengguna
            </h2>

            <ReviewSummary summary={summary} />

            {/* ✅ Action (Form) */}
            <ReviewActionSection
                canReview={canReview}
                entityType={entityType}
                entityId={entityId}
            />

            {/* ✅ List */}
            <ReviewList reviews={reviews} />
        </div>
    );
}
