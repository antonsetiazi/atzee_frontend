/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/field.types.ts

export type FieldType =
    | "text"
    | "number"
    | "select"
    | "textarea"
    | "email"
    | "boolean"
    | "date"
    | "time"
    | "datetime"
    | "color"
    | "file"
    | "json"
    | "duration";

export interface BaseFieldSchema {
    key: string; // 🔑 PRIMARY ID
    label: string;
    placeholder: string;

    default?: any;
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    permission?: string;
}

export interface TextFieldSchema extends BaseFieldSchema {
    type: "text";
}

export interface PasswordFieldSchema extends BaseFieldSchema {
    type: "password";
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

export interface TimeFieldSchema extends BaseFieldSchema {
    type: "time";
}

export interface DateTimeFieldSchema extends BaseFieldSchema {
    type: "datetime";
}

export interface ColorFieldSchema extends BaseFieldSchema {
    type: "color";
}

export interface SelectFieldSchema extends BaseFieldSchema {
    type: "select";

    // ✅ static options
    options?: SelectOption[];

    // ✅ dynamic options
    data_source?: string;
    request_method?: "GET" | "POST";
}

export interface TextareaFieldSchema extends BaseFieldSchema {
    type: "textarea";
}

export interface BooleanFieldSchema extends BaseFieldSchema {
    type: "boolean";
}

export interface FileFieldSchema extends BaseFieldSchema {
    type: "file";

    accept?: string; // "image/*", ".pdf,.docx"
    multiple?: boolean; // default false
    maxSizeMb?: number; // optional validation
}

export interface JsonFieldSchema extends BaseFieldSchema {
    type: "json";

    /**
     * optional hint for UI
     * example:
     * "object"
     * "array"
     */
    mode?: "object" | "array";
}

export interface DurationFieldSchema extends BaseFieldSchema {
    type: "duration";
}

export type FormFieldSchema =
    | TextFieldSchema
    | PasswordFieldSchema
    | EmailFieldSchema
    | NumberFieldSchema
    | SelectFieldSchema
    | TextareaFieldSchema
    | BooleanFieldSchema
    | DateFieldSchema
    | TimeFieldSchema
    | DateTimeFieldSchema
    | ColorFieldSchema
    | FileFieldSchema
    | JsonFieldSchema
    | DurationFieldSchema;

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
