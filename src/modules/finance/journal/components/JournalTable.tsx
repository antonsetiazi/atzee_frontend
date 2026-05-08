// src/modules/finance/journal/components/JournalTable.tsx

import { useEffect, useState } from "react";
import {
    fetchAccountOptions,
    type AccountOption,
} from "@/core/accounting/account.api";
import type { JournalLine } from "@/business/accounting/journal/journal.types";
import { inputBase } from "@/core/ui/class/field.ui.class";
import { Button } from "@/core/ui/components";

type Props = {
    lines: JournalLine[];
    onAddLine: () => void;
    onRemoveLine: (id: string) => void;
    onUpdateLine: (id: string, patch: Partial<JournalLine>) => void;
};

export default function JournalTable({
    lines,
    onAddLine,
    onRemoveLine,
    onUpdateLine,
}: Props) {
    const [options, setOptions] = useState<AccountOption[]>([]);

    useEffect(() => {
        fetchAccountOptions().then((res) => {
            setOptions(res.items || []);
        });
    }, []);

    return (
        <div>
            <table className="w-full text-sm border-separate border-spacing-y-1">
                <thead>
                    <tr className="text-left text-[var(--text-muted)]">
                        <th>Account</th>
                        <th className="text-right">Debit</th>
                        <th className="text-right">Credit</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {lines.map((line) => (
                        <tr
                            key={line.id}
                            className="bg-[var(--color-surface-alt)] rounded-lg"
                        >
                            <td className="p-2">
                                <select
                                    className={`${inputBase}`}
                                    value={line.account_id || ""}
                                    onChange={(e) =>
                                        onUpdateLine(line.id, {
                                            account_id: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">
                                        -- pilih account --
                                    </option>

                                    {options.map((opt) => (
                                        <option
                                            key={opt.value}
                                            value={opt.value}
                                        >
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            <td className="p-2">
                                <input
                                    type="number"
                                    className={`${inputBase} text-right`}
                                    value={line.debit || ""}
                                    placeholder="0"
                                    disabled={line.credit > 0}
                                    onChange={(e) =>
                                        onUpdateLine(line.id, {
                                            debit: Number(e.target.value),
                                        })
                                    }
                                />
                            </td>

                            <td className="p-2">
                                <input
                                    type="number"
                                    className={`${inputBase} text-right`}
                                    value={line.credit || ""}
                                    placeholder="0"
                                    disabled={line.debit > 0}
                                    onChange={(e) =>
                                        onUpdateLine(line.id, {
                                            credit: Number(e.target.value),
                                        })
                                    }
                                />
                            </td>

                            <td className="p-2 text-center">
                                <button
                                    disabled={lines.length <= 1}
                                    onClick={() => onRemoveLine(line.id)}
                                    className="text-red-500 hover:text-red-700"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            // nanti bisa refine pakai ref
                                        }
                                    }}
                                >
                                    ❌
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4">
                <Button type="button" variant="secondary" onClick={onAddLine}>
                    + Tambah Baris
                </Button>
            </div>
        </div>
    );
}
