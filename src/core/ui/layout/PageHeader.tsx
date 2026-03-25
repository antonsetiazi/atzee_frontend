// src/core/ui/layout/PageHeader.tsx

import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSessionStore } from "@/core/session/session.store";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
    title?: string;
    description?: string | null;
    isMobile: boolean;
    variant?: "default" | "home";
}

export default function PageHeader({
    title,
    description,
    isMobile,
    variant = "default",
}: PageHeaderProps) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const user = useSessionStore((s) => s.user);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const el = document.getElementById("main-scroll");

        if (!el) return;

        const handleScroll = () => {
            setIsScrolled(el.scrollTop > 10);
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    /**
     * =========================================
     * 🔥 HOME VARIANT (SUPER APP STYLE)
     * =========================================
     */
    if (variant === "home" && isMobile) {
        return (
            <div className="sticky top-0 z-30 w-full bg-[var(--color-background)]">
                <div className="relative w-full">
                    {/* 🔥 BACKGROUND */}
                    <div
                        className="absolute inset-0 rounded-b-[32px]"
                        style={{
                            background:
                                "linear-gradient(135deg, #065f46, #10b981)",
                        }}
                    />

                    {/* 🔥 OVERLAY SAAT SCROLL */}
                    <div
                        className="absolute inset-0 h-36 rounded-b-[32px] transition-all duration-300"
                        style={{
                            background: "var(--color-background)",
                            opacity: isScrolled ? 0 : 0,
                        }}
                    />

                    {/* 🔥 CONTENT */}
                    <div
                        className={`
                            relative px-4 flex flex-col
                            transition-all duration-300
                            ${isScrolled ? "pt-2 pb-3 gap-2" : "pt-4 pb-6 gap-4"}
                        `}
                    >
                        <div
                            className={`
                                flex items-center justify-between 
                                transition-all duration-300
                                ${
                                    isScrolled
                                        ? "opacity-0 -translate-y-2 h-0 overflow-hidden pointer-events-none absolute"
                                        : "opacity-100 relative"
                                }`}
                        >
                            {/* LEFT */}
                            <div className="flex flex-col">
                                <div className="text-white text-sm opacity-90">
                                    {!user
                                        ? "Assalamu’alaikum"
                                        : "Selamat datang"}
                                </div>

                                <div className="text-white font-semibold text-lg">
                                    {user
                                        ? user.full_name?.split(" ")[0]
                                        : title || "Atzee"}
                                </div>
                            </div>

                            {/* RIGHT */}
                            {user ? (
                                <div className="flex items-center gap-2">
                                    {user.avatar_url ? (
                                        <img
                                            src={user.avatar_url}
                                            alt="avatar"
                                            className="w-9 h-9 rounded-full border-2 border-white object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="
                                            w-9 h-9 rounded-full
                                            bg-white/20 text-white
                                            flex items-center justify-center text-sm font-semibold
                                            border border-white/30
                                        "
                                        >
                                            {user.full_name?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => navigate("/login")}
                                    className="
                                        bg-white/20 backdrop-blur
                                        text-white text-sm px-3 py-1.5
                                        rounded-full
                                        border border-white/30
                                    "
                                >
                                    Masuk
                                </button>
                            )}
                        </div>

                        <div
                            className={`
                                flex items-center gap-2
                                bg-white rounded-full
                                shadow-md
                                transition-all duration-300
                                ${isScrolled ? "px-3 py-2" : "px-4 py-3"}
                            `}
                        >
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />

                            <input
                                type="text"
                                placeholder="Cari ustadz, layanan..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * =========================================
     * 🔹 DEFAULT HEADER
     * =========================================
     */
    return (
        <div
            className={`w-full ${isMobile ? "px-4 pt-5 pb-4" : "px-6 py-6"}`}
            style={{
                background: "var(--color-background)",
                borderBottom: "1px solid var(--color-border)",
            }}
        >
            <div
                className={`${
                    isMobile
                        ? "space-y-1"
                        : "flex items-start justify-between gap-6"
                }`}
            >
                {/* Title & Description */}
                <div className="space-y-1">
                    <h1
                        className="font-semibold tracking-tight text-2xl"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        {title || "Entity"}
                    </h1>

                    {description && (
                        <p
                            className="text-sm leading-relaxed max-w-2xl"
                            style={{
                                color: "var(--text-secondary)",
                            }}
                        >
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
