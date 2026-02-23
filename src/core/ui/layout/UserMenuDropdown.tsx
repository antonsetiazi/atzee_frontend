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

    // Close dropdown when clicking outside
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
    // console.log(avatarUrl);
    return (
        <div className="relative" ref={ref}>
            {/* Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className="group flex items-center gap-3 rounded-md px-3 py-1.5 transition-colors hover:bg-gray-100"
            >
                {/* Avatar */}
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="avatar"
                        className="h-8 w-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
                        {name.charAt(0).toUpperCase()}
                    </div>
                )}

                {/* Name (desktop only optional later) */}
                <span className="text-sm font-medium text-gray-700">
                    {name}
                </span>

                {/* Chevron */}
                <Icon
                    name="chevron-down"
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-100 bg-white shadow-lg py-2 z-50">
                    <button
                        onClick={() => {
                            navigate("/account/profile");
                            setOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                        <Icon name="user-check" className="w-4 h-4" />
                        Account Profile
                    </button>

                    <button
                        onClick={() => {
                            navigate("/business/profile");
                            setOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                        <Icon name="briefcase" className="w-4 h-4" />
                        Business Profile
                    </button>

                    <button
                        onClick={() => {
                            navigate("/account/settings");
                            setOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                        <Icon name="cog" className="w-4 h-4" />
                        Settings
                    </button>

                    <div className="my-2 border-t border-gray-100" />

                    <button
                        onClick={() => {
                            logout();
                            setOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                        <Icon name="log-out" className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
