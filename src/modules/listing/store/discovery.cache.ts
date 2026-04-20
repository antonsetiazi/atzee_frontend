// src/modules/listing/store/discovery.cache.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

const memory = new Map<string, Promise<any>>();

export function remember<T>(key: string, loader: () => Promise<T>): Promise<T> {
    if (memory.has(key)) {
        return memory.get(key)!;
    }

    const promise = loader();
    memory.set(key, promise);

    return promise;
}

export function clearDiscoveryCache() {
    memory.clear();
}
