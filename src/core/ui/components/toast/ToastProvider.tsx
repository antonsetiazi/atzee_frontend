// src/core/ui/components/toast/ToastProvider.tsx

import { useState } from "react";
import { ToastContext } from "./toast.context";
import type { ToastItem } from "./toast.types";
import ToastContainer from "./ToastContainer";

interface Props {
    children: React.ReactNode;
}

export default function ToastProvider({ children }: Props) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    function push(toast: ToastItem) {
        setToasts((prev) => [...prev, toast]);
    }

    function remove(id: string) {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }

    return (
        <ToastContext.Provider value={{ toasts, push, remove }}>
            {children}

            <ToastContainer />
        </ToastContext.Provider>
    );
}
