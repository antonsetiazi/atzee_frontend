// src/core/ui/branding/branding.resolver.ts
import type { Tenant } from "@/core/tenant/tenant.types";
import type { BrandingConfig } from "./branding.types";

export function resolveBranding(tenant: Tenant): BrandingConfig {
    const key = tenant.code ?? "default";

    return {
        appName: tenant.name,
        logoUrl: `/branding/${key}/logo.png`,
        faviconUrl: `/branding/${key}/logo.svg`,
        theme: {
            mode: "light",
            primary: "#2563eb",
            secondary: "#1e40af",
        },
    };
}
