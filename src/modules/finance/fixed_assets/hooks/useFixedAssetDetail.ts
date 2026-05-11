// src/modules/finance/fixed_assets/hooks/useFixedAssetDetail.ts

import { useCallback, useEffect, useState } from "react";
import { getFixedAssetDetail } from "../api/fixedAsset.api";
import type { FixedAsset } from "../types/fixedAsset.types";

export function useFixedAssetDetail(assetId?: string) {
    const [item, setItem] = useState<FixedAsset | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        if (!assetId) {
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await getFixedAssetDetail(assetId);

            setItem(response);
        } catch (err) {
            console.error(err);

            setError("Failed to load asset detail");
        } finally {
            setLoading(false);
        }
    }, [assetId]);

    useEffect(() => {
        load();
    }, [load]);

    return {
        item,
        loading,
        error,
        reload: load,
    };
}
