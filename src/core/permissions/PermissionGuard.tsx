import { Navigate, Outlet } from "react-router-dom";
import { usePermissionStore } from "@/core/permissions/permission.store";

interface Props {
    permission?: string;
    children: React.ReactElement;
}

/**
 *
 * PermissionGuard
 * ----------------
 * Mesin Otorisasi
 *
 */
export default function PermissionGuard({ permission, children }: Props) {
    const isLoaded = usePermissionStore((s) => s.isLoaded);
    const hasPermission = usePermissionStore((s) => s.has);

    // const permissions = usePermissionStore((s) => s.permissions);

    // console.log(
    //     "PermissionGuard | permission:",
    //     permission,
    //     "store:",
    //     Array.from(permissions),
    // );

    // ⏳ TUNGGU sampai permission siap
    if (!isLoaded) {
        return null; // atau spinner global
    }

    if (permission && !hasPermission(permission)) {
        return <Navigate to="/403" replace />;
    }

    return children ?? <Outlet />;
}
