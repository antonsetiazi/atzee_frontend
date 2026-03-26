// src/business/service/ServiceDetailPage.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ListingDetailView from "@/core/ui/views/listing_detail/ListingDetailView";
import BookingView from "@/core/ui/views/booking/BookingView";

import { useBooking } from "@/business/booking/booking.hooks";
import { useCheckout } from "@/business/checkout/checkout.hooks";

import { serviceApi } from "@/business/service/service.api";
import { mapServiceDetailToListingDetail } from "@/business/service/service.mapper";

import { chatService } from "@/business/chat/chat.service";

import type { ListingDetail } from "@/core/ui/views/listing_detail/listingDetail.types";

export default function ServiceDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [showBooking, setShowBooking] = useState(false);

    // ================================
    // 🔥 NEW: ASYNC STATE
    // ================================
    const [data, setData] = useState<ListingDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ================================
    // 🔥 BOOKING + CHECKOUT
    // ================================
    const {
        selectedDate,
        selectedSlotId,
        slots,
        isLoadingSlots,
        selectDate,
        selectSlot,
        confirmBooking,
    } = useBooking();

    const { initFromBooking } = useCheckout();

    useEffect(() => {
        async function fetchDetail() {
            try {
                setLoading(true);

                if (!id) return;

                const res = await serviceApi.getDetail(id);
                // console.log("res:", res);

                const mapped = mapServiceDetailToListingDetail(res);
                // console.log("mapped:", mapped);
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
    // 🔥 CHAT HANDLER
    // ================================
    function handleChatNow() {
        if (!data) return;

        const room = chatService.getOrCreateRoom({
            currentUserId: "user_1", // 🔥 nanti dari auth
            targetUserId: data.meta?.owner_id || "unknown",

            context_type: "service",
            context_id: data.id,
        });

        navigate(`/chat/${room.id}`);
    }

    // ================================
    // 🔥 LOADING STATE
    // ================================
    if (loading) {
        return (
            <div className="p-6 text-center text-[var(--text-muted)]">
                Memuat detail layanan...
            </div>
        );
    }

    // ================================
    // 🔥 ERROR STATE
    // ================================
    if (error || !data) {
        return (
            <div className="p-6 text-center text-red-500">
                {error || "Data tidak ditemukan"}
            </div>
        );
    }

    // ================================
    // 🔥 MAIN RENDER
    // ================================
    return (
        <div className="space-y-6">
            {/* DETAIL */}
            <ListingDetailView
                data={data}
                onPrimaryAction={() => {
                    setShowBooking(true);
                }}
            />

            {/* ================================ */}
            {/* 🔥 CHAT BUTTON */}
            {/* ================================ */}
            <div className="flex gap-3 px-2">
                <button
                    onClick={handleChatNow}
                    className="
                        flex-1 py-3 my-1 rounded-xl font-medium
                        border transition-all
                        hover:bg-[var(--color-hover)]
                    "
                    style={{
                        borderColor: "var(--color-border)",
                        background: "var(--color-surface)",
                    }}
                >
                    Chat Sekarang
                </button>
            </div>

            {/* ================================ */}
            {/* 🔥 BOOKING SECTION */}
            {/* ================================ */}
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

                            initFromBooking();
                            navigate("/checkout");
                        }}
                    />
                </div>
            )}
        </div>
    );
}
