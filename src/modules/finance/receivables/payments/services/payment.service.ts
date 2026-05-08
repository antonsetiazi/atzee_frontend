// src/modules/finance/receivables/payments/services/payment.service.ts

import { httpGet, httpPost } from "@/core/http/http.client";

type CashAccount = {
    id: string;
    name: string;
    account_number: string;
};

import type {
    ReceivablePayment,
    ReceivableInvoiceOption,
    CreateReceivablePaymentPayload,
    PaymentDetail,
} from "../types/payment.types";

export async function getReceivablePayments() {
    return httpGet<ReceivablePayment[]>("/accounting/receivable-payments/");
}

export async function getOutstandingInvoices() {
    return httpGet<ReceivableInvoiceOption[]>("/accounting/receivable-invoices/outstanding/");
}

export async function createReceivablePayment(payload: CreateReceivablePaymentPayload) {
    return httpPost("/accounting/receivable-payments/create/", payload);
}

export async function getCashAccounts() {
    return httpGet<CashAccount[]>("/accounting/cash-bank-accounts/options/");
}

export async function getPaymentDetail(paymentId: string) {
    return httpGet<PaymentDetail>(`/accounting/receivable-payments/${paymentId}/`);
}
