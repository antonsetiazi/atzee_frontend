import { create } from "zustand";
import type { AppConfig } from "./appConfig.types";

interface AppConfigState {
    config: AppConfig | null;
    load: () => Promise<void>;
}

export const useAppConfigStore = create<AppConfigState>((set) => ({
    config: null,
    load: async () => {
        const res = await fetch("/config/app.config.json");
        const json = await res.json();
        set({ config: json });
    },
}));
