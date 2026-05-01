// src/core/ui/layout/Footer.tsx

import { useBranding } from "@/core/branding/hooks/useBranding";

export default function Footer() {
    const { appName } = useBranding();
    const VERSION = import.meta.env.VITE_BUILD_VERSION;
    const COPYRIGHT = import.meta.env.VITE_APP_COPYRIGHT;
    const MAX_WIDTH = import.meta.env.VITE_APP_MAX_WIDTH;

    return (
        <footer
            className="border-t backdrop-blur-sm"
            style={{
                borderColor: "rgba(255,255,255,0.08)",
                background: `
                    linear-gradient(
                        to right,
                        var(--color-primary),
                        var(--color-secondary)
                    )
                `,
                boxShadow: "0 -1px 8px rgba(0,0,0,0.06)",
            }}
        >
            <div
                className="mx-auto w-full px-6 py-4"
                style={{ maxWidth: MAX_WIDTH }}
            >
                <div className="flex items-center justify-between text-sm">
                    {/* Left */}
                    <div className="flex items-center gap-3">
                        <span
                            className="font-semibold tracking-wide"
                            style={{ color: "#ffffff" }}
                        >
                            {appName}
                        </span>

                        <span style={{ color: "rgba(255,255,255,0.35)" }}>
                            |
                        </span>

                        <span
                            style={{
                                color: "rgba(255,255,255,0.75)",
                            }}
                        >
                            © {new Date().getFullYear()} {COPYRIGHT}
                        </span>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-4">
                        <span
                            className="px-3 py-1 text-xs font-medium tracking-wide"
                            style={{
                                background: "rgba(255,255,255,0.12)",
                                color: "#ffffff",
                                borderRadius: "9999px",
                                border: "1px solid rgba(255,255,255,0.15)",
                                backdropFilter: "blur(8px)",
                            }}
                        >
                            v{VERSION}
                        </span>

                        <span
                            className="h-4 w-px"
                            style={{
                                background: "var(--color-border)",
                            }}
                        />

                        <span
                            style={{
                                color: "rgba(255,255,255,0.65)",
                            }}
                        >
                            Engineered with precision
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
