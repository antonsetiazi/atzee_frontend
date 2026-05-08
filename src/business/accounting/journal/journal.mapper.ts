// src/business/accounting/journal/journal.mapper.ts

import type { JournalForm } from "./journal.types";

export function mapJournalToPayload(form: JournalForm) {
    return {
        date: form.date,
        reference: form.reference,
        description: form.description,

        lines: form.lines
            .filter((l) => l.account_id) // hanya yang valid
            .map((l) => ({
                account_id: l.account_id,
                debit: l.debit || 0,
                credit: l.credit || 0,
            })),
    };
}
