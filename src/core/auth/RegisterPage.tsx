// src/core/auth/RegisterPage.tsx

import { useDocumentTitle } from "../ui/document/useDocumentTitle";
import { useBreakpoint } from "../ui/layout/hooks/useBreakpoint";
import { RegisterForm } from "./RegisterForm";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    useDocumentTitle("Register");

    const { isMobile } = useBreakpoint();

    return (
        <div
            className={`relative flex min-h-screen items-center justify-center ${
                isMobile
                    ? "bg-white px-4"
                    : "bg-linear-to-br from-slate-100 via-gray-100 to-slate-200"
            }`}
        >
            {!isMobile && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-105 w-105 rounded-full bg-indigo-500/10 blur-3xl" />
                </div>
            )}

            <div
                className={`relative w-full ${
                    isMobile
                        ? "max-w-sm"
                        : "max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200"
                }`}
            >
                <div className="mb-8 text-center">
                    <div
                        className={`mx-auto mb-4 flex items-center justify-center
                        rounded-xl bg-indigo-600 text-white shadow
                        ${isMobile ? "h-14 w-14" : "h-12 w-12"}`}
                    >
                        <span className="text-lg font-bold">ERP</span>
                    </div>

                    <h1
                        className={`${isMobile ? "text-xl" : "text-2xl"} font-semibold text-gray-800`}
                    >
                        {import.meta.env.VITE_TENANT_LABEL}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Create your account to start using the workspace
                    </p>
                </div>

                <RegisterForm />

                {/* Link kembali ke Login */}
                <div className="mt-4 text-center text-sm text-gray-500">
                    Sudah punya akun?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-indigo-600 hover:text-indigo-700"
                    >
                        Masuk di sini
                    </Link>
                </div>

                <div className="mt-8 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} ERP Platform.
                </div>
            </div>
        </div>
    );
}
