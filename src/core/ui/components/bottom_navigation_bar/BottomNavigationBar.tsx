// src/core/ui/components/bottom_navigation_bar/BottomNavigationBar.tsx

import type { BottomNavigationBarProps } from "./bottom_navigation_bar.types";

export default function BottomNavigationBar({
    items,
    activeKey,
    onChange,
    className = "",
}: BottomNavigationBarProps) {
    return (
        <div
            className={`
                fixed
                bottom-0
                left-0
                right-0
                z-40
                bg-[var(--color-surface)]
                border-t border-[var(--color-border)]
                shadow-[var(--shadow)]
                ${className}
            `}
        >
            <div className="flex justify-around">
                {items.map((item) => {
                    const active = item.key === activeKey;

                    return (
                        <button
                            key={item.key}
                            onClick={() => onChange?.(item.key)}
                            className={`
                                relative
                                flex
                                flex-col
                                items-center
                                justify-center
                                gap-1
                                flex-1
                                py-2
                                text-xs
                                transition
                                ${
                                    active
                                        ? "text-[var(--color-primary)]"
                                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                }
                            `}
                        >
                            {item.icon && (
                                <span className="text-lg">{item.icon}</span>
                            )}

                            <span>{item.label}</span>

                            {item.badge && item.badge > 0 && (
                                <span
                                    className="
                                        absolute
                                        top-1
                                        right-[30%]
                                        text-[10px]
                                        px-1.5
                                        rounded-full
                                        bg-[var(--color-error)]
                                        text-white
                                    "
                                >
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
