// src/core/ui/components/auth/LoginButton.tsx

import { useState } from "react";
import AuthButton from "./AuthButton";

interface Props {
    onLogin: () => Promise<void>;
}

export default function LoginButton({ onLogin }: Props) {
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        try {
            setLoading(true);
            await onLogin();
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthButton loading={loading} onClick={handleLogin}>
            Login
        </AuthButton>
    );
}
