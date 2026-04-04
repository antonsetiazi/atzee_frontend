// src/modules/review/components/ReviewForm.tsx

import { useState } from "react";
import { StarRating } from "@/core/ui/components";

interface Props {
    onSubmit: (data: { rating: number; comment: string }) => void;
}

export default function ReviewForm({ onSubmit }: Props) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        if (rating === 0 || comment.trim().length < 5) return;

        onSubmit({ rating, comment });

        setRating(0);
        setComment("");
    };

    return (
        <div
            className="p-4 rounded-[var(--radius)] shadow-[var(--shadow)] space-y-4"
            style={{ background: "var(--color-surface)" }}
        >
            <div
                className="font-semibold"
                style={{ color: "var(--text-primary)" }}
            >
                Tulis Review
            </div>

            {/* Rating */}
            <div className="flex gap-1">
                <StarRating
                    value={rating}
                    readOnly={false}
                    onChange={setRating}
                    size={24}
                />
            </div>

            {/* Comment */}
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Bagikan pengalaman Anda..."
                className="w-full p-3 rounded border"
                style={{
                    background: "var(--color-surface-alt)",
                    borderColor: "var(--color-border)",
                    color: "var(--text-primary)",
                }}
            />

            {/* Submit */}
            <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded font-medium"
                style={{
                    background: "var(--color-primary)",
                    color: "#fff",
                }}
            >
                Kirim Review
            </button>
        </div>
    );
}
