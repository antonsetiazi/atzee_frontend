// src/core/ui/components/tabs/TabsContent.tsx

import { useTabs } from "./tabs.context";
import type { TabsContentProps } from "./tabs.types";

export default function TabsContent({
    value,
    children,
    className = "",
}: TabsContentProps) {
    const { value: active } = useTabs();

    if (active !== value) return null;

    return <div className={`mt-4 ${className}`}>{children}</div>;
}
