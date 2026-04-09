// src/modules/review/components/ReviewActionSection.tsx

import ReviewForm from "./ReviewForm";
import { useCreateReview } from "../hooks/useCreateReview";

interface Props {
    bookingId: number;
    canReview: boolean;
    onSuccess?: () => void;
}

export default function ReviewActionSection({
    bookingId,
    canReview,
    onSuccess,
}: Props) {
    const { submit } = useCreateReview();

    if (!canReview) return null;

    return (
        <ReviewForm
            onSubmit={async ({ rating, comment }) => {
                await submit({
                    booking_id: bookingId,
                    rating,
                    comment,
                });

                onSuccess?.();
            }}
        />
    );
}
