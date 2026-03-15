// src/core/auth/LoginForm.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "@/core/auth/auth.service";
import { Button, EmailField, PasswordField } from "@/core/ui/components";

const TENANT_CODE = import.meta.env.VITE_TENANT_CODE;
const EMAIL = import.meta.env.VITE_DEFAULT_LOGIN_EMAIL;
const PASSWORD = import.meta.env.VITE_DEFAULT_LOGIN_PASSWORD;

export function PasswordLoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(EMAIL); // default untuk dev
    const [password, setPassword] = useState(PASSWORD);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const auth = useAuthService();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await auth.loginPassword({
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

    const errorBox = (
        <div
            className="rounded-lg px-3 py-2 text-sm"
            style={{
                background: "rgba(239,68,68,0.08)",
                color: "var(--color-danger)",
                border: "1px solid rgba(239,68,68,0.25)",
            }}
        >
            {error}
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-5">
            <EmailField
                name="email"
                label="Email"
                placeholder="you@example.com"
                value={email}
                error={error ?? undefined}
                required
                disabled={loading}
                onChange={(_, value) => setEmail(value)}
            />

            <PasswordField
                name="password"
                label="Password"
                value={password}
                error={error ?? undefined}
                required
                disabled={loading}
                onChange={(_, value) => setPassword(value)}
            />

            {/* ERROR */}
            {error && errorBox}

            <Button type="submit" loading={loading} fullWidth>
                {loading ? "Signing in..." : "Login"}
            </Button>
        </form>
    );
}
