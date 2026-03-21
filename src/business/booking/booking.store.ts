// src/business/booking/booking.store.ts

import type { BookingState } from "./booking.types";

type Listener = () => void;

class BookingStore {
    private state: BookingState = {
        selectedDate: null,
        selectedSlotId: null,
        slots: [],
        isLoadingSlots: false,
    };

    private listeners: Listener[] = [];

    getState() {
        return this.state;
    }

    setState(partial: Partial<BookingState>) {
        this.state = { ...this.state, ...partial };
        this.emit();
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private emit() {
        this.listeners.forEach((l) => l());
    }
}

export const bookingStore = new BookingStore();
