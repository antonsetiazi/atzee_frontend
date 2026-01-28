import { hasPermission } from "./xxxxpermissionGuard";

interface Props {
    permission?: string;
    children: React.ReactNode;
}

export function Can({ permission, children }: Props) {
    // JIKA TIDAK ADA PERMISSION → BOLEH
    if (!permission) {
        return <>{children}</>;
    }

    if (!hasPermission(permission)) return null;
    return <>{children}</>;
}
