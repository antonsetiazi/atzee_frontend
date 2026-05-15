// src/modules/dashboard/constants/dashboardModules.ts

import type { DashboardModuleGroup } from "../types/dashboard.types";

export const dashboardModules: DashboardModuleGroup[] = [
    {
        title: "Accounting",
        description: "Core accounting and bookkeeping operations.",

        items: [
            {
                title: "Journal Entries",
                description: "Manage daily accounting journals.",
                icon: "📘",
                path: "/finance/journals",
            },

            {
                title: "General Ledger",
                description: "Track all account movements.",
                icon: "📚",
                path: "/finance/general-ledger",
            },

            {
                title: "Chart of Accounts",
                description: "Manage financial account structure.",
                icon: "🏦",
                path: "/finance/chart-of-accounts",
            },
        ],
    },

    {
        title: "Fixed Assets",
        description: "Asset lifecycle and depreciation management.",

        items: [
            {
                title: "Fixed Assets",
                description: "View and manage company assets.",
                icon: "🏢",
                path: "/finance/fixed-assets",
            },

            {
                title: "Depreciation History",
                description: "Track asset depreciation records.",
                icon: "📉",
                path: "/finance/fixed-assets/depreciation-history",
            },

            {
                title: "Asset Disposal",
                description: "Manage disposed company assets.",
                icon: "🗑️",
                path: "/finance/fixed-assets/disposals",
            },
        ],
    },

    {
        title: "Receivables",
        description: "Customer invoices and payment tracking.",

        items: [
            {
                title: "Invoices",
                description: "Monitor customer billing.",
                icon: "🧾",
                path: "/finance/receivables/invoices",
            },

            {
                title: "Payments",
                description: "Track incoming customer payments.",
                icon: "💳",
                path: "/finance/receivables/payments",
            },
        ],
    },

    {
        title: "Financial Reports",
        description: "Financial statements and analytics.",

        items: [
            {
                title: "Balance Sheet",
                description: "Company financial position overview.",
                icon: "📊",
                path: "/finance/reports/balance-sheet",
            },

            {
                title: "Cash Flow",
                description: "Cash movement and liquidity analysis.",
                icon: "💰",
                path: "/finance/reports/cash-flow",
            },

            {
                title: "Profit & Loss",
                description: "Revenue and profitability reporting.",
                icon: "📈",
                path: "/finance/reports/profit-loss",
            },
        ],
    },
];
