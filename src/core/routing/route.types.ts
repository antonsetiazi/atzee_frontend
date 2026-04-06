// src/core/routing/route.types.ts

import type { ComponentType } from "react";

export interface AppRoute {
    path: string;
    element: ComponentType;
    permission?: string;
    meta?: {
        showBottomNav?: boolean;
        showHeader?: boolean;
        fullscreen?: boolean;
    };
}
