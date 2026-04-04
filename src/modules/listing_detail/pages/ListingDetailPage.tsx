// src/modules/listing_detail/pages/ListingDetailPage.tsx

import { useParams, useNavigate } from "react-router-dom";

import ListingDetailView from "../components/ListingDetailView";
import { useListingDetail } from "../hooks/useListingDetail";

import { chatService } from "@/business/chat/chat.service";

import { useSessionStore } from "@/core/session/session.store";
import { useRequireLogin } from "@/core/auth/useRequireLogin";
import LoginRequiredDialog from "@/core/auth/LoginRequiredDialog";

interface Props {
    type: "product" | "service";
}

export default function ListingDetailPage({ type }: Props) {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useSessionStore();

    const { data, loading, error } = useListingDetail(id, type);

    const { open, handleClose, handleLogin, triggerLoginRequired } =
        useRequireLogin();

    // ================================
    // 🔥 ACTION HANDLER (UNIFIED)
    // ================================
    function handlePrimaryAction() {
        if (!data) return;

        triggerLoginRequired(() => {
            if (data.type === "service") {
                navigate(`/service/${data.id}/booking`);
                return;
            }

            // 🔥 product → order
            navigate(`/order/create?type=product&id=${data.id}`);
        });
    }

    function handleBuyNow() {
        if (!data) return;

        triggerLoginRequired(() => {
            navigate(`/order/create?type=${data.type}&id=${data.id}`);
        });
    }

    // ================================
    // 🔥 CHAT HANDLER
    // ================================
    function handleChatNow() {
        triggerLoginRequired(() => {
            if (!data || !user) return;

            const room = chatService.getOrCreateRoom({
                currentUserId: String(user.id),
                targetUserId: String(data.meta?.owner_id || "unknown"),
                context_type: "service",
                context_id: String(data.id),
            });
            navigate(`/chat/${room.id}`);
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
            <ListingDetailView
                data={data}
                onPrimaryAction={handlePrimaryAction}
                onBuyNow={handleBuyNow}
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

            <LoginRequiredDialog
                open={open}
                onClose={handleClose}
                onLogin={handleLogin}
            />
        </div>
    );
}
