// src/core/ui/layout/Topbar.tsx

import { useAuthService } from "@/core/auth/auth.service";
// import TenantSwitcher from "@/core/tenant/TenantSwitcher";

export default function Topbar() {
    const { logout } = useAuthService();

    return (
        <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">
            {/* Left */}
            <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 leading-none">
                    Dashboard
                </span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                {/* Tenant switcher (future-ready) */}
                {/* <TenantSwitcher /> */}

                {/* User menu */}
                <button
                    onClick={logout}
                    className="
                        inline-flex items-center gap-2
                        rounded-md px-3 py-1.5
                        text-sm font-medium text-gray-600
                        transition
                        hover:bg-gray-100 hover:text-gray-900
                        focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                    "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                        />
                    </svg>
                    Logout
                </button>
            </div>
        </header>
    );
}
