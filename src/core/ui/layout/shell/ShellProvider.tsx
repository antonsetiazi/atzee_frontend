// src/core/ui/layout/shell/ShellProvider.tsx

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { ShellContext } from "./ShellContext";
import DesktopShell from "./DesktopShell";
import MobileShell from "./MobileShell";
import PageTransition from "@/core/routing/PageTransition";

export default function ShellProvider() {
    const { isMobile } = useBreakpoint();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const value = {
        isMobile,
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        toggleDrawer: () => setDrawerOpen((v) => !v),
    };

    if (isMobile) {
        return (
            <ShellContext.Provider value={value}>
                <MobileShell>
                    <PageTransition>
                        <Outlet />
                    </PageTransition>
                </MobileShell>
            </ShellContext.Provider>
        );
    }

    return (
        <ShellContext.Provider value={value}>
            <DesktopShell>
                <PageTransition>
                    <Outlet />
                </PageTransition>
            </DesktopShell>
        </ShellContext.Provider>
    );
}
