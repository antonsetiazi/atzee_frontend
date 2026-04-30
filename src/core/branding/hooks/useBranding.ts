// src/core/branding/hooks/useBranding.ts

import { useBrandingStore } from "../store/branding.store";
import { defaultBranding } from "../defaults/defaultBranding";

export function useBranding() {
    const branding = useBrandingStore((s) => s.branding);

    const resolved = branding ?? defaultBranding;

    return {
        branding: resolved,

        appName: resolved.appName,
        logoUrl: resolved.logoUrl,
        faviconUrl: resolved.faviconUrl,

        theme: resolved.theme,
    };
}
