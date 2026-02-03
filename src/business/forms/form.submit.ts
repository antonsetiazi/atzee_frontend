/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/form.submit.ts

import { httpPost, httpPut, httpPatch } from "@/core/http/http.client";

interface SubmitOptions {
    submit_to: string;
    method?: "POST" | "PUT" | "PATCH";
}

export async function submitForm(
    values: Record<string, any>,
    options: SubmitOptions,
) {
    const method = options.method ?? "POST";

    switch (method) {
        case "POST":
            return httpPost(options.submit_to, values);

        case "PUT":
            return httpPut(options.submit_to, values);

        case "PATCH":
            return httpPatch(options.submit_to, values);

        default:
            throw new Error(`Unsupported method: ${method}`);
    }
}
