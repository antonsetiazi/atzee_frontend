// src/business/forms/fields/FileField.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FileFieldSchema } from "./field.types";
import { inputBase, inputError } from "./field.ui";

interface Props {
    field: FileFieldSchema;
    value?: File | File[] | null;
    error?: string;
    onChange?: (name: string, value: any) => void;
}

export default function FileField({ field, value, error, onChange }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        if (field.multiple) {
            onChange?.(field.key, Array.from(files));
        } else {
            onChange?.(field.key, files[0]);
        }
    };

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
                {field.label}
                {field.required && <span className="required">*</span>}
            </label>

            <input
                type="file"
                name={field.key}
                accept={field.accept}
                multiple={field.multiple}
                onChange={handleChange}
                className={`${inputBase} ${error ? inputError : ""}`}
            />

            {value && !field.multiple && value instanceof File && (
                <div className="file-preview">Selected: {value.name}</div>
            )}

            {error && <div className="form-error">{error}</div>}
        </div>
    );
}
