// src/core/ui/context/UIContext.ts

export interface TableContext {
    navigate: (path: string) => void;
    refresh: () => void;
    entityKey: string;
}

export interface FormContext {
    navigate: (path: string) => void;
    refresh?: () => void;
    entityKey: string;
}
