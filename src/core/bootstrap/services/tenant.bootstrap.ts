// src/core/bootstrap/services/tenant.bootstrap.ts

import { fetchCurrentTenant } from "@/core/tenant/tenant.api";
import { useBrandingStore } from "@/core/ui/branding/branding.store";

export async function TenantBootstrap() {
    const tenant = await fetchCurrentTenant();

    useBrandingStore.getState().setBranding(tenant.branding || {});
}
