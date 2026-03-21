// src/core/ui/views/booking/BookingView.tsx

import BookingCalendar from "./BookingCalendar";
import BookingTimeSlot from "./BookingTimeSlot";
import type { BookingSlot } from "./booking.types";

interface Props {
    selectedDate: string | null;
    selectedSlotId: string | null;

    slots: BookingSlot[];
    isLoadingSlots?: boolean;

    onSelectDate: (date: string) => void;
    onSelectSlot: (slotId: string) => void;

    onConfirm: () => void;
}

export default function BookingView({
    selectedDate,
    selectedSlotId,
    slots,
    isLoadingSlots,
    onSelectDate,
    onSelectSlot,
    onConfirm,
}: Props) {
    const isValid = selectedDate && selectedSlotId;

    return (
        <div className="space-y-6">
            {/* Calendar */}
            <BookingCalendar
                selectedDate={selectedDate}
                onSelectDate={onSelectDate}
            />

            {/* Time Slot */}
            <BookingTimeSlot
                slots={slots}
                selectedSlotId={selectedSlotId}
                onSelectSlot={onSelectSlot}
                isLoading={isLoadingSlots}
            />

            {/* CTA */}
            <button
                onClick={onConfirm}
                disabled={!isValid}
                className="
                    w-full py-3 rounded-xl
                    bg-[var(--color-primary)]
                    text-white font-semibold
                    shadow-[var(--shadow)]
                    hover:opacity-90 transition
                    disabled:opacity-50
                "
            >
                Konfirmasi Booking
            </button>
        </div>
    );
}
