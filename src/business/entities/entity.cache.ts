/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/entity.cache.ts

type CacheEntry<T> = {
    data: T;
    timestamp: number;
};

const CACHE_TTL = 60_000; // 60 detik (platform-level)

const cache = new Map<string, CacheEntry<any>>();

export function getCache<T>(key: string): T | null {
    const entry = cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > CACHE_TTL) {
        cache.delete(key);
        return null;
    }

    return entry.data;
}

export function setCache<T>(key: string, data: T) {
    cache.set(key, {
        data,
        timestamp: Date.now(),
    });
}

export function clearEntityCache() {
    cache.clear();
}

export function clearEntityCacheByPrefix(prefix: string) {
    for (const key of cache.keys()) {
        if (key.startsWith(prefix)) {
            cache.delete(key);
        }
    }
}
