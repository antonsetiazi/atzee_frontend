// src/core/ui/views/review/ReviewActionSection.tsx

import ReviewForm from "./ReviewForm";

interface Props {
    canReview: boolean;
    onSubmit: (data: { rating: number; comment: string }) => void;
}

export default function ReviewActionSection({ canReview, onSubmit }: Props) {
    if (!canReview) return null;

    return (
        <div className="mt-6">
            <ReviewForm onSubmit={onSubmit} />
        </div>
    );
}
