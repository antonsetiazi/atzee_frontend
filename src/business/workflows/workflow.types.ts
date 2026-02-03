// src/business/workflows/workflow.types.ts
export interface WorkflowStatus {
    key: string;
    label: string;
    color?: "gray" | "blue" | "green" | "red" | "yellow";
}

export interface WorkflowAction {
    key: string;
    label: string;
    permission?: string;
    confirm?: string;
    next_status?: string;
}

export interface WorkflowSchema {
    status: WorkflowStatus;
    actions: WorkflowAction[];
}
