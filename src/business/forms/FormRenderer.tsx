/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/FormRenderer.tsx

import type { FormSchema } from "./form.types";
import FieldRenderer from "./fields/FieldRenderer";
import { useEffect, useState } from "react";
import { submitForm } from "./form.submit";
import { useNavigate } from "react-router-dom";
import type { TableContext } from "../tables/table.context";
import { useFeedbackStore } from "@/core/feedback/feedback.store";
import { button } from "@/core/ui/ui.class";
import { clearEntityCacheByPrefix } from "../entities/entity.cache";

interface Props {
    schema: FormSchema;
    initialValues?: Record<string, any>;
    context: TableContext;
}

export default function FormRenderer({
    schema,
    initialValues,
    context,
}: Props) {
    const [values, setValues] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const feedback = useFeedbackStore();

    // 🔁 Update values ketika initialValues berubah (misal async fetch)
    useEffect(() => {
        if (initialValues) {
            setValues(initialValues);
        }
    }, [initialValues]);

    function handleChange(name: string, value: any) {
        setValues((v) => ({ ...v, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!schema.submit_to) {
            console.warn("Form has no submit_to");
            return;
        }

        setLoading(true);

        try {
            await submitForm(values, {
                submit_to: schema.submit_to,
                method: schema.method,
            });

            feedback.push({
                type: "success",
                title: "Submit",
                message: `Data berhasil disubmit`,
            });

            const entityPrefix = context.entityKey?.split(".")[0];

            if (entityPrefix) {
                clearEntityCacheByPrefix(entityPrefix);
            }

            // refresh table
            context.refresh();

            // 🔁 post-submit actions
            schema.actions?.forEach((action) => {
                if (action.type === "redirect" && action.to) {
                    navigate(action.to);
                }
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-lg shadow-sm"
        >
            {/* HEADER */}
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                    {schema.title ?? "Form"}
                </h2>
                {schema.description && (
                    <p className="text-sm text-gray-500 mt-1">
                        {schema.description}
                    </p>
                )}
            </div>

            {/* FIELDS */}
            <div className="px-6 py-6 space-y-4">
                {schema.fields.map((field, idx) => (
                    <FieldRenderer
                        key={`${schema.id}:${field.key}:${idx}`}
                        field={field}
                        value={values[field.key]}
                        onChange={handleChange}
                    />
                ))}
            </div>

            {/* FOOTER ACTIONS */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-2">
                <button
                    type="submit"
                    disabled={loading}
                    className={`${button.base} ${button.primary}`}
                >
                    {loading ? "Saving..." : "Submit"}
                </button>
            </div>
        </form>
    );
}
