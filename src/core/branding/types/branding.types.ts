// src/core/branding/types/branding.types.ts

export type BrandingConfig = {
    appName: string;
    logoUrl: string;
    faviconUrl?: string;

    theme: {
        // ================= Mode =================
        mode: "light" | "dark";

        // ================= Core Colors =================
        primary: string;
        secondary: string;
        accent?: string;

        // ================= Surface System =================
        background: string;
        surface: string;
        surfaceAlt: string;

        // ================= Text System =================
        textPrimary: string;
        textSecondary: string;
        textMuted: string;
        textBrandSoft: string;

        // ================= State Colors =================
        success: string;
        warning: string;
        error: string;

        // ================= Border =================
        border: string;

        // ================= Radius & Shadow =================
        radius: string;
        shadow: string;

        // ================= Typography =================
        font?: {
            family?: string;
            size?: string;
            weight?: string;
        };
    };

    layout?: {
        sidebar?: "default" | "compact";
    };
};
