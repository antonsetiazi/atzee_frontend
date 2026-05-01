// src/core/utils/object/flatten.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

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
