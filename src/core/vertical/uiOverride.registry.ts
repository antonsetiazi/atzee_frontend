/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ComponentType } from "react";
import type { VerticalUIOverride } from "./uiOverride.types";

class UIOverrideRegistry {
    private overrides = new Map<string, ComponentType<any>>();

    register(config: VerticalUIOverride) {
        for (const override of config.overrides) {
            const key = this.makeKey(
                config.vertical,
                override.target,
                override.key
            );
            this.overrides.set(key, override.component);
        }
    }

    resolve(
        vertical: string | null,
        target: string,
        key: string
    ): ComponentType<any> | null {
        if (!vertical) return null;

        return this.overrides.get(this.makeKey(vertical, target, key)) ?? null;
    }

    private makeKey(vertical: string, target: string, key: string) {
        return `${vertical}:${target}:${key}`;
    }
}

export const uiOverrideRegistry = new UIOverrideRegistry();
