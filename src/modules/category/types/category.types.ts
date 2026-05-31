// src/modules/category/types/category.types.ts

export interface CategoryItem {
    id: number;
    code: string;
    name: string;
    scope: string;
    parent: number | null;
    icon_url?: string | null;
    color?: string | null;
}
