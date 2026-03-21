// src/business/booking/booking.service.ts

import { bookingStore } from "./booking.store";
import type { BookingSlot } from "./booking.types";

function generateDummySlots(date: string): BookingSlot[] {
    // simulasi slot jam 09:00 - 17:00
    const slots: BookingSlot[] = [];

    for (let hour = 9; hour < 17; hour++) {
        const start = `${date}T${String(hour).padStart(2, "0")}:00:00`;
        const end = `${date}T${String(hour + 1).padStart(2, "0")}:00:00`;

        slots.push({
            id: `${hour}`,
            label: `${hour}:00 - ${hour + 1}:00`,
            start,
            end,
            isAvailable: Math.random() > 0.3, // random availability
        });
    }

    return slots;
}

export const bookingService = {
    selectDate(date: string) {
        bookingStore.setState({
            selectedDate: date,
            selectedSlotId: null,
            isLoadingSlots: true,
        });

        // simulate async fetch
        setTimeout(() => {
            const slots = generateDummySlots(date);

            bookingStore.setState({
                slots,
                isLoadingSlots: false,
            });
        }, 500);
    },

    selectSlot(slotId: string) {
        bookingStore.setState({
            selectedSlotId: slotId,
        });
    },

    confirmBooking() {
        const state = bookingStore.getState();

        if (!state.selectedDate || !state.selectedSlotId) {
            throw new Error("Booking belum lengkap");
        }

        const slot = state.slots.find((s) => s.id === state.selectedSlotId);

        return {
            date: state.selectedDate,
            slot,
        };
    },

    reset() {
        bookingStore.setState({
            selectedDate: null,
            selectedSlotId: null,
            slots: [],
            isLoadingSlots: false,
        });
    },
};
