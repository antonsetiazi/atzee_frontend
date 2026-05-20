// src/modules/dashboard/components/sections/ModuleExplorer.tsx

import {
    BarChart3,
    Building2,
    Calculator,
    CalendarX,
    CircleGauge,
    CreditCard,
    FileBarChart2,
    FileSpreadsheet,
    Landmark,
    LayoutDashboard,
    Package,
    PersonStanding,
    Receipt,
    Wallet,
} from "lucide-react";

import type { DashboardModuleItem } from "../../types/dashboard.types";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

interface Props {
    modules: DashboardModuleItem[];
}

function getIcon(icon: string) {
    switch (icon) {
        case "dashboard":
            return <LayoutDashboard size={28} strokeWidth={2.2} />;

        case "journal":
            return <Receipt size={28} strokeWidth={2.2} />;

        case "accounts":
            return <FileSpreadsheet size={28} strokeWidth={2.2} />;

        case "cashflow":
            return <BarChart3 size={28} strokeWidth={2.2} />;

        case "assets":
            return <Building2 size={28} strokeWidth={2.2} />;

        case "invoice":
            return <FileBarChart2 size={28} strokeWidth={2.2} />;

        case "receivable":
            return <CreditCard size={28} strokeWidth={2.2} />;

        case "treasury":
            return <Wallet size={28} strokeWidth={2.2} />;

        case "budget":
            return <Calculator size={28} strokeWidth={2.2} />;

        case "inventory":
            return <Package size={28} strokeWidth={2.2} />;

        case "banking":
            return <Landmark size={28} strokeWidth={2.2} />;

        case "person-standing":
            return <PersonStanding size={28} strokeWidth={2.2} />;

        case "calendar-x":
            return <CalendarX size={28} strokeWidth={2.2} />;

        case "circle-gauge":
            return <CircleGauge size={28} strokeWidth={2.2} />;

        default:
            return <Receipt size={28} strokeWidth={2.2} />;
    }
}

export default function ModuleExplorer({ modules }: Props) {
    if (!modules?.length) {
        return null;
    }

    return (
        <div
            className="rounded-[28px] border p-5 lg:p-6"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
                boxShadow: "var(--shadow)",
            }}
        >
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <div
                        className="text-lg font-semibold"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        Workspace
                    </div>

                    <div
                        className="mt-1 text-sm"
                        style={{
                            color: "var(--text-muted)",
                        }}
                    >
                        Quick access finance operations
                    </div>
                </div>
            </div>

            {/* MODULE GRID */}
            <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {modules.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => item.to && SmartNavigate.go(item.to)}
                        className="group relative flex cursor-pointer flex-col items-center rounded-3xl p-3 transition-all duration-200 hover:-translate-y-1"
                        style={{
                            background: "var(--color-background)",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        {/* BADGE */}
                        {item.badge && (
                            <div
                                className="absolute top-2 right-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold"
                                style={{
                                    background: "var(--color-primary)",
                                    color: "#fff",
                                }}
                            >
                                {item.badge}
                            </div>
                        )}

                        {/* ICON TILE */}
                        <div
                            className="flex h-18 w-18 items-center justify-center rounded-2xl shadow-sm transition-all duration-200 group-hover:scale-105"
                            style={{
                                background: item.color,
                                color: "#fff",
                                width: 72,
                                height: 72,
                            }}
                        >
                            {getIcon(item.icon)}
                        </div>

                        {/* LABEL */}
                        <div
                            className="mt-3 text-center text-sm font-semibold"
                            style={{
                                color: "var(--text-primary)",
                            }}
                        >
                            {item.title}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
