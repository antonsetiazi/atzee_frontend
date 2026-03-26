// src/core/http/http.error.ts

export class HttpError extends Error {
    status: number;
    code?: string;
    fieldErrors?: Record<string, string[]>;

    constructor(
        status: number,
        message: string,
        code?: string,
        fieldErrors?: Record<string, string[]>,
    ) {
        super(message);
        this.name = "HttpError";
        this.status = status;
        this.code = code;
        this.fieldErrors = fieldErrors;
    }
}
