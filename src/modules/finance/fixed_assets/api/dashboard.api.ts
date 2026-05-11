// src/modules/finance/fixed_assets/api/dashboard.api.ts
import { httpGet } from "@/core/http/http.client";

import type {
    AssetCategorySummary,
    FixedAssetDashboardSummary,
    MonthlyDepreciationSummary,
} from "../types/dashboard.types";

export async function getFixedAssetDashboardSummary() {
    return httpGet<FixedAssetDashboardSummary>("/accounting/fixed-assets-dashboard/summary/");
}

export async function getAssetCategorySummary() {
    return httpGet<AssetCategorySummary[]>("/accounting/fixed-assets-dashboard/category-summary/");
}

export async function getMonthlyDepreciationSummary() {
    return httpGet<MonthlyDepreciationSummary[]>(
        "/accounting/fixed-assets-dashboard/monthly-depreciation/",
    );
}
