// src/modules/finance/fixed_assets/api/depreciation.api.ts

import { httpGet, httpPost } from "@/core/http/http.client";
import type {
    DepreciationItem,
    DepreciationPreviewItem,
    DepreciationRunRequest,
} from "../types/depreciation.types";

export async function getDepreciationHistory() {
    return httpGet<DepreciationItem[]>("/accounting/fixed-asset-depreciation/");
}

export async function previewDepreciationRun(payload: DepreciationRunRequest) {
    return httpPost<DepreciationPreviewItem[]>(
        "/accounting/fixed-asset-depreciation/preview/",
        payload,
    );
}

export async function runBulkDepreciation(payload: DepreciationRunRequest) {
    return httpPost("/accounting/fixed-asset-depreciation/run/", payload);
}
