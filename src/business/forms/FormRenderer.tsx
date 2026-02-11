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
// import { usePageStore } from "@/core/ui/page/page.store";
// import { pageKeyToPath } from "@/core/routing/page.utils";
import type { FormContext } from "./form.context";
import { expandDotNotation, flattenObject } from "./form.utils";
import { buildDefaultValues } from "./form.defaults";

interface Props {
    entity: string;
    schema: FormSchema;
    initialValues?: Record<string, any>;
    context: TableContext | FormContext;
    parentId?: string;
}

export default function FormRenderer({
    entity,
    schema,
    initialValues,
    context,
    parentId,
}: Props) {
    const [values, setValues] = useState<Record<string, any>>(() =>
        buildDefaultValues(schema),
    );
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const navigate = useNavigate();
    const feedback = useFeedbackStore();
    // const pages = usePageStore.getState().pages;
    const isViewMode = schema.mode === "view";

    // 🔁 Update values ketika initialValues berubah (misal async fetch)
    useEffect(() => {
        if (initialValues) {
            const flatValues = flattenObject(initialValues);
            setValues((prev) => ({
                ...prev, // ← default tetap ada
                ...flatValues, // ← edit override default
            }));
        }
    }, [initialValues]);

    function handleChange(name: string, value: any) {
        setValues((v) => ({ ...v, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!schema.submit_to) return;

        setLoading(true);
        setErrors({}); // reset error lama

        try {
            // ✅ normalize flat form values → nested payload
            const payload = expandDotNotation(values);
            // console.log(payload);
            const response = await submitForm(payload, {
                submit_to: schema.submit_to,
                method: schema.method,
            });

            feedback.push({
                type: "success",
                title: "Submit",
                message: `Data berhasil disubmit`,
            });
            // console.log(`table:${entity}`);
            // refresh table
            clearEntityCacheByPrefix(`table:${entity}`);
            context.refresh?.();

            // 🔁 post-submit actions
            if (schema.redirect_to && response) {
                const { page: pageKey, param } = schema.redirect_to;

                const pathRedirectTo = pageKey;

                const path = pathRedirectTo
                    .replace(":id", String(response[param]))
                    .replace(":parent_id", String(parentId));

                navigate(path);
            }
        } catch (err: any) {
            if (err?.fieldErrors) {
                const fieldErrors: Record<string, string> = {};

                Object.entries(err.fieldErrors).forEach(([field, messages]) => {
                    fieldErrors[field] = (messages as string[])[0];
                });

                setErrors(fieldErrors);
                return;
            }
        } finally {
            setLoading(false);
        }
    }
    // console.log(schema.redirect_to);

    return (
        <form
            onSubmit={isViewMode ? undefined : handleSubmit}
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
                {schema.fields.map((field, idx) => {
                    return (
                        <FieldRenderer
                            key={`${schema.id}:${field.key}:${idx}`}
                            field={field}
                            value={values[field.key]}
                            error={errors[field.key]}
                            mode={schema.mode}
                            onChange={isViewMode ? undefined : handleChange}
                        />
                    );
                }) ?? null}
            </div>

            {/* FOOTER ACTIONS */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-2">
                {!isViewMode && (
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${button.base} ${button.primary}`}
                    >
                        {loading ? "Saving..." : "Submit"}
                    </button>
                )}
            </div>
        </form>
    );
}
