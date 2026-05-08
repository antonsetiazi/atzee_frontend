// src/modules/finance/journal/JournalDetailPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpPost } from "@/core/http/http.client";
import { HeaderPage } from "@/core/ui/components";
import { formatValue } from "@/shared/utils/formatValue";
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from "@/core/config/format.config";

export default function JournalDetailPage() {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        httpPost("/entities/accounting/accounting.journals.detail/query/", {
            id,
        }).then(setData);
    }, [id]);

    if (!data) return <div>Loading...</div>;

    return (
        <>
            <HeaderPage
                title="Journal Detail"
                subtitle="Rincian Transaksi Keuangan"
            />

            {/* MAIN CARD */}
            <div className="mt-4 bg-[var(--color-surface)] rounded-2xl shadow-[var(--shadow)] border border-[var(--color-border)]">
                {/* DESCRIPTION */}
                <div className="p-5 flex justify-between border-b border-[var(--color-border)]">
                    <div>
                        <div className="text-xs text-[var(--text-muted)] mb-1">
                            Description
                        </div>
                        <div className="text-sm">{data.description || "-"}</div>
                    </div>
                    <div>
                        <div className="text-xs text-[var(--text-muted)] mb-1">
                            Reference
                        </div>
                        <div className="text-sm">{data.reference || "-"}</div>
                    </div>
                    <div>
                        <div className="text-xs text-[var(--text-muted)] mb-1">
                            Date
                        </div>

                        <div className="text-sm">
                            {formatValue(data.date, {
                                format: "date",
                            })}
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="p-5">
                    <table className="w-full text-sm border-separate border-spacing-y-1">
                        <thead>
                            <tr className="text-[var(--text-muted)] text-xs uppercase">
                                <th className="text-left">Account</th>
                                <th className="text-right">Debit</th>
                                <th className="text-right">Credit</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.lines.map((line: any) => (
                                <tr
                                    key={line.id}
                                    className="bg-[var(--color-surface-alt)] rounded-lg"
                                >
                                    <td className="p-3 font-medium">
                                        {line.account_name}
                                    </td>

                                    <td className="p-3 text-right">
                                        {line.debit > 0 ? (
                                            <span className="font-medium">
                                                {line.debit}
                                            </span>
                                        ) : (
                                            <span className="text-[var(--text-muted)]">
                                                -
                                            </span>
                                        )}
                                    </td>

                                    <td className="p-3 text-right">
                                        {line.credit > 0 ? (
                                            <span className="font-medium">
                                                {line.credit}
                                            </span>
                                        ) : (
                                            <span className="text-[var(--text-muted)]">
                                                -
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* TOTAL FOOTER */}
                <div className="p-5 border-t border-[var(--color-border)] bg-[var(--color-surface-alt)] rounded-b-2xl">
                    <div className="flex justify-end">
                        <div className="w-80 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">
                                    Total Debit
                                </span>
                                <span className="font-medium">
                                    {formatValue(data.total_debit, {
                                        format: "currency",
                                        currency: DEFAULT_CURRENCY,
                                        locale: DEFAULT_LOCALE,
                                    })}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">
                                    Total Credit
                                </span>
                                <span className="font-medium">
                                    {formatValue(data.total_credit, {
                                        format: "currency",
                                        currency: DEFAULT_CURRENCY,
                                        locale: DEFAULT_LOCALE,
                                    })}
                                </span>
                            </div>

                            <div className="pt-2 border-t border-[var(--color-border)] flex justify-between">
                                <span className="font-medium">Status</span>
                                {data.total_debit === data.total_credit ? (
                                    <span className="text-[var(--color-success)] font-medium">
                                        ✔ Balanced
                                    </span>
                                ) : (
                                    <span className="text-[var(--color-error)] font-medium">
                                        ✖ Not Balanced
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
