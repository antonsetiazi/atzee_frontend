// src/core/response/response.error.ts

import type { ResponseKind } from "./response.types";

export class AppResponseError extends Error {
    status: number;
    code?: string;
    kind: ResponseKind;
    fieldErrors?: Record<string, string[]>;

    constructor(params: {
        status: number;
        message: string;
        kind: ResponseKind;
        code?: string;
        fieldErrors?: Record<string, string[]>;
    }) {
        super(params.message);

        this.name = "AppResponseError";
        this.status = params.status;
        this.kind = params.kind;
        this.code = params.code;
        this.fieldErrors = params.fieldErrors;
    }
}
