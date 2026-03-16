// src/core/ui/components/command_palette/CommandPalette.tsx

import { useEffect, useMemo, useState } from "react";
import CommandItem from "./CommandItem";
import type { CommandPaletteProps } from "./command_palette.types";

export default function CommandPalette({
    open,
    onClose,
    items,
}: CommandPaletteProps) {
    const [query, setQuery] = useState("");

    // CTRL + K shortcut
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                onClose?.();
            }

            if (e.key === "Escape") {
                onClose?.();
            }
        };

        window.addEventListener("keydown", handler);

        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [onClose]);

    const filtered = useMemo(() => {
        if (!query) return items;

        return items.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase()),
        );
    }, [query, items]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-32">
            {/* Backdrop */}
            <div
                className="
                    absolute
                    inset-0
                    bg-black/30
                    backdrop-blur-sm
                "
                onClick={onClose}
            />

            {/* Palette */}
            <div
                className="
                    relative
                    w-full
                    max-w-xl
                    bg-[var(--color-surface)]
                    border
                    border-[var(--color-border)]
                    rounded-xl
                    shadow-2xl
                    overflow-hidden
                "
            >
                {/* Search */}
                <div
                    className="
                        border-b
                        border-[var(--color-border)]
                        px-4
                        py-3
                    "
                >
                    <input
                        autoFocus
                        placeholder="Search actions..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="
                            w-full
                            bg-transparent
                            outline-none
                            text-sm
                            text-[var(--text-primary)]
                            placeholder:text-[var(--text-muted)]
                        "
                    />
                </div>

                {/* Results */}
                <div
                    className="
                        max-h-80
                        overflow-y-auto
                        p-2
                        space-y-1
                    "
                >
                    {filtered.length === 0 && (
                        <div
                            className="
                                text-sm
                                text-[var(--text-muted)]
                                text-center
                                py-6
                            "
                        >
                            No results found
                        </div>
                    )}

                    {filtered.map((item) => (
                        <CommandItem
                            key={item.id}
                            item={item}
                            onSelect={onClose}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
