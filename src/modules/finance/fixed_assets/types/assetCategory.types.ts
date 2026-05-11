// src/modules/finance/fixed_assets/types/assetCategory.types.ts

export interface AssetCategory {
    id: string;
    code: string;
    name: string;
    description?: string;
    depreciation_method: string;
    useful_life_months: number;
    asset_account_id: string;
    asset_account_name?: string;
    accumulated_depreciation_account_id: string;
    accumulated_depreciation_account_name?: string;
    depreciation_expense_account_id: string;
    depreciation_expense_account_name?: string;
    is_active: boolean;
}

export interface AssetCategoryFormData {
    code: string;
    name: string;
    description?: string;
    depreciation_method: string;
    useful_life_months: number;
    asset_account_id: string;
    accumulated_depreciation_account_id: string;
    depreciation_expense_account_id: string;
    is_active?: boolean;
}
