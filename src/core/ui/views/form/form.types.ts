// src/core/ui/views/form/form.types.ts

export type FieldType =
    | "text"
    | "email"
    | "number"
    | "password"
    | "textarea"
    | "select"
    | "date"
    | "datetime"
    | "time"
    | "file";

export interface FieldSchema {
    name: string;
    type: FieldType;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: { label: string; value: string }[];
}

export interface FormSchema {
    title?: string;
    description?: string;
    fields: FieldSchema[];

    layout?: {
        columns?: 1 | 2 | 3;
    };

    endpoints: {
        create?: string;
        update?: string;
        retrieve?: string;
    };

    actions?: {
        submit_label?: string;
        cancel_label?: string;
    };
}
