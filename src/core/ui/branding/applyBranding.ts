// src/core/ui/branding/applyBranding.ts

import type { BrandingConfig } from "./branding.types";

export function applyBranding(branding: BrandingConfig) {
    const root = document.documentElement;

    root.style.setProperty("--color-primary", branding.theme.primary);
    root.style.setProperty("--color-secondary", branding.theme.secondary);

    if (branding.theme.accent) {
        root.style.setProperty("--color-accent", branding.theme.accent);
    }

    root.dataset.theme = branding.theme.mode;

    if (branding.faviconUrl) {
        let favicon = document.querySelector("link[rel='icon']");

        if (!favicon) {
            favicon = document.createElement("link");
            favicon.setAttribute("rel", "icon");
            document.head.appendChild(favicon);
        }

        favicon.setAttribute("href", branding.faviconUrl);
    }

    document.title = branding.appName;
}
