// src/core/auth/LoginForm.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "@/core/auth/auth.service";

const TENANT_CODE = import.meta.env.VITE_TENANT;

export function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("customer@ustadzku.com"); // default untuk dev
    const [password, setPassword] = useState("Customer123!");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const auth = useAuthService();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await auth.login({
                email,
                password,
                tenant_code: TENANT_CODE,
            });

            navigate("/dashboard", { replace: true });
        } catch (err) {
            console.error(err);
            setError("Invalid credentials");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-5">
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
                    className="
                        mt-1 w-full rounded-lg border border-gray-300
                        px-3 py-2 text-sm text-gray-900
                        focus:border-indigo-600 focus:outline-none
                        focus:ring-2 focus:ring-indigo-600/20
                    "
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                        mt-1 w-full rounded-lg border border-gray-300
                        px-3 py-2 text-sm text-gray-900
                        focus:border-indigo-600 focus:outline-none
                        focus:ring-2 focus:ring-indigo-600/20
                    "
                />
            </div>

            {/* Error */}
            {error && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="
                    relative flex w-full items-center justify-center
                    rounded-lg bg-indigo-600 px-4 py-2.5
                    text-sm font-medium text-white
                    transition
                    hover:bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-indigo-600/30
                    disabled:cursor-not-allowed disabled:opacity-60
                "
            >
                {loading ? (
                    <>
                        <svg
                            className="mr-2 h-4 w-4 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
                        Signing in…
                    </>
                ) : (
                    "Login"
                )}
            </button>
        </form>
    );
}
