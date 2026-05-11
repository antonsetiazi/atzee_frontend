// src/modules/finance/fixed_assets/api/disposal.api.ts

import { httpGet, httpPost } from "@/core/http/http.client";
import type { AssetDisposal, AssetDisposalFormData } from "../types/disposal.types";

export async function getAssetDisposals() {
    return httpGet<AssetDisposal[]>("/accounting/asset-disposals/");
}

export async function getAssetDisposalDetail(disposalId: string) {
    return httpGet<AssetDisposal>(`/accounting/asset-disposals/${disposalId}/`);
}

export async function createAssetDisposal(payload: AssetDisposalFormData) {
    return httpPost("/accounting/asset-disposals/create/", payload);
}
