// src/modules/category/hooks/useDashboardCategories.ts

import { useEffect, useState } from "react";
import { categoryApi } from "../api/category.api";
import type { CategoryItem } from "../types/category.types";

const cache = new Map<string, CategoryItem[]>();

export function useDashboardCategories(scope: string) {
    const cached = cache.get(scope) || [];

    const [items, setItems] = useState<CategoryItem[]>(cached);
    const [loading, setLoading] = useState(cached.length === 0);

    useEffect(() => {
        let cancelled = false;

        if (cache.has(scope)) return;

        categoryApi
            .getDashboardCategories(scope)
            .then((data) => {
                if (cancelled) return;

                cache.set(scope, data);
                setItems(data);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [scope]);

    return {
        items,
        loading,
    };
}
