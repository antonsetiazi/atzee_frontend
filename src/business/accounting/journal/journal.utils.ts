// src/business/accounting/journal/journal.utils.ts

import type { JournalForm, JournalLine } from "./journal.types";
import { createEmptyLine } from "./journal.factory";

export function addLine(form: JournalForm): JournalForm {
    return {
        ...form,
        lines: [...form.lines, createEmptyLine()],
    };
}

export function removeLine(form: JournalForm, lineId: string): JournalForm {
    return {
        ...form,
        lines: form.lines.filter((l) => l.id !== lineId),
    };
}

export function updateLine(
    form: JournalForm,
    lineId: string,
    patch: Partial<JournalLine>,
): JournalForm {
    return {
        ...form,
        lines: form.lines.map((line) => {
            if (line.id !== lineId) return line;

            const updated = { ...line, ...patch };

            // 🔥 RULE: tidak boleh debit & credit bersamaan
            if (patch.debit && patch.debit > 0) {
                updated.credit = 0;
            }

            if (patch.credit && patch.credit > 0) {
                updated.debit = 0;
            }

            return updated;
        }),
    };
}

export function calculateTotals(form: JournalForm) {
    let totalDebit = 0;
    let totalCredit = 0;

    for (const line of form.lines) {
        totalDebit += line.debit || 0;
        totalCredit += line.credit || 0;
    }

    return {
        totalDebit,
        totalCredit,
        isBalanced: totalDebit === totalCredit,
    };
}
