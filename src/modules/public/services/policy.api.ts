// src/modules/public/services/policy.api.ts

import { httpGet } from "@/core/http/http.client";

export function fetchPolicy(type: string) {
    return httpGet("/public/policies/latest/", {
        skipAuth: true, // 🔥 penting (guest access)
        query: {
            type,
        },
    });
}
