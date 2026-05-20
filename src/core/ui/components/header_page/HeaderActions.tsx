// src/core/ui/components/header_page/HeaderActions.tsx

import Button from "@/core/ui/components/button/Button";
import type { HeaderAction } from "./types";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";
import { useMemo, useState } from "react";
import { EllipsisVerticalIcon } from "lucide-react";

interface Props {
    actions?: HeaderAction[];
    mobile?: boolean;
}

export default function HeaderActions({ actions = [], mobile = false }: Props) {
    const [open, setOpen] = useState(false);

    const visibleActions = useMemo(() => actions.filter((x) => !x.hidden), [actions]);

    if (!visibleActions.length) return null;

    const shouldCollapse = mobile && visibleActions.length > 0;

    function execute(action: HeaderAction) {
        if (action.disabled) return;

        setOpen(false);

        if (action.href) {
            SmartNavigate.go(action.href);
            return;
        }

        action.onClick?.();
    }

    // =========================================
    // MOBILE COLLAPSED MODE
    // =========================================

    if (shouldCollapse) {
        return (
            <div className="relative">
                <Button variant="ghost" onClick={() => setOpen((x) => !x)}>
                    <div className="flex items-center gap-2">
                        <EllipsisVerticalIcon className="h-5 w-5" />
                    </div>
                </Button>

                {open && (
                    <>
                        {/* Backdrop */}
                        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

                        {/* Menu */}
                        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-xl">
                            {visibleActions.map((action, index) => {
                                const Icon = action.icon;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => execute(action)}
                                        disabled={action.disabled}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-black/5 disabled:opacity-50"
                                    >
                                        {Icon && <Icon className="h-4 w-4" />}

                                        <span className="flex-1">{action.label}</span>

                                        {action.badge && (
                                            <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs">
                                                {action.badge}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        );
    }

    // =========================================
    // NORMAL MODE
    // =========================================

    return (
        <div className={`flex items-center gap-2 ${mobile ? "flex-wrap justify-end" : ""}`}>
            {visibleActions.map((action, index) => {
                if (mobile && action.desktopOnly) return null;
                if (!mobile && action.mobileOnly) return null;

                if (action.render) {
                    return <div key={index}>{action.render()}</div>;
                }

                const Icon = action.icon;

                return (
                    <Button
                        key={index}
                        onClick={() => execute(action)}
                        disabled={action.disabled}
                        variant={action.variant || "primary"}
                    >
                        <div className="flex items-center gap-2">
                            {Icon && <Icon className="h-4 w-4" />}

                            <span>{action.label}</span>

                            {action.badge && (
                                <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs">
                                    {action.badge}
                                </span>
                            )}
                        </div>
                    </Button>
                );
            })}
        </div>
    );
}
