import type { ComponentType } from "react";

export interface AppRoute {
    path: string;
    element: ComponentType;
    permission?: string;
}
