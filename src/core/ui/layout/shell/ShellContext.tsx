// src/core/ui/layout/shell/ShellContext.tsx

import { createContext, useContext } from "react";

export type ShellContextType = {
    isMobile: boolean;
    drawerOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawer: () => void;
};

export const ShellContext = createContext<ShellContextType | null>(null);

export function useShell() {
    const ctx = useContext(ShellContext);
    if (!ctx) {
        throw new Error("useShell must be used inside ShellProvider");
    }
    return ctx;
}
