/* eslint-disable @typescript-eslint/no-explicit-any */
// src/core/utils/interpolate.ts

export function interpolate(template: string, params: Record<string, any>) {
    return template.replace(/{(\w+)}/g, (_, key) =>
        params[key] !== undefined ? String(params[key]) : "",
    );
}
