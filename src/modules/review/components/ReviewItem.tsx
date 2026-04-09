// src/modules/review/components/ReviewItem.tsx

import { StarRating } from "@/core/ui/components";
import type { Review } from "../types/review.types";
import { formatValue } from "@/shared/utils/formatValue";

interface Props {
    review: Review;
}

export default function ReviewItem({ review }: Props) {
    return (
        <div
            className="p-4 rounded-[var(--radius)] shadow-[var(--shadow)]"
            style={{ background: "var(--color-surface)" }}
        >
            <div className="flex items-start gap-4">
                {/* Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-sm font-semibold">
                    {review.user_name?.charAt(0).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <div
                                className="font-semibold"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {review.user_name}
                            </div>
                        </div>

                        <div
                            className="text-sm"
                            style={{ color: "var(--text-muted)" }}
                        >
                            {formatValue(review.created_at, {
                                format: "date",
                            })}
                        </div>
                    </div>

                    <div
                        className="mt-1"
                        style={{ color: "var(--color-warning)" }}
                    >
                        <StarRating value={review.rating} size={16} />
                    </div>

                    <p
                        className="mt-2 text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        {review.comment}
                    </p>
                </div>
            </div>
        </div>
    );
}
