// src/modules/finance/reports/balance_sheet/balanceSheet.utils.ts

export function formatCurrency(value: number) {
    return new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value || 0);
}
