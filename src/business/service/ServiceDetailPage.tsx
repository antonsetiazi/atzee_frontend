// src/business/service/ServiceDetailPage.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ListingDetailView from "@/core/ui/views/listing_detail/ListingDetailView";

import { serviceApi } from "@/business/service/service.api";
import { mapServiceDetailToListingDetail } from "@/business/service/service.mapper";

import { chatService } from "@/business/chat/chat.service";

import type { ListingDetail } from "@/core/ui/views/listing_detail/listingDetail.types";
import { useSessionStore } from "@/core/session/session.store";
import { useRequireLogin } from "@/core/auth/useRequireLogin";
import LoginRequiredDialog from "@/core/auth/LoginRequiredDialog";

export default function ServiceDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useSessionStore();

    // ================================
    // 🔥 NEW: ASYNC STATE
    // ================================
    const [data, setData] = useState<ListingDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { open, handleClose, handleLogin, triggerLoginRequired } =
        useRequireLogin();

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
    // 🔥 CHAT HANDLER
    // ================================
    // handler chat
    function handleChatNow() {
        triggerLoginRequired(() => {
            if (!data || !user) return;

            const room = chatService.getOrCreateRoom({
                currentUserId: user.id,
                targetUserId: data.meta?.owner_id || "unknown",
                context_type: "service",
                context_id: data.id,
            });
            navigate(`/chat/${room.id}`);
        });
    }

    // handler booking
    function handleBooking() {
        triggerLoginRequired(() => {
            navigate(`/service/${id}/booking`);
        });
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
            <ListingDetailView data={data} onPrimaryAction={handleBooking} />

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

            <LoginRequiredDialog
                open={open}
                onClose={handleClose}
                onLogin={handleLogin}
            />
        </div>
    );
}
