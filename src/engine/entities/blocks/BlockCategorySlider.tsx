// src/engine/entities/blocks/BlockCategorySlider.tsx

import CategorySlider from "@/modules/category/components/CategorySlider";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

interface Props {
    block: {
        title?: string;
        scope?: string;
    };
}

export default function BlockCategorySlider({ block }: Props) {
    const { isMobile } = useBreakpoint();
    return (
        <div
            className={`
                ${isMobile ? "px-4 py-0" : "px-4 py-4"}
            `}
        >
            <CategorySlider title={block.title} scope={block.scope} />
        </div>
    );
}
