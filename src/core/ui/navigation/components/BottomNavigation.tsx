// src/core/ui/navigation/components/BottomNavigation.tsx

import { useNavigationStore } from "@/core/ui/navigation/navigation.store";
import { useNavigate } from "react-router-dom";
import Icon from "@/core/ui/icons/Icon";

export default function BottomNavigation() {
    const navigate = useNavigate();
    const items = useNavigationStore((s) => s.bottom);
    // console.log(items);

    if (!items.length) return null;

    return (
        <div
            className="flex justify-around items-center h-full px-2"
            style={{
                background: "var(--color-surface)",
                borderTop: "1px solid var(--color-border)",
            }}
        >
            {items.map((item) => {
                const isActive = item.is_primary;

                return (
                    <button
                        key={item.target}
                        onClick={() => item.route && navigate(item.route)}
                        className="relative flex flex-col items-center justify-center flex-1 py-2 transition-all duration-200"
                        style={{
                            color: isActive
                                ? "var(--color-primary)"
                                : "var(--text-muted)",
                        }}
                    >
                        {/* Active Indicator */}
                        {isActive && (
                            <span
                                className="absolute top-1 h-1 w-6 rounded-full"
                                style={{
                                    background: "var(--color-primary)",
                                }}
                            />
                        )}

                        <Icon name={item.icon} size="md" className="mb-1" />

                        <span
                            className="text-[11px] font-medium tracking-wide"
                            style={{
                                color: isActive
                                    ? "var(--color-primary)"
                                    : "var(--text-secondary)",
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
