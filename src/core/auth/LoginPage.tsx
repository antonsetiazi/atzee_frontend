// src/core/auth/LoginPage.tsx

import { useDocumentTitle } from "../ui/document/useDocumentTitle";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
    useDocumentTitle("Login");

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-linier-to-br from-slate-100 via-gray-100 to-slate-200">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-105 w-105 rounded-full bg-indigo-500/10 blur-3xl" />
            </div>

            {/* Login Card */}
            <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow">
                        {/* Logo placeholder */}
                        <span className="text-lg font-bold">ERP</span>
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        ERP Platform
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Sign in to continue to your workspace
                    </p>
                </div>

                {/* Form */}
                <LoginForm />

                {/* Footer */}
                <div className="mt-8 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} ERP Platform. All rights
                    reserved.
                </div>
            </div>
        </div>
    );
}
