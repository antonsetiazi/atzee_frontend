// src/core/permissions/utils/hasPermission.ts

import { usePermissionStore } from "../store/permission.store";

export function hasPermission(permission: string): boolean {
    return usePermissionStore.getState().has(permission);
}
