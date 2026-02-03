// src/core/ui/branding/branding.store.ts

import { create } from "zustand";
import type { BrandingConfig } from "./branding.types";

type BrandingState = {
    branding: BrandingConfig | null;
    setBranding: (config: BrandingConfig) => void;
};

export const useBrandingStore = create<BrandingState>((set) => ({
    branding: null,
    setBranding: (branding) => set({ branding }),
}));
