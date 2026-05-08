// src/business/accounting/journal/journal.types.ts

export type JournalLine = {
    id: string;
    account_id: string | null;
    debit: number;
    credit: number;
    description?: string;
};

export type JournalForm = {
    date: string;
    reference?: string;
    description?: string;
    lines: JournalLine[];
};
