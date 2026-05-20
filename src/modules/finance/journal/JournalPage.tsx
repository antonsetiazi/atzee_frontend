// src/modules/finance/journal/JournalPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

import { createJournalForm } from "@/business/accounting/journal/journal.factory";
import {
    addLine,
    removeLine,
    updateLine,
    calculateTotals,
} from "@/business/accounting/journal/journal.utils";
import { validateJournal } from "@/business/accounting/journal/journal.validation";

import JournalTable from "./components/JournalTable";
import { submitJournal } from "@/core/accounting/journal.api";
import { mapJournalToPayload } from "@/business/accounting/journal/journal.mapper";
import { Button, HeaderPage } from "@/core/ui/components";
import { inputBase } from "@/core/ui/class/field.ui.class";

export default function JournalPage() {
    const [form, setForm] = useState(createJournalForm());
    const [errors, setErrors] = useState<string[]>([]);

    const totals = calculateTotals(form);

    function handleAddLine() {
        setForm((prev) => addLine(prev));
    }

    function handleRemoveLine(id: string) {
        setForm((prev) => removeLine(prev, id));
    }

    function handleUpdateLine(id: string, patch: any) {
        setForm((prev) => {
            let updated = updateLine(prev, id, patch);
            updated = ensureLastRow(updated);
            return updated;
        });
    }

    async function handleSubmit() {
        const result = validateJournal(form);

        if (!result.valid) {
            setErrors(result.errors);
            return;
        }

        setErrors([]);

        try {
            const payload = mapJournalToPayload(form);
            const res = await submitJournal(payload);

            console.log("SUCCESS:", res);

            // reset form
            setForm(createJournalForm());
        } catch (err: any) {
            console.error(err);

            setErrors([err?.message || "Gagal menyimpan journal"]);
        }
    }

    return (
        <>
            <HeaderPage title="Manual Journal" subtitle="Catat transaksi keuangan secara manual" />

            <div className="mt-4 space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow)]">
                <div className="grid grid-cols-3 gap-4">
                    <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className={`${inputBase}`}
                    />

                    <input
                        type="text"
                        placeholder="Reference"
                        value={form.reference}
                        onChange={(e) => setForm({ ...form, reference: e.target.value })}
                        className={`${inputBase}`}
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className={`${inputBase} col-span-3`}
                    />
                </div>

                {/* Table */}
                <JournalTable
                    lines={form.lines}
                    onAddLine={handleAddLine}
                    onRemoveLine={handleRemoveLine}
                    onUpdateLine={handleUpdateLine}
                />

                {/* TOTAL */}
                <div className="flex justify-end">
                    <div className="w-72 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
                        <div className="flex justify-between text-sm">
                            <span>Total Debit</span>
                            <span>{totals.totalDebit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Total Credit</span>
                            <span>{totals.totalCredit}</span>
                        </div>

                        <div className="mt-2 font-medium">
                            {totals.isBalanced ? (
                                <span className="text-[var(--color-success)]">✔ Balanced</span>
                            ) : (
                                <span className="text-[var(--color-error)]">✖ Not Balanced</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* ERROR */}
                {errors.length > 0 && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                        {errors.map((e, i) => (
                            <div key={i}>{e}</div>
                        ))}
                    </div>
                )}

                {/* ACTION */}
                <div className="flex justify-end">
                    <Button type="button" onClick={handleSubmit}>
                        Submit Journal
                    </Button>
                </div>
            </div>
        </>
    );
}

function ensureLastRow(form: any) {
    const last = form.lines[form.lines.length - 1];

    if (!last) return form;

    const isFilled = last.account_id || last.debit > 0 || last.credit > 0;

    if (isFilled) {
        return addLine(form);
    }

    return form;
}
