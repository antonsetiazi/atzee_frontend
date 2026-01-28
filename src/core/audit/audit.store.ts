import { create } from "zustand";
import type { AuditEntry } from "./audit.types";

interface AuditState {
    logs: AuditEntry[];
    pushLog: (entry: AuditEntry) => void;
    getLogsByEntity: (entity: string, recordId?: string) => AuditEntry[];
}

export const useAuditStore = create<AuditState>((set, get) => ({
    logs: [],
    pushLog: (entry) =>
        set({
            logs: [
                ...get().logs,
                { ...entry, timestamp: new Date().toISOString() },
            ],
        }),
    getLogsByEntity: (entity, recordId) =>
        get().logs.filter(
            (log) =>
                log.entity === entity &&
                (!recordId || log.recordId === recordId)
        ),
}));
