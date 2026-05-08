// src/business/accounting/journal/journal.factory.ts

import type { JournalForm, JournalLine } from "./journal.types";

function generateId() {
    return Math.random().toString(36).substring(2, 9);
}

export function createEmptyLine(): JournalLine {
    return {
        id: generateId(),
        account_id: null,
        debit: 0,
        credit: 0,
        description: "",
    };
}

export function createJournalForm(): JournalForm {
    return {
        date: new Date().toISOString().slice(0, 10),
        reference: "",
        description: "",
        lines: [createEmptyLine(), createEmptyLine()],
    };
}
