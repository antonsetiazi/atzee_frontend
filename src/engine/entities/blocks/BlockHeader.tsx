// src/engine/entities/blocks/BlockHeader.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import NotificationMobileButton from "@/modules/notification/components/NotificationMobileButton";
import { useProfile } from "@/modules/account/profile/hooks/useProfile";

interface Props {
    block: any;
}

export default function BlockHeader({ block }: Props) {
    const { isMobile } = useBreakpoint();
    const { data } = useProfile();
    const fullName = data?.full_name ?? "Guest";
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
        <div
            className={`relative w-full ${bleedClass}`}
            style={{
                background: `var(--color-secondary)`,
            }}
        >
            {/* =============================== */}
            {/* 🔥 CONTENT */}
            {/* =============================== */}
            <div
                className={`relative px-4 pb-3 transition-all duration-300 ${
                    isScrolled ? "pt-4 pb-4" : "pt-6 pb-4"
                }`}
                style={{
                    textShadow: "0 2px 10px rgba(0,0,0,0.18)",
                }}
            >
                {/* 🔥 TOP ROW */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-[11px] tracking-[0.18em] text-white/70 uppercase">
                            Assalamu'alaikum
                        </span>

                        <span className="text-xl font-bold tracking-wide text-white">
                            {fullName}
                        </span>
                    </div>

                    <div className="flex items-center">
                        <NotificationMobileButton />
                    </div>
                </div>
            </div>
            <div
                className="text-center text-[11px] font-medium tracking-[0.18em] text-white/80 uppercase"
                style={{
                    opacity: 0.9,
                }}
            >
                {block.title} - {block.subtitle}
            </div>
        </div>
    );
}
