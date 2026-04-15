// src/modules/review/components/ReviewForm.tsx

import { useState } from "react";
import { Button, StarRating } from "@/core/ui/components";
import { notificationService } from "@/modules/notification/services/notification.service";

interface Props {
    onSubmit: (data: { rating: number; comment: string }) => Promise<void>;
}

export default function ReviewForm({ onSubmit }: Props) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    async function handleSubmit() {
        if (rating === 0) {
            notificationService.toast.error(
                "Silakan beri rating terlebih dahulu",
            );
            return;
        }

        await onSubmit({
            rating,
            comment,
        });

        setRating(0);
        setComment("");
    }

    return (
        <div className="space-y-4">
            <StarRating
                value={rating}
                readOnly={false}
                onChange={setRating}
                size={24}
            />

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full border border-[var(--color-border)] rounded p-3"
                placeholder="Bagikan pengalaman Anda..."
            />

            <Button onClick={handleSubmit}>Kirim Review</Button>
        </div>
    );
}
