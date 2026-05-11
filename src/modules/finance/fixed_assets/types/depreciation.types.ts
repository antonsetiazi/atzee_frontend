// src/modules/finance/fixed_assets/types/depreciation.types.ts

export interface DepreciationItem {
    id: string;
    asset_id: string;
    asset_name?: string;
    asset_number?: string;
    period: string;
    depreciation_date: string;
    depreciation_amount: number;
    accumulated_depreciation: number;
    book_value: number;
    journal_id?: string;
    posted_at?: string;
    created_at?: string;
}

export interface DepreciationRunRequest {
    period: string;
    asset_ids?: string[];
}

export interface DepreciationPreviewItem {
    asset_id: string;
    asset_name: string;
    asset_number: string;
    depreciation_amount: number;
    current_book_value: number;
    next_book_value: number;
}
