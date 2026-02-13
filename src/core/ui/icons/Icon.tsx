// src/core/ui/icons/Icon.tsx

import { iconRegistry } from "./icon.registry";

interface Props {
    name: string;
    className?: string;
}

export default function Icon({ name, className }: Props) {
    const Component = iconRegistry[name];

    if (!Component) return null;

    return <Component className={className || "w-5 h-5"} />;
}
