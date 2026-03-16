// src/core/ui/components/toast/Toast.tsx

import { useEffect } from "react";
import { useToastContext } from "./toast.context";
import type { ToastItem } from "./toast.types";

interface Props {
    toast: ToastItem;
}

const styles = {
    info: "border-blue-200 bg-blue-50 text-blue-900",
    success: "border-green-200 bg-green-50 text-green-900",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
    error: "border-red-200 bg-red-50 text-red-900",
};

export default function Toast({ toast }: Props) {
    const { remove } = useToastContext();

    useEffect(() => {
        const timer = setTimeout(() => {
            remove(toast.id);
        }, toast.duration ?? 3000);

        return () => clearTimeout(timer);
    }, [toast, remove]);

    const variant = toast.variant ?? "info";

    return (
        <div
            className={`
                min-w-[240px]
                max-w-[320px]
                px-4
                py-3
                border
                rounded-[var(--radius)]
                shadow-[var(--shadow)]
                text-sm
                flex
                justify-between
                items-start
                gap-3
                ${styles[variant]}
            `}
        >
            <div>{toast.message}</div>

            <button
                onClick={() => remove(toast.id)}
                className="opacity-70 hover:opacity-100"
            >
                ✕
            </button>
        </div>
    );
}
