// src/modules/review/components/ReviewSummary.tsx

import { StarRating } from "@/core/ui/components";
import type { ReviewSummaryData } from "../types/review.types";

interface Props {
    summary: ReviewSummaryData;
}

export default function ReviewSummary({ summary }: Props) {
    const { averageRating, totalReviews, breakdown } = summary;

    return (
        <div
            className="p-6 rounded-[var(--radius)] shadow-[var(--shadow)]"
            style={{ background: "var(--color-surface)" }}
        >
            <div className="flex flex-col md:flex-row gap-6">
                {/* Left */}
                <div className="flex flex-col items-center justify-center">
                    <div
                        className="text-4xl font-bold"
                        style={{ color: "var(--text-primary)" }}
                    >
                        {averageRating.toFixed(1)}
                    </div>

                    <div
                        className="text-xl"
                        style={{ color: "var(--color-warning)" }}
                    >
                        <StarRating value={averageRating} size={20} showValue />
                    </div>

                    <div
                        className="text-sm mt-1"
                        style={{ color: "var(--text-muted)" }}
                    >
                        {totalReviews} reviews
                    </div>
                </div>

                {/* Right */}
                <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = breakdown[star as 1 | 2 | 3 | 4 | 5];
                        const percent =
                            totalReviews === 0
                                ? 0
                                : (count / totalReviews) * 100;

                        return (
                            <div key={star} className="flex items-center gap-3">
                                <div className="w-12 text-sm">{star}★</div>

                                <div
                                    className="flex-1 h-2 rounded"
                                    style={{
                                        background: "var(--color-surface-alt)",
                                    }}
                                >
                                    <div
                                        className="h-2 rounded"
                                        style={{
                                            width: `${percent}%`,
                                            background: "var(--color-warning)",
                                        }}
                                    />
                                </div>

                                <div
                                    className="w-10 text-sm text-right"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    {count}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
