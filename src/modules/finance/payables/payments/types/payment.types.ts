// src/modules/finance/payables/payments/types/payment.types.ts

export type PayableAllocationPayload = {
    invoice_id: string;
    allocated_amount: number;
};

export type PayablePaymentAllocation = {
    id: string;
    invoice_number: string;
    invoice_status: string;
    invoice_date: string;
    invoice_total: number;
    allocated_amount: number;
};

export type PayablePaymentCreatePayload = {
    partner_id: number;
    payment_date: string;
    payment_number: string;
    payment_method: string;
    reference?: string;
    notes?: string;
    allocations: PayableAllocationPayload[];
    amount: number;
};

export type PayablePayment = {
    id: string;
    payment_number: string;
    payment_date: string;
    amount: number;
    payment_method: string;
    reference?: string;
    notes?: string;
    status: string;
    partner_name: string;
    allocations: PayablePaymentAllocation[];
};
