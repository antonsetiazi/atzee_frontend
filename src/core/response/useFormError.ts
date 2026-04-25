// src/core/response/useFormError.ts

import { useState } from "react";
import { AppResponseError } from "./response.error";

type FieldErrors = Record<string, string[]>;

export function useFormError() {
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    function clearError() {
        setError(null);
        setFieldErrors({});
    }

    function getFieldError(name: string): string | undefined {
        return fieldErrors[name]?.[0];
    }

    function handleError(err: unknown) {
        if (err instanceof AppResponseError) {
            if (err.fieldErrors) {
                setFieldErrors(err.fieldErrors);
            }

            if (err.kind === "business" || err.kind === "validation") {
                setError(err.message);
                return;
            }

            setError("Terjadi gangguan sistem, silakan coba lagi.");
            return;
        }

        setError("Terjadi gangguan sistem.");
    }

    return {
        error,
        fieldErrors,
        getFieldError,
        setError,
        clearError,
        handleError,
    };
}
