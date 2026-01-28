import { getPermissions } from "./permissionStore";
import type { PermissionCode } from "./types";

export function hasPermission(code: PermissionCode): boolean {
    const permissions = getPermissions();
    return permissions.has(code);
}
