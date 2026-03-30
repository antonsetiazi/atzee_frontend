// src/business/booking/ServiceBookingPage.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BookingView from "@/core/ui/views/booking/BookingView";

import { useBooking } from "@/business/booking/booking.hooks";
import { useCheckout } from "@/business/checkout/checkout.hooks";
import { bookingService } from "@/business/booking/booking.service";

import { serviceApi } from "@/business/service/service.api";
import { mapServiceDetailToListingDetail } from "@/business/service/service.mapper";

import type { ListingDetail } from "@/core/ui/views/listing_detail/listingDetail.types";
import type { ServiceOffering } from "../service/service.types";

export default function ServiceBookingPage() {
    const { id } = useParams();
    const navigate = useNavigate();

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

                const res = await serviceApi.getDetail(id);
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

    const allOfferings = (data?.meta?.offerings || []) as ServiceOffering[];

    const selected = allOfferings.filter((o) =>
        selectedOfferings.includes(o.product_id),
    );

    // ================================
    // 🔥 LOADING
    // ================================
    if (loading) {
        return (
            <div className="p-6 text-center text-[var(--text-muted)]">
                Memuat detail layanan...
            </div>
        );
    }

    // ================================
    // 🔥 ERROR
    // ================================
    if (error || !data) {
        return (
            <div className="p-6 text-center text-red-500">
                {error || "Data tidak ditemukan"}
            </div>
        );
    }

    // ================================
    // 🔥 MAIN
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
                    onConfirm={async () => {
                        try {
                            const booking = await confirmBooking();

                            if (!id) return;

                            const enrichedResult = {
                                booking_id: booking.booking_id,
                                expires_at: booking.expires_at,
                                serviceId: id,
                                date: booking.date,
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
                    }}
                />
            </div>
        </div>
    );
}
