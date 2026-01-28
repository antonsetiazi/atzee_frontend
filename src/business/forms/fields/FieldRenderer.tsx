/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/FieldRenderer.tsx

import TextField from "./TextField";
import NumberField from "./NumberField";
import SelectField from "./SelectField";
import type { FormFieldSchema } from "./field.types";
import TextareaField from "./TextareaField";
import EmailField from "./EmailField";

interface Props {
    field: FormFieldSchema;
    value?: any;
    onChange?: (name: string, value: any) => void;
}

export default function FieldRenderer({ field, value, onChange }: Props) {
    if (field.hidden) return null;

    switch (field.type) {
        case "text":
            return (
                <TextField field={field} value={value} onChange={onChange} />
            );

        case "email":
            return (
                <EmailField field={field} value={value} onChange={onChange} />
            );

        case "number":
            return (
                <NumberField field={field} value={value} onChange={onChange} />
            );

        case "select":
            return (
                <SelectField field={field} value={value} onChange={onChange} />
            );

        case "textarea":
            return (
                <TextareaField
                    field={field}
                    value={value}
                    onChange={onChange}
                />
            );

        default:
            return null;
    }
}
