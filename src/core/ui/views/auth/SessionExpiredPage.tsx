// src/core/ui/views/auth/SessionExpiredPage.tsx

import { Link } from "react-router-dom";

export default function SessionExpiredPage() {
    return (
        <div
            className="relative flex h-screen items-center justify-center overflow-hidden"
            style={{
                background:
                    "linear-gradient(to bottom right, var(--color-background), var(--color-surface))",
            }}
        >
            {/* Background Glow (branding-aware) */}
            <div
                className="absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
                style={{ background: "var(--color-primary)" }}
            />
            <div
                className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
                style={{ background: "var(--color-accent)" }}
            />

            {/* Card */}
            <div
                className="relative z-10 w-full max-w-md rounded-2xl p-8 text-center space-y-6 backdrop-blur-xl"
                style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--shadow)",
                }}
            >
                {/* Icon */}
                <div className="flex justify-center">
                    <div
                        className="flex h-14 w-14 items-center justify-center rounded-full"
                        style={{
                            background: "var(--color-surface-alt)",
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            style={{ color: "var(--color-primary)" }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1
                    className="text-2xl font-semibold"
                    style={{ color: "var(--text-primary)" }}
                >
                    Sesi Anda Berakhir
                </h1>

                {/* Description */}
                <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                >
                    Demi keamanan, sesi Anda telah berakhir karena tidak ada
                    aktivitas. Silakan login kembali untuk melanjutkan
                    penggunaan platform.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-2">
                    {/* Primary */}
                    <Link
                        to="/login"
                        className="w-full rounded-lg px-4 py-2.5 text-sm font-medium shadow-sm transition"
                        style={{
                            background: "var(--color-primary)",
                            color: "#fff",
                        }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.opacity = "0.9")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.opacity = "1")
                        }
                    >
                        Login Kembali
                    </Link>

                    {/* Secondary */}
                    <Link
                        to="/"
                        className="w-full rounded-lg px-4 py-2.5 text-sm transition"
                        style={{
                            border: "1px solid var(--color-border)",
                            color: "var(--text-primary)",
                        }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.background =
                                "var(--color-surface-alt)")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.background = "transparent")
                        }
                    >
                        Kembali ke Home
                    </Link>
                </div>

                {/* Footer hint */}
                <p
                    className="text-xs pt-2"
                    style={{ color: "var(--text-muted)" }}
                >
                    Jika ini terjadi berulang, silakan hubungi support.
                </p>
            </div>
        </div>
    );
}
