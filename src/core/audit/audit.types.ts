/* eslint-disable @typescript-eslint/no-explicit-any */

export type ActionType =
    | "create"
    | "update"
    | "delete"
    | "approve"
    | "post"
    | "cancel"
    | "other";

export interface AuditEntry {
    id: string; // uuid
    entity: string; // e.g., 'product'
    recordId: string;
    action: ActionType;
    userId: string;
    userName: string;
    timestamp: string; // ISO string
    changes?: Record<string, { old: any; new: any }>; // optional diff
    note?: string;
}
