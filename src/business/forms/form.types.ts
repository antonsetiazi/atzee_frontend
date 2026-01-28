// src/business/forms/form.types.ts

import type { FormFieldSchema } from "./fields/field.types";

export type FormMode = "create" | "edit" | "view";

export interface FormAction {
    type: "submit" | "redirect";
    label?: string;
    to?: string;
    permission?: string;
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
    actions?: FormAction[];
}
