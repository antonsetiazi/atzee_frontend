// src/core/ui/views/booking/booking.types.ts

export interface BookingSlot {
    id: string;
    label: string; // "09:00 - 10:00"
    isAvailable: boolean;
}

export interface BookingState {
    selectedDate: string | null; // ISO string (YYYY-MM-DD)
    selectedSlotId: string | null;
}
