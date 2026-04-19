// src/modules/category/api/category.api.ts

import { httpGet } from "@/core/http/http.client";
import type { CategoryItem } from "../types/category.types";

export const categoryApi = {
    async getDashboardCategories(scope: string): Promise<CategoryItem[]> {
        return httpGet<CategoryItem[]>("/categories/", {
            skipAuth: true,
            query: { scope },
        });
    },
};
