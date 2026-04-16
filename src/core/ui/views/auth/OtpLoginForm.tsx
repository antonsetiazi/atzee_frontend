// src/core/ui/views/auth/OtpLoginForm.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "../../../../app/auth/auth.service";
import { Button, OtpInput, TelField } from "@/core/ui/components";
import { runUserBootstrap } from "@/core/bootstrap/services/user.bootstrap";

const TENANT_CODE = import.meta.env.VITE_TENANT_CODE;

export default function OtpLoginForm() {
    const auth = useAuthService();
    const navigate = useNavigate();

    const [step, setStep] = useState<"phone" | "otp">("phone");

    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function submitOtp(code: string) {
        try {
            setLoading(true);
            setError(null);

            await auth.loginOtp(phone, code, TENANT_CODE);
            await runUserBootstrap();

            navigate("/dashboard", { replace: true });
        } catch (err) {
            console.error(err);
            setError("Invalid OTP");
        } finally {
            setLoading(false);
        }
    }

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
        await submitOtp(otp);
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
            <div className="space-y-2 text-center">
                <label className="text-sm text-gray-500">Enter OTP Code</label>

                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    disabled={loading}
                    onComplete={submitOtp}
                />
            </div>

            {error && errorBox}

            <Button type="submit" loading={loading} fullWidth>
                {loading ? "Verifying..." : "Login"}
            </Button>
        </form>
    );
}
