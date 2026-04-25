// src/core/response/response.types.ts

export type ResponseKind =
    | "success"
    | "business"
    | "validation"
    | "auth"
    | "network"
    | "server";

export interface ApiErrorPayload {
    code?: string;
    message: string;
    type?: ResponseKind;
    details?: Record<string, string[]>;
}

export interface ApiErrorResponse {
    error: ApiErrorPayload;
}

export interface ApiSuccessResponse<T = unknown> {
    data: T;
    meta?: unknown;
}
