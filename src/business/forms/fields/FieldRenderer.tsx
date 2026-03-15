// src/business/forms/fields/FieldRenderer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FormFieldSchema } from "./field.types";
import BooleanField from "./BooleanField";
import ViewField from "./ViewField";
// import FileField from "./FileField";
import JsonField from "./JsonField";
import DurationField from "./DurationField";

import {
    DateField,
    DateTimeField,
    EmailField,
    FileField,
    NumberField,
    PasswordField,
    TextAreaField,
    TextField,
    TimeField,
} from "@/core/ui/components";

import SelectDataField from "./SelectDataField";

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
                    name={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={value}
                    error={error}
                    required={field.required}
                    disabled={field.disabled}
                    onChange={onChange}
                />
            );

        case "password":
            return (
                <PasswordField
                    name={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={value}
                    error={error}
                    required={field.required}
                    disabled={field.disabled}
                    onChange={onChange}
                />
            );

        case "email":
            return (
                <EmailField
                    name={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={value}
                    error={error}
                    required={field.required}
                    disabled={field.disabled}
                    onChange={onChange}
                />
            );

        case "number":
            return (
                <NumberField
                    name={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={value}
                    error={error}
                    required={field.required}
                    disabled={field.disabled}
                    onChange={onChange}
                />
            );

        case "date":
            return (
                <DateField
                    name={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={value}
                    error={error}
                    required={field.required}
                    disabled={field.disabled}
                    onChange={onChange}
                />
            );

        case "time":
            return (
                <TimeField
                    name={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={value}
                    error={error}
                    required={field.required}
                    disabled={field.disabled}
                    onChange={onChange}
                />
            );

        case "datetime":
            return (
                <DateTimeField
                    name={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={value}
                    error={error}
                    required={field.required}
                    disabled={field.disabled}
                    onChange={onChange}
                />
            );

        case "select":
            return (
                <SelectDataField
                    name={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={value}
                    error={error}
                    disabled={field.disabled}
                    dataSource={field.data_source}
                    dataOptions={field.options}
                    onChange={onChange}
                />
            );

        case "textarea":
            return (
                <TextAreaField
                    name={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={value}
                    error={error}
                    required={field.required}
                    disabled={field.disabled}
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
                    name={field.key}
                    label={field.label}
                    value={value}
                    error={error}
                    required={field.required}
                    disabled={field.disabled}
                    accept={field.accept}
                    multiple={field.multiple}
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

        case "duration":
            return (
                <DurationField
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
