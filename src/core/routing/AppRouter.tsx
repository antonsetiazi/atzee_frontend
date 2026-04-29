// src/core/routing/AppRouter.tsx

import { useEffect } from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
    useNavigate,
} from "react-router-dom";

import ToastRenderer from "@/core/feedback/ToastRenderer";
import ConfirmDialog from "@/core/confirm/ConfirmDialog";
import ModalProvider from "@/core/modal/ModalProvider";

import LoginPage from "@/modules/auth/pages/LoginPage";
import RegisterPage from "@/modules/auth/pages/RegisterPage";

import AppLayout from "@/core/ui/layout/AppLayout";

import { renderRoute } from "@/core/routing/RouteRenderer";
import { usersRoutes } from "@/core/users/users.routes";

import { usePageStore } from "@/core/ui/page/page.store";
import { buildPageRoutes } from "@/core/routing/PageRoutes";
import { useSessionStore } from "../session/session.store";

import SessionExpiredPage from "@/modules/auth/pages/SessionExpiredPage";

import ProfilePage from "@/modules/account/profile/pages/ProfilePage";
import AddressListPage from "@/modules/account/address/pages/AddressListPage";
import AddressCreatePage from "@/modules/account/address/pages/AddressCreatePage";
import AddressEditPage from "@/modules/account/address/pages/AddressEditPage";
import BankAccountPage from "@/modules/account/bank/pages/BankAccountPage";

import CartPage from "@/app/pages/cart/CartPage";
import OrderPage from "@/modules/order/pages/OrderPage";
import OrderDetailPage from "@/modules/order/pages/OrderDetailPage";
import ListingPage from "@/modules/listing/pages/ListingPage";
import ProductDetailPage from "@/modules/listing_detail/pages/ProductDetailPage";
import ServiceDetailPage from "@/modules/listing_detail/pages/ServiceDetailPage";
import ServiceBookingPage from "@/modules/booking/pages/ServiceBookingPage";
import CheckoutPage from "@/modules/checkout/pages/CheckoutPage";
import ChatPage from "@/modules/chat/ChatPage";
import PageMetaWrapper from "./PageMetaWrapper";
import TrackingPage from "@/modules/tracking/pages/TrackingPage";
import PartnerOrderPage from "@/modules/partner_order/pages/PartnerOrderPage";
import PartnerOrderDetailPage from "@/modules/partner_order/pages/PartnerOrderDetailPage";
import PartnerSchedulePage from "@/modules/partner_schedule/pages/PartnerSchedulePage";
import RedirectRootHandler from "./RedirectRootHandler";
import WalletPage from "@/modules/wallet/pages/WalletPage";
import WalletWithdrawPage from "@/modules/withdrawal/pages/WalletWithdrawPage";
import WalletTopupPage from "@/modules/wallet/pages/WalletTopupPage";
import NotificationToastContainer from "@/modules/notification/components/NotificationToastContainer";

import { SmartNavigate } from "@/core/navigation/SmartNavigate";
import NativeBridgeTestPage from "@/modules/dev/pages/NativeBridgeTestPage";

const DEFAULT_GUEST_ROUTE = import.meta.env.VITE_DEFAULT_GUEST_ROUTE || "/";
const DEFAULT_DASHBOARD_ROUTE =
    import.meta.env.VITE_DEFAULT_DASHBOARD_ROUTE || "/dashboard";

function NavigationRegistrar() {
    const navigate = useNavigate();

    useEffect(() => {
        SmartNavigate.register(navigate);
    }, [navigate]);

    return null;
}

export default function AppRouter() {
    const pages = usePageStore((s) => s.pages);
    const { isAuthenticated, isHydrated } = useSessionStore();

    if (!isHydrated) return null;
    return (
        <BrowserRouter>
            <NavigationRegistrar />
            {/* GLOBAL FEEDBACK UI */}
            <ToastRenderer />
            <RedirectRootHandler />
            <NotificationToastContainer />
            {/* 🔥 GLOBAL MODAL */}
            <ModalProvider />

            <Routes>
                {/* PUBLIC */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dev/native" element={<NativeBridgeTestPage />} />

                {/* APP */}
                <Route path="/" element={<AppLayout />}>
                    {usersRoutes.map(renderRoute)}
                    {buildPageRoutes(pages)}

                    <Route path="/account/profile" element={<ProfilePage />} />

                    <Route
                        path="/account/address"
                        element={<AddressListPage />}
                    />
                    <Route
                        path="/account/address/create"
                        element={<AddressCreatePage />}
                    />
                    <Route
                        path="/account/address/edit/:id"
                        element={<AddressEditPage />}
                    />

                    <Route path="/account/bank" element={<BankAccountPage />} />

                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/chat/:roomId" element={<ChatPage />} />

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

                    <Route
                        path="/service/:id/booking"
                        element={<ServiceBookingPage />}
                    />

                    <Route path="/cart" element={<CartPage />} />

                    <Route
                        path="/checkout"
                        element={
                            <PageMetaWrapper
                                meta={{
                                    showBottomNav: false,
                                    showHeader: false,
                                }}
                            >
                                <CheckoutPage />
                            </PageMetaWrapper>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <PageMetaWrapper
                                meta={{
                                    showBottomNav: true,
                                }}
                            >
                                <OrderPage />
                            </PageMetaWrapper>
                        }
                    />
                    <Route path="/orders/:id" element={<OrderDetailPage />} />

                    {/* =========================
                        🔥 PARTNER ORDER
                        ========================= */}
                    <Route
                        path="/partner/orders"
                        element={
                            <PageMetaWrapper
                                meta={{
                                    showBottomNav: true,
                                }}
                            >
                                <PartnerOrderPage />
                            </PageMetaWrapper>
                        }
                    />

                    <Route
                        path="/partner/orders/:id"
                        element={<PartnerOrderDetailPage />}
                    />

                    {/* =========================
                            🔥 PARTNER SCHEDULE
                        ========================= */}
                    <Route
                        path="/partner/schedule"
                        element={
                            <PageMetaWrapper
                                meta={{
                                    showBottomNav: true,
                                }}
                            >
                                <PartnerSchedulePage />
                            </PageMetaWrapper>
                        }
                    />

                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/wallet/topup" element={<WalletTopupPage />} />
                    <Route
                        path="/wallet/withdraw"
                        element={<WalletWithdrawPage />}
                    />

                    {/* <Route path="/bookings" element={<BookingListPage />} />
                    <Route
                        path="/bookings/:id"
                        element={<BookingDetailPage />}
                    /> */}

                    <Route path="/tracking/:id" element={<TrackingPage />} />
                </Route>

                <Route
                    path="/session-expired"
                    element={<SessionExpiredPage />}
                />

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
