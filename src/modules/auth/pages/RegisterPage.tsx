// src/modules/auth/pages/RegisterPage.tsx

import { Link } from "react-router-dom";

import { useDocumentTitle } from "@/core/ui/document/useDocumentTitle";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
    useDocumentTitle("Register");

    const { isMobile } = useBreakpoint();

    const logoUrl = import.meta.env.VITE_APP_LOGO;

    return (
        <div
            className="
                relative min-h-screen overflow-hidden
                flex items-center justify-center
                px-2 py-8
            "
            style={{
                background: `
                    linear-gradient(
                        135deg,
                        var(--color-background),
                        color-mix(in srgb, var(--color-background) 75%, var(--color-primary))
                    )
                `,
            }}
        >
            <div
                className={`relative z-10 w-full ${
                    isMobile ? "max-w-sm" : "max-w-md"
                } rounded-3xl backdrop-blur-xl shadow-2xl`}
                style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                }}
            >
                <div className={isMobile ? "p-3" : "p-8"}>
                    <div className="mb-8 text-center">
                        {logoUrl && (
                            <img src={logoUrl} className="mx-auto mb-5 h-20" />
                        )}

                        <h1
                            className="text-3xl font-semibold"
                            style={{
                                color: "var(--color-text)",
                            }}
                        >
                            {import.meta.env.VITE_APP_TITLE}
                        </h1>

                        <p
                            className="mt-2 text-sm"
                            style={{
                                color: "var(--color-text-muted)",
                            }}
                        >
                            Buat akun baru untuk mulai menggunakan platform
                        </p>
                    </div>

                    <RegisterForm />

                    <div
                        className="mt-6 text-center text-sm"
                        style={{
                            color: "var(--color-text-muted)",
                        }}
                    >
                        Sudah punya akun?{" "}
                        <Link
                            to="/login"
                            className="font-semibold"
                            style={{
                                color: "var(--color-primary)",
                            }}
                        >
                            Login di sini
                        </Link>
                    </div>

                    <div
                        className="mt-8 text-center text-xs"
                        style={{
                            color: "var(--color-text-muted)",
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
