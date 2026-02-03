// src/core/auth/AuthGuard.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useSessionStore } from "@/core/session/session.store";

export default function AuthGuard() {
    const { isAuthenticated, isHydrated } = useSessionStore();
    if (!isHydrated) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
