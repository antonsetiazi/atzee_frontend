// src/modules/finance/receivables/invoices/services/invoice.service.ts

import { httpGet, httpPost } from "@/core/http/http.client";

import type { InvoiceDetail } from "../types/invoice.types";

export async function getInvoiceDetail(invoiceId: string) {
    return httpGet<InvoiceDetail>(`/accounting/receivable-invoices/${invoiceId}/`);
}

export async function postInvoice(invoiceId: string) {
    return httpPost(`/accounting/receivable-invoices/${invoiceId}/post/`, {});
}
