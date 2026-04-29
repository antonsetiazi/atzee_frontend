// src/business/entities/blocks/BlockHeader.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import NotificationMobileButton from "@/modules/notification/components/NotificationMobileButton";

interface Props {
    block: any;
}

export default function BlockHeader({ block }: Props) {
    const { isMobile } = useBreakpoint();

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
                className="absolute inset-0 rounded-b-[12px]"
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
            <div className="absolute inset-0 rounded-b-[12px] bg-black/10" />

            {/* 🔥 Blur glow (premium effect) */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />
            <div className="absolute top-10 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full" />

            {/* =============================== */}
            {/* 🔥 CONTENT */}
            {/* =============================== */}
            <div
                className={` 
                    relative px-4
                    mb-4
                    transition-all duration-300
                    ${isScrolled ? "pt-4 pb-4" : "pt-6 pb-7"}
                `}
            >
                {/* 🔥 TOP ROW */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-white text-lg font-semibold">
                            {block.title}
                        </span>
                        <p
                            className="
                            text-white
                                    text-[12px]
                                    font-medium
                                    uppercase
                                    tracking-[0.12em]
                                "
                            style={{
                                // color: "var(--color-text-muted)",
                                opacity: 0.9,
                            }}
                        >
                            {block.subtitle}
                        </p>
                    </div>

                    <div className="flex items-center">
                        <NotificationMobileButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
