// src/modules/order/components/sections/OrderBooking.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import BookingTimeline from "@/modules/booking/components/BookingTimeline";

export default function OrderBooking({ booking }: { booking: any }) {
    return (
        <>
            {booking && (
                <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm space-y-4">
                    <h3 className="font-semibold">Status Booking</h3>

                    <BookingTimeline status={booking.status} />
                </div>
            )}
        </>
    );
}
