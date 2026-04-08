// src/core/routing/RedirectRootHandler.tsx

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSessionStore } from "../session/session.store";

const DEFAULT_GUEST_ROUTE = import.meta.env.VITE_DEFAULT_GUEST_ROUTE || "/";
const DEFAULT_DASHBOARD_ROUTE =
    import.meta.env.VITE_DEFAULT_DASHBOARD_ROUTE || "/dashboard";

export default function RedirectRootHandler() {
    const { isAuthenticated, isHydrated } = useSessionStore();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isHydrated) return;

        // hanya redirect jika berada di root "/"
        if (location.pathname === "/") {
            if (isAuthenticated) {
                navigate(DEFAULT_DASHBOARD_ROUTE, { replace: true });
            } else {
                navigate(DEFAULT_GUEST_ROUTE, { replace: true });
            }
        }
    }, [isAuthenticated, isHydrated, location.pathname, navigate]);

    return null;
}
