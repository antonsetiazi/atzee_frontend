/* eslint-disable @typescript-eslint/no-explicit-any */

export function expandDotNotation(
    values: Record<string, any>,
): Record<string, any> {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(values)) {
        if (!key.includes(".")) {
            result[key] = value;
            continue;
        }

        const parts = key.split(".");
        let current = result;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (i === parts.length - 1) {
                current[part] = value;
            } else {
                if (!current[part] || typeof current[part] !== "object") {
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
