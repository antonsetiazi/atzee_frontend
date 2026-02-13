// src/business/entities/blocks/BlockShortcut.tsx

import { Link } from "react-router-dom";
import type { ShortcutBlock, ShortcutItem } from "../shortcut/shortcut.types";
import Icon from "@/core/ui/icons/Icon";

interface Props {
    block: ShortcutBlock;
}

export default function BlockShortcut({ block }: Props) {
    // console.log(block);
    if (!block.items || block.items.length === 0) {
        return (
            <div className="text-sm text-gray-400 py-4 text-center">
                No shortcuts available
            </div>
        );
    }

    return (
        <div className="">
            {block.title && (
                <div className="text-gray-700 font-semibold text-lg mb-3 text-center">
                    {block.title}
                </div>
            )}

            {/* Horizontal scroll container */}
            <div
                className={`flex gap-4 overflow-x-auto py-4 scrollbar-hide snap-x snap-mandatory ${
                    block.center ? "justify-start" : ""
                }`}
            >
                {block.items.map((item: ShortcutItem) => (
                    <Link
                        key={item.key}
                        to={item.to || "#"}
                        className={`
                            flex flex-col items-center justify-center
                            min-w-18 sm:min-w-20 md:min-w-25
                            py-3
                            bg-white rounded-xl shadow hover:shadow-md transition
                            snap-start
                            first:ml-3 last:mr-3
                        `}
                    >
                        {/* Icon Circle */}
                        <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-linear-to-tr from-indigo-500 to-purple-500 rounded-full mb-2">
                            <Icon
                                name={item.icon || "home"}
                                className="w-6 h-6 text-white"
                            />
                        </div>

                        {/* Label */}
                        <span className="text-sm sm:text-base md:text-base text-gray-700 dark:text-gray-200 text-center truncate">
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
