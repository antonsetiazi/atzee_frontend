// src/modules/auth/components/RegisterForm.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpPost } from "@/core/http/http.client";

import {
    Button,
    EmailField,
    PasswordField,
    TextField,
} from "@/core/ui/components";

import RegisterRoleSwitcher from "./RegisterRoleSwitcher";

const TENANT_CODE = import.meta.env.VITE_TENANT_CODE;

export default function RegisterForm() {
    const navigate = useNavigate();

    const [registerAs, setRegisterAs] = useState<"user" | "partner">("user");

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            await httpPost(
                "/auth/register/",
                {
                    full_name: fullName,
                    email,
                    password,
                    tenant_code: TENANT_CODE,
                    register_as: registerAs,
                },
                { skipAuth: true },
            );

            navigate("/login", { replace: true });
        } catch (err: any) {
            console.error(err);
            setError(err?.message || "Registrasi gagal. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <RegisterRoleSwitcher value={registerAs} onChange={setRegisterAs} />

            <TextField
                name="full_name"
                label="Nama Lengkap"
                value={fullName}
                required
                disabled={loading}
                onChange={(_, value) => setFullName(value)}
            />

            <EmailField
                name="email"
                label="Email"
                value={email}
                required
                disabled={loading}
                onChange={(_, value) => setEmail(value)}
            />

            <PasswordField
                name="password"
                label="Password"
                value={password}
                required
                disabled={loading}
                onChange={(_, value) => setPassword(value)}
            />

            {error && (
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
            )}

            <Button type="submit" loading={loading} fullWidth>
                {loading
                    ? "Processing..."
                    : registerAs === "user"
                      ? "Daftar User"
                      : "Daftar Partner"}
            </Button>
        </form>
    );
}
