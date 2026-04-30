// src/core/bootstrap/services/permissions.bootstrap.ts

import { getMyPermissions } from "@/core/permissions/api/permission.api";
import { usePermissionStore } from "@/core/permissions/store/permission.store";

export async function PermissionsBootstrap() {
    const permissions = await getMyPermissions();

    usePermissionStore.getState().setPermissions(permissions);
}
