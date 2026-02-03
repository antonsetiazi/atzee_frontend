// src/core/dashboard/DashboardPage.tsx

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { httpGet } from "@/core/http/http.client";
import DashboardRenderer from "./DashboardRenderer";
import type { DashboardResponse } from "./dashboard.types";

export default function DashboardPage() {
    const [data, setData] = useState<DashboardResponse | null>(null);
    const [params] = useSearchParams();

    const context = params.get("context") ?? "default";

    useEffect(() => {
        httpGet<DashboardResponse>(`/dashboard/?context=${context}`).then(
            setData,
        );
    }, [context]);

    if (!data) return null;

    return <DashboardRenderer widgets={data.widgets} />;
}
