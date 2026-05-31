// src/core/ui/navigation/components/BottomNavigation.tsx

import { useNavigationStore } from "@/core/ui/navigation/navigation.store";
import Icon from "@/core/ui/icons/Icon";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

export default function BottomNavigation() {
    const items = useNavigationStore((s) => s.bottom);

    if (!items.length) return null;

    return (
        <div
            className="px-2rounded-t-3xl flex h-14 items-center justify-around"
            style={{
                background: "var(--color-surface)",
                borderTop: "1px solid var(--color-border)",
                boxShadow: "0 -2px 8px rgba(0,0,0,0.04)",
            }}
        >
            {items.map((item) => {
                const isActive = location.pathname === item.route;
                // const isActive = true;

                return (
                    <button
                        key={item.target}
                        onClick={() => item.route && SmartNavigate.go(item.route)}
                        className="relative flex flex-1 flex-col items-center justify-center py-1 transition-all duration-200"
                        style={{
                            color: isActive ? "var(--color-primary)" : "var(--text-muted)",
                        }}
                    >
                        <Icon name={item.icon} size="md" className="mb-1" />

                        <span
                            className="text-[11px] font-medium tracking-wide"
                            style={{
                                color: isActive ? "var(--color-primary)" : "var(--text-secondary)",
                            }}
                        >
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
