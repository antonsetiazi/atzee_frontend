// src/modules/finance/fixed_assets/types/disposal.types.ts

export type DisposalStatus = "draft" | "posted" | "cancelled";

export interface AssetDisposal {
    id: string;
    asset: string;
    asset_name?: string;
    asset_number?: string;
    disposal_date: string;
    disposal_value: number;
    gain_loss_amount: number;
    notes?: string;
    status: DisposalStatus;
}

export interface AssetDisposalFormData {
    asset_id: string;
    disposal_date: string;
    disposal_value: number;
    notes?: string;
}
