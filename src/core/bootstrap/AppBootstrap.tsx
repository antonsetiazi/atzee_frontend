// src/core/bootstrap/AppBootstrap.tsx

import { useEffect, useState } from "react";
import { fetchTenants, switchTenant } from "@/core/tenant/tenant.api";
import { getMyPermissions } from "@/core/permissions/permission.api";
import { useTenantStore } from "@/core/tenant/tenant.store";
import { usePermissionStore } from "@/core/permissions/permission.store";
import { useSessionStore } from "@/core/session/session.store";
import { usePageStore } from "@/core/ui/page/page.store";

export function AppBootstrap({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useSessionStore((s) => s.isAuthenticated);
    const isHydrated = useSessionStore((s) => s.isHydrated);

    const setPermissions = usePermissionStore((s) => s.setPermissions);
    const loadPages = usePageStore((s) => s.loadPages);

    // const setTenant = useTenantStore((s) => s.setActiveTenant);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!isHydrated || !isAuthenticated) return;

        async function bootstrap() {
            // 1️⃣ ambil tenant dulu
            const tenants = await fetchTenants();

            if (!tenants || tenants.length === 0) {
                throw new Error("User has no accessible tenants");
            }

            const activeTenant = tenants[0]; // atau dari localStorage

            // 2️⃣ SET STATE DULU (sinkron)
            useTenantStore.getState().setActiveTenant(activeTenant);

            // 3️⃣ AKTIFKAN DI BACKEND (JWT update)
            await switchTenant(activeTenant.id);

            // 3️⃣ baru ambil permission
            const permissions = await getMyPermissions();
            // console.log("AppBootstrap | permissions", permissions);
            setPermissions(permissions);

            // 4️⃣ load semua UIPage
            await loadPages();

            setReady(true);
        }

        bootstrap();
    }, [isHydrated, isAuthenticated, setPermissions, loadPages]);

    if (!isHydrated) {
        return <div>Initializing session...</div>;
    }

    if (!ready) {
        return <div>Loading platform...</div>;
    }

    return <>{children}</>;
}
