// src/core/bootstrap/services/permissions.bootstrap.ts

import { getMyPermissions } from "@/core/permissions/permission.api";
import { usePermissionStore } from "@/core/permissions/permission.store";

export async function PermissionsBootstrap() {
    const permissions = await getMyPermissions();

    usePermissionStore.getState().setPermissions(permissions);
}
