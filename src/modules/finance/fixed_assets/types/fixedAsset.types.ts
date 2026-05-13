// src/modules/finance/fixed_assets/types/fixedAsset.types.ts

export type AssetStatus = "draft" | "active" | "fully_depreciated" | "disposed";

export type DepreciationMethod = "straight_line";

export interface FixedAsset {
    id: string;
    asset_number: string;
    name: string;
    description?: string;
    category_id: string;
    category_name?: string;
    purchase_date: string;
    capitalization_date: string;
    purchase_cost: number;
    salvage_value: number;
    useful_life_months: number;
    depreciation_method: DepreciationMethod;
    depreciation_start_date: string;
    last_depreciation_date?: string | null;
    accumulated_depreciation: number;
    book_value: number;
    status: AssetStatus;
    serial_number?: string;
    location?: string;
}

export interface FixedAssetFormData {
    asset_number: string;
    name: string;
    description?: string;
    category_id: string;
    purchase_date: string;
    capitalization_date: string;
    purchase_cost: number;
    salvage_value: number;
    useful_life_months: number;
    depreciation_method: DepreciationMethod;
    depreciation_start_date: string;
    serial_number?: string;
    location?: string;
}
