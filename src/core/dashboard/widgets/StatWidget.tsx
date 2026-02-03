// src/core/dashboard/widgets/StatWidget.tsx

import type { WidgetMeta } from "../dashboard.types";
import { formatValue } from "../utils/formatValue";

interface Props {
    title: string;
    value: number | string;
    suffix?: string;
    meta?: WidgetMeta;
}

export default function StatWidget({ title, value, suffix, meta }: Props) {
    return (
        <div
            className="
                h-full
                rounded-xl
                border border-gray-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:shadow-md
            "
        >
            {/* Title */}
            <div className="text-sm font-medium text-gray-500">{title}</div>

            {/* Value */}
            <div className="mt-3 flex items-end gap-2">
                <div className="text-3xl font-semibold tracking-tight text-gray-900">
                    {formatValue(value, meta)}
                </div>

                {suffix && (
                    <div className="pb-1 text-sm font-medium text-gray-400">
                        {suffix}
                    </div>
                )}
            </div>
        </div>
    );
}
