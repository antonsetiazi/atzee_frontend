// src/modules/category/components/CategoryCard.tsx

// import { getCategoryIcon } from "../utils/categoryIcons";
import type { CategoryItem } from "../types/category.types";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

interface Props {
    item: CategoryItem;
    isMobile?: boolean;
}

export default function CategoryCard({ item, isMobile = true }: Props) {
    function handleClick() {
        SmartNavigate.go(`/services?category=${item.code}`);
    }

    return (
        <button
            onClick={handleClick}
            className={`flex shrink-0 flex-col items-center rounded-2xl border bg-white shadow-sm ${
                isMobile ? "h-[120px] w-[92px] p-3" : "h-[160px] w-[160px] p-5"
            } `}
            style={{
                borderColor: `${item.color ?? "#10B981"}30`,
            }}
        >
            <div
                className="flex items-center justify-center rounded-full"
                style={{
                    backgroundColor: `${item.color ?? "#10B981"}15`,
                }}
            >
                <img
                    src={item.icon_url || "/images/category-default.png"}
                    alt={item.name}
                    className={isMobile ? "h-16 w-16" : "h-24 w-24"}
                    onError={(e) => {
                        e.currentTarget.src = "/images/category-default.png";
                    }}
                />
            </div>
            <div className="flex min-h-[36px] items-center justify-center text-center leading-tight">
                <span className={`font-medium ${isMobile ? "text-xs" : "text-sm"} `}>
                    {item.name}
                </span>
            </div>
        </button>
    );
}
