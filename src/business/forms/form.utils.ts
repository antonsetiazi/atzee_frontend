/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/form.utils.ts

export function expandDotNotation(
    values: Record<string, any>,
): Record<string, any> {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(values)) {
        // ===== NON DOT KEY =====
        if (!key.includes(".")) {
            // Jangan override kalau sudah dibuat nested sebelumnya
            if (
                result[key] &&
                typeof result[key] === "object" &&
                !Array.isArray(result[key])
            ) {
                continue;
            }

            result[key] = value;
            continue;
        }

        // ===== DOT KEY =====
        const parts = key.split(".");
        const rootKey = parts[0];

        // Kalau root sudah array / primitive → reset jadi object
        if (
            result[rootKey] &&
            (Array.isArray(result[rootKey]) ||
                typeof result[rootKey] !== "object")
        ) {
            result[rootKey] = {};
        }

        let current = result;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (i === parts.length - 1) {
                current[part] = value;
            } else {
                if (
                    !current[part] ||
                    typeof current[part] !== "object" ||
                    Array.isArray(current[part])
                ) {
                    current[part] = {};
                }
                current = current[part];
            }
        }
    }

    return result;
}

export function flattenObject(
    obj: Record<string, any>,
    parentKey = "",
    result: Record<string, any> = {},
) {
    for (const key in obj) {
        const value = obj[key];
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value)
        ) {
            flattenObject(value, newKey, result);
        } else {
            result[newKey] = value;
        }
    }

    return result;
}
