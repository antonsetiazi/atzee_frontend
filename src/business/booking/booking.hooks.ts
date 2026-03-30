// src/business/booking/booking.hooks.ts

import { useEffect, useState } from "react";
import { bookingStore } from "./booking.store";
import { bookingService } from "./booking.service";

export function useBooking() {
    const [state, setState] = useState(bookingStore.getState());

    useEffect(() => {
        return bookingStore.subscribe(() => {
            setState({ ...bookingStore.getState() });
        });
    }, []);

    return {
        ...state,

        selectDate: bookingService.selectDate,
        selectSlot: bookingService.selectSlot,
        confirmBooking: bookingService.confirmBooking,
        fetchAvailability: bookingService.fetchAvailability,
        reset: bookingService.reset,
    };
}
