// src/core/ui/views/form/FormFieldRenderer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    TextField,
    EmailField,
    NumberField,
    PasswordField,
    TextAreaField,
    SelectField,
    DateField,
    DateTimeField,
    TimeField,
    FileField,
} from "@/core/ui/components";

import type { FieldSchema } from "./form.types";

interface Props {
    field: FieldSchema;
    value: any;
    onChange: (name: string, value: any) => void;
}

export default function FormFieldRenderer({ field, value, onChange }: Props) {
    const common = {
        label: field.label,
        value,
        placeholder: field.placeholder,
        onChange: (val: any) => onChange(field.name, val),
    };

    switch (field.type) {
        case "text":
            return <TextField {...common} />;
        case "email":
            return <EmailField {...common} />;
        case "number":
            return <NumberField {...common} />;
        case "password":
            return <PasswordField {...common} />;
        case "textarea":
            return <TextAreaField {...common} />;
        case "select":
            return <SelectField {...common} options={field.options || []} />;
        case "date":
            return <DateField {...common} />;
        case "datetime":
            return <DateTimeField {...common} />;
        case "time":
            return <TimeField {...common} />;
        case "file":
            return <FileField {...common} />;
        default:
            return null;
    }
}
