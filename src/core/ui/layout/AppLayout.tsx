// src/core/ui/layout/AppLayout.tsx

import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { fetchMenu } from "@/core/ui/menu/menu.api";
import { useMenuStore } from "@/core/ui/menu/menu.store";
import { useSessionStore } from "@/core/session/session.store";

export default function AppLayout() {
    const token = useSessionStore((s) => s.token);
    const setMenu = useMenuStore((state) => state.setMenu);

    useEffect(() => {
        if (!token) return;
        async function bootstrap() {
            const menu = await fetchMenu();
            setMenu(menu);
        }

        bootstrap();
    }, [token, setMenu]);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Topbar */}
                <Topbar />

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="mx-auto w-full max-w-400">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
