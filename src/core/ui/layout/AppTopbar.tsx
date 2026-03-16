// src/core/ui/layout/AppTopbar.tsx

import { useShell } from "./shell/ShellContext";
import { useNavigationStore } from "@/core/ui/navigation/navigation.store";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "@/core/ui/icons/Icon";
import UserMenuDropdown from "./UserMenuDropdown";
import { useSessionStore } from "@/core/session/session.store";
import { AuthButton } from "@/core/ui/components";
import { NotificationBell } from "@/core/ui/components";

interface TopbarProps {
    title?: string;
}

export default function AppTopbar({ title }: TopbarProps) {
    const { isMobile, toggleDrawer } = useShell();
    const items = useNavigationStore((s) => s.topbar);
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSessionStore((s) => s.user);

    const MAX_WIDTH = import.meta.env.VITE_APP_MAX_WIDTH;

    return (
        <header
            className="relative z-40 h-14 border-b backdrop-blur-md"
            style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
            }}
        >
            <div
                className="mx-auto h-full flex items-center justify-between px-6"
                style={{ maxWidth: MAX_WIDTH }}
            >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-8">
                    {/* Mobile Hamburger */}
                    {isMobile && (
                        <button
                            onClick={toggleDrawer}
                            className="rounded-md p-2 transition-colors"
                            style={{
                                color: "var(--text-secondary)",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    )}

                    {/* Mobile Title */}
                    {isMobile && (
                        <span
                            className="text-sm font-medium leading-none"
                            style={{ color: "var(--text-primary)" }}
                        >
                            {title || "Dashboard"}
                        </span>
                    )}

                    {/* Desktop Navigation */}
                    {!isMobile && (
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
                                                ? "var(--text-primary)"
                                                : "var(--text-secondary)",
                                        }}
                                    >
                                        <Icon name={item.icon} size="md" />
                                        <span>{item.label}</span>

                                        {/* Active indicator */}
                                        {active && (
                                            <div
                                                className="absolute -bottom-[18px] left-0 right-0 h-[2px] rounded-full"
                                                style={{
                                                    background:
                                                        "var(--color-primary)",
                                                }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
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
                            <NotificationBell
                                notifications={[
                                    {
                                        id: "1",
                                        title: "New booking received",
                                        description: "Ahmad booked a session",
                                    },
                                    {
                                        id: "2",
                                        title: "Payment confirmed",
                                        description: "Invoice #1023 paid",
                                    },
                                ]}
                            />
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
