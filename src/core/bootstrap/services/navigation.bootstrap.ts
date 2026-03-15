// src/core/bootstrap/services/navigation.bootstrap.ts

import { fetchNavigation } from "@/core/ui/navigation/navigation.api";
import { useNavigationStore } from "@/core/ui/navigation/navigation.store";

export async function NavigationBootstrap() {
    try {
        const sidebarNav = await fetchNavigation("sidebar", "desktop");
        const bottomNav = await fetchNavigation("bottom", "mobile");

        const store = useNavigationStore.getState();

        store.setTopbar(sidebarNav?.items || []);
        store.setBottom(bottomNav?.items || []);
    } catch (error) {
        console.error("Navigation bootstrap failed:", error);
    }
}
