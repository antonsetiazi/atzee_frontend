// src/modules/dashboard/types/dashboard.types.ts

export type DashboardData = {
    hero: DashboardHeroData;
    metrics: DashboardMetric[];
    quickActions: DashboardQuickAction[];
    modules: DashboardModuleItem[];
    activities: Activity[];
    invoices: RecentInvoice[];
};

export type DashboardHeroStat = {
    label: string;
    value: string;
};

export type DashboardHeroData = {
    greeting: string;
    title: string;
    subtitle: string;
    stats: DashboardHeroStat[];
};

export type DashboardModuleItem = {
    id: string;
    title: string;
    icon: string;
    color: string;
    badge?: string;
    to?: string;
};

export interface DashboardModuleGroup {
    title: string;
    description?: string;
    items: DashboardModuleItem[];
}

export interface DashboardMetric {
    label: string;
    value: string;
    growth: string;
}

export type Activity = {
    id: string;
    title: string;
    description: string;
    time: string;
    type: "payment" | "invoice" | "journal" | "cashflow" | "asset";
};

export interface RecentInvoice {
    id: string;
    customer: string;
    invoice: string;
    amount: string;
    status: "Paid" | "Pending" | "Overdue";
}

export type DashboardQuickAction = {
    id: string;
    label: string;

    /*
     * invoice
     * receipt
     * wallet
     * building
     * transfer
     * users
     * chart
     */
    icon: string;
    to: string;
};

export type CashFlowItem = {
    month: string;
    value: number;
};
