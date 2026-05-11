// src/modules/finance/fixed_assets/hooks/useFixedAssetDashboard.ts

import { useCallback, useEffect, useState } from "react";
import {
    getAssetCategorySummary,
    getFixedAssetDashboardSummary,
    getMonthlyDepreciationSummary,
} from "../api/dashboard.api";
import type {
    AssetCategorySummary,
    FixedAssetDashboardSummary,
    MonthlyDepreciationSummary,
} from "../types/dashboard.types";

export function useFixedAssetDashboard() {
    const [summary, setSummary] = useState<FixedAssetDashboardSummary | null>(null);
    const [categories, setCategories] = useState<AssetCategorySummary[]>([]);
    const [monthlyDepreciation, setMonthlyDepreciation] = useState<MonthlyDepreciationSummary[]>(
        [],
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [summaryData, categoryData, monthlyData] = await Promise.all([
                getFixedAssetDashboardSummary(),
                getAssetCategorySummary(),
                getMonthlyDepreciationSummary(),
            ]);

            setSummary(summaryData);
            setCategories(categoryData);
            setMonthlyDepreciation(monthlyData);
        } catch (err) {
            console.error(err);

            setError("Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    return {
        summary,
        categories,
        monthlyDepreciation,
        loading,
        error,
        reload: load,
    };
}
