// src/modules/booking/types/booking.types.ts

// 🔥 untuk UI (dari listing_detail.meta)
export interface ServiceOfferingUI {
    product_id: number;
    product_name: string;
    price: number;
    duration_minutes: number;
}

// 🔥 untuk store (normalized)
export interface BookingOffering {
    id: number;
    name?: string;
    duration: number;
    price?: number;
}

export interface BookingSlot {
    id: string;
    label: string;
    start: string; // ISO datetime
    end: string;
    isAvailable: boolean;
}

export interface BookingState {
    resourceId: string | null; // ✅ UUID

    selectedDate: string | null;
    selectedSlotId: string | null;

    slots: BookingSlot[];

    offerings: BookingOffering[];

    isLoadingSlots: boolean;
}
