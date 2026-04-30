// src/core/branding/provider/BrandingProvider.tsx

import { useEffect } from "react";
import { applyBranding } from "../engine/applyBranding";
import { useBranding } from "../hooks/useBranding";

export function BrandingProvider({ children }: { children: React.ReactNode }) {
    const { branding } = useBranding();
    useEffect(() => {
        applyBranding(branding);
    }, [branding]);

    return <>{children}</>;
}
