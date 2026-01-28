// src/App.tsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "@/core/auth/LoginPage";
import EntryRedirect from "@/core/routing/EntryRedirect";
import AppLayout from "@/core/ui/layout/AppLayout";
import { AppBootstrap } from "./core/bootstrap/AppBootstrap";
import { renderRoute } from "@/core/routing/RouteRenderer";

import { ErrorBoundary } from "@/core/feedback/ErrorBoundary";
import ToastRenderer from "@/core/feedback/ToastRenderer";

// sementara
// import { productRoutes } from "./business/products/product.routes";
import { usersRoutes } from "@/core/users/users.routes";
import { AuthBootstrap } from "./core/auth/AuthBootstrap";
import AuthGuard from "./core/auth/AuthGuard";
import { generateDynamicRoutes } from "@/core/routing/DynamicRoutes";
import { useMenuStore } from "./core/ui/menu/menu.store";
import PageRoutes from "@/core/routing/PageRoutes";
import ConfirmDialog from "@/core/confirm/ConfirmDialog";

function App() {
    // Ambil menu yang sudah filter permission
    const visibleMenus = useMenuStore((state) => state.visibleItems);

    return (
        <ErrorBoundary>
            <AuthBootstrap>
                <BrowserRouter>
                    {/* GLOBAL FEEDBACK UI */}
                    <ToastRenderer />
                    <Routes>
                        {/* PUBLIC */}
                        <Route path="/login" element={<LoginPage />} />

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
                                <Route
                                    path="dashboard"
                                    element={<div>Dashboard</div>}
                                />
                                {usersRoutes.map(renderRoute)}
                                {/* {productRoutes.map(renderRoute)} */}

                                {/* Dynamic menu-driven routes (backend UIMenu) */}
                                {generateDynamicRoutes(visibleMenus)}

                                {/* UIPage-driven routes */}
                                {PageRoutes()}
                            </Route>
                        </Route>
                    </Routes>
                    <ConfirmDialog />
                </BrowserRouter>
            </AuthBootstrap>
        </ErrorBoundary>
    );
}

export default App;
