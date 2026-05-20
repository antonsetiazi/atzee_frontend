// src/engine/entities/utils/mapBackendAction.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Pencil, Trash2, Eye, PlusCircle } from "lucide-react";

const iconMap: Record<string, any> = {
    plus: PlusCircle,
    edit: Pencil,
    delete: Trash2,
    eye: Eye,
};

export function mapBackendAction(action: any) {
    return {
        label: action.label,
        href: action.to,
        variant: action.variant,
        icon: action.icon ? iconMap[action.icon] : undefined,
    };
}
