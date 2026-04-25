// src/core/response/response.policy.ts

import type { ResponseKind } from "./response.types";

export function getResponseKind(status: number): ResponseKind {
    if (status === 400) return "business";
    if (status === 401) return "auth";
    if (status === 403) return "auth";
    if (status === 404) return "business";
    if (status === 409) return "business";
    if (status === 422) return "validation";
    if (status === 0) return "network";
    if (status >= 500) return "server";

    return "server";
}
