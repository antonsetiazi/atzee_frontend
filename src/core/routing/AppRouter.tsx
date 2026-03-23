// src/core/routing/AppRouter.tsx

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import ToastRenderer from "@/core/feedback/ToastRenderer";
import ConfirmDialog from "@/core/confirm/ConfirmDialog";

import LoginPage from "@/core/ui/views/auth/LoginPage";
import RegisterPage from "@/core/ui/views/auth/RegisterPage";

import AppLayout from "@/core/ui/layout/AppLayout";

import { renderRoute } from "@/core/routing/RouteRenderer";
import { usersRoutes } from "@/core/users/users.routes";

import { usePageStore } from "@/core/ui/page/page.store";
import { buildPageRoutes } from "@/core/routing/PageRoutes";
import { useSessionStore } from "../session/session.store";

import ListingPage from "@/business/listing/ListingPage";
import ProductDetailPage from "@/business/product/ProductDetailPage";
import ServiceDetailPage from "@/business/service/ServiceDetailPage";
import CartPage from "@/app/pages/cart/CartPage";
import CheckoutPage from "@/app/pages/checkout/CheckoutPage";
import OrderPage from "@/app/pages/order/OrderPage";
import OrderDetailPage from "@/app/pages/order/OrderDetailPage";

const DEFAULT_GUEST_ROUTE = import.meta.env.VITE_DEFAULT_GUEST_ROUTE || "/";
const DEFAULT_DASHBOARD_ROUTE =
    import.meta.env.VITE_DEFAULT_DASHBOARD_ROUTE || "/dashboard";

export default function AppRouter() {
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
                    {buildPageRoutes(pages)}

                    <Route
                        path="/products"
                        element={<ListingPage type="product" />}
                    />
                    <Route
                        path="/services"
                        element={<ListingPage type="service" />}
                    />

                    <Route
                        path="/product/:id"
                        element={<ProductDetailPage />}
                    />
                    <Route
                        path="/service/:id"
                        element={<ServiceDetailPage />}
                    />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<OrderPage />} />
                    <Route path="/orders/:id" element={<OrderDetailPage />} />
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
