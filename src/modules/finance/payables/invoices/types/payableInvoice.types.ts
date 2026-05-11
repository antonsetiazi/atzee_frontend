// src/modules/finance/payables/invoices/types/payableInvoice.types.ts

export type PayableInvoiceItem = {
    id: string;
    description: string;
    qty: number;
    unit_price: number;
    total: number;
};

export type PayableInvoice = {
    id: string;

    partner: string;
    partner_name: string;

    invoice_number: string;

    invoice_date: string;
    due_date: string;

    notes?: string;

    subtotal: number;
    tax_amount: number;
    total_amount: number;

    paid_amount: number;
    balance_due: number;

    status: "draft" | "posted" | "partial" | "paid" | "cancelled";

    items: PayableInvoiceItem[];
};

export type PayableInvoiceItemPayload = {
    description: string;
    qty: number;
    unit_price: number;
};

export type PayableInvoiceCreatePayload = {
    partner_id: string;
    invoice_number: string;
    invoice_date: string;
    due_date: string;
    tax_id?: string | null;
    notes?: string;
    items: PayableInvoiceItemPayload[];
};

export type OutstandingPayableInvoice = {
    id: string;

    partner_id: number;
    partner_name: string;

    invoice_number: string;

    total_amount: number;
    paid_amount: number;
    balance_due: number;
};
