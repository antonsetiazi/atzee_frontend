// src/core/routing/RouteGuard.tsx

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    permission?: string;
}

export default function RouteGuard({ children, permission }: Props) {
    const userPermissions = ["products.view", "inventory.view"]; // mock dulu

    if (permission && !userPermissions.includes(permission)) {
        return <Navigate to="/403" replace />;
    }

    return <>{children}</>;
}
