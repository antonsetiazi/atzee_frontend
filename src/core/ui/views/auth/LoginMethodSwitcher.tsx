// src/core/ui/views/auth/LoginMethodSwitcher.tsx

import type { AuthMethod } from "../../../auth/auth.types";
import { Button } from "@/core/ui/components";

interface Props {
    methods: AuthMethod[];
    value: AuthMethod;
    onChange: (method: AuthMethod) => void;
}

export default function LoginMethodSwitcher({
    methods,
    value,
    onChange,
}: Props) {
    if (methods.length <= 1) {
        return null;
    }

    function renderButton(method: AuthMethod, label: string) {
        const active = value === method;

        return (
            <Button
                type="button"
                variant={active ? "primary" : "ghost"}
                fullWidth
                onClick={() => onChange(method)}
            >
                {label}
            </Button>
        );
    }

    return (
        <div
            className="mb-6 flex gap-1 rounded-lg p-1"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            {methods.includes("password") &&
                renderButton("password", "Email Login")}

            {methods.includes("otp") && renderButton("otp", "OTP Login")}
        </div>
    );
}
