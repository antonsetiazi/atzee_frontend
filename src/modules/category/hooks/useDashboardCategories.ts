// src/modules/category/hooks/useDashboardCategories.ts

import { useEffect, useState, useCallback } from "react";
import { categoryApi } from "../api/category.api";
import type { CategoryItem } from "../types/category.types";

export function useDashboardCategories(scope: string) {
    const [items, setItems] = useState<CategoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        try {
            setLoading(true);

            const data = await categoryApi.getDashboardCategories(scope);

            setItems(data);
        } finally {
            setLoading(false);
        }
    }, [scope]);

    useEffect(() => {
        load();
    }, [load]);

    return {
        items,
        loading,
        reload: load,
    };
}
