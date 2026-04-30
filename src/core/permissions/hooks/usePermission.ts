// src/core/permissions/hooks/usePermission.ts

import { usePermissionStore } from "../store/permission.store";

export function usePermission() {
    const permissions = usePermissionStore((state) => state.permissions);
    const has = usePermissionStore((state) => state.has);

    return {
        permissions,
        has,
    };
}
