// src/modules/finance/fixed_assets/types/dashboard.types.ts

export interface FixedAssetDashboardSummary {
    total_assets: number;
    active_assets: number;
    disposed_assets: number;
    total_acquisition_value: number;
    total_book_value: number;
    total_accumulated_depreciation: number;
}

export interface AssetCategorySummary {
    category_name: string;
    asset_count: number;
    acquisition_value: number;
    book_value: number;
}

export interface MonthlyDepreciationSummary {
    period: string;
    depreciation_amount: number;
}
