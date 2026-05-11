// src/modules/finance/receivables/receivable.routes.tsx

import { Route } from "react-router-dom";
import ReceivableDashboardPage from "./dashboard/pages/ReceivableDashboardPage";
import InvoiceListPage from "./invoices/pages/InvoiceListPage";
import InvoiceCreatePage from "./invoices/pages/InvoiceCreatePage";
import InvoiceDetailPage from "./invoices/pages/InvoiceDetailPage";
import PaymentListPage from "./payments/pages/PaymentListPage";
import PaymentCreatePage from "./payments/pages/PaymentCreatePage";
import PaymentDetailPage from "./payments/pages/PaymentDetailPage";

export const receivableRoutes = (
    <>
        {/* =========================
            DASHBOARD
        ========================= */}
        <Route path="/finance/receivables/dashboard" element={<ReceivableDashboardPage />} />

        {/* =========================
            INVOICES
        ========================= */}
        <Route path="/finance/receivables/invoices" element={<InvoiceListPage />} />
        <Route path="/finance/receivables/invoices/create" element={<InvoiceCreatePage />} />
        <Route path="/finance/receivables/invoices/:invoiceId" element={<InvoiceDetailPage />} />

        {/* =========================
            PAYMENTS
        ========================= */}
        <Route path="/finance/receivables/payments" element={<PaymentListPage />} />
        <Route path="/finance/receivables/payments/create" element={<PaymentCreatePage />} />
        <Route path="/finance/receivables/payments/:id" element={<PaymentDetailPage />} />
    </>
);
