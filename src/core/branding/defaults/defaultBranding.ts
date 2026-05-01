// src/core/branding/defaults/defaultBranding.ts

import type { BrandingConfig } from "../types/branding.types";

export const defaultBranding: BrandingConfig = {
    appName: "Atzee",
    tagline: "",
    logoUrl: "/branding/default/logo.png",
    faviconUrl: "/branding/default/logo.svg",
    theme: {
        mode: "light",
        primary: "#2563eb",
        secondary: "#1e40af",
        accent: "#3b82f6",

        background: "#ffffff",
        surface: "#f9fafb",
        surfaceAlt: "#f3f4f6",

        textPrimary: "#111827",
        textSecondary: "#6b7280",
        textMuted: "#9ca3af",
        textBrandSoft: "#93c5fd",

        success: "#16a34a",
        warning: "#f59e0b",
        error: "#dc2626",

        border: "#e5e7eb",
        radius: "12px",
        shadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
};
