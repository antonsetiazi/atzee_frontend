// src/core/routing/handlers/RedirectRootHandler.tsx

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSessionStore } from "../../session/session.store";
import { SmartNavigate } from "../../navigation/SmartNavigate";

const DEFAULT_GUEST_ROUTE = import.meta.env.VITE_DEFAULT_GUEST_ROUTE || "/";
const DEFAULT_DASHBOARD_ROUTE =
    import.meta.env.VITE_DEFAULT_DASHBOARD_ROUTE || "/dashboard";

export default function RedirectRootHandler() {
    const { isAuthenticated, isHydrated } = useSessionStore();
    const location = useLocation();

    useEffect(() => {
        if (!isHydrated) return;

        // hanya redirect jika berada di root "/"
        if (location.pathname === "/") {
            if (isAuthenticated) {
                SmartNavigate.replace(DEFAULT_DASHBOARD_ROUTE);
            } else {
                SmartNavigate.replace(DEFAULT_GUEST_ROUTE);
            }
        }
    }, [isAuthenticated, isHydrated, location.pathname]);

    return null;
}
