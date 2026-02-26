/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DateTimeFieldSchema } from "./field.types";
import { inputBase, inputError } from "./field.ui";

interface Props {
    field: DateTimeFieldSchema;
    value?: any;
    error?: string;
    onChange?: (name: string, value: any) => void;
}

export default function DateTimeField({
    field,
    value,
    error,
    onChange,
}: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;

        // Convert to ISO string (backend expects ISO 8601)
        const iso = raw ? new Date(raw).toISOString() : null;

        onChange?.(field.key, iso);
    };

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
                {field.label}
                {field.required && " *"}
            </label>

            <input
                type="datetime-local"
                value={value ? new Date(value).toISOString().slice(0, 16) : ""}
                onChange={handleChange}
                required={field.required}
                // style={{ display: "block", width: "100%" }}
                className={`${inputBase} ${error ? inputError : ""}`}
            />

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
