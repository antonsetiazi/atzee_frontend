// src/modules/finance/payables/dashboard/types/dashboard.types.ts

export type PayablesDashboard = {
    summary: {
        total_payable: number;
        overdue_amount: number;
        overdue_count: number;
        paid_this_month: number;
        draft_count: number;
    };

    recent_invoices: {
        id: string;
        invoice_number: string;
        partner_name: string;
        total_amount: number;
        status: string;
    }[];

    recent_payments: {
        id: string;
        payment_number: string;
        partner_name: string;
        amount: number;
    }[];
};
