// src/core/routing/EntryRedirect.tsx

import { Navigate } from "react-router-dom";
import { useSessionStore } from "@/core/session/session.store";

export default function EntryRedirect() {
    const { isAuthenticated, isHydrated } = useSessionStore();

    if (!isHydrated) return null;

    // HANYA untuk "/"
    return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
}
