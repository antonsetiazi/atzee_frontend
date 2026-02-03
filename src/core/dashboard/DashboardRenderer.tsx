/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DashboardWidgetSchema, WidgetType } from "./dashboard.types";
import WidgetContainer from "./widgets/WidgetContainer";
import StatWidget from "./widgets/StatWidget";
import ChartWidget from "./widgets/ChartWidget";
import TableWidget from "./widgets/TableWidget";

type WidgetComponent = React.FC<{
    title: string;
    value: any;
    meta: any;
}>;

/**
 * Renderer registry
 * - WAJIB partial karena tidak semua widget diaktifkan
 */
const widgetMap: Partial<Record<WidgetType, WidgetComponent>> = {
    stat: StatWidget,
    chart: ChartWidget,
    table: TableWidget,
};

interface Props {
    widgets: DashboardWidgetSchema[];
}

export default function DashboardRenderer({ widgets }: Props) {
    if (widgets.length === 0) {
        return (
            <div className="flex items-center justify-center py-20 text-sm text-gray-400">
                No dashboard widgets available
            </div>
        );
    }

    return (
        <div
            className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-2
                xl:grid-cols-3
            "
        >
            {widgets.map((widget) => {
                const Widget = widgetMap[widget.type];

                if (!Widget) {
                    if (import.meta.env.DEV) {
                        console.warn(
                            `[Dashboard] Widget type "${widget.type}" not registered`,
                            widget,
                        );
                    }
                    return null;
                }

                return (
                    <WidgetContainer key={widget.key} size={widget.size}>
                        <Widget
                            title={widget.title}
                            value={widget.value}
                            meta={widget.meta}
                        />
                    </WidgetContainer>
                );
            })}
        </div>
    );
}
