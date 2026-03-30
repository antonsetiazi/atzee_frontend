// src/core/ui/views/booking/BookingView.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { BookingSlot } from "./booking.types";
import BookingCalendar from "./BookingCalendar";
import BookingTimeSlot from "./BookingTimeSlot";

interface Props {
    selectedDate: string | null;

    onSelectDate: (date: string) => void;

    onConfirm: () => void | Promise<void>;

    offerings: any[];
    selectedOfferings: number[];
    onToggleOffering: (id: number) => void;

    slots: BookingSlot[];
    selectedSlotId: string | null;
    onSelectSlot: (id: string) => void;
    isLoadingSlots?: boolean;
}

export default function BookingView({
    selectedDate,
    onSelectDate,
    selectedSlotId,
    onConfirm,
    offerings,
    selectedOfferings,
    onToggleOffering,
    slots,
    onSelectSlot,
    isLoadingSlots,
}: Props) {
    const isValid =
        selectedDate &&
        selectedSlotId &&
        selectedOfferings.length > 0 &&
        !isLoadingSlots;

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <h2 className="text-lg font-semibold">Pilih Layanan</h2>

                <div className="space-y-2">
                    {offerings.map((item) => {
                        const selected = selectedOfferings.includes(
                            item.product_id,
                        );

                        return (
                            <div
                                key={item.product_id}
                                onClick={() =>
                                    onToggleOffering(item.product_id)
                                }
                                className={`
                                    group
                                    p-4 rounded-2xl border cursor-pointer transition-all duration-200
                                    flex justify-between items-center
                                    ${
                                        selected
                                            ? "border-[var(--color-primary)] bg-[var(--color-hover)] shadow-sm"
                                            : "border-[var(--color-border)] hover:border-[var(--color-primary)]"
                                    }
                                `}
                            >
                                {/* LEFT CONTENT */}
                                <div>
                                    <p className="font-semibold text-[var(--text-primary)]">
                                        {item.product_name}
                                    </p>

                                    <p className="text-sm text-[var(--text-muted)]">
                                        {item.duration_minutes} menit
                                    </p>
                                </div>

                                {/* RIGHT SIDE */}
                                <div className="flex items-center gap-4">
                                    {/* PRICE */}
                                    <p className="font-semibold text-[var(--color-primary)]">
                                        Rp {item.price.toLocaleString()}
                                    </p>

                                    {/* CHECK INDICATOR */}
                                    <div
                                        className={`
                                            w-6 h-6 rounded-full border flex items-center justify-center
                                            transition-all duration-200
                                            ${
                                                selected
                                                    ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                                                    : "border-[var(--color-border)] group-hover:border-[var(--color-primary)]"
                                            }
                                        `}
                                    >
                                        {/* CHECK ICON */}
                                        <svg
                                            className={`
                                                w-4 h-4 text-white transition-all duration-200
                                                ${
                                                    selected
                                                        ? "opacity-100 scale-100"
                                                        : "opacity-0 scale-50"
                                                }
                                            `}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {selectedOfferings.length === 0 && (
                        <p className="text-sm text-[var(--text-muted)]">
                            Pilih minimal satu layanan
                        </p>
                    )}
                </div>
            </div>

            {/* Calendar */}
            <BookingCalendar
                selectedDate={selectedDate}
                onSelectDate={onSelectDate}
            />

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
