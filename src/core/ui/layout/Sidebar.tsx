// src/core/ui/layout/Sidebar.tsx

import { useMenuStore } from "../menu/menu.store";
import MenuRenderer from "../menu/MenuRenderer";

export default function Sidebar() {
    const visibleMenu = useMenuStore((s) => s.visibleItems);

    return (
        <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
            {/* Brand */}
            <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white shadow">
                    ERP
                </div>
                <div className="leading-tight">
                    <div className="text-sm font-semibold text-gray-800">
                        ERP Platform
                    </div>
                    <div className="text-xs text-gray-400">
                        Enterprise System
                    </div>
                </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto px-2 py-4">
                <MenuRenderer items={visibleMenu} collapseMode={true} />
            </nav>

            {/* Footer (optional, tapi enak) */}
            <div className="border-t border-gray-200 px-4 py-3 text-xs text-gray-400">
                © {new Date().getFullYear()} ERP Platform
            </div>
        </aside>
    );
}
