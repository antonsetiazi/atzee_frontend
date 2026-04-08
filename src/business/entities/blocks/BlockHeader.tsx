// src/business/entities/blocks/BlockHeader.tsx
// src/business/entities/blocks/BlockHeader.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useSessionStore } from "@/core/session/session.store";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

interface Props {
    block: any;
}

export default function BlockHeader({ block }: Props) {
    const { isMobile } = useBreakpoint();
    const user = useSessionStore((s) => s.user);

    const [isScrolled, setIsScrolled] = useState(false);

    // 🔥 Bleed hanya desktop
    const shouldBleed = block.bleed && !isMobile;
    const bleedClass = shouldBleed ? "-mt-14" : "";

    useEffect(() => {
        const el = document.getElementById("main-scroll");
        if (!el) return;

        const handleScroll = () => {
            setIsScrolled(el.scrollTop > 40);
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`relative w-full ${bleedClass}`}>
            {/* =============================== */}
            {/* 🔥 BACKGROUND (BRANDING AWARE) */}
            {/* =============================== */}
            <div
                className="absolute inset-0 rounded-b-[32px]"
                style={{
                    background: `
                        linear-gradient(
                            135deg,
                            var(--header-gradient-start, var(--color-primary)),
                            var(--header-gradient-mid, var(--color-secondary)),
                            var(--header-gradient-end, var(--color-accent))
                        )
                    `,
                }}
            />

            {/* 🔥 Soft overlay (depth effect) */}
            <div className="absolute inset-0 rounded-b-[32px] bg-black/10" />

            {/* 🔥 Blur glow (premium effect) */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />
            <div className="absolute top-10 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full" />

            {/* =============================== */}
            {/* 🔥 CONTENT */}
            {/* =============================== */}
            <div
                className={`
                    relative px-4
                    transition-all duration-300
                    ${isScrolled ? "pt-4 pb-4" : "pt-6 pb-8"}
                `}
            >
                {/* 🔥 TOP ROW */}
                <div className="flex items-center justify-between">
                    {/* Greeting */}
                    <div>
                        {block.show_greeting && (
                            <div className="text-white/80 text-sm">Hello,</div>
                        )}

                        <div className="text-white text-xl font-semibold tracking-tight">
                            {user?.full_name?.split(" ")[0] || "User"}
                        </div>
                    </div>

                    {/* Avatar */}
                    {block.show_avatar && (
                        <div
                            className="
                            w-10 h-10 rounded-full
                            bg-white/20 backdrop-blur-md
                            flex items-center justify-center
                            text-white font-bold
                            border border-white/20
                        "
                        >
                            {user?.full_name?.charAt(0) || "U"}
                        </div>
                    )}
                </div>

                {/* 🔥 SUBTITLE */}
                {block.subtitle && (
                    <div className="text-white/80 text-sm mt-2 max-w-[80%]">
                        {block.subtitle}
                    </div>
                )}

                {/* 🔥 SLOT (future: banner injection) */}
                <div className="mt-4">{/* extensible slot */}</div>
            </div>
        </div>
    );
}
