// src/modules/finance/fixed_assets/pages/FixedAssetDetailPage.tsx

import { useParams } from "react-router-dom";
import FixedAssetStatusBadge from "../components/badges/FixedAssetStatusBadge";
import { useFixedAssetDetail } from "../hooks/useFixedAssetDetail";
import { HeaderPage, LoadingState } from "@/core/ui/components";
import AssetDepreciationProgress from "../components/detail/AssetDepreciationProgress";
import { ActivityTimeline } from "@/core/activity";
import { useActivateFixedAsset } from "../hooks/useActivateFixedAsset";
import { useRunDepreciation } from "../hooks/useRunDepreciation";

export default function FixedAssetDetailPage() {
    const { assetId } = useParams();
    const { item, loading, reload } = useFixedAssetDetail(assetId || "");
    const { submit: activateAsset } = useActivateFixedAsset();
    const { submit: depreciateAsset, loading: depreciationLoading } = useRunDepreciation();

    async function handleActivate() {
        if (!item) {
            return;
        }

        await activateAsset(item.id);

        await reload();
    }

    async function handleRunDepreciation() {
        if (!item) {
            return;
        }

        await depreciateAsset(item.id);

        await reload();
    }

    if (loading) return <LoadingState />;

    if (!item) {
        return <>Asset not found</>;
    }

    return (
        <>
            <HeaderPage
                title={item.name}
                subtitle={item.asset_number}
                meta={<FixedAssetStatusBadge status={item.status} />}
                actions={[
                    {
                        label: "Edit Asset",
                        href: `/finance/fixed-assets/${item.id}/edit`,
                        variant: "secondary",
                    },
                    ...(item.status === "draft"
                        ? [
                              {
                                  label: "Activate Asset",
                                  onClick: handleActivate,
                                  variant: "primary" as const,
                              },
                          ]
                        : []),

                    ...(item.status === "active"
                        ? [
                              {
                                  label: depreciationLoading ? "Running..." : "Run Depreciation",
                                  onClick: handleRunDepreciation,
                                  disabled: depreciationLoading,
                                  variant: "primary" as const,
                              },
                              {
                                  label: "Dispose Asset",
                                  href: `/finance/fixed-assets/${item.id}/dispose`,
                                  variant: "ghost" as const,
                              },
                          ]
                        : []),
                ]}
            />

            <div className="space-y-4 p-4">
                {/* ========================================= */}
                {/* HERO */}
                {/* ========================================= */}

                <div
                    className="rounded-xl border p-6"
                    style={{
                        background:
                            "linear-gradient(135deg, var(--color-surface), var(--color-surface-alt))",

                        borderColor: "var(--color-border)",
                    }}
                >
                    <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <div
                                className="text-sm"
                                style={{
                                    color: "var(--text-muted)",
                                }}
                            >
                                Fixed Asset
                            </div>

                            <div
                                className="mt-2 text-3xl font-bold"
                                style={{
                                    color: "var(--text-primary)",
                                }}
                            >
                                {item.name}
                            </div>

                            <div
                                className="mt-2 flex flex-wrap items-center gap-3 text-sm"
                                style={{
                                    color: "var(--text-secondary)",
                                }}
                            >
                                <span>{item.asset_number}</span>
                                <span>•</span>
                                <span>{item.category_name}</span>
                                <span>•</span>
                                <span>{item.location || "-"}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 xl:w-[420px]">
                            <MetricCard
                                label="Purchase Cost"
                                value={formatCurrency(item.purchase_cost)}
                            />

                            <MetricCard
                                label="Book Value"
                                value={formatCurrency(item.book_value)}
                            />

                            <MetricCard
                                label="Accumulated Depreciation"
                                value={formatCurrency(item.accumulated_depreciation)}
                            />

                            <MetricCard
                                label="Salvage Value"
                                value={formatCurrency(item.salvage_value)}
                            />
                        </div>
                    </div>
                </div>

                <AssetDepreciationProgress
                    purchaseCost={item.purchase_cost}
                    accumulatedDepreciation={item.accumulated_depreciation}
                    bookValue={item.book_value}
                />

                {/* ========================================= */}
                {/* DETAIL PANELS */}
                {/* ========================================= */}

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    <SectionCard title="Asset Information">
                        <InfoRow label="Category" value={item.category_name} />
                        <InfoRow label="Purchase Date" value={item.purchase_date} />
                        <InfoRow label="Capitalization Date" value={item.capitalization_date} />
                        <InfoRow label="Serial Number" value={item.serial_number} />
                        <InfoRow label="Location" value={item.location} />
                    </SectionCard>

                    <SectionCard title="Depreciation Information">
                        <InfoRow label="Method" value={item.depreciation_method} />
                        <InfoRow label="Useful Life" value={`${item.useful_life_months} Months`} />
                        <InfoRow label="Depreciation Start" value={item.depreciation_start_date} />
                        <InfoRow
                            label="Last Depreciation"
                            value={item.last_depreciation_date || "-"}
                        />

                        <InfoRow label="Status" value={item.status} />
                    </SectionCard>
                </div>

                {/* ========================================= */}
                {/* DESCRIPTION */}
                {/* ========================================= */}

                <SectionCard title="Description">
                    <div
                        className="text-sm leading-7"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        {item.description || "-"}
                    </div>
                </SectionCard>

                {/* ========================================= */}
                {/* TIMELINE */}
                {/* ========================================= */}

                <SectionCard title="Asset Activity">
                    <div className="space-y-4">
                        <TimelineItem title="Asset Registered" date={item.purchase_date} />

                        <TimelineItem title="Capitalized" date={item.capitalization_date} />

                        <TimelineItem
                            title="Depreciation Started"
                            date={item.depreciation_start_date}
                        />
                    </div>
                </SectionCard>

                <SectionCard title="Asset Activity Timeline">
                    <ActivityTimeline targetType="fixed_asset" targetId={item.id} />
                </SectionCard>
            </div>
        </>
    );
}

/* =======================================================
    COMPONENTS
======================================================= */

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div
            className="rounded-xl border p-6"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            <div
                className="mb-5 text-lg font-semibold"
                style={{
                    color: "var(--text-primary)",
                }}
            >
                {title}
            </div>

            <div className="space-y-4">{children}</div>
        </div>
    );
}

function MetricCard({ label, value }: { label: string; value: string }) {
    return (
        <div
            className="rounded-xl border p-4"
            style={{
                background: "var(--color-background)",
                borderColor: "var(--color-border)",
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

function InfoRow({ label, value }: { label: string; value?: string | number }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div
                className="text-sm"
                style={{
                    color: "var(--text-secondary)",
                }}
            >
                {label}
            </div>

            <div
                className="text-right text-sm font-medium"
                style={{
                    color: "var(--text-primary)",
                }}
            >
                {value || "-"}
            </div>
        </div>
    );
}

function TimelineItem({ title, date }: { title: string; date: string }) {
    return (
        <div className="flex items-start gap-4">
            <div
                className="mt-1 h-3 w-3 rounded-full"
                style={{
                    background: "var(--color-primary)",
                }}
            />

            <div>
                <div
                    className="text-sm font-medium"
                    style={{
                        color: "var(--text-primary)",
                    }}
                >
                    {title}
                </div>

                <div
                    className="text-xs"
                    style={{
                        color: "var(--text-muted)",
                    }}
                >
                    {date}
                </div>
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
