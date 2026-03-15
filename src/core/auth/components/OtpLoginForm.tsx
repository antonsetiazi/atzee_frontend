// src/core/auth/components/OtpLoginForm.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "../auth.service";
import { Button, TelField, TextField } from "@/core/ui/components";

const TENANT_CODE = import.meta.env.VITE_TENANT_CODE;

export default function OtpLoginForm() {
    const auth = useAuthService();
    const navigate = useNavigate();

    const [step, setStep] = useState<"phone" | "otp">("phone");

    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleRequestOtp(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            await auth.requestOtp(phone);
            setStep("otp");
        } catch (err) {
            console.error(err);
            setError("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    }

    async function handleVerifyOtp(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            await auth.loginOtp(phone, otp, TENANT_CODE);

            navigate("/dashboard", { replace: true });
        } catch (err) {
            console.error(err);
            setError("Invalid OTP");
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

    // STEP 1: PHONE INPUT
    if (step === "phone") {
        return (
            <form onSubmit={handleRequestOtp} className="space-y-5">
                <TelField
                    name="phone"
                    label="Phone Number"
                    placeholder="628123456789"
                    value={phone}
                    error={error ?? undefined}
                    required
                    disabled={loading}
                    onChange={(_, value) => setPhone(value)}
                />

                {error && errorBox}

                <Button type="submit" loading={loading} fullWidth>
                    {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
            </form>
        );
    }

    // STEP 2: OTP INPUT
    return (
        <form onSubmit={handleVerifyOtp} className="space-y-5">
            <TextField
                name="otp"
                label="OTP Code"
                placeholder="123456"
                value={otp}
                error={error ?? undefined}
                required
                disabled={loading}
                onChange={(_, value) => setOtp(value)}
            />

            {error && errorBox}

            <Button type="submit" loading={loading} fullWidth>
                {loading ? "Verifying..." : "Login"}
            </Button>
        </form>
    );
}
