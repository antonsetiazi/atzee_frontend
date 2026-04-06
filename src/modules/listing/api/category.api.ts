// src/modules/listing/api/category.api.ts

import { httpGet } from "@/core/http/http.client";

export interface Category {
    id: number;
    code: string;
    name: string;
    scope: string;
    parent: number | null;
}

export const categoryApi = {
    async getCategories(scope: string) {
        return httpGet<Category[]>("/discovery/categories/", {
            skipAuth: true,
            query: { scope },
        });
    },
};
