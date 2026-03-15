// src/core/ui/components/tabs/tabs.context.ts

import { createContext, useContext } from "react";

interface TabsContextType {
    value: string;
    onChange?: (value: string) => void;
}

export const TabsContext = createContext<TabsContextType | null>(null);

export function useTabs() {
    const ctx = useContext(TabsContext);

    if (!ctx) {
        throw new Error("Tabs components must be used inside <Tabs>");
    }

    return ctx;
}
