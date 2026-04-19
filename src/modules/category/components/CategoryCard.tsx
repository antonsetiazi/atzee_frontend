// src/modules/category/components/CategoryCard.tsx

import { useNavigate } from "react-router-dom";
import { getCategoryIcon } from "../utils/categoryIcons";
import type { CategoryItem } from "../types/category.types";

interface Props {
    item: CategoryItem;
    isMobile?: boolean;
}

export default function CategoryCard({ item, isMobile = true }: Props) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/services?category=${item.code}`);
    }

    return (
        <button
            onClick={handleClick}
            className={`
                bg-white rounded-2xl border border-gray-100
                shadow-sm hover:shadow-md transition
                flex flex-col items-center justify-center shrink-0

                ${
                    isMobile
                        ? "min-w-[92px] p-3 gap-2"
                        : "min-w-[150px] p-5 gap-3"
                }
            `}
        >
            <div
                className={`
                    rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600
                    ${isMobile ? "w-12 h-12 text-xl" : "w-16 h-16 text-2xl"}
                `}
            >
                {getCategoryIcon(item.code)}
            </div>

            <span
                className={`
                    font-medium text-center leading-tight
                    ${isMobile ? "text-xs" : "text-sm"}
                `}
            >
                {item.name}
            </span>
        </button>
    );
}
