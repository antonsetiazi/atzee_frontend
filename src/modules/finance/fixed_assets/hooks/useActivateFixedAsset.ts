// src/modules/finance/fixed_assets/hooks/useActivateFixedAsset.ts

import { useState } from "react";
import { activateFixedAsset } from "../api/fixedAsset.api";

export function useActivateFixedAsset() {
    const [loading, setLoading] = useState(false);

    async function submit(assetId: string) {
        try {
            setLoading(true);

            return await activateFixedAsset(assetId);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        submit,
    };
}
