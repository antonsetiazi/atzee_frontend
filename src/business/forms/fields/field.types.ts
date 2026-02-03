/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/field.types.ts

export type FieldType =
    | "text"
    | "number"
    | "select"
    | "textarea"
    | "email"
    | "boolean"
    | "date";

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

export interface DateFieldSchema extends BaseFieldSchema {
    type: "date";
}

export interface SelectFieldSchema extends BaseFieldSchema {
    type: "select";

    // ✅ static options
    options?: SelectOption[];

    // ✅ dynamic options
    data_source?: FieldDataSource;
}

export interface TextareaFieldSchema extends BaseFieldSchema {
    type: "textarea";
}

export interface BooleanFieldSchema extends BaseFieldSchema {
    type: "boolean";
}

export type FormFieldSchema =
    | TextFieldSchema
    | EmailFieldSchema
    | NumberFieldSchema
    | SelectFieldSchema
    | TextareaFieldSchema
    | BooleanFieldSchema
    | DateFieldSchema;

export type FieldDataSource =
    | {
          type: "lookup";
          endpoint: string;
      }
    | {
          type: "entity";
          domain: string;
          entity: string;
          query?: any;
          map: {
              value: string;
              label: string; // template: "{code} - {name}"
          };
      };

export interface SelectOption {
    label: string;
    value: string | number;
}
