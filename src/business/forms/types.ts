import type { FieldValueMap } from "./fieldValueMap";

export type FieldType = keyof FieldValueMap;

export interface VisibilityRule {
    field: string;
    equals: unknown;
}

export interface FormField<T extends FieldType = FieldType> {
    name: string;
    label: string;
    type: T;
    required?: boolean;
    options?: T extends "select"
        ? { label: string; value: FieldValueMap["select"] }[]
        : never;
    visible_if?: VisibilityRule;
}

export interface FormSchema {
    fields: FormField[];
}
