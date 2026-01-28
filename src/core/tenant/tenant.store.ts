import { create } from "zustand";
import type { Tenant, TenantState } from "./tenant.types";
import { fetchTenants } from "./tenant.api";
// import { fetchTenantBranding } from "./tenant.api";

interface TenantActions {
    loadTenants: () => Promise<void>;
    setActiveTenant: (tenant: Tenant) => Promise<void>;
    resetTenantContext: () => void;
}

export const useTenantStore = create<TenantState & TenantActions>(
    (set, get) => ({
        tenants: [],
        activeTenant: null,
        loading: false,

        loadTenants: async () => {
            set({ loading: true });
            const tenants = await fetchTenants();
            set({ tenants, loading: false });
        },

        setActiveTenant: async (tenant) => {
            if (!tenant) {
                console.warn(
                    "[Tenant] setActiveTenant called with null/undefined",
                );

                set({ activeTenant: null });

                // reset semua context tergantung tenant
                get().resetTenantContext();
                return;
            }

            // Set tenant aktif (data ringan)
            set({ activeTenant: tenant });

            // console.log("Tenant after set:", get().activeTenant);
        },

        resetTenantContext: () => {
            // IMPORTANT: tenant switch = full context reset
            import("@/core/permissions/permission.store").then((m) =>
                m.usePermissionStore.getState().reset(),
            );

            import("@/core/ui/menu/menu.store").then((m) =>
                m.useMenuStore.getState().reset(),
            );

            import("@/business/schema/ui-schema.store").then((m) =>
                m.useUISchemaStore.getState().clear(),
            );

            import("@/business/entities/entity.cache").then((m) =>
                m.clearEntityCache(),
            );
        },
    }),
);
