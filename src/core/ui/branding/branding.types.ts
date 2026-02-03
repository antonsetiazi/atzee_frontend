// src/core/ui/branding/branding.types.ts

export type BrandingConfig = {
    appName: string;
    logoUrl: string;
    faviconUrl?: string;

    theme: {
        mode: "light" | "dark";
        primary: string;
        secondary: string;
        accent?: string;
    };

    layout?: {
        sidebar?: "default" | "compact";
    };
};
