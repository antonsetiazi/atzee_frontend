// src/core/ui/layout/AppLayout.tsx

import { useEffect } from "react";
import { fetchMenu } from "@/core/ui/menu/menu.api";
import { fetchNavigation } from "@/core/ui/navigation/navigation.api";

import { useMenuStore } from "@/core/ui/menu/menu.store";
import { useNavigationStore } from "@/core/ui/navigation/navigation.store";
import { useSessionStore } from "@/core/session/session.store";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import ShellProvider from "./shell/ShellProvider";

const TENANT_CODE = import.meta.env.VITE_TENANT;

export default function AppLayout() {
    const token = useSessionStore((s) => s.token);
    const { isMobile } = useBreakpoint();

    const setMenu = useMenuStore((state) => state.setMenu);
    const setBottom = useNavigationStore((state) => state.setBottom);
    const setTopbar = useNavigationStore((state) => state.setTopbar);

    useEffect(() => {
        if (!token) return;
        async function bootstrap() {
            try {
                // 🔹 Existing menu (JANGAN DIGANGGU)
                const menu = await fetchMenu();
                setMenu(menu);

                // 🔹 Mobile → bottom nav
                if (isMobile) {
                    const bottomNav = await fetchNavigation(
                        "bottom",
                        "mobile",
                        TENANT_CODE,
                    );
                    setBottom(bottomNav?.items || []);
                    setTopbar([]);
                } else {
                    const sidebarNav = await fetchNavigation(
                        "sidebar",
                        "desktop",
                        TENANT_CODE,
                    );
                    setTopbar(sidebarNav?.items || []);
                    setBottom([]);
                }
            } catch (error) {
                console.error("App bootstrap failed:", error);
            }
        }

        bootstrap();
    }, [token, isMobile, setMenu, setBottom, setTopbar]);

    return <ShellProvider />;
}
