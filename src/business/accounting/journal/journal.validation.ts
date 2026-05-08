// src/business/accounting/journal/journal.validation.ts

import type { JournalForm } from "./journal.types";
import { calculateTotals } from "./journal.utils";

export function validateJournal(form: JournalForm) {
    const errors: string[] = [];

    if (!form.date) {
        errors.push("Tanggal wajib diisi");
    }

    if (!form.lines.length || form.lines.length < 2) {
        errors.push("Minimal 2 baris jurnal");
    }

    for (const [i, line] of form.lines.entries()) {
        if (!line.account_id) {
            errors.push(`Baris ${i + 1}: account wajib diisi`);
        }

        if ((line.debit || 0) === 0 && (line.credit || 0) === 0) {
            errors.push(`Baris ${i + 1}: debit atau credit harus diisi`);
        }
    }

    const { isBalanced } = calculateTotals(form);

    if (!isBalanced) {
        errors.push("Total debit dan credit harus seimbang");
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}
