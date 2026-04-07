// src/modules/booking/pages/ServiceBookingPage.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BookingView from "../components/BookingView";
import { bookingService } from "../services/booking.service";
import { useBooking } from "../hooks/useBooking";
import { useCheckout } from "@/business/checkout/checkout.hooks";
import type { ServiceOfferingUI } from "../types/booking.types";

import { listingDetailApi } from "@/modules/listing_detail/api/listingDetail.api";
import { mapServiceDetailToListingDetail } from "@/modules/listing_detail/services/listingDetail.mapper";
import type { ListingDetail } from "@/modules/listing_detail/types/listingDetail.types";

import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import { HeaderPage } from "@/core/ui/components";
import { toggleOffering } from "../utils/toggleOffering";

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

            if (!data?.partner) {
                throw new Error("Partner tidak ditemukan");
            }

            const enrichedResult = {
                booking_id: booking.booking_id,
                expires_at: booking.expires_at,
                partner_id: data.partner.id, // ✅ FIX
                partner_name: data.partner.name,
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
            <>
                <HeaderPage title="Booking" subtitle="" />

                <div className="p-4">
                    {/* CONTENT */}
                    <div className="px-3">
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
                                setSelectedOfferings((prev) =>
                                    toggleOffering(
                                        offeringId,
                                        prev,
                                        allOfferings,
                                        id,
                                    ),
                                );
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
            </>
        );
    }

    // ================================
    // 💻 DESKTOP VERSION
    // ================================
    return (
        <>
            <HeaderPage title="Booking" subtitle="" />

            <div className="p-4 space-y-6">
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
                        setSelectedOfferings((prev) =>
                            toggleOffering(offeringId, prev, allOfferings, id),
                        );
                    }}
                    onConfirm={handleConfirm}
                />
            </div>
        </>
    );
}
