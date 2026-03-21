// src/core/ui/views/review/ReviewList.tsx

import { useState } from "react";
import type { Review } from "./review.types";
import ReviewItem from "./ReviewItem";

interface Props {
    reviews: Review[];
}

export default function ReviewList({ reviews }: Props) {
    const [sort, setSort] = useState<"latest" | "highest" | "lowest">("latest");

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sort === "latest") {
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
        }
        if (sort === "highest") return b.rating - a.rating;
        if (sort === "lowest") return a.rating - b.rating;
        return 0;
    });

    return (
        <div className="space-y-4">
            {/* Sort */}
            <div className="flex justify-end">
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as typeof sort)}
                    className="px-3 py-2 rounded border"
                    style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                        color: "var(--text-primary)",
                    }}
                >
                    <option value="latest">Terbaru</option>
                    <option value="highest">Rating Tertinggi</option>
                    <option value="lowest">Rating Terendah</option>
                </select>
            </div>

            {/* List */}
            <div className="space-y-4">
                {sortedReviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
}
