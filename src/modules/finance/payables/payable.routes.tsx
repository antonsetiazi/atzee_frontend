// src/modules/finance/payables/payable.routes.tsx

import { Route } from "react-router-dom";

import PayablesDashboardPage from "./dashboard/pages/PayablesDashboardPage";

import PayableInvoiceListPage from "./invoices/pages/PayableInvoiceListPage";
import PayableInvoiceDetailPage from "./invoices/pages/PayableInvoiceDetailPage";
import PayableInvoiceCreatePage from "./invoices/pages/PayableInvoiceCreatePage";

import PayablePaymentListPage from "./payments/pages/PayablePaymentListPage";
import PayablePaymentCreatePage from "./payments/pages/PayablePaymentCreatePage";
import PayablePaymentDetailPage from "./payments/pages/PayablePaymentDetailPage";

export const payableRoutes = (
    <>
        {/* =========================
            DASHBOARD
        ========================= */}
        <Route path="/finance/payables/dashboard" element={<PayablesDashboardPage />} />

        {/* =========================
            INVOICES
        ========================= */}
        <Route path="/finance/payables/invoices" element={<PayableInvoiceListPage />} />
        <Route path="/finance/payables/invoices/create" element={<PayableInvoiceCreatePage />} />
        <Route
            path="/finance/payables/invoices/:invoiceId"
            element={<PayableInvoiceDetailPage />}
        />

        {/* =========================
            PAYMENTS
        ========================= */}
        <Route path="/finance/payables/payments" element={<PayablePaymentListPage />} />
        <Route path="/finance/payables/payments/create" element={<PayablePaymentCreatePage />} />
        <Route
            path="/finance/payables/payments/:paymentId"
            element={<PayablePaymentDetailPage />}
        />
    </>
);
