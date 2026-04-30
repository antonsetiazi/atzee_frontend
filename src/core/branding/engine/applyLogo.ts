// src/core/branding/engine/applyLogo.ts

export function applyLogo(logoUrl?: string) {
    if (!logoUrl) return;

    document.documentElement.style.setProperty("--app-logo", `url(${logoUrl})`);
}
