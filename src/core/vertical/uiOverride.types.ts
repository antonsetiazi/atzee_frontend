/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ComponentType } from "react";

export type UIOverrideTarget = "entity-page" | "form" | "workflow";

export interface UIOverride {
    target: UIOverrideTarget;
    key: string; // contoh: "product"
    component: ComponentType<any>;
}

export interface VerticalUIOverride {
    vertical: string;
    overrides: UIOverride[];
}
