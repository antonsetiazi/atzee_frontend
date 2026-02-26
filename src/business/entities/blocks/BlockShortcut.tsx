// src/business/entities/blocks/BlockShortcut.tsx

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { ShortcutBlock, ShortcutItem } from "../shortcut/shortcut.types";
import Icon from "@/core/ui/icons/Icon";

interface Props {
    block: ShortcutBlock;
}

export default function BlockShortcut({ block }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (!containerRef.current) return;
            const { scrollWidth, clientWidth } = containerRef.current;
            setIsOverflowing(scrollWidth > clientWidth);
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [block.items]);

    if (!block.items?.length) {
        return (
            <div
                className="py-6 text-sm text-center"
                style={{ color: "var(--text-muted)" }}
            >
                No shortcuts available
            </div>
        );
    }

    return (
        <div>
            <div
                ref={containerRef}
                className={`
                    flex gap-5 py-6
                    ${
                        isOverflowing
                            ? "overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                            : "justify-between"
                    }
                `}
            >
                {block.items.map((item: ShortcutItem) => (
                    <Link
                        key={item.key}
                        to={item.to || "#"}
                        className={`
                            flex flex-col items-center justify-center
                            min-w-36
                            ${isOverflowing ? "w-32 shrink-0" : "flex-1"}
                            py-6 px-4
                            rounded-2xl
                            transition-all duration-300
                            snap-start
                        `}
                        style={{
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            boxShadow: "var(--shadow-sm)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-4px)";
                            e.currentTarget.style.boxShadow = "var(--shadow)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "var(--shadow-sm)";
                        }}
                    >
                        {/* Icon Circle */}
                        <div
                            className="flex items-center justify-center w-14 h-14 rounded-full mb-4"
                            style={{
                                background: "var(--color-surface-alt)",
                            }}
                        >
                            <Icon
                                name={item.icon || "home"}
                                size="lg"
                                className="text-primary"
                            />
                        </div>

                        {/* Label */}
                        <span
                            className="text-sm font-medium text-center"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
