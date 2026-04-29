// src/modules/auth/pages/LoginPage.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDocumentTitle } from "@/core/ui/document/useDocumentTitle";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

import { useAuthService } from "@/app/auth/auth.service";

import LoginMethodSwitcher from "../components/LoginMethodSwitcher";
import { PasswordLoginForm } from "../components/PasswordLoginForm";
import OtpLoginForm from "../components/OtpLoginForm";
import type { AuthMethod } from "@/core/auth/auth.types";

export default function LoginPage() {
    useDocumentTitle("Login");

    const { isMobile } = useBreakpoint();
    const auth = useAuthService();

    const [methods, setMethods] = useState<AuthMethod[]>([]);
    const [method, setMethod] = useState<AuthMethod>("password");

    const logoUrl = import.meta.env.VITE_APP_LOGO;

    useEffect(() => {
        async function loadConfig() {
            const config = await auth.getAuthConfig();

            setMethods(config.methods);
            setMethod(config.default_method);
        }

        loadConfig();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className="
                relative min-h-screen overflow-hidden
                flex items-center justify-center
                px-2 py-8
            "
            style={{
                background: `
                    radial-gradient(circle at top left, rgba(255,255,255,0.06), transparent 28%),
                    radial-gradient(circle at bottom right, rgba(255,255,255,0.05), transparent 25%),
                    linear-gradient(
                        135deg,
                        var(--color-background),
                        color-mix(in srgb, var(--color-background) 75%, var(--color-primary))
                    )
                `,
            }}
        >
            {/* Animated Glow Layer */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="
                        absolute -top-20 -left-20
                        h-72 w-72 rounded-full blur-3xl opacity-20
                        animate-pulse
                    "
                    style={{
                        background: "var(--color-primary)",
                    }}
                />

                <div
                    className="
                        absolute bottom-0 right-0
                        h-80 w-80 rounded-full blur-3xl opacity-20
                        animate-pulse
                    "
                    style={{
                        background: "var(--color-primary)",
                        animationDelay: "1s",
                    }}
                />

                {!isMobile && (
                    <>
                        <div
                            className="absolute top-1/4 left-1/3 h-44 w-44 rounded-full blur-3xl opacity-10"
                            style={{
                                background: "#ffffff",
                            }}
                        />

                        <div
                            className="absolute bottom-1/4 right-1/3 h-52 w-52 rounded-full blur-3xl opacity-10"
                            style={{
                                background: "var(--color-primary)",
                            }}
                        />
                    </>
                )}
            </div>

            {/* Grid Texture */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #ffffff 1px, transparent 1px),
                        linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                    `,
                    backgroundSize: "36px 36px",
                }}
            />

            {/* Login Card */}
            <div
                className={`
                    relative z-10 w-full
                    ${isMobile ? "max-w-sm" : "max-w-md"}
                    rounded-3xl
                    backdrop-blur-xl
                    shadow-2xl
                `}
                style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow:
                        "0 25px 60px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
            >
                <div className={isMobile ? "p-3" : "p-8"}>
                    {/* Header */}
                    <div className="mb-8 text-center">
                        {logoUrl && (
                            <div
                                className="
                                    mx-auto mb-5
                                    flex items-center justify-center
                                    rounded-3xl
                                "
                                style={{
                                    width: isMobile ? 92 : 108,
                                    height: isMobile ? 92 : 108,
                                    background:
                                        "linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    backdropFilter: "blur(12px)",
                                    boxShadow: "0 14px 40px rgba(0,0,0,0.18)",
                                }}
                            >
                                <img
                                    src={logoUrl}
                                    className={isMobile ? "h-16" : "h-20"}
                                />
                            </div>
                        )}

                        <h1
                            className={`
                                font-semibold tracking-tight
                                ${isMobile ? "text-2xl" : "text-3xl"}
                            `}
                            style={{ color: "var(--color-text)" }}
                        >
                            {import.meta.env.VITE_APP_TITLE}
                        </h1>

                        <p
                            className="mt-2 text-sm"
                            style={{
                                color: "var(--color-text-muted)",
                            }}
                        >
                            Selamat datang kembali
                        </p>

                        {/* Tagline */}
                        <div className="mt-5 flex items-center justify-center gap-3">
                            <div
                                className="h-px w-10"
                                style={{
                                    background:
                                        "linear-gradient(to right, transparent, rgba(255,255,255,0.35))",
                                }}
                            />

                            <p
                                className="
                                    text-[11px]
                                    uppercase
                                    tracking-[0.25em]
                                    font-medium
                                "
                                style={{
                                    color: "var(--color-text-muted)",
                                }}
                            >
                                {import.meta.env.VITE_APP_TAGLINE}
                            </p>

                            <div
                                className="h-px w-10"
                                style={{
                                    background:
                                        "linear-gradient(to left, transparent, rgba(255,255,255,0.35))",
                                }}
                            />
                        </div>
                    </div>

                    {/* Switcher */}
                    <LoginMethodSwitcher
                        methods={methods}
                        value={method}
                        onChange={setMethod}
                    />

                    {/* Forms */}
                    <div className="mt-5">
                        {method === "otp" && <OtpLoginForm />}
                        {method === "password" && <PasswordLoginForm />}
                    </div>

                    {/* Register */}
                    <div
                        className="mt-6 text-center text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        Belum punya akun?{" "}
                        <Link
                            to="/register"
                            className="font-semibold transition-opacity hover:opacity-80"
                            style={{
                                color: "var(--color-primary)",
                            }}
                        >
                            Daftar di sini
                        </Link>
                    </div>

                    {/* Footer */}
                    <div
                        className="mt-8 text-center text-xs"
                        style={{
                            color: "var(--color-text-muted)",
                            opacity: 0.8,
                        }}
                    >
                        © {new Date().getFullYear()}{" "}
                        {import.meta.env.VITE_APP_TITLE}
                    </div>
                </div>
            </div>
        </div>
    );
}
