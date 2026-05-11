// src/engine/entities/types/shortcut.types.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ShortcutItem {
    key: string;
    label: string;
    icon?: string;
    to?: string;
    permission?: string;
    meta?: Record<string, any>;
}

export interface ShortcutBlock {
    type: "shortcut";
    title?: string;
    description?: string;
    items: ShortcutItem[];
    scrollable?: boolean;
    center?: boolean;

    bordered?: boolean;

    padding_y_mobile?: string;
    padding_y_desktop?: string;

    margin_y_mobile?: string;
    margin_y_desktop?: string;

    rounded?: string;
}
