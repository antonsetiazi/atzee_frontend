// src/core/ui/components/tabs/Tabs.tsx

import type { TabsProps } from "./tabs.types";
import { TabsContext } from "./tabs.context";

export default function Tabs({
    value,
    onChange,
    children,
    className = "",
}: TabsProps) {
    return (
        <TabsContext.Provider value={{ value, onChange }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}
