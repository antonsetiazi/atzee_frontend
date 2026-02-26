// src/core/ui/layout/UserMenuDropdown.tsx

import { useState, useRef, useEffect } from "react";
import { useAuthService } from "@/core/auth/auth.service";
import { useNavigate } from "react-router-dom";
import Icon from "@/core/ui/icons/Icon";

interface UserMenuDropdownProps {
    name?: string;
    avatarUrl?: string;
}

export default function UserMenuDropdown({
    name = "John Doe",
    avatarUrl,
}: UserMenuDropdownProps) {
    const { logout } = useAuthService();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative z-50" ref={ref}>
            {/* Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className="group flex items-center gap-3 rounded-md px-3 py-1.5 transition-all duration-200"
                style={{
                    color: "var(--text-secondary)",
                }}
            >
                {/* Avatar */}
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="avatar"
                        className="h-8 w-8 rounded-full object-cover"
                        style={{
                            border: "1px solid var(--color-border)",
                        }}
                    />
                ) : (
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium"
                        style={{
                            background: "var(--color-surface-alt)",
                            color: "var(--text-primary)",
                        }}
                    >
                        {name.charAt(0).toUpperCase()}
                    </div>
                )}

                <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                >
                    {name}
                </span>

                <Icon
                    name="chevron-down"
                    className={`w-4 h-4 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                    style={{ color: "var(--text-muted)" }}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className="absolute right-0 mt-3 w-52 rounded-lg py-2 backdrop-blur-md"
                    style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        boxShadow: "var(--shadow)",
                        zIndex: 999,
                    }}
                >
                    <DropdownItem
                        icon="user-check"
                        label="Account Profile"
                        onClick={() => navigate("/account/profile")}
                    />

                    <DropdownItem
                        icon="briefcase"
                        label="Business Profile"
                        onClick={() => navigate("/business/profile")}
                    />

                    <DropdownItem
                        icon="cog"
                        label="Settings"
                        onClick={() => navigate("/account/settings")}
                    />

                    <div
                        className="my-2"
                        style={{
                            borderTop: "1px solid var(--color-border)",
                        }}
                    />

                    <DropdownItem
                        icon="log-out"
                        label="Logout"
                        onClick={logout}
                        danger
                    />
                </div>
            )}
        </div>
    );
}

interface ItemProps {
    icon: string;
    label: string;
    onClick: () => void;
    danger?: boolean;
}

function DropdownItem({ icon, label, onClick, danger }: ItemProps) {
    return (
        <button
            onClick={onClick}
            className="flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors duration-150"
            style={{
                color: danger ? "var(--color-error)" : "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-surface-alt)";
                e.currentTarget.style.color = danger
                    ? "var(--color-error)"
                    : "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = danger
                    ? "var(--color-error)"
                    : "var(--text-secondary)";
            }}
        >
            <Icon name={icon} className="w-4 h-4" />
            {label}
        </button>
    );
}
