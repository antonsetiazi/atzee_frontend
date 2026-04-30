// src/core/branding/engine/applyBranding.ts

import type { BrandingConfig } from "../types/branding.types";
import { applyAppMeta } from "./applyAppMeta";
import { applyFavicon } from "./applyFavicon";
import { applyLogo } from "./applyLogo";
import { applyThemeVars } from "./applyThemeVars";

export function applyBranding(branding: BrandingConfig) {
    applyThemeVars(branding.theme);
    applyFavicon(branding.faviconUrl);
    applyLogo(branding.logoUrl);
    applyAppMeta(branding.appName);
}
