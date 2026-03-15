// src/core/ui/components/list/ListView.tsx

import type { ListViewProps } from "./list.types";

export default function ListView({
    children,
    divided = false,
    className = "",
}: ListViewProps) {
    return (
        <div
            className={`
                w-full
                bg-[var(--color-surface)]
                border border-[var(--color-border)]
                rounded-[var(--radius)]
                overflow-hidden
                ${divided ? "divide-y divide-[var(--color-border)]" : ""}
                ${className}
            `}
        >
            {children}
        </div>
    );
}
