// src/core/ui/views/order/OrderItemRow.tsx

import type { CheckoutItem } from "@/business/checkout/checkout.types";
import { useCanReview } from "@/business/review/hooks/useCanReview";
import { useHasReviewed } from "@/business/review/review.hooks";
import ReviewActionSection from "@/core/ui/views/review/ReviewActionSection";
import ReviewItem from "@/core/ui/views/review/ReviewItem";
import { formatValue } from "@/shared/utils/formatValue";
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from "@/core/config/format.config";
import { useReviewByEntity } from "@/business/review/hooks/useReviewByEntity";

interface Props {
    item: CheckoutItem;
    orderStatus: string;

    userId: string;
    userName: string;
}

export default function OrderItemRow({
    item,
    orderStatus,
    userId,
    userName,
}: Props) {
    // 🔥 single source of truth
    const review = useReviewByEntity(item.entityType, item.entityId, userId);

    const canReviewBase = useCanReview(item.entityType, item.entityId);
    const hasReviewed = useHasReviewed(item.entityType, item.entityId);

    const canReview =
        orderStatus === "completed" && canReviewBase && !hasReviewed;

    return (
        <div className="space-y-2">
            <div className="p-3 border rounded-xl flex justify-between">
                <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-[var(--text-muted)]">
                        x{item.quantity}
                    </p>
                </div>

                <p>
                    {formatValue(item.price * item.quantity, {
                        format: "currency",
                        currency: DEFAULT_CURRENCY,
                        locale: DEFAULT_LOCALE,
                    })}
                </p>
            </div>

            {/* 🔥 REVIEW SECTION */}
            {review ? (
                <ReviewItem review={review} />
            ) : (
                <ReviewActionSection
                    canReview={canReview}
                    entityType={item.entityType}
                    entityId={item.entityId}
                    userId={userId}
                    userName={userName}
                />
            )}
        </div>
    );
}
