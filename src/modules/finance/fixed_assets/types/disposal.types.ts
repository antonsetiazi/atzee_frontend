// src/modules/finance/fixed_assets/types/disposal.types.ts

export type DisposalStatus = "draft" | "posted";

export interface AssetDisposal {
    id: string;
    asset_id: string;
    asset_name?: string;
    asset_number?: string;
    disposal_date: string;
    disposal_type: string;
    selling_price: number;
    gain_loss_amount: number;
    notes?: string;
    status: DisposalStatus;
    journal_id?: string;
}

export interface AssetDisposalFormData {
    asset_id: string;
    disposal_date: string;
    disposal_type: string;
    selling_price: number;
    notes?: string;
}
