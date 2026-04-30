// src/core/routing/guards/PrivateRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useSessionStore } from "../../session/session.store";

interface Props {
    children: React.ReactNode;
}

/**
 * Prinsip:
 * Tidak cek permission
 * Tidak tahu role
 *
 * Satu tugas:
 * sudah login atau belum
 */

export default function PrivateRoute({ children }: Props) {
    const isAuthenticated = useSessionStore((s) => s.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children ?? <Outlet />;
}
