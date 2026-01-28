/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/actions/action.types.ts

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
    | "redirect";

export interface EntityAction<T = any> {
    key: string;
    label: string;
    type: EntityActionType;

    permission?: string;

    confirm?: ActionConfirm;

    visible?: (row?: T) => boolean;

    to?: string;
    endpoint?: string; // untuk delete / custom API

    execute: (context: ActionContext<T>) => Promise<void> | void;
}

export interface ActionContext<T = any> {
    row?: T;
    selectRows?: T[];
    navigate: (path: string) => void;
    refresh: () => void;
}
