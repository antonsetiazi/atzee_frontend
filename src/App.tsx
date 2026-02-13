// src/App.tsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "@/core/auth/LoginPage";
import EntryRedirect from "@/core/routing/EntryRedirect";
import AppLayout from "@/core/ui/layout/AppLayout";
import { AppBootstrap } from "./core/bootstrap/AppBootstrap";
import { renderRoute } from "@/core/routing/RouteRenderer";

import { ErrorBoundary } from "@/core/feedback/ErrorBoundary";
import ToastRenderer from "@/core/feedback/ToastRenderer";

import { usersRoutes } from "@/core/users/users.routes";
import { AuthBootstrap } from "./core/auth/AuthBootstrap";
import AuthGuard from "./core/auth/AuthGuard";
import { MenuRoutes } from "@/core/routing/MenuRoutes";
import { useMenuStore } from "./core/ui/menu/menu.store";
import PageRoutes from "@/core/routing/PageRoutes";
import ConfirmDialog from "@/core/confirm/ConfirmDialog";
// import DashboardPage from "@/core/dashboard/DashboardPage";
import { BrandingProvider } from "./core/ui/branding/BrandingProvider";
import RegisterPage from "./core/auth/RegisterPage";

function App() {
    // Ambil menu yang sudah filter permission
    const visibleMenus = useMenuStore((state) => state.visibleItems);

    return (
        <ErrorBoundary>
            <AuthBootstrap>
                <BrandingProvider>
                    <BrowserRouter>
                        {/* GLOBAL FEEDBACK UI */}
                        <ToastRenderer />
                        <Routes>
                            {/* PUBLIC */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />

                            {/* PROTECTED AREA */}
                            <Route element={<AuthGuard />}>
                                <Route
                                    path="/"
                                    element={
                                        <AppBootstrap>
                                            <AppLayout />
                                        </AppBootstrap>
                                    }
                                >
                                    {/* ROOT ONLY */}
                                    <Route index element={<EntryRedirect />} />
                                    {/* <Route
                                        path="dashboard"
                                        element={<DashboardPage />}
                                    /> */}
                                    {usersRoutes.map(renderRoute)}
                                    {/* {productRoutes.map(renderRoute)} */}

                                    {/* Dynamic menu-driven routes (backend UIMenu) */}
                                    {MenuRoutes(visibleMenus)}

                                    {/* UIPage-driven routes */}
                                    {PageRoutes()}
                                </Route>
                            </Route>
                        </Routes>
                        <ConfirmDialog />
                    </BrowserRouter>
                </BrandingProvider>
            </AuthBootstrap>
        </ErrorBoundary>
    );
}

export default App;
