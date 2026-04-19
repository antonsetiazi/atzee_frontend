// src/business/entities/blocks/BlockCategorySlider.tsx

import CategorySlider from "@/modules/category/components/CategorySlider";

interface Props {
    block: {
        title?: string;
        scope?: string;
    };
}

export default function BlockCategorySlider({ block }: Props) {
    return (
        <div className="px-4 py-4">
            <CategorySlider title={block.title} scope={block.scope} />
        </div>
    );
}
