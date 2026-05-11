// src/modules/finance/reports/report.routes.tsx

import { Route } from "react-router-dom";

import TrialBalancePage from "./trial_balance/TrialBalancePage";
import ProfitLossPage from "./profit_loss/ProfitLossPage";
import BalanceSheetPage from "./balance_sheet/BalanceSheetPage";
import CashFlowPage from "./cash_flow/CashFlowPage";

export const reportRoutes = (
    <>
        <Route path="/admin/finance/reports/trial-balance" element={<TrialBalancePage />} />
        <Route path="/admin/finance/reports/profit-loss" element={<ProfitLossPage />} />
        <Route path="/admin/finance/reports/balance-sheet" element={<BalanceSheetPage />} />
        <Route path="/admin/finance/reports/cash-flow" element={<CashFlowPage />} />
    </>
);
