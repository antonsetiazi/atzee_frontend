// src/core/ui/views/review/ReviewActionSection.tsx

import ReviewForm from "./ReviewForm";
import { reviewService } from "@/business/review/review.service";

interface Props {
    canReview: boolean;
    entityType: "product" | "service";
    entityId: string;

    userId: string;
    userName: string;
}

export default function ReviewActionSection({
    canReview,
    entityType,
    entityId,
    userId,
    userName,
}: Props) {
    if (!canReview) return null;

    return (
        <div className="mt-6">
            <ReviewForm
                onSubmit={(data) =>
                    reviewService.create({
                        ...data,
                        entityType,
                        entityId,
                        userId,
                        userName,
                    })
                }
            />
        </div>
    );
}
