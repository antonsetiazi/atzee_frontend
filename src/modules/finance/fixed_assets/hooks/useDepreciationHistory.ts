// src/modules/finance/fixed_assets/hooks/useDepreciationHistory.ts

import { useCallback, useEffect, useState } from "react";
import { getDepreciationHistory } from "../api/depreciation.api";
import type { DepreciationItem } from "../types/depreciation.types";

export function useDepreciationHistory() {
    const [items, setItems] = useState<DepreciationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getDepreciationHistory();

            setItems(response);
        } catch (err) {
            console.error(err);

            setError("Failed to load depreciation history");
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
