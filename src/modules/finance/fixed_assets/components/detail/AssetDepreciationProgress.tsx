// src/modules/finance/fixed_assets/components/detail/AssetDepreciationProgress.tsx

type Props = {
    purchaseCost: number;
    bookValue: number;
    accumulatedDepreciation: number;
};

export default function AssetDepreciationProgress({
    purchaseCost,
    bookValue,
    accumulatedDepreciation,
}: Props) {
    const depreciatedPercent =
        purchaseCost <= 0 ? 0 : Math.min(100, (accumulatedDepreciation / purchaseCost) * 100);

    const remainingPercent = 100 - depreciatedPercent;

    return (
        <div
            className="rounded-xl border p-6"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <div
                        className="text-lg font-semibold"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        Asset Depreciation
                    </div>

                    <div
                        className="mt-1 text-sm"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        Track asset value reduction over time
                    </div>
                </div>

                <div
                    className="text-right"
                    style={{
                        color: "var(--text-primary)",
                    }}
                >
                    <div className="text-2xl font-bold">{depreciatedPercent.toFixed(0)}%</div>

                    <div
                        className="text-xs"
                        style={{
                            color: "var(--text-muted)",
                        }}
                    >
                        Depreciated
                    </div>
                </div>
            </div>

            {/* ================================= */}
            {/* PROGRESS BAR */}
            {/* ================================= */}

            <div
                className="mt-6 h-4 overflow-hidden rounded-full"
                style={{
                    background: "var(--color-surface-alt)",
                }}
            >
                <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                        width: `${depreciatedPercent}%`,
                        background: "linear-gradient(90deg, var(--color-primary), #60a5fa)",
                    }}
                />
            </div>

            {/* ================================= */}
            {/* VALUES */}
            {/* ================================= */}

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <ValueCard label="Purchase Cost" value={formatCurrency(purchaseCost)} />

                <ValueCard
                    label="Accumulated Depreciation"
                    value={formatCurrency(accumulatedDepreciation)}
                />

                <ValueCard label="Remaining Book Value" value={formatCurrency(bookValue)} />
            </div>

            {/* ================================= */}
            {/* INSIGHT */}
            {/* ================================= */}

            <div
                className="mt-6 rounded-2xl border p-4 text-sm"
                style={{
                    borderColor: "var(--color-border)",
                    background: "var(--color-background)",
                    color: "var(--text-secondary)",
                }}
            >
                {remainingPercent <= 10
                    ? "This asset is nearing the end of its depreciation lifecycle."
                    : remainingPercent <= 40
                      ? "This asset has significantly depreciated."
                      : "This asset still retains substantial economic value."}
            </div>
        </div>
    );
}

function ValueCard({ label, value }: { label: string; value: string }) {
    return (
        <div
            className="rounded-2xl border p-4"
            style={{
                borderColor: "var(--color-border)",
                background: "var(--color-background)",
            }}
        >
            <div
                className="text-xs uppercase"
                style={{
                    color: "var(--text-muted)",
                }}
            >
                {label}
            </div>

            <div
                className="mt-2 text-lg font-bold"
                style={{
                    color: "var(--text-primary)",
                }}
            >
                {value}
            </div>
        </div>
    );
}

function formatCurrency(value?: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value || 0);
}
