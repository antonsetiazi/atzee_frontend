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
            <div className="text-sm text-gray-400 py-4 text-center">
                No shortcuts available
            </div>
        );
    }

    return (
        <div>
            <div
                ref={containerRef}
                className={`
                    flex gap-4 py-4
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
                            min-w-35
                            ${
                                isOverflowing
                                    ? "w-28 sm:w-32 shrink-0"
                                    : "flex-1"
                            }
                            py-5
                            bg-white rounded-2xl
                            shadow-sm hover:shadow-md
                            transition-all duration-200
                            snap-start
                        `}
                    >
                        <div className="flex items-center justify-center w-12 h-12 bg-indigo-50 rounded-full mb-3">
                            <Icon
                                name={item.icon || "home"}
                                className="w-6 h-6 text-indigo-600"
                            />
                        </div>

                        <span className="text-sm font-medium text-gray-700 text-center">
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
