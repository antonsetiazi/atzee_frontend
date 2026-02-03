// src/business/workflows/types.ts
export interface WorkflowAction {
    key: string;
    label: string;
    permission?: string;
    confirm?: boolean;
    variant?: "primary" | "secondary" | "danger";
}

export interface WorkflowState {
    state: string;
    actions: WorkflowAction[];
}
