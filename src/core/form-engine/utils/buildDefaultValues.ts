// src/core/form-engine/utils/buildDefaultValues.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FormSchema } from "../../schema/form.schema";

export function buildDefaultValues(schema: FormSchema) {
    const values: Record<string, any> = {};

    for (const field of schema.fields) {
        if (field.default !== undefined) {
            values[field.key] = field.default;
        }
    }

    return values;
}
