// src/modules/booking/components/BookingTimeSlot.tsx

import type { BookingSlot } from "../types/booking.types";

interface Props {
    slots: BookingSlot[];

    selectedSlotId: string | null;
    onSelectSlot: (slotId: string) => void;

    isLoading?: boolean;
}

export default function BookingTimeSlot({
    slots,
    selectedSlotId,
    onSelectSlot,
    isLoading,
}: Props) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">Pilih Waktu</label>

            {isLoading ? (
                <div className="text-sm text-gray-500">Memuat jadwal...</div>
            ) : slots.length === 0 ? (
                <div className="text-sm text-gray-500">
                    Tidak ada slot tersedia
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-2">
                    {slots.map((slot) => {
                        const isSelected = selectedSlotId === slot.id;

                        return (
                            <button
                                key={slot.id}
                                disabled={!slot.isAvailable}
                                onClick={() => onSelectSlot(slot.id)}
                                className={`
                                    p-2 rounded-lg text-sm
                                    border border-[var(--color-border)]
                                    ${
                                        isSelected
                                            ? "bg-[var(--color-primary)] text-white"
                                            : "bg-[var(--color-surface)]"
                                    }
                                    ${
                                        !slot.isAvailable
                                            ? "opacity-40 cursor-not-allowed"
                                            : "hover:border-[var(--color-primary)] cursor-pointer"
                                    }
                                `}
                            >
                                {slot.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
