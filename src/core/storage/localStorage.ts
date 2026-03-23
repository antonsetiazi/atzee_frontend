// src/core/storage/localStorage.ts

const PREFIX = "erp_sim_";

export function saveToStorage<T>(key: string, data: T) {
    try {
        localStorage.setItem(PREFIX + key, JSON.stringify(data));
    } catch (err) {
        console.error("Failed to save to storage", err);
    }
}

export function loadFromStorage<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(PREFIX + key);
        if (!raw) return fallback;

        return JSON.parse(raw) as T;
    } catch (err) {
        console.error("Failed to load from storage", err);
        return fallback;
    }
}

export function clearStorage(key: string) {
    localStorage.removeItem(PREFIX + key);
}
