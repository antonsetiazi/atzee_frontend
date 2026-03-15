// src/core/ui/components/tabs/TabsTrigger.tsx

import { useTabs } from "./tabs.context";
import type { TabsTriggerProps } from "./tabs.types";

export default function TabsTrigger({
    value,
    children,
    className = "",
}: TabsTriggerProps) {
    const { value: active, onChange } = useTabs();

    const isActive = active === value;

    return (
        <button
            onClick={() => onChange?.(value)}
            className={`
                px-4
                py-2
                text-sm
                font-medium
                border-b-2
                transition
                ${
                    isActive
                        ? "border-[var(--color-primary)] text-[var(--text-primary)]"
                        : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }
                ${className}
            `}
        >
            {children}
        </button>
    );
}
