// src/modules/listing/hooks/useCategories.ts
import { useState, useEffect } from "react";
import { categoryApi, type Category } from "../api/category.api";

export function useCategories(scope: string) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function fetchCategories() {
            setLoading(true);
            try {
                const categoriesFromApi =
                    await categoryApi.getCategories(scope);

                if (isMounted) {
                    setCategories(categoriesFromApi); // langsung assign array
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchCategories();

        return () => {
            isMounted = false;
        };
    }, [scope]);

    return { categories, loading };
}
