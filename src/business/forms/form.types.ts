// src/business/forms/form.types.ts

import type { FormFieldSchema } from "./fields/field.types";

export type FormMode = "create" | "edit" | "view";

/**
 * User-driven actions (buttons)
 */
export interface FormAction {
    type: "submit" | "redirect";
    label?: string;
    to?: string;
    permission?: string;
}

/**
 * System-driven redirect after submit success
 */
export interface FormRedirect {
    page: string; // page key, contoh: sales.direct.detail
    param: string; // default: "id"
}

export interface FormSubmitConfig {
    to: string; // endpoint
    method?: "POST" | "PUT" | "PATCH";
}

export interface FormSchema {
    id: string;
    type: "form";

    title?: string;
    description?: string;
    mode?: FormMode;
    permission?: string;

    fields: FormFieldSchema[];

    submit?: {
        label?: string;
        permission?: string;
    };

    submit_to?: string; // shortcut
    method?: "POST" | "PUT" | "PATCH";
    redirect_to?: FormRedirect;
    actions?: FormAction[];
    affects?: "session_user" | "session_settings" | "permissions" | "config";
    refresh_cache?: string[];
}
