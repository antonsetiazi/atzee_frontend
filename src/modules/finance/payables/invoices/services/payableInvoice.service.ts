// src/modules/finance/payables/invoices/services/payableInvoice.service.ts

import { httpGet, httpPost } from "@/core/http/http.client";

import type {
    OutstandingPayableInvoice,
    PayableInvoice,
    PayableInvoiceCreatePayload,
} from "../types/payableInvoice.types";

export async function getPayableInvoices() {
    return httpGet("/accounting/payable-invoices/");
}

export async function getPayableInvoiceDetail(invoiceId: string) {
    return httpGet(`/accounting/payable-invoices/${invoiceId}/`);
}

export async function createPayableInvoice(payload: PayableInvoiceCreatePayload) {
    return httpPost<PayableInvoice>("/accounting/payable-invoices/create/", payload);
}

export async function getOutstandingPayableInvoices() {
    return httpGet<OutstandingPayableInvoice[]>("/accounting/payable-invoices/outstanding/");
}

export async function postPayableInvoice(invoiceId: string) {
    return httpPost(`/accounting/payable-invoices/${invoiceId}/post/`);
}
