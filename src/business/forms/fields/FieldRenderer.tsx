/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/FieldRenderer.tsx

import TextField from "./TextField";
import NumberField from "./NumberField";
import SelectField from "./SelectField";
import type { FormFieldSchema } from "./field.types";
import TextareaField from "./TextareaField";
import EmailField from "./EmailField";
import BooleanField from "./BooleanField";
import DateField from "./DateField";
import DateTimeField from "./DateTimeField";
import ViewField from "./ViewField";
import FileField from "./FileField";
import JsonField from "./JsonField";

interface Props {
    field: FormFieldSchema;
    value?: any;
    error?: string;
    mode?: "create" | "edit" | "view";
    onChange?: (name: string, value: any) => void;
}

export default function FieldRenderer({
    field,
    value,
    error,
    mode,
    onChange,
}: Props) {
    if (field.hidden) return null;

    const readOnly = mode === "view";

    // 🔒 VIEW MODE → render display only
    if (readOnly) {
        return <ViewField field={field} value={value} />;
    }

    switch (field.type) {
        case "text":
            return (
                <TextField
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        case "email":
            return (
                <EmailField
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        case "number":
            return (
                <NumberField
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        case "date":
            return (
                <DateField
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        case "datetime":
            return (
                <DateTimeField
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        case "select":
            return (
                <SelectField
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        case "textarea":
            return (
                <TextareaField
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        case "boolean":
            return (
                <BooleanField
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        case "file":
            return (
                <FileField
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        case "json":
            return (
                <JsonField
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );
        default:
            return null;
    }
}
