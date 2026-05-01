// src/business/forms/FormRenderer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FormSchema } from "./form.types";
import FieldRenderer from "./fields/FieldRenderer";
import { useEffect, useState, useCallback } from "react";
import { submitForm } from "./form.submit";
import type { TableContext } from "../tables/table.context";
import { useFeedbackStore } from "@/core/feedback/feedback.store";
import { clearEntityCacheByPrefix } from "@/engine/entities/cache/entity.cache";
import type { FormContext } from "./form.context";
import { expandDotNotation, flattenObject } from "./form.utils";
import { buildDefaultValues } from "./form.defaults";
import { handleCoreAffects } from "@/core/utils/coreAffects";
import { Button } from "@/core/ui/components";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

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

    const handleChange = useCallback((name: string, value: any) => {
        setValues((v) => ({ ...v, [name]: value }));
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!schema.submit_to) return;

        setLoading(true);
        setErrors({}); // reset error lama
        // console.log("values:", values);

        try {
            // ✅ normalize flat form values → nested payload
            const payload = expandDotNotation(values);
            // console.log("payload: ", payload);
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

            if (schema.refresh_cache?.length) {
                schema.refresh_cache.forEach((prefix) => {
                    clearEntityCacheByPrefix(prefix);
                });
            }

            if (schema.affects) {
                await handleCoreAffects(schema.affects);
            }

            // 🔁 post-submit actions
            if (schema.redirect_to && response) {
                const { page: pageKey, param } = schema.redirect_to;

                const pathRedirectTo = pageKey;

                const path = pathRedirectTo
                    .replace(":id", String(response[param]))
                    .replace(":parent_id", String(parentId));

                SmartNavigate.go(path);
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
    // console.log(schema);
    // console.log(initialValues);

    return (
        <form
            onSubmit={isViewMode ? undefined : handleSubmit}
            className="rounded-xl overflow-hidden"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
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
                            formValues={values}
                        />
                    );
                }) ?? null}
            </div>

            {/* FOOTER ACTIONS */}
            {!isViewMode && (
                <div
                    className="px-6 py-4 flex items-center justify-end gap-3"
                    style={{
                        borderTop: "1px solid var(--color-border)",
                        background: "var(--color-surface-alt)",
                    }}
                >
                    <Button type="submit" loading={loading} variant="success">
                        {loading ? "Saving..." : "Submit"}
                    </Button>
                </div>
            )}
        </form>
    );
}
