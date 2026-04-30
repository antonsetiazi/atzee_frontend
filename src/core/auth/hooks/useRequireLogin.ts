// src/core/auth/hooks/useRequireLogin.ts

import { useState } from "react";
import { useSessionStore } from "@/core/session/session.store";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

export function useRequireLogin() {
    const { isAuthenticated } = useSessionStore();
    const [open, setOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(
        null,
    );

    function triggerLoginRequired(action: () => void) {
        if (isAuthenticated) {
            action();
        } else {
            setPendingAction(() => action);
            setOpen(true);
        }
    }

    function handleLogin() {
        // arahkan ke halaman login
        SmartNavigate.go("/login");
    }

    function handleClose() {
        setOpen(false);
        setPendingAction(null);
    }

    function handleContinue() {
        // jalankan action yang ditunda
        if (pendingAction) pendingAction();
        handleClose();
    }

    return {
        open,
        handleClose,
        handleLogin,
        handleContinue,
        triggerLoginRequired,
    };
}
