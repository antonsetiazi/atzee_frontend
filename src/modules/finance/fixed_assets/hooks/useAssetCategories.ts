// src/modules/finance/fixed_assets/hooks/useAssetCategories.ts

import { useCallback, useEffect, useState } from "react";
import { getAssetCategories } from "../api/assetCategory.api";
import type { AssetCategory } from "../types/assetCategory.types";

export function useAssetCategories() {
    const [items, setItems] = useState<AssetCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getAssetCategories();

            setItems(response);
        } catch (err) {
            console.error(err);

            setError("Failed to load asset categories");
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
