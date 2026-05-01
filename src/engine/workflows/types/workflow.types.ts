// src/engine/workflows/types/workflow.types.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface WorkflowStatus {
    key: string;
    label: string;
    color?: "gray" | "blue" | "green" | "red" | "yellow";
}

export type WorkflowActionType =
    | "navigate"
    | "delete"
    | "post"
    | "patch"
    | "get";

export interface WorkflowAction {
    key: string;
    label: string;
    type: WorkflowActionType;
    permission?: string;

    // navigation
    to?: string;

    // api call
    endpoint?: string;
    method?: "POST" | "PATCH" | "DELETE" | "GET";

    // conditional display
    when?: Record<string, any>;

    // confirmation dialog
    confirm?: {
        title: string;
        message: string;
        level?: "info" | "warning" | "danger";
    };

    next_status?: string;
}

export interface WorkflowSchema {
    status: WorkflowStatus;
    actions: WorkflowAction[];
}
