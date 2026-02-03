// src/business/forms/form.context.ts

export interface FormContext {
    navigate: (path: string) => void;
    entityKey: string;
    refresh?: () => void;
}
