/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/schema/ui-schema.store.ts
import { create } from "zustand";
import type { UISchema } from "./ui-schema.types";
import { fetchUISchema } from "./ui-schema.api";

interface UISchemaState {
    schemas: Record<string, UISchema>;
    loading: Record<string, boolean>;
    error: Record<string, string | null>;

    /** API LAMA (DIPERTAHANKAN) */
    loadSchema: (entity: string) => Promise<UISchema>;

    /** API BARU (PLATFORM-GRADE) */
    getSchema: (entity: string) => Promise<UISchema>;

    clear: () => void;
}

export const useUISchemaStore = create<UISchemaState>((set, get) => ({
    schemas: {},
    loading: {},
    error: {},

    /** =========================
     * API BARU — AMAN & ROBUST
     * ========================= */
    async getSchema(entity) {
        const { schemas, loading } = get();

        // ✅ CACHE HIT
        if (schemas[entity]) {
            return schemas[entity];
        }

        // ⏳ REQUEST SEDANG BERJALAN → TUNGGU
        if (loading[entity]) {
            return new Promise((resolve, reject) => {
                const unsub = useUISchemaStore.subscribe((state) => {
                    if (state.schemas[entity]) {
                        resolve(state.schemas[entity]);
                        unsub();
                    }
                    if (state.error[entity]) {
                        reject(state.error[entity]);
                        unsub();
                    }
                });
            });
        }

        set((s) => ({
            loading: { ...s.loading, [entity]: true },
            error: { ...s.error, [entity]: null },
        }));

        try {
            const schema = await fetchUISchema(entity);

            set((s) => ({
                schemas: { ...s.schemas, [entity]: schema },
                loading: { ...s.loading, [entity]: false },
            }));

            return schema;
        } catch (e: any) {
            set((s) => ({
                loading: { ...s.loading, [entity]: false },
                error: { ...s.error, [entity]: e.message },
            }));
            throw e;
        }
    },

    /** =========================
     * API LAMA — ALIAS KE BARU
     * ========================= */
    async loadSchema(entity) {
        return get().getSchema(entity);
    },

    clear() {
        set({
            schemas: {},
            loading: {},
            error: {},
        });
    },
}));
