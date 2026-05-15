// src/modules/dashboard/components/sections/QuickActionBar.tsx

import {
    ArrowRightLeft,
    Building2,
    FilePlus2,
    Receipt,
    Wallet,
    Users,
    BarChart3,
} from "lucide-react";

import type { DashboardQuickAction } from "../../types/dashboard.types";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

interface Props {
    actions: DashboardQuickAction[];
}

function getIcon(icon: string) {
    switch (icon) {
        case "invoice":
            return <FilePlus2 size={18} />;

        case "receipt":
            return <Receipt size={18} />;

        case "wallet":
            return <Wallet size={18} />;

        case "building":
            return <Building2 size={18} />;

        case "transfer":
            return <ArrowRightLeft size={18} />;

        case "users":
            return <Users size={18} />;

        case "chart":
            return <BarChart3 size={18} />;

        default:
            return <Receipt size={18} />;
    }
}

function getColor(icon: string) {
    switch (icon) {
        case "invoice":
            return "rgba(14,165,233,0.12)";

        case "receipt":
            return "rgba(30,58,138,0.10)";

        case "wallet":
            return "rgba(34,197,94,0.12)";

        case "building":
            return "rgba(249,115,22,0.12)";

        case "transfer":
            return "rgba(168,85,247,0.12)";

        case "users":
            return "rgba(99,102,241,0.12)";

        case "chart":
            return "rgba(236,72,153,0.12)";

        default:
            return "rgba(15,23,42,0.08)";
    }
}

export default function QuickActionBar({ actions }: Props) {
    if (!actions?.length) {
        return null;
    }

    return (
        <div className="mt-6">
            {/* MOBILE */}
            <div className="flex gap-3 overflow-x-auto pb-2 lg:hidden">
                {actions.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => SmartNavigate.go(item.to)}
                        className="flex min-w-[150px] items-center gap-3 rounded-2xl border px-4 py-3 transition-all active:scale-[0.98]"
                        style={{
                            background: "var(--color-surface)",
                            borderColor: "var(--color-border)",
                            boxShadow: "var(--shadow)",
                        }}
                    >
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl"
                            style={{
                                background: getColor(item.icon),
                                color: "var(--color-primary)",
                            }}
                        >
                            {getIcon(item.icon)}
                        </div>

                        <div
                            className="text-sm font-semibold whitespace-nowrap"
                            style={{
                                color: "var(--text-primary)",
                            }}
                        >
                            {item.label}
                        </div>
                    </button>
                ))}
            </div>

            {/* DESKTOP */}
            <div className="hidden grid-cols-5 gap-4 lg:grid">
                {actions.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => SmartNavigate.go(item.to)}
                        className="flex cursor-pointer items-center gap-4 rounded-2xl border px-5 py-4 transition-all hover:-translate-y-0.5"
                        style={{
                            background: "var(--color-surface)",
                            borderColor: "var(--color-border)",
                            boxShadow: "var(--shadow)",
                        }}
                    >
                        <div
                            className="flex h-11 w-11 items-center justify-center rounded-xl"
                            style={{
                                background: getColor(item.icon),
                                color: "var(--color-primary)",
                            }}
                        >
                            {getIcon(item.icon)}
                        </div>

                        <div>
                            <div
                                className="text-sm font-semibold"
                                style={{
                                    color: "var(--text-primary)",
                                }}
                            >
                                {item.label}
                            </div>

                            <div
                                className="mt-1 text-xs"
                                style={{
                                    color: "var(--text-muted)",
                                }}
                            >
                                Quick action
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
