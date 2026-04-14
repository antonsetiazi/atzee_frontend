// src/core/ui/layout/BrandHeader.tsx

import { useNavigate } from "react-router-dom";

export default function BrandHeader() {
    const MAX_WIDTH = import.meta.env.VITE_APP_MAX_WIDTH;
    const navigate = useNavigate();

    const logoUrl = import.meta.env.VITE_APP_LOGO;
    const appName = import.meta.env.VITE_APP_NAME || "Ustadzku";
    const tagline = import.meta.env.VITE_APP_TAGLINE;

    return (
        <div
            className="relative border-b overflow-hidden"
            style={{
                borderColor: "rgba(255,255,255,0.08)",
                background: `
                    linear-gradient(
                        to right,
                        rgba(255,255,255,0.06),
                        rgba(255,255,255,0.02)
                    )
                `,
                backdropFilter: "blur(12px)",
            }}
        >
            {/* 🔥 Glow Layer (WOW effect) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(circle at 10% 50%, 
                        var(--color-primary), 
                        transparent 40%)
                    `,
                    opacity: 0.25,
                    filter: "blur(50px)",
                }}
            />

            <div
                className="relative mx-auto flex items-center px-6 py-4"
                style={{ maxWidth: MAX_WIDTH }}
            >
                {/* LEFT */}
                <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    {/* Logo Container (🔥 upgrade feel) */}
                    {logoUrl && (
                        <div
                            className="flex items-center justify-center rounded-2xl"
                            style={{
                                width: 68,
                                height: 68,
                                background: "rgba(255,255,255,0.1)",
                                backdropFilter: "blur(10px)",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                            }}
                        >
                            <img src={logoUrl} className="h-14" />
                        </div>
                    )}

                    <div className="flex flex-col">
                        <span
                            className="text-lg font-semibold"
                            style={{ color: "var(--text-primary)" }}
                        >
                            {appName}
                        </span>

                        <span
                            className="text-xs"
                            style={{ color: "var(--text-muted)" }}
                        >
                            {tagline}
                        </span>
                    </div>
                </div>

                {/* Divider */}
                <div
                    className="mx-6 h-10 w-px"
                    style={{
                        background: "rgba(255,255,255,0.08)",
                    }}
                />

                {/* RIGHT (🔥 Balanced + Emotional) */}
                <div className="ml-auto flex items-center gap-6">
                    <div className="text-right">
                        <div
                            className="text-sm font-semibold"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Assalamu’alaikum 👋
                        </div>
                        <div
                            className="text-xs"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Semoga harimu penuh berkah
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
