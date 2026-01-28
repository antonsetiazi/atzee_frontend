import { httpGet, httpPost } from "@/core/http/http.client";
import type { Tenant } from "./tenant.types";
// import type { BrandingConfig } from "../ui/branding/branding.types";
import { useSessionStore } from "../session/session.store";

export async function fetchTenants(): Promise<Tenant[]> {
    return httpGet("/tenants/");
}

export async function switchTenant(tenantId: string): Promise<void> {
    // ⬅️ backend mengembalikan tokens
    const res = await httpPost("/tenants/switch/", {
        tenant_id: tenantId,
    });

    // ✅ update session
    useSessionStore.getState().setSession(res.access, res.user ?? null);

    // ✅ pastikan promise resolve setelah session tersimpan
    await new Promise((r) => setTimeout(r, 0)); // microtask, optional tapi aman
}

// export async function fetchTenantBranding(): Promise<BrandingConfig> {
//     return httpGet("/tenant/branding/");
// }
