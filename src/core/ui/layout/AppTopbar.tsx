// src/core/ui/layout/AppTopbar.tsx

import { useNavigationStore } from "@/core/ui/navigation/navigation.store";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "@/core/ui/icons/Icon";
import UserMenuDropdown from "./UserMenuDropdown";
import { useSessionStore } from "@/core/session/session.store";
import { AuthButton } from "@/core/ui/components";
import { NotificationBell } from "@/core/ui/components";

export default function AppTopbar() {
    const items = useNavigationStore((s) => s.topbar);
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSessionStore((s) => s.user);

    const MAX_WIDTH = import.meta.env.VITE_APP_MAX_WIDTH;

    return (
        <header
            className="sticky top-0 z-40 h-16 border-b backdrop-blur-xl"
            style={{
                borderColor: "rgba(255,255,255,0.08)",
                background:
                    "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                boxShadow: "var(--shadow)",
            }}
        >
            <div
                className="mx-auto h-full flex items-center justify-between px-6"
                style={{ maxWidth: MAX_WIDTH }}
            >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-10">
                        {items.map((item) => {
                            const active =
                                item.route &&
                                location.pathname.startsWith(item.route);

                            return (
                                <button
                                    key={item.target}
                                    onClick={() =>
                                        item.route && navigate(item.route)
                                    }
                                    className="relative flex items-center gap-2 text-sm font-medium transition-all duration-200"
                                    style={{
                                        color: active
                                            ? "#ffffff"
                                            : "rgba(255,255,255,0.75)",
                                    }}
                                >
                                    <Icon name={item.icon} size="md" />
                                    <span>{item.label}</span>

                                    {/* Active indicator */}
                                    {active && (
                                        <div
                                            className="absolute -bottom-[18px] left-0 right-0 h-[2px] rounded-full"
                                            style={{
                                                background: "#ffffff",
                                            }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3">
                    {!user ? (
                        <AuthButton
                            variant="primary"
                            onClick={() => navigate("/login")}
                        >
                            <Icon name="login" size="sm" />
                            Login
                        </AuthButton>
                    ) : (
                        <>
                            <NotificationBell />
                            <UserMenuDropdown
                                name={user.full_name}
                                avatarUrl={user.avatar_url}
                            />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
