// src/core/ui/components/command_palette/CommandItem.tsx

import type { CommandItemType } from "./command_palette.types";

interface Props {
    item: CommandItemType;
    onSelect?: () => void;
}

export default function CommandItem({ item, onSelect }: Props) {
    return (
        <button
            onClick={() => {
                item.onSelect?.();
                onSelect?.();
            }}
            className="
                w-full
                text-left
                px-4
                py-3
                rounded-lg
                flex
                items-center
                gap-3
                hover:bg-[var(--color-surface-alt)]
                transition
            "
        >
            {item.icon && (
                <div className="text-[var(--text-muted)]">{item.icon}</div>
            )}

            <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--text-primary)]">
                    {item.title}
                </span>

                {item.description && (
                    <span className="text-xs text-[var(--text-muted)]">
                        {item.description}
                    </span>
                )}
            </div>
        </button>
    );
}
