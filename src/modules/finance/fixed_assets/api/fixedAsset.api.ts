// src/modules/finance/fixed_assets/api/fixedAsset.api.ts

import { httpGet, httpPost, httpPut } from "@/core/http/http.client";
import type { FixedAsset, FixedAssetFormData } from "../types/fixedAsset.types";

export async function getFixedAssets() {
    return httpGet<FixedAsset[]>("/accounting/fixed-assets/");
}

export async function getFixedAssetDetail(assetId: string) {
    return httpGet<FixedAsset>(`/accounting/fixed-assets/${assetId}/`);
}

export async function createFixedAsset(payload: FixedAssetFormData) {
    return httpPost("/accounting/fixed-assets/create/", payload);
}

export async function updateFixedAsset(assetId: string, payload: FixedAssetFormData) {
    return httpPut<FixedAsset>(`/accounting/fixed-assets/${assetId}/update/`, payload);
}

export async function activateFixedAsset(assetId: string) {
    return httpPost<FixedAsset>(`/accounting/fixed-assets/${assetId}/activate/`);
}

export async function runDepreciation(assetId: string) {
    return httpPost(`/accounting/fixed-assets/${assetId}/depreciate/`, {
        period_date: new Date().toISOString().split("T")[0],
    });
}

export async function disposeFixedAsset(
    assetId: string,
    payload: {
        disposal_date: string;
        disposal_type: string;
        selling_price: number;
        notes?: string;
    },
) {
    return httpPost(`/accounting/fixed-assets/${assetId}/dispose/`, payload);
}
