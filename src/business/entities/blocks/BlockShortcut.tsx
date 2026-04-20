// src/business/entities/blocks/BlockShortcut.tsx

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import type { ShortcutBlock, ShortcutItem } from "../shortcut/shortcut.types";

import Icon from "@/core/ui/icons/Icon";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

interface Props {
    block: ShortcutBlock;
}

function getColor(index: number) {
    const colors = [
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6",
        "#EC4899",
        "#06B6D4",
        "#F97316",
    ];

    return colors[index % colors.length];
}

export default function BlockShortcut({ block }: Props) {
    const items = block.items || [];
    const { isMobile } = useBreakpoint();

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 60);
        return () => clearTimeout(t);
    }, []);

    if (!items.length) {
        return (
            <div
                className="
                    rounded-2xl border px-4 py-8 text-center text-sm
                "
                style={{
                    borderColor: "var(--color-border)",
                    background: "var(--color-surface)",
                    color: "var(--color-text-muted)",
                }}
            >
                Belum ada shortcut
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Responsive Grid */}
            <div
                className={`
                    grid gap-4
                    grid-cols-${items.length}
                    border-t border-b border-[var(--color-border)]
                    ${isMobile ? "py-4 my-0" : "py-5 my-5"}
                `}
            >
                {items.map((item: ShortcutItem, index: number) => {
                    const color = getColor(index);

                    return (
                        <Link
                            key={item.key}
                            to={item.to || "#"}
                            className={`
                                group relative overflow-hidden
                                rounded-2xl
                                flex flex-col items-center justify-center
                                text-center
                                transition-all duration-500
                                active:scale-95
                                hover:-translate-y-1
                                hover:shadow-lg
                                ${
                                    visible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                }
                                ${isMobile ? "px-2 py-3" : "px-3 py-4"}
                            `}
                            style={{
                                transitionDelay: `${index * 55}ms`,
                                // borderColor: "var(--color-border)",
                                background: "var(--color-surface)",
                            }}
                        >
                            {/* Glow Hover Layer */}
                            <div
                                className="
                                    absolute inset-0 opacity-0
                                    group-hover:opacity-100
                                    transition-opacity duration-300
                                "
                                style={{
                                    background: `linear-gradient(135deg, ${color}10, transparent 70%)`,
                                }}
                            />

                            {/* Icon */}
                            <div
                                className={`
                                    relative z-10
                                    flex items-center justify-center
                                    rounded-2xl
                                    transition-all duration-300
                                    group-hover:scale-110
                                    group-hover:-translate-y-0.5
                                    ${isMobile ? "w-12 h-12" : "w-14 h-14"}
                                `}
                                style={{
                                    background: `${color}18`,
                                    boxShadow: `0 8px 18px ${color}20`,
                                }}
                            >
                                <Icon
                                    name={item.icon || "home"}
                                    size={isMobile ? "lg" : "lg"}
                                    style={{ color }}
                                />
                            </div>

                            {/* Label */}
                            <span
                                className={`
                                    relative z-10 mt-2 font-medium leading-tight
                                    transition-colors duration-300
                                    group-hover:opacity-100                                    
                                    ${
                                        isMobile
                                            ? "text-[11px]"
                                            : "text-xs sm:text-sm"
                                    }
                                `}
                                style={{
                                    color: "var(--color-primary)",
                                }}
                            >
                                {item.label}
                            </span>

                            {/* Subtle Bottom Accent */}
                            <div
                                className="
                                    absolute bottom-0 left-0 right-0 h-[2px]
                                    scale-x-0 group-hover:scale-x-100
                                    transition-transform duration-300
                                    origin-center
                                "
                                style={{
                                    background: color,
                                }}
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
