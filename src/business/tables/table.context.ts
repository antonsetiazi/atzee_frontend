// src/business/tables/table.context.ts

export interface TableContext {
    navigate: (path: string) => void;
    refresh: () => void;
    entityKey: string;
}
