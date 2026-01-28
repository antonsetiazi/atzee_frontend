// src/core/routing/moduleRegistry.ts

import type { ModuleDefinition } from "./types";

const moduleRegistry: ModuleDefinition[] = [];

export function registerModule(module: ModuleDefinition) {
    moduleRegistry.push(module);
}

export function getRegisteredModules() {
    return moduleRegistry;
}
