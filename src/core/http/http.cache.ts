// src/core/http/http.cache.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

const inflightRequests = new Map<string, Promise<any>>();

export function getInflightRequest(key: string) {
    return inflightRequests.get(key);
}

export function setInflightRequest(key: string, promise: Promise<any>) {
    inflightRequests.set(key, promise);
}

export function clearInflightRequest(key: string) {
    inflightRequests.delete(key);
}
