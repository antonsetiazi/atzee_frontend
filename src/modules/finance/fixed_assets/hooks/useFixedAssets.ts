// src/modules/finance/fixed_assets/hooks/useFixedAssets.ts

import { useCallback, useEffect, useState } from "react";
import { getFixedAssets } from "../api/fixedAsset.api";
import type { FixedAsset } from "../types/fixedAsset.types";

export function useFixedAssets() {
    const [items, setItems] = useState<FixedAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getFixedAssets();
            setItems(response);
        } catch (err) {
            console.error(err);

            setError("Failed to load fixed assets");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    return {
        items,
        loading,
        error,
        reload: load,
    };
}
