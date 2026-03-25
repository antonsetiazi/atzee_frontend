// src/business/entities/blocks/BlockShortcut.tsx

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ShortcutBlock, ShortcutItem } from "../shortcut/shortcut.types";
import Icon from "@/core/ui/icons/Icon";

interface Props {
    block: ShortcutBlock;
}

function getColor(index: number) {
    const colors = [
        "#3B82F6", // blue
        "#10B981", // green
        "#F59E0B", // yellow
        "#EF4444", // red
        "#8B5CF6", // purple
        "#EC4899", // pink
        "#06B6D4", // cyan
        "#F97316", // orange
    ];
    return colors[index % colors.length];
}

export default function BlockShortcut({ block }: Props) {
    const items = block.items || [];
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 50);
        return () => clearTimeout(t);
    }, []);

    if (!items.length) {
        return (
            <div className="py-6 text-sm text-center text-[var(--text-muted)]">
                Belum ada shortcut
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-6 gap-x-2">
                {items.map((item: ShortcutItem, index: number) => {
                    const color = getColor(index);

                    return (
                        <Link
                            key={item.key}
                            to={item.to || "#"}
                            className={`
                                flex flex-col items-center justify-center gap-2
                                transition-all duration-500
                                active:scale-90
                                ${
                                    visible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                }
                            `}
                            style={{
                                transitionDelay: `${index * 60}ms`,
                            }}
                        >
                            {/* ICON */}
                            <div
                                className="
                                    flex items-center justify-center
                                    w-14 h-14 rounded-full
                                    transition-all duration-300
                                    hover:scale-110
                                "
                                style={{
                                    background: `${color}15`,
                                }}
                            >
                                <Icon
                                    name={item.icon || "home"}
                                    size="lg"
                                    style={{ color }}
                                />
                            </div>

                            {/* LABEL */}
                            <span
                                className="text-xs sm:text-sm text-center leading-tight"
                                style={{ color: "var(--color-primary)" }}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
