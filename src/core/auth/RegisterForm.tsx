/* eslint-disable @typescript-eslint/no-explicit-any */
// src/core/auth/RegisterForm.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpPost } from "@/core/http/http.client";

const TENANT_CODE = import.meta.env.VITE_TENANT;

export function RegisterForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>(
        {},
    );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await httpPost(
                "/auth/register/",
                {
                    email,
                    full_name: fullName,
                    password,
                    tenant_code: TENANT_CODE,
                },
                { skipAuth: true },
            );

            // Redirect ke login setelah sukses
            navigate("/login", { replace: true });
        } catch (err: any) {
            console.error(err);
            if (err.fieldErrors) {
                setFieldErrors(err.fieldErrors);
            } else {
                setError(err?.message || "Registration failed");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-5">
            {/* Full Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    autoComplete="off"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900
                        focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                />
                {fieldErrors.full_name && (
                    <div className="mt-1 text-xs text-red-600">
                        {fieldErrors.full_name.join(" ")}
                    </div>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="off"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900
                        focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                />
                {fieldErrors.email && (
                    <div className="mt-1 text-xs text-red-600">
                        {fieldErrors.email.join(" ")}
                    </div>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    autoComplete="new-password"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900
                        focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                />
                {fieldErrors.password && (
                    <div className="mt-1 text-xs text-red-600">
                        {fieldErrors.password.join(" ")}
                    </div>
                )}
            </div>

            {/* Error */}
            {error && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
                    {error}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="relative flex w-full items-center justify-center
                    rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white
                    transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600/30
                    disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? "Registering…" : "Register"}
            </button>
        </form>
    );
}
