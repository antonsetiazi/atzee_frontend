// src/modules/booking/pages/ServiceBookingPage.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import BookingView from "../components/BookingView";
import { bookingService } from "../services/booking.service";
import { useBooking } from "../hooks/useBooking";
import { useCheckout } from "@/business/checkout/checkout.hooks";
import type { ServiceOfferingUI } from "../types/booking.types";

import { listingDetailApi } from "@/modules/listing_detail/api/listingDetail.api";
import { mapServiceDetailToListingDetail } from "@/modules/listing_detail/services/listingDetail.mapper";
import type { ListingDetail } from "@/modules/listing_detail/types/listingDetail.types";

import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

export default function ServiceBookingPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isMobile } = useBreakpoint();

    const [selectedOfferings, setSelectedOfferings] = useState<number[]>([]);

    const [data, setData] = useState<ListingDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {
        selectedDate,
        slots,
        selectedSlotId,
        isLoadingSlots,
        selectDate,
        selectSlot,
        confirmBooking,
    } = useBooking();

    const { initFromBooking } = useCheckout();

    // ================================
    // 🔥 FETCH DETAIL
    // ================================
    useEffect(() => {
        async function fetchDetail() {
            try {
                setLoading(true);

                if (!id) return;

                const res = await listingDetailApi.getDetail(id);
                const mapped = mapServiceDetailToListingDetail(res);

                setData(mapped);
            } catch (err) {
                console.error(err);
                setError("Gagal memuat data");
            } finally {
                setLoading(false);
            }
        }

        fetchDetail();
    }, [id]);

    // ================================
    // 🔥 RESET BOOKING STATE
    // ================================
    useEffect(() => {
        bookingService.reset();
        setSelectedOfferings([]);
    }, [id]);

    const allOfferings = (data?.meta?.offerings || []) as ServiceOfferingUI[];

    const selected = allOfferings.filter((o) =>
        selectedOfferings.includes(o.product_id),
    );

    const isValid =
        selectedDate &&
        selectedSlotId &&
        selectedOfferings.length > 0 &&
        !isLoadingSlots;

    async function handleConfirm() {
        try {
            const booking = await confirmBooking();

            if (!id) return;

            const enrichedResult = {
                booking_id: booking.booking_id,
                expires_at: booking.expires_at,
                serviceId: id,
                date: booking.date,
                slotLabel: booking.slotLabel,
                slotStart: booking.slotStart,
                slotEnd: booking.slotEnd,
                offerings: selected.map((o) => ({
                    id: o.product_id,
                    name: o.product_name,
                    price: o.price,
                    duration: o.duration_minutes,
                })),
            };

            initFromBooking(enrichedResult);
            navigate("/checkout");
        } catch (err) {
            console.error(err);
            alert("Gagal booking");
        }
    }

    if (loading) {
        return (
            <div className="p-6 text-center text-[var(--text-muted)]">
                Memuat detail layanan...
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="p-6 text-center text-red-500">
                {error || "Data tidak ditemukan"}
            </div>
        );
    }

    // ================================
    // 📱 MOBILE VERSION (PREMIUM UX)
    // ================================
    if (isMobile) {
        return (
            <div className="relative min-h-screen bg-[var(--color-background)]">
                {/* HEADER */}
                <div
                    className="
                        fixed top-0 left-0 right-0 z-40
                        px-4 pt-3 pb-3
                        flex items-center gap-3
                        backdrop-blur-xl border-b
                    "
                    style={{
                        borderColor: "var(--color-border)",
                        background: "rgba(255,255,255,0.75)",
                    }}
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="
                            w-10 h-10 flex items-center justify-center
                            rounded-full
                            bg-white/80 backdrop-blur
                            shadow-md border
                            active:scale-95 transition
                        "
                        style={{
                            borderColor: "var(--color-border)",
                        }}
                    >
                        <ArrowLeftIcon className="w-5 h-5 text-[var(--text-primary)]" />
                    </button>

                    <h1 className="text-base font-semibold">Booking</h1>
                </div>

                {/* CONTENT */}
                <div className="pt-20 pb-28 px-3">
                    <div
                        className="
                            p-4 rounded-2xl space-y-4
                            border border-[var(--color-border)]
                            bg-[var(--color-surface)]
                            shadow-[var(--shadow)]
                        "
                    >
                        <BookingView
                            selectedDate={selectedDate}
                            onSelectDate={selectDate}
                            slots={slots}
                            selectedSlotId={selectedSlotId}
                            onSelectSlot={selectSlot}
                            isLoadingSlots={isLoadingSlots}
                            offerings={allOfferings}
                            selectedOfferings={selectedOfferings}
                            hideCTA={true}
                            onToggleOffering={(offeringId) => {
                                setSelectedOfferings((prev) => {
                                    let updated: number[];

                                    if (prev.includes(offeringId)) {
                                        updated = prev.filter(
                                            (x) => x !== offeringId,
                                        );
                                    } else {
                                        updated = [...prev, offeringId];
                                    }

                                    const selectedOfferingsFull =
                                        allOfferings.filter((o) =>
                                            updated.includes(o.product_id),
                                        );

                                    bookingService.setOfferings(
                                        selectedOfferingsFull.map((o) => ({
                                            id: o.product_id,
                                            name: o.product_name,
                                            duration: o.duration_minutes,
                                            price: o.price,
                                        })),
                                    );

                                    if (id) {
                                        bookingService.selectResource(id);
                                    }

                                    return updated;
                                });
                            }}
                            onConfirm={handleConfirm}
                        />
                    </div>
                </div>

                {/* STICKY CTA */}
                <div
                    className="
                        fixed bottom-0 left-0 right-0 z-40
                        p-4 backdrop-blur-xl border-t
                    "
                    style={{
                        borderColor: "var(--color-border)",
                        background: "rgba(255,255,255,0.9)",
                    }}
                >
                    <button
                        onClick={handleConfirm}
                        disabled={!isValid}
                        className="
                            w-full py-4 rounded-2xl
                            font-semibold text-white
                            shadow-lg
                            transition-all
                            active:scale-[0.98]
                            disabled:opacity-50
                        "
                        style={{
                            background: "var(--color-primary)",
                        }}
                    >
                        Konfirmasi Booking
                    </button>
                </div>
            </div>
        );
    }

    // ================================
    // 💻 DESKTOP VERSION
    // ================================
    return (
        <div className="space-y-6">
            <div
                className="
                    m-2
                    p-4 rounded-2xl space-y-4
                    border border-[var(--color-border)]
                    bg-[var(--color-surface)]
                    shadow-[var(--shadow)]
                "
            >
                <h2 className="text-lg font-semibold">Booking</h2>

                <BookingView
                    selectedDate={selectedDate}
                    onSelectDate={selectDate}
                    slots={slots}
                    selectedSlotId={selectedSlotId}
                    onSelectSlot={selectSlot}
                    isLoadingSlots={isLoadingSlots}
                    offerings={allOfferings}
                    selectedOfferings={selectedOfferings}
                    onToggleOffering={(offeringId) => {
                        setSelectedOfferings((prev) => {
                            let updated: number[];

                            if (prev.includes(offeringId)) {
                                updated = prev.filter((x) => x !== offeringId);
                            } else {
                                updated = [...prev, offeringId];
                            }

                            // 🔥 ambil offering yang terpilih
                            const selectedOfferingsFull = allOfferings.filter(
                                (o) => updated.includes(o.product_id),
                            );

                            // 🔥 SET OFFERINGS KE STORE (PENTING BANGET)
                            bookingService.setOfferings(
                                selectedOfferingsFull.map((o) => ({
                                    id: o.product_id,
                                    name: o.product_name,
                                    duration: o.duration_minutes,
                                    price: o.price,
                                })),
                            );

                            // 🔥 SET RESOURCE (ambil dari service id / partner)
                            if (id) {
                                bookingService.selectResource(id);
                            }

                            return updated;
                        });
                    }}
                    onConfirm={handleConfirm}
                />
            </div>
        </div>
    );
}
