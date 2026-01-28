// src/business/forms/fields/field.types.ts

export type FieldType = "text" | "number" | "select" | "textarea" | "email";

export interface BaseFieldSchema {
    key: string; // 🔑 PRIMARY ID
    label: string;

    required?: boolean;
    readonly?: boolean;
    hidden?: boolean;
    permission?: string;
}

export interface TextFieldSchema extends BaseFieldSchema {
    type: "text";
}

export interface EmailFieldSchema extends BaseFieldSchema {
    type: "email";
}

export interface NumberFieldSchema extends BaseFieldSchema {
    type: "number";
}

export interface SelectFieldSchema extends BaseFieldSchema {
    type: "select";
    options: { label: string; value: string | number }[];
}

export interface TextareaFieldSchema extends BaseFieldSchema {
    type: "textarea";
}

export type FormFieldSchema =
    | TextFieldSchema
    | EmailFieldSchema
    | NumberFieldSchema
    | SelectFieldSchema
    | TextareaFieldSchema;
