/* eslint-disable @typescript-eslint/no-explicit-any */

import { clearEntityCache } from "@/engine/entities/cache/entity.cache";

export async function executeAction(action: () => Promise<any>) {
    const result = await action();

    // ❗ invalidate READ cache
    clearEntityCache();

    return result;
}
