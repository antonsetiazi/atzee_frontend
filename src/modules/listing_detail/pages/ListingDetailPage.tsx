// src/modules/listing_detail/pages/ListingDetailPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeftIcon,
    ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

import ListingDetailView from "../components/ListingDetailView";
import { useListingDetail } from "../hooks/useListingDetail";

import { chatService } from "@/business/chat/chat.service";

import { useSessionStore } from "@/core/session/session.store";
import { useRequireLogin } from "@/core/auth/useRequireLogin";
import LoginRequiredDialog from "@/core/auth/LoginRequiredDialog";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import ListingSection from "@/modules/listing/components/sections/ListingSection";
import { useServiceListing } from "@/modules/listing/hooks/useServiceListing";

interface Props {
    type: "product" | "service";
}

export default function ListingDetailPage({ type }: Props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isMobile } = useBreakpoint();

    const { user } = useSessionStore();

    const { data, loading, error } = useListingDetail(id, type);

    const { open, handleClose, handleLogin, triggerLoginRequired } =
        useRequireLogin();

    const { listings } = useServiceListing();

    function handleClick(item: any) {
        if (item.type === "service") {
            navigate(`/service/${item.id}`);
            return;
        }

        navigate(`/product/${item.id}`);
    }

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
    const handleChatNow = async () => {
        triggerLoginRequired(async () => {
            if (!data || !user) return;

            const room = await chatService.getOrCreateRoom({
                currentUserId: String(user.id),
                targetUserId: String(data.owner_user_id),
                context_type: "service",
                context_id: String(data.id),
            });

            navigate(`/chat/${room.id}`);
        });
    };

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

    if (!isMobile) {
        return (
            <div className="space-y-6">
                <ListingDetailView
                    data={data}
                    onPrimaryAction={handlePrimaryAction}
                />

                <div className="p-4">
                    <div className="flex justify-center">
                        <button
                            onClick={handleChatNow}
                            className="
                                group
                                inline-flex items-center gap-2
                                px-4 py-2.5
                                rounded-full

                                bg-[var(--color-primary)]
                                
                                text-white

                                border border-[var(--color-primary)]/20

                                text-sm font-medium

                                transition-all duration-200
                                hover:bg-[var(--color-primary)]/20
                                active:scale-95
                            "
                        >
                            <ChatBubbleLeftRightIcon
                                className="
                                    w-4 h-4
                                    transition-transform duration-200
                                    group-hover:scale-110
                                "
                            />
                            Chat Sekarang
                        </button>
                    </div>
                </div>

                <div className="p-4 space-y-8">
                    <ListingSection
                        title="Ustadz Terdekat"
                        items={listings.slice(0, 4)}
                        onItemClick={handleClick}
                    />

                    <ListingSection
                        title="Paling Populer"
                        items={listings.slice(4, 8)}
                        onItemClick={handleClick}
                    />
                </div>

                <LoginRequiredDialog
                    open={open}
                    onClose={handleClose}
                    onLogin={handleLogin}
                />
            </div>
        );
    }

    // ================================
    // 🔥 MOBILE PREMIUM UI
    // ================================
    return (
        <div className="relative h-full">
            {/* =========================
               🔝 FLOATING HEADER
            ========================= */}
            <div className="fixed top-0 left-0 right-0 z-40 px-4 pt-4">
                <button
                    onClick={() => {
                        if (window.history.length > 1) navigate(-1);
                        else navigate("/");
                    }}
                    className="
                        group
                        w-10 h-10 flex items-center justify-center
                        rounded-full
                        bg-white/80 backdrop-blur
                        shadow-md border border-white/40
                        active:scale-95
                    "
                >
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-0.5 transition" />
                </button>
            </div>

            {/* =========================
               📜 CONTENT
            ========================= */}
            <main
                className="h-full overflow-y-auto"
                style={{ paddingBottom: 100 }}
            >
                <ListingDetailView
                    data={data}
                    onPrimaryAction={handlePrimaryAction}
                    onBuyNow={handleBuyNow}
                />
            </main>

            {/* =========================
                🔻 STICKY CTA (UPDATED)
                ========================= */}
            <div className="fixed bottom-0 left-0 right-0 z-40">
                <div
                    className="
                        flex gap-3 p-4
                        bg-[var(--color-surface)]
                        border-t
                    "
                    style={{
                        borderColor: "var(--color-border)",
                    }}
                >
                    {/* Chat */}
                    <button
                        onClick={handleChatNow}
                        className="
                            flex items-center justify-center gap-2
                            flex-1 py-3 rounded-xl
                            bg-[var(--color-surface-alt)]
                            text-sm font-medium
                            active:scale-95
                        "
                    >
                        <ChatBubbleLeftRightIcon className="w-5 h-5" />
                        Chat
                    </button>

                    {/* Booking */}
                    <button
                        onClick={handlePrimaryAction}
                        className="
                            flex-1 py-3 rounded-xl
                            bg-[var(--color-primary)]
                            text-white font-semibold
                            shadow-md
                            active:scale-95
                        "
                    >
                        Booking Sekarang
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-8">
                <ListingSection
                    title="Ustadz Terdekat"
                    items={listings.slice(0, 4)}
                    onItemClick={handleClick}
                />

                <ListingSection
                    title="Paling Populer"
                    items={listings.slice(4, 8)}
                    onItemClick={handleClick}
                />
            </div>

            {/* =========================
               AUTH DIALOG
            ========================= */}
            <LoginRequiredDialog
                open={open}
                onClose={handleClose}
                onLogin={handleLogin}
            />
        </div>
    );
}
