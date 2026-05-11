// src/modules/finance/fixed_assets/api/assetCategory.api.ts

import { httpGet, httpPost, httpPut } from "@/core/http/http.client";
import type { AssetCategory, AssetCategoryFormData } from "../types/assetCategory.types";

export async function getAssetCategories() {
    return httpGet<AssetCategory[]>("/accounting/asset-categories/");
}

export async function getAssetCategoryDetail(categoryId: string) {
    return httpGet<AssetCategory>(`/accounting/asset-categories/${categoryId}/`);
}

export async function createAssetCategory(payload: AssetCategoryFormData) {
    return httpPost("/accounting/asset-categories/create/", payload);
}

export async function updateAssetCategory(
    categoryId: string,
    payload: Partial<AssetCategoryFormData>,
) {
    return httpPut(`/accounting/asset-categories/${categoryId}/`, payload);
}
