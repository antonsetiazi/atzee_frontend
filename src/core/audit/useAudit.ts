/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAuditStore } from "./audit.store";
import type { ActionType } from "./audit.types";

export const useAudit = () => {
    const pushLog = useAuditStore((s) => s.pushLog);
    const getLogsByEntity = useAuditStore((s) => s.getLogsByEntity);

    const logAction = (params: {
        entity: string;
        recordId: string;
        action: ActionType;
        changes?: Record<string, { old: any; new: any }>;
        note?: string;
    }) => {
        const userId = "CURRENT_USER_ID"; // nanti ambil dari session store
        const userName = "CURRENT_USER_NAME";

        pushLog({
            ...params,
            userId,
            userName,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
        });
    };

    return { logAction, getLogsByEntity };
};
