// src/core/identity/id.generator.ts

import { v4 as uuidv4 } from "uuid";

/**
 * Atzee Global ID Generator
 * - Web safe
 * - Mobile safe
 * - WebView safe
 * - SSR safe (future)
 */
export function generateId(): string {
    // fallback safety layer
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return uuidv4();
}
