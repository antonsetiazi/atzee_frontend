// src/core/ui/components/toast/toast.context.ts

import { createContext, useContext } from "react";
import type { ToastItem } from "./toast.types";

interface ToastContextType {
    toasts: ToastItem[];
    push: (toast: ToastItem) => void;
    remove: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export function useToastContext() {
    const ctx = useContext(ToastContext);

    if (!ctx) {
        throw new Error("Toast must be used inside ToastProvider");
    }

    return ctx;
}
