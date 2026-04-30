// src/core/branding/engine/applyThemeVars.ts

import type { BrandingConfig } from "../types/branding.types";

export function applyThemeVars(theme: BrandingConfig["theme"]) {
    const root = document.documentElement;

    root.dataset.theme = theme.mode;

    // ==============================
    // Core Colors
    // ==============================
    setVar(root, "--color-primary", theme.primary);
    setVar(root, "--color-secondary", theme.secondary);
    setVar(root, "--color-accent", theme.accent);

    // ==============================
    // Surface System
    // ==============================
    setVar(root, "--color-background", theme.background);
    setVar(root, "--color-surface", theme.surface);
    setVar(root, "--color-surface-alt", theme.surfaceAlt);

    // ==============================
    // Text System
    // ==============================
    setVar(root, "--text-primary", theme.textPrimary);
    setVar(root, "--text-secondary", theme.textSecondary);
    setVar(root, "--text-muted", theme.textMuted);

    // ==============================
    // State Colors
    // ==============================
    setVar(root, "--color-success", theme.success);
    setVar(root, "--color-warning", theme.warning);
    setVar(root, "--color-error", theme.error);

    setVar(root, "--text-brand", theme.primary);
    setVar(root, "--text-brand-soft", theme.textBrandSoft);

    // ==============================
    // Border
    // ==============================
    setVar(root, "--color-border", theme.border);

    // ==============================
    // Radius & Shadow
    // ==============================
    setVar(root, "--radius", theme.radius);
    setVar(root, "--shadow", theme.shadow);

    // ==============================
    // Typography
    // ==============================
    // if (theme.font) {
    //     setVar(root, "--font-family", theme.font.family);
    //     setVar(root, "--font-size", theme.font.size);
    //     setVar(root, "--font-weight", theme.font.weight);
    // }
}

function setVar(root: HTMLElement, name: string, value?: string) {
    if (value) {
        root.style.setProperty(name, value);
    }
}
