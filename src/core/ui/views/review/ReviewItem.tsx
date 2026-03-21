// src/core/ui/views/review/ReviewItem.tsx

import { StarRating } from "@/core/ui/components";
import type { Review } from "./review.types";

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
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
                    {review.userAvatar ? (
                        <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="w-full h-full object-cover"
                        />
                    ) : null}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <div
                                className="font-semibold"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {review.userName}
                            </div>

                            {review.isVerified && (
                                <div
                                    className="text-xs"
                                    style={{ color: "var(--color-success)" }}
                                >
                                    ✔ Verified Purchase
                                </div>
                            )}
                        </div>

                        <div
                            className="text-sm"
                            style={{ color: "var(--text-muted)" }}
                        >
                            {new Date(review.createdAt).toLocaleDateString()}
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
