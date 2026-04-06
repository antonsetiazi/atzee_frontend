// src/business/entities/blocks/BlockHeader.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useSessionStore } from "@/core/session/session.store";

interface Props {
    block: any;
}

export default function BlockHeader({ block }: Props) {
    const user = useSessionStore((s) => s.user);
    const [isScrolled, setIsScrolled] = useState(false);

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
        <div className="relative w-full">
            {/* 🔥 HERO BACKGROUND */}
            <div
                className="absolute inset-0 rounded-b-[32px]"
                style={{
                    background:
                        "linear-gradient(135deg, #7c3aed, #9333ea, #6366f1)",
                }}
            />

            {/* 🔥 CONTENT */}
            <div
                className={`
                    relative px-4
                    transition-all duration-300
                    ${isScrolled ? "pt-4 pb-4" : "pt-6 pb-8"}
                `}
            >
                {/* TOP ROW */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-white text-sm opacity-80">
                            Hello,
                        </div>
                        <div className="text-white text-xl font-semibold">
                            {user?.full_name?.split(" ")[0] || "User"}
                        </div>
                    </div>

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                        {user?.full_name?.charAt(0) || "U"}
                    </div>
                </div>

                {/* SUBTITLE */}
                <div className="text-white/80 text-sm mt-2">
                    {block.subtitle}
                </div>

                {/* 🔥 SLOT UNTUK CHILD BLOCK (banner nanti) */}
                <div className="mt-4">
                    {/* nanti bisa inject banner di sini */}
                </div>
            </div>
        </div>
    );
}
