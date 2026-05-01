// src/engine/entities/blocks/BlockText.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
    block: any;
}

export default function BlockText({ block }: Props) {
    return (
        <div className="p-5 text-gray-900">
            <div className="text-sm font-medium text-gray-500">
                {block.title}
            </div>
            <div className="mt-2 text-lg">{block.value}</div>
        </div>
    );
}
