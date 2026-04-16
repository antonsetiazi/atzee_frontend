// src/modules/order/components/sections/OrderReview.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import ReviewActionSection from "@/modules/review/components/ReviewActionSection";
import ReviewItem from "@/modules/review/components/ReviewItem";
import { useBookingReview } from "@/modules/review/hooks/useBookingReview";

export default function OrderReview({ booking }: { booking: any }) {
    const {
        review,
        loading: reviewLoading,
        refetch,
    } = useBookingReview(Number(booking?.id));

    return (
        <>
            {booking?.status === "COMPLETED" && (
                <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
                    <h3 className="font-semibold mb-3">Review Layanan</h3>

                    {booking.can_review && !review && (
                        <ReviewActionSection
                            bookingId={booking.id}
                            canReview={booking.can_review}
                            onSuccess={refetch}
                        />
                    )}

                    {review && <ReviewItem review={review} />}

                    {reviewLoading && (
                        <p className="text-sm text-gray-500">
                            Memuat review...
                        </p>
                    )}
                </div>
            )}
        </>
    );
}
