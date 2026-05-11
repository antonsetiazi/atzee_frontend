import { Route } from "react-router-dom";

import FixedAssetDashboardPage from "../pages/FixedAssetDashboardPage";
import FixedAssetListPage from "../pages/FixedAssetListPage";
import FixedAssetDetailPage from "../pages/FixedAssetDetailPage";
import FixedAssetFormPage from "../pages/FixedAssetFormPage";
import AssetCategoryListPage from "../pages/AssetCategoryListPage";
import AssetCategoryFormPage from "../pages/AssetCategoryFormPage";
import DepreciationHistoryPage from "../pages/DepreciationHistoryPage";
import AssetDisposalPage from "../pages/AssetDisposalPage";

export const fixedAssetRoutes = (
    <>
        {/* =========================
            FIXED ASSET DASHBOARD
        ========================= */}

        <Route path="/finance/fixed-assets/dashboard" element={<FixedAssetDashboardPage />} />

        {/* =========================
            FIXED ASSETS
        ========================= */}
        <Route path="/finance/fixed-assets" element={<FixedAssetListPage />} />
        <Route path="/finance/fixed-assets/create" element={<FixedAssetFormPage />} />
        <Route path="/finance/fixed-assets/:assetId" element={<FixedAssetDetailPage />} />

        {/* =========================
            ASSET CATEGORIES
        ========================= */}
        <Route path="/finance/fixed-assets/categories" element={<AssetCategoryListPage />} />
        <Route path="/finance/fixed-assets/categories/create" element={<AssetCategoryFormPage />} />
        <Route
            path="/finance/fixed-assets/categories/:categoryId/edit"
            element={<AssetCategoryFormPage />}
        />

        {/* =========================
            DEPRECIATION
        ========================= */}
        <Route path="/finance/fixed-assets/depreciation" element={<DepreciationHistoryPage />} />

        {/* =========================
            DISPOSALS
        ========================= */}
        <Route path="/finance/fixed-assets/disposals" element={<AssetDisposalPage />} />
    </>
);
