import { create } from "zustand";

interface PermissionState {
    permissions: Set<string>;
    isLoaded: boolean;
    setPermissions: (permissions: string[]) => void;
    clearPermissions: () => void;
    reset: () => void;
    has: (permission: string) => boolean;
}

export const usePermissionStore = create<PermissionState>((set, get) => ({
    permissions: new Set(),
    isLoaded: false,

    setPermissions: (permissions) => {
        // console.log("permission.store | setPermissions", permissions);
        set({
            permissions: new Set(permissions),
            isLoaded: true,
        });
    },
    clearPermissions: () => {
        // console.log("permission.store | clearPermissions");
        set({
            permissions: new Set(),
            isLoaded: true,
        });
    },

    reset: () => {
        // console.log("permission.store | reset");
        set({
            permissions: new Set(),
            isLoaded: false,
        });
    },

    has: (permission) => get().permissions.has(permission),
}));
