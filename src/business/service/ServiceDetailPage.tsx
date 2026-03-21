// src/business/service/ServiceDetailPage.tsx

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ListingDetailView from "@/core/ui/views/listing_detail/ListingDetailView";
import BookingView from "@/core/ui/views/booking/BookingView";

import { useBooking } from "@/business/booking/booking.hooks";
import { useCheckout } from "@/business/checkout/checkout.hooks";

import type { ListingDetail } from "@/core/ui/views/listing_detail/listingDetail.types";

export default function ServiceDetailPage() {
    const { id } = useParams();

    const [showBooking, setShowBooking] = useState(false);

    const {
        selectedDate,
        selectedSlotId,
        slots,
        isLoadingSlots,
        selectDate,
        selectSlot,
        confirmBooking,
    } = useBooking();

    const navigate = useNavigate();
    const { initFromBooking } = useCheckout();

    const data: ListingDetail = {
        id: id || "1",
        type: "service",
        name: "Ustadz Ahmad - Tahsin & Tahfidz",
        images: [
            "https://placehold.co/600x400",
            "https://placehold.co/600x400",
        ],
        category: "Religi",
        location: "Bekasi",
        rating: 4.9,
        sold: 320,
        priceLabel: "Rp 50.000 / sesi",
        description: "Belajar tahsin dan tahfidz dengan metode mudah.",
        meta: {
            specialization: "Tahsin, Tahfidz",
            experience: "5 tahun",
        },
    };

    return (
        <div className="space-y-6">
            {/* DETAIL */}
            <ListingDetailView
                data={data}
                onPrimaryAction={() => {
                    setShowBooking(true); // 🔥 trigger booking flow
                }}
            />

            {/* BOOKING SECTION */}
            {showBooking && (
                <div
                    className="
                        m-2
                        p-4 rounded-2xl space-y-4
                        border border-[var(--color-border)]
                        bg-[var(--color-surface)]
                        shadow-[var(--shadow)]
                    "
                >
                    <h2 className="text-lg font-semibold">
                        Pilih Jadwal Booking
                    </h2>

                    <BookingView
                        selectedDate={selectedDate}
                        selectedSlotId={selectedSlotId}
                        slots={slots}
                        isLoadingSlots={isLoadingSlots}
                        onSelectDate={selectDate}
                        onSelectSlot={selectSlot}
                        onConfirm={() => {
                            const result = confirmBooking();

                            console.log("BOOKING CONFIRMED:", result);

                            // 🔥 init checkout dari booking
                            initFromBooking();

                            // 🔥 redirect ke checkout page
                            navigate("/checkout");
                        }}
                    />
                </div>
            )}
        </div>
    );
}
