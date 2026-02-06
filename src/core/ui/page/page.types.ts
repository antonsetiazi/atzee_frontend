/* eslint-disable @typescript-eslint/no-explicit-any */
// src/core/ui/page/page.types.ts

export interface UIBlock {
    type: string; // 'table' | 'form' | 'workflow' | 'chart' | etc
    columns?: any[];
    actions?: any[];
    data_source?: string;
}

export interface UIPage {
    key: string;
    // page_key: string;
    title: string;
    description: string;
    domain: string;
    entity: string;
    path: string;
    permissions: string[];
    blocks: UIBlock[];
}
