// src/modules/finance/fixed_assets/hooks/useUpdateFixedAsset.ts

import { useState } from "react";
import type { FixedAssetFormData } from "../types/fixedAsset.types";
import { updateFixedAsset } from "../api/fixedAsset.api";

export function useUpdateFixedAsset() {
    const [loading, setLoading] = useState(false);

    async function submit(assetId: string, data: FixedAssetFormData) {
        try {
            setLoading(true);

            return await updateFixedAsset(assetId, data);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        submit,
    };
}
