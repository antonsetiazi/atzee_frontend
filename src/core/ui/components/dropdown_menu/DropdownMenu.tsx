// src/core/ui/components/dropdown_menu/DropdownMenu.tsx

import { useEffect, useRef, useState } from "react";
import type { DropdownMenuProps } from "./dropdown_menu.types";

export default function DropdownMenu({
    trigger,
    items,
    align = "right",
    width = 200,
    className = "",
}: DropdownMenuProps) {
    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={ref} className="relative inline-block">
            <div onClick={() => setOpen(!open)} className="cursor-pointer">
                {trigger}
            </div>

            {open && (
                <div
                    style={{ width }}
                    className={`
                        absolute z-50 mt-2
                        ${align === "right" ? "right-0" : "left-0"}
                        bg-[var(--color-surface)]
                        border border-[var(--color-border)]
                        rounded-[var(--radius)]
                        shadow-[var(--shadow)]
                        py-1
                        ${className}
                    `}
                >
                    {items.map((item, index) => {
                        if (item.divider) {
                            return (
                                <div
                                    key={index}
                                    className="my-1 border-t border-[var(--color-border)]"
                                />
                            );
                        }

                        return (
                            <button
                                key={index}
                                disabled={item.disabled}
                                onClick={() => {
                                    if (item.disabled) return;

                                    item.onClick?.();

                                    setOpen(false);
                                }}
                                className={`
                                    w-full
                                    flex
                                    items-center
                                    gap-2
                                    px-3
                                    py-2
                                    text-sm
                                    text-left
                                    transition
                                    ${
                                        item.danger
                                            ? "text-[var(--color-error)]"
                                            : "text-[var(--text-primary)]"
                                    }
                                    ${
                                        item.disabled
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-[var(--color-surface-alt)]"
                                    }
                                `}
                            >
                                {item.icon && (
                                    <span className="flex items-center">
                                        {item.icon}
                                    </span>
                                )}

                                {item.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
