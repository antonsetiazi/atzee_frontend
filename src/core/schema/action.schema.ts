// src/core/schema/action.schema.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ActionConfirm {
    title?: string;
    message: string;
    level?: "info" | "warning" | "danger";
}

export type EntityActionType =
    | "view"
    | "create"
    | "update"
    | "delete"
    | "custom"
    | "navigate"
    | "redirect"
    | "submit";

export interface EntityAction<T = any> {
    key: string;
    label: string;
    type: EntityActionType;
    icon?: string;
    permission?: string;

    confirm?: ActionConfirm;

    // visible?: (row?: T) => boolean;
    when?: Record<string, any>; // ⬅️ dari backend

    to?: string;
    endpoint?: string; // untuk delete / custom API

    execute: (context: ActionContext<T>) => Promise<void> | void;

    // 🔥 NEW (sync dengan backend)
    refresh_cache?: string[];
    success_title?: string;
    success_message?: string;
}

export interface ActionContext<T = any> {
    row?: T;
    selectRows?: T[];
    navigate: (path: string) => void;
    refresh: () => void;
}
