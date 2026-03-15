// src/core/ui/components/search_bar/SearchBar.tsx

import { useState } from "react";
import type { SearchBarProps } from "./search_bar.types";

export default function SearchBar({
    value = "",
    placeholder = "Search...",
    autoFocus = false,
    icon,
    onChange,
    onSubmit,
    className = "",
}: SearchBarProps) {
    const [query, setQuery] = useState(value);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;

        setQuery(val);

        onChange?.(val);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            onSubmit?.(query);
        }
    }

    function clear() {
        setQuery("");

        onChange?.("");
    }

    return (
        <div
            className={`
                flex
                items-center
                gap-2
                px-3
                py-2
                rounded-[var(--radius)]
                border border-[var(--color-border)]
                bg-[var(--color-surface)]
                focus-within:ring-2
                focus-within:ring-[var(--color-primary)]
                transition
                ${className}
            `}
        >
            {/* Icon */}

            <span className="text-[var(--text-secondary)] text-sm">
                {icon || "🔍"}
            </span>

            {/* Input */}

            <input
                type="text"
                value={query}
                placeholder={placeholder}
                autoFocus={autoFocus}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="
                    flex-1
                    bg-transparent
                    outline-none
                    text-sm
                    text-[var(--text-primary)]
                    placeholder:text-[var(--text-muted)]
                "
            />

            {/* Clear */}

            {query && (
                <button
                    onClick={clear}
                    className="
                        text-[var(--text-muted)]
                        hover:text-[var(--text-primary)]
                        text-sm
                    "
                >
                    ✕
                </button>
            )}
        </div>
    );
}
