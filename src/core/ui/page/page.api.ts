import { httpGet } from "@/core/http/http.client";
import type { UIPage } from "./page.types";

/**
 * Ambil semua page yang user boleh akses
 */
export async function fetchPages(): Promise<UIPage[]> {
    return httpGet<UIPage[]>("/ui/pages/");
}

/**
 * Ambil page berdasarkan page_key
 */
export async function fetchPage(pageKey: string): Promise<UIPage> {
    return httpGet<UIPage>(`/ui/pages/${pageKey}/`);
}
