import { getMyPermissions } from "./permission.api";
import { usePermissionStore } from "./permission.store";

export async function loadMyPermissions() {
    const res = await getMyPermissions();
    usePermissionStore.getState().setPermissions(res);
}
