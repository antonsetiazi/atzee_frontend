/* eslint-disable @typescript-eslint/no-explicit-any */
// src/core/ui/icons/icon.registry.ts

import {
    PencilSquareIcon,
    XCircleIcon,
    EyeIcon,
    PlusIcon,
    HomeIcon,
    // UserIcon,
    UserCircleIcon,
    ChartBarIcon,
    CubeIcon,
    ShoppingCartIcon,
    ArrowRightStartOnRectangleIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
} from "@heroicons/react/20/solid";

export const iconRegistry: Record<string, any> = {
    // Action Icons
    edit: PencilSquareIcon,
    delete: XCircleIcon,
    view: EyeIcon,
    create: PlusIcon,

    // Navigation Icons
    home: HomeIcon,
    "user-check": UserCircleIcon,
    plus: PlusIcon,
    "chart-line": ChartBarIcon,
    "shopping-cart": ShoppingCartIcon,
    box: CubeIcon,

    // System Icons
    "log-out": ArrowRightStartOnRectangleIcon,
    "chevron-down": ChevronDownIcon,
    cog: Cog6ToothIcon,
};
