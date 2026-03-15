// src/core/auth/pages/LoginPage.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDocumentTitle } from "@/core/ui/document/useDocumentTitle";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

import { useAuthService } from "../auth.service";
import type { AuthMethod } from "../auth.types";

import LoginMethodSwitcher from "../components/LoginMethodSwitcher";
import { PasswordLoginForm } from "../components/PasswordLoginForm";
import OtpLoginForm from "../components/OtpLoginForm";

export default function LoginPage() {
    useDocumentTitle("Login");

    const { isMobile } = useBreakpoint();
    const auth = useAuthService();

    const [methods, setMethods] = useState<AuthMethod[]>([]);
    const [method, setMethod] = useState<AuthMethod>("password");

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
                relative flex min-h-screen items-center justify-center
                px-4
            "
            style={{
                background: "var(--color-background)",
            }}
        >
            {/* Gradient background glow */}
            {!isMobile && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div
                        className="h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
                        style={{
                            background: "var(--color-primary)",
                        }}
                    />
                </div>
            )}

            {/* Login Card */}
            <div
                className={`
                    relative w-full
                    ${isMobile ? "max-w-sm" : "max-w-md"}
                    rounded-2xl
                    shadow-xl
                `}
                style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                }}
            >
                <div className={isMobile ? "p-6" : "p-8"}>
                    {/* Header */}
                    <div className="mb-8 text-center">
                        {/* Logo */}
                        <div
                            className="
                                mx-auto mb-4 flex items-center justify-center
                                rounded-xl
                                text-white
                                shadow
                            "
                            style={{
                                width: isMobile ? 56 : 48,
                                height: isMobile ? 56 : 48,
                                background: "var(--color-primary)",
                            }}
                        >
                            <span className="text-sm font-bold">
                                {import.meta.env.VITE_APP_CODE || "APP"}
                            </span>
                        </div>

                        <h1
                            className={`
                                font-semibold
                                ${isMobile ? "text-xl" : "text-2xl"}
                            `}
                            style={{ color: "var(--color-text)" }}
                        >
                            {import.meta.env.VITE_APP_TITLE}
                        </h1>

                        <p
                            className="mt-1 text-sm"
                            style={{ color: "var(--color-text-muted)" }}
                        >
                            Sign in to continue to your workspace
                        </p>
                    </div>

                    {/* Login Method Switcher */}
                    <LoginMethodSwitcher
                        methods={methods}
                        value={method}
                        onChange={setMethod}
                    />

                    {/* Login Forms */}
                    <div className="mt-4">
                        {method === "otp" && <OtpLoginForm />}

                        {method === "password" && <PasswordLoginForm />}
                    </div>

                    {/* Register Link */}
                    <div
                        className="mt-5 text-center text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        Belum punya akun?{" "}
                        <Link
                            to="/register"
                            className="font-medium"
                            style={{ color: "var(--color-primary)" }}
                        >
                            Daftar di sini
                        </Link>
                    </div>

                    {/* Footer */}
                    <div
                        className="mt-8 text-center text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        © {new Date().getFullYear()}{" "}
                        {import.meta.env.VITE_APP_TITLE}
                    </div>
                </div>
            </div>
        </div>
    );
}
