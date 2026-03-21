// src/business/booking/booking.types.ts

export interface BookingSlot {
    id: string;
    label: string;
    start: string; // ISO datetime
    end: string;
    isAvailable: boolean;
}

export interface BookingState {
    selectedDate: string | null; // YYYY-MM-DD
    selectedSlotId: string | null;

    slots: BookingSlot[];
    isLoadingSlots: boolean;
}
