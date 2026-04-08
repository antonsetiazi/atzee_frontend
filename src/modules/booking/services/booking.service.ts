// src/modules/booking/services/booking.service.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { bookingStore } from "../store/booking.store";
import { bookingApi } from "../api/booking.api";

export const bookingService = {
    /* ===========================
       🎯 SELECT RESOURCE
       =========================== */
    selectResource(resourceId: string) {
        bookingStore.setState({
            resourceId,
            selectedDate: null,
            selectedSlotId: null,
            slots: [],
        });
    },

    /* ===========================
       📅 SELECT DATE
       =========================== */
    selectDate(date: string) {
        bookingStore.setState({
            selectedDate: date,
            selectedSlotId: null,
            slots: [],
        });

        bookingService.fetchAvailability(); // 🔥 AUTO LOAD
    },

    /* ===========================
       🕒 SELECT SLOT
       =========================== */
    selectSlot(slotId: string) {
        bookingStore.setState({
            selectedSlotId: slotId,
        });
    },

    setOfferings(offerings: any[]) {
        bookingStore.setState({
            offerings,
            selectedSlotId: null,
            slots: [], // reset slot karena durasi berubah
        });
    },

    /* ===========================
       🧠 CALCULATE DURATION (CORE)
       =========================== */
    getTotalDuration(): number {
        const state = bookingStore.getState();

        // 🔥 ambil dari offerings (harus sudah disimpan di store)
        const offerings = state.offerings || [];

        if (!offerings.length) return 0;

        return offerings.reduce(
            (acc: number, item: any) => acc + (item.duration || 0),
            0,
        );
    },

    /* ===========================
       🚀 CONFIRM BOOKING
       =========================== */
    async confirmBooking() {
        const state = bookingStore.getState();

        if (!state.resourceId) {
            throw new Error("Resource belum dipilih");
        }

        if (!state.selectedDate) {
            throw new Error("Tanggal belum dipilih");
        }

        if (!state.selectedSlotId) {
            throw new Error("Slot belum dipilih");
        }

        const slot = state.slots.find((s) => s.id === state.selectedSlotId);

        if (!slot) {
            throw new Error("Slot tidak valid");
        }

        const res = await bookingApi.hold({
            resource_type: "service",
            resource_id: state.resourceId,
            start_time: slot.start,
            end_time: slot.end,
        });

        return {
            ...res,
            resourceId: state.resourceId,
            date: state.selectedDate,
            slotLabel: slot.label,
            slotStart: slot.start,
            slotEnd: slot.end,
        };
    },

    async cancelBooking(bookingId: string) {
        if (!bookingId) {
            throw new Error("Booking ID tidak ditemukan");
        }

        return bookingApi.cancel(bookingId);
    },

    /* ===========================
       📡 FETCH AVAILABILITY (FIXED)
       =========================== */
    async fetchAvailability() {
        const state = bookingStore.getState();

        if (!state.resourceId || !state.selectedDate) {
            console.warn("❌ Missing resourceId or selectedDate");
            return;
        }

        const duration = bookingService.getTotalDuration();

        if (!duration || duration <= 0) {
            console.warn("❌ Duration tidak valid");
            bookingStore.setState({ slots: [] });
            return;
        }

        bookingStore.setState({ isLoadingSlots: true });

        try {
            const res = await bookingApi.getAvailability({
                resource_type: "service",
                resource_id: state.resourceId,
                date: state.selectedDate,
                duration: duration, // 🔥 FIX UTAMA
            });

            // console.log(res);

            const rawSlots = res;

            if (!Array.isArray(rawSlots)) {
                console.error("❌ Invalid availability format:", res);
                bookingStore.setState({ slots: [] });
                return;
            }

            const formatTime = (iso: string) => {
                const date = new Date(iso);
                return date.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                });
            };

            const slots = rawSlots.map((slot: any, idx: number) => ({
                id: String(idx),
                label: `${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}`,
                start: slot.start_time,
                end: slot.end_time,
                isAvailable: slot.is_available,
            }));

            bookingStore.setState({
                slots,
                selectedSlotId: null,
            });
        } catch (err) {
            console.error("❌ fetchAvailability error:", err);

            bookingStore.setState({
                slots: [],
            });
        } finally {
            bookingStore.setState({ isLoadingSlots: false });
        }
    },

    /* ===========================
       🔄 RESET
       =========================== */
    reset() {
        bookingStore.setState({
            resourceId: null,
            selectedDate: null,
            selectedSlotId: null,
            slots: [],
        });
    },
};
