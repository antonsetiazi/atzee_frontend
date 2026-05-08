// src/modules/finance/receivables/payments/types/payment.types.ts

export type PaymentAllocation = {
    id: string;
    invoice: string;
    invoice_number: string;
    allocated_amount: number;
};

export type ReceivablePayment = {
    id: string;
    payment_number: string;
    payment_date: string;
    amount: number;
    customer_name: string;
    allocations: PaymentAllocation[];
};

export type ReceivableInvoiceOption = {
    id: string;
    customer_id: string;
    invoice_number: string;
    customer_name: string;
    total_amount: number;
    paid_amount: number;
    balance_due: number;
};

export type CreateReceivablePaymentPayload = {
    customer_id: string;
    payment_number: string;
    payment_date: string;
    payment_method: string;
    allocations: PaymentAllocationPayload[];
    amount: number;
    notes?: string;
};

export type PaymentAllocationPayload = {
    invoice_id: string;

    allocated_amount: number;
};

export type PaymentDetail = {
    id: string;
    payment_number: string;
    payment_date: string;
    amount: number;
    payment_method: string;
    reference?: string;
    customer_name: string;
    notes?: string;

    allocations: {
        id: string;
        invoice: string;
        invoice_number: string;
        allocated_amount: number;
    }[];
};
