/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    PencilSquareIcon,
    XCircleIcon,
    EyeIcon,
    PlusIcon,
    HomeIcon,
    // UserIcon,
    UserCircleIcon,
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
};
