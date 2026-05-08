// src/modules/finance/receivables/invoices/types/invoice.types.ts

export type InvoiceItemPayload = {
    description: string;
    qty: number;
    unit_price: number;
};

export type InvoiceCreatePayload = {
    customer_id: string;
    invoice_number: string;
    invoice_date: string;
    due_date: string;
    tax_id?: string | null;
    notes?: string;
    items: InvoiceItemPayload[];
};

export type ReceivableInvoice = {
    id: string;

    invoice_number: string;

    invoice_date: string;
    due_date: string;

    status: string;

    subtotal: number;
    tax_amount: number;
    total_amount: number;
    balance_due: number;

    notes?: string;

    customer_name?: string;
};

export type InvoiceItem = {
    id: string;
    description: string;
    qty: number;
    unit_price: number;
    total: number;
};

export type InvoiceDetail = {
    id: string;

    customer: string;
    customer_name: string;

    invoice_number: string;

    invoice_date: string;
    due_date: string;

    notes?: string;

    subtotal: number;
    tax_amount: number;
    total_amount: number;

    paid_amount: number;
    balance_due: number;

    status: string;

    items: InvoiceItem[];
};
