// src/core/ui/layout/Topbar.tsx

import { useAuthService } from "@/core/auth/auth.service";
import { useShell } from "./shell/ShellContext";
// import TenantSwitcher from "@/core/tenant/TenantSwitcher";

export default function Topbar() {
    const { logout } = useAuthService();
    const { isMobile, toggleDrawer } = useShell();

    return (
        <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
            <div className="flex items-center gap-3">
                {isMobile && (
                    <button
                        onClick={toggleDrawer}
                        className="rounded-md p-2 hover:bg-gray-100"
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

                <span className="text-sm font-medium text-gray-700 leading-none">
                    Dashboard
                </span>
            </div>

            <button
                onClick={logout}
                className="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
            >
                Logout
            </button>
        </header>
    );
}
