// src/core/ui/views/form/form.hooks.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { httpGet, httpPost, httpPatch } from "@/core/http/http.client";
import type { FormSchema } from "./form.types";

export function useFormView(schema: FormSchema, id?: string) {
    const [values, setValues] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(false);

    // 🔹 LOAD DATA (edit mode)
    const retrieveUrl = schema.endpoints.retrieve;

    useEffect(() => {
        if (!id || !retrieveUrl) return;

        setLoading(true);

        httpGet(`${retrieveUrl}/${id}`)
            .then((data) => {
                setValues(data);
            })
            .finally(() => setLoading(false));
    }, [id, retrieveUrl]);

    function handleChange(name: string, value: any) {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit() {
        setLoading(true);

        try {
            if (id && schema.endpoints.update) {
                await httpPatch(`${schema.endpoints.update}/${id}`, values);
            } else if (schema.endpoints.create) {
                await httpPost(schema.endpoints.create, values);
            }
        } finally {
            setLoading(false);
        }
    }

    return {
        values,
        loading,
        handleChange,
        handleSubmit,
    };
}
