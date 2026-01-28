import type { FormField } from "./types";

type Props = {
    field: FormField;
    value: unknown;
    onChange: (value: unknown) => void;
};

export default function FormFieldRenderer({ field, value, onChange }: Props) {
    switch (field.type) {
        case "text":
        case "textarea":
            return (
                <input
                    className="border px-3 py-2 w-full"
                    value={typeof value === "string" ? value : ""}
                    onChange={(e) => onChange(e.target.value)}
                />
            );

        case "number":
            return (
                <input
                    type="number"
                    className="border px-3 py-2 w-full"
                    value={typeof value === "number" ? value : ""}
                    onChange={(e) => onChange(Number(e.target.value))}
                />
            );

        case "checkbox":
            return (
                <input
                    type="checkbox"
                    checked={typeof value === "boolean" ? value : false}
                    onChange={(e) => onChange(e.target.checked)}
                />
            );

        case "select":
            return (
                <select
                    className="border px-3 py-2 w-full"
                    value={
                        typeof value === "string" || typeof value === "number"
                            ? value
                            : ""
                    }
                    onChange={(e) => onChange(e.target.value)}
                >
                    <option value="">-- select --</option>
                    {field.options?.map((opt) => (
                        <option key={String(opt.value)} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            );

        default:
            return null;
    }
}
