// src/modules/finance/finance.routes.tsx

import { Route } from "react-router-dom";

import JournalPage from "./journal/JournalPage";
import JournalDetailPage from "./journal/JournalDetailPage";

import { reportRoutes } from "./reports/report.routes";
import { receivableRoutes } from "./receivables/receivable.routes";
import { payableRoutes } from "./payables/payable.routes";

import { fixedAssetRoutes } from "./fixed_assets/routes/fixedAsset.routes";

export const financeRoutes = (
    <>
        {/* =========================
            JOURNAL
        ========================= */}
        <Route path="/admin/finance/journal" element={<JournalPage />} />
        <Route path="/admin/finance/journals/:id" element={<JournalDetailPage />} />

        {/* =========================
            REPORTS
        ========================= */}
        {reportRoutes}

        {/* =========================
            RECEIVABLES
        ========================= */}
        {receivableRoutes}

        {/* =========================
            PAYABLES
        ========================= */}
        {payableRoutes}

        {/* =========================
            FIXED ASSETS
        ========================= */}
        {fixedAssetRoutes}
    </>
);
