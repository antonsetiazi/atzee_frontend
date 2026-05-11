// src/modules/finance/fixed_assets/hooks/useAssetDisposals.ts

import { useCallback, useEffect, useState } from "react";
import { getAssetDisposals } from "../api/disposal.api";
import type { AssetDisposal } from "../types/disposal.types";

export function useAssetDisposals() {
    const [items, setItems] = useState<AssetDisposal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getAssetDisposals();

            setItems(response);
        } catch (err) {
            console.error(err);

            setError("Failed to load disposals");
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
