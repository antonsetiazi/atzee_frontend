// src/core/ui/branding/BrandingProvider.tsx

import { useEffect } from "react";
import { useBrandingStore } from "./branding.store";
import { applyBranding } from "./applyBranding";

export function BrandingProvider({ children }: { children: React.ReactNode }) {
    const branding = useBrandingStore((s) => s.branding);
    useEffect(() => {
        if (branding) {
            applyBranding(branding);
        }
    }, [branding]);

    return <>{children}</>;
}
