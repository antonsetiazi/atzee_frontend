// src/core/ui/layout/AppTopbar.tsx

// import { useAuthService } from "@/core/auth/auth.service";
import { useShell } from "./shell/ShellContext";
import { useNavigationStore } from "@/core/ui/navigation/navigation.store";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "@/core/ui/icons/Icon";
import UserMenuDropdown from "./UserMenuDropdown";
import { useSessionStore } from "@/core/session/session.store";

interface TopbarProps {
    title?: string;
}

export default function AppTopbar({ title }: TopbarProps) {
    // const { logout } = useAuthService();
    const { isMobile, toggleDrawer } = useShell();
    const items = useNavigationStore((s) => s.topbar);
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSessionStore((s) => s.user);

    // console.log(items);
    // console.log(user);
    const MAX_WIDTH = import.meta.env.VITE_APP_MAX_WIDTH;

    return (
        <header className="h-14 border-b border-gray-100 bg-white px-4">
            <div
                className="mx-auto h-full flex items-center justify-between"
                style={{ maxWidth: MAX_WIDTH }}
            >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-6">
                    {/* Mobile Hamburger */}
                    {isMobile && (
                        <button
                            onClick={toggleDrawer}
                            className="rounded-md p-2 hover:bg-gray-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-700"
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
                        <span className="text-sm font-medium text-gray-700 leading-none">
                            {title || "Dashboard"}
                        </span>
                    )}

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <div className="flex items-center gap-8">
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
                                        className={`relative flex items-center gap-2 text-sm font-medium transition-colors ${
                                            active
                                                ? "text-gray-900"
                                                : "text-gray-600 hover:text-gray-900"
                                        }`}
                                    >
                                        <Icon
                                            name={item.icon}
                                            className="w-4 h-4"
                                        />
                                        <span>{item.label}</span>

                                        {/* Active indicator */}
                                        {active && (
                                            <div className="absolute -bottom-4.5 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center">
                    <UserMenuDropdown
                        name={user?.full_name}
                        avatarUrl={user?.avatar_url}
                    />
                </div>
            </div>
        </header>
    );
}
