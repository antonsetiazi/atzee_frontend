// src/core/bootstrap/platformBootstrap.ts

import { fetchTenants, switchTenant } from "@/core/tenant/tenant.api";
import { getMyPermissions } from "@/core/permissions/permission.api";
import { useTenantStore } from "@/core/tenant/tenant.store";
import { usePermissionStore } from "@/core/permissions/permission.store";
import { usePageStore } from "@/core/ui/page/page.store";

import { resolveBranding } from "@/core/ui/branding/branding.resolver";
import { useBrandingStore } from "@/core/ui/branding/branding.store";

let bootstrapping: Promise<void> | null = null;

export function ensurePlatformReady(): Promise<void> {
    // console.log("ensurePlatformReady");
    if (bootstrapping) return bootstrapping;
    // console.log("1");
    bootstrapping = (async () => {
        // console.log("2");
        // 1️⃣ tenant
        const tenants = await fetchTenants();
        if (!tenants.length) {
            throw new Error("User has no accessible tenants");
        }

        // console.log("3");
        const activeTenant = tenants[0];
        useTenantStore.getState().setActiveTenant(activeTenant);

        // 2️⃣ backend context
        await switchTenant(activeTenant.id);

        const branding = resolveBranding(activeTenant);
        useBrandingStore.getState().setBranding(branding);

        // 3️⃣ permissions
        const permissions = await getMyPermissions();
        usePermissionStore.getState().setPermissions(permissions);

        // 4️⃣ pages
        await usePageStore.getState().loadPages();
    })();

    return bootstrapping;
}
