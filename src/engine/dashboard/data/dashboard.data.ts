// src/modules/dashboard/data/dashboard.data.ts

export const DASHBOARD_DATA = {
    hero: {
        greeting: "Good Morning, Anton 👋",
        title: "Enterprise Workspace",
        subtitle:
            "Monitor finance, operations, customers, and business performance in one unified dashboard.",
        stats: [
            {
                label: "Revenue",
                value: "Rp 245M",
            },
            {
                label: "Invoices",
                value: "128",
            },
            {
                label: "Outstanding",
                value: "Rp 18M",
            },
        ],
    },

    metrics: [
        {
            label: "Cash Balance",
            value: "Rp 12.4B",
            growth: "+12.8%",
        },

        {
            label: "Accounts Receivable",
            value: "Rp 4.1B",
            growth: "+4.2%",
        },

        {
            label: "Accounts Payable",
            value: "Rp 2.7B",
            growth: "-2.4%",
        },

        {
            label: "Net Profit",
            value: "Rp 1.9B",
            growth: "+18.6%",
        },
    ],

    quickActions: [
        {
            id: "new-invoice",
            label: "New Invoice",
            icon: "invoice",
            to: "/finance/receivables/invoices/create",
        },

        {
            id: "journal-entry",
            label: "Journal Entry",
            icon: "receipt",
            to: "/finance/accounting/journals/create",
        },

        {
            id: "receive-payment",
            label: "Receive Payment",
            icon: "wallet",
            to: "/finance/receivables/payments/create",
        },

        {
            id: "add-asset",
            label: "Add Asset",
            icon: "building",
            to: "/finance/assets/create",
        },

        {
            id: "transfer-funds",
            label: "Transfer Funds",
            icon: "transfer",
            to: "/finance/cashbank/transfers/create",
        },
    ],

    modules: [
        {
            id: "journal",
            title: "Journal",
            icon: "journal",
            color: "linear-gradient(135deg, #1E3A8A, #2563EB)",
            badge: "12",
            to: "/admin/finance/journal",
        },

        {
            id: "accounts",
            title: "Accounts",
            icon: "accounts",
            color: "linear-gradient(135deg, #0F766E, #14B8A6)",
        },

        {
            id: "cashflow",
            title: "Cash Flow",
            icon: "cashflow",
            color: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
        },

        {
            id: "assets",
            title: "Assets",
            icon: "assets",
            color: "linear-gradient(135deg, #EA580C, #F97316)",
            badge: "3",
        },

        {
            id: "invoices",
            title: "Invoices",
            icon: "invoice",
            color: "linear-gradient(135deg, #BE123C, #E11D48)",
            badge: "8",
        },

        {
            id: "receivable",
            title: "Receivable",
            icon: "receivable",
            color: "linear-gradient(135deg, #0369A1, #0EA5E9)",
        },

        {
            id: "treasury",
            title: "Treasury",
            icon: "treasury",
            color: "linear-gradient(135deg, #15803D, #22C55E)",
        },

        {
            id: "budget",
            title: "Budget",
            icon: "budget",
            color: "linear-gradient(135deg, #B45309, #F59E0B)",
        },

        {
            id: "inventory",
            title: "Inventory",
            icon: "inventory",
            color: "linear-gradient(135deg, #334155, #64748B)",
        },

        {
            id: "banking",
            title: "Banking",
            icon: "banking",
            color: "linear-gradient(135deg, #4338CA, #6366F1)",
        },
    ],

    invoices: [
        {
            id: "invoice-1",
            customer: "PT Sentra Logistik",
            invoice: "INV-2026-00081",
            amount: "Rp 148.000.000",
            status: "Paid" as const,
        },

        {
            id: "invoice-2",
            customer: "CV Maju Bersama",
            invoice: "INV-2026-00082",
            amount: "Rp 87.500.000",
            status: "Pending" as const,
        },

        {
            id: "invoice-3",
            customer: "PT Digital Asia",
            invoice: "INV-2026-00083",
            amount: "Rp 230.000.000",
            status: "Overdue" as const,
        },
    ],

    activities: [
        {
            id: "activity-1",
            title: "Invoice INV-2026-0081 has been paid",
            description:
                "PT Sentra Logistik completed payment for invoice INV-2026-0081 through BCA Virtual Account.",
            time: "5 minutes ago",
            type: "payment" as const,
        },
        {
            id: "activity-2",
            title: "New receivable invoice created",
            description:
                "Finance team generated invoice INV-2026-0082 for CV Maju Bersama with total amount Rp 87.500.000.",
            time: "18 minutes ago",
            type: "invoice" as const,
        },
        {
            id: "activity-3",
            title: "Journal entry posted successfully",
            description:
                "Automatic journal posting completed for operational expense transaction EXP-2026-014.",
            time: "1 hour ago",
            type: "journal" as const,
        },
        {
            id: "activity-4",
            title: "Cash balance updated",
            description:
                "Treasury synchronization recalculated all cash and bank balances across active accounts.",
            time: "2 hours ago",
            type: "cashflow" as const,
        },
        {
            id: "activity-5",
            title: "Asset depreciation executed",
            description:
                "Monthly depreciation process completed for fixed assets category Computer Equipment.",
            time: "Today, 08:14",
            type: "asset" as const,
        },
    ],

    cashFlow: [
        { month: "Jan", value: 40 },
        { month: "Feb", value: 65 },
        { month: "Mar", value: 48 },
        { month: "Apr", value: 80 },
        { month: "May", value: 52 },
        { month: "Jun", value: 95 },
        { month: "Jul", value: 70 },
        { month: "Aug", value: 110 },
        { month: "Sep", value: 76 },
        { month: "Oct", value: 120 },
        { month: "Nov", value: 88 },
        { month: "Dec", value: 130 },
    ],
};
