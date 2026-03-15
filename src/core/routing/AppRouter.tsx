// src/core/routing/AppRouter.tsx

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import ToastRenderer from "@/core/feedback/ToastRenderer";
import ConfirmDialog from "@/core/confirm/ConfirmDialog";

import LoginPage from "@/core/auth/pages/LoginPage";
import RegisterPage from "@/core/auth/RegisterPage";

import AppLayout from "@/core/ui/layout/AppLayout";
// import EntryRedirect from "@/core/routing/EntryRedirect";

import { renderRoute } from "@/core/routing/RouteRenderer";
import { usersRoutes } from "@/core/users/users.routes";

// import { MenuRoutes } from "@/core/routing/MenuRoutes";
// import PageRoutes from "@/core/routing/PageRoutes";

// import { useMenuStore } from "@/core/ui/menu/menu.store";

import { usePageStore } from "@/core/ui/page/page.store";
import { buildPageRoutes } from "@/core/routing/PageRoutes";
import { useSessionStore } from "../session/session.store";

const DEFAULT_GUEST_ROUTE = import.meta.env.VITE_DEFAULT_GUEST_ROUTE || "/";
const DEFAULT_DASHBOARD_ROUTE =
    import.meta.env.VITE_DEFAULT_DASHBOARD_ROUTE || "/dashboard";

export default function AppRouter() {
    // const visibleMenus = useMenuStore((state) => state.visibleItems);
    const pages = usePageStore((s) => s.pages);
    const { isAuthenticated, isHydrated } = useSessionStore();

    if (!isHydrated) return null;

    return (
        <BrowserRouter>
            {/* GLOBAL FEEDBACK UI */}
            <ToastRenderer />

            <Routes>
                {/* PUBLIC */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* APP */}
                <Route path="/" element={<AppLayout />}>
                    {usersRoutes.map(renderRoute)}
                    {/* {MenuRoutes(visibleMenus)} */}
                    {buildPageRoutes(pages)}
                </Route>

                {/* CATCH-ALL FALLBACK */}
                <Route
                    path="*"
                    element={
                        isAuthenticated ? (
                            <Navigate to={DEFAULT_DASHBOARD_ROUTE} replace />
                        ) : (
                            <Navigate to={DEFAULT_GUEST_ROUTE} replace />
                        )
                    }
                />
            </Routes>

            <ConfirmDialog />
        </BrowserRouter>
    );
}
