// src/core/response/response.success.ts

export function getSuccessMessage(fallback?: string): string {
    if (fallback?.trim()) return fallback;

    return "Berhasil";
}
