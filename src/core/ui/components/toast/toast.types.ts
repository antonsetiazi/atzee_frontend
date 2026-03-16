// src/core/ui/components/toast/toast.types.ts

export type ToastVariant = "info" | "success" | "warning" | "error";

export interface ToastItem {
    id: string;
    message: string;
    variant?: ToastVariant;
    duration?: number;
}
