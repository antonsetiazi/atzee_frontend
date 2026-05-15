// src/engine/entities/blocks/BlockDashboard.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import DashboardPage from "@/engine/dashboard/pages/DashboardPage";

interface Props {
    pageData?: any;
}

export default function BlockDashboard({ pageData }: Props) {
    return <DashboardPage data={pageData?.dashboard} />;
}
