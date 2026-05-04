// src/core/ui/layout/Footer.tsx

import { useBranding } from "@/core/branding/hooks/useBranding";
import { Link } from "react-router-dom";

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
                className="mx-auto w-full px-6 py-5"
                style={{ maxWidth: MAX_WIDTH }}
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
                    {/* LEFT */}
                    <div className="flex flex-col gap-2">
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

                        {/* 🔥 POLICY LINKS */}
                        <div className="flex flex-wrap items-center gap-4 text-xs">
                            <Link
                                to="/terms-of-service"
                                className="hover:underline"
                                style={{ color: "rgba(255,255,255,0.75)" }}
                            >
                                Terms of Service
                            </Link>

                            <Link
                                to="/privacy-policy"
                                className="hover:underline"
                                style={{ color: "rgba(255,255,255,0.75)" }}
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                to="/terms-and-conditions"
                                className="hover:underline"
                                style={{ color: "rgba(255,255,255,0.75)" }}
                            >
                                Terms & Conditions
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col items-end gap-2">
                        {/* ROW 1 */}
                        <div className="flex items-center gap-3">
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
                                    background: "rgba(255,255,255,0.35)",
                                }}
                            />

                            <span
                                style={{
                                    color: "rgba(255,255,255,0.75)",
                                }}
                            >
                                Powered by Atzee
                            </span>
                        </div>

                        {/* ROW 2 (🔥 penyeimbang) */}
                        <div
                            className="text-xs"
                            style={{
                                color: "rgba(255,255,255,0.55)",
                            }}
                        >
                            Secure • Reliable • Scalable
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
