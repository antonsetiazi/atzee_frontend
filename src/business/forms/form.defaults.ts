/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/form.defaults.ts

import type { FormSchema } from "./form.types";

export function buildDefaultValues(schema: FormSchema) {
    const values: Record<string, any> = {};

    for (const field of schema.fields) {
        if (field.default !== undefined) {
            values[field.key] = field.default;
        }
    }

    return values;
}
