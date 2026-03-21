/* eslint-disable @typescript-eslint/no-explicit-any */

import { clearEntityCache } from "../entities/cache/entity.cache";

export async function executeAction(action: () => Promise<any>) {
    const result = await action();

    // ❗ invalidate READ cache
    clearEntityCache();

    return result;
}
