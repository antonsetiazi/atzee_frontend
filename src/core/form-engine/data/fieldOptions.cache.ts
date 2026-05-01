// src/core/form-engine/data/fieldOptions.cache.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

const fieldCache = new Map<string, any>();

export function getFieldCache<T = any>(key: string): T | null {
    return fieldCache.get(key) ?? null;
}

export function setFieldCache<T = any>(key: string, value: T) {
    fieldCache.set(key, value);
}

export function clearFieldCache(key: string) {
    fieldCache.delete(key);
}

export function clearAllFieldCache() {
    fieldCache.clear();
}
