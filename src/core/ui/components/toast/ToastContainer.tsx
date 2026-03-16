// src/core/ui/components/toast/ToastContainer.tsx

import { useToastContext } from "./toast.context";
import Toast from "./Toast";

export default function ToastContainer() {
    const { toasts } = useToastContext();

    return (
        <div
            className="
                fixed
                bottom-5
                right-5
                z-50
                flex
                flex-col
                gap-3
            "
        >
            {toasts.map((t) => (
                <Toast key={t.id} toast={t} />
            ))}
        </div>
    );
}
