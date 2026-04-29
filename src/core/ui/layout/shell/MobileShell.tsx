// src/core/ui/layout/shell/MobileShell.tsx

// import { Link } from "react-router-dom";
import { usePageStore } from "../../page/page.store";
import Sidebar from "../Sidebar";
import { useShell } from "./ShellContext";
import BottomNavigation from "@/core/ui/navigation/components/BottomNavigation";

export default function MobileShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const { drawerOpen, closeDrawer } = useShell();
    const { showBottomNav } = usePageStore();
    const bottomNavHeight = 56; // px
    return (
        <div
            className="relative flex h-screen flex-col overflow-hidden"
            style={{
                background: "var(--color-background)",
                color: "var(--text-primary)",
            }}
        >
            {/* Drawer Overlay */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 z-40 backdrop-blur-sm transition-opacity"
                    style={{
                        background:
                            "var(--overlay-background, rgba(0,0,0,0.4))",
                    }}
                    onClick={closeDrawer}
                />
            )}

            {/* 🔥 Drawer */}
            <div
                className={`
                    fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300
                    ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
                `}
                style={{
                    background: "var(--color-surface)",
                    // borderRight: "1px solid var(--color-border)",
                    // boxShadow: "var(--shadow)",
                }}
            >
                <Sidebar />
            </div>

            {/* 🔥 Main Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* 🔥 SCROLL CONTAINER */}

                <main
                    id="main-scroll"
                    className="flex-1 overflow-y-auto"
                    style={{
                        paddingBottom: showBottomNav ? bottomNavHeight : 0,
                        background: "var(--color-background)",
                    }}
                >
                    {children}
                    {/* <Link to="/dev/native">TEST PAGE</Link> */}
                </main>
                {/* 🔥 Bottom Navigation */}
                {showBottomNav && (
                    <div
                        className="flex-shrink-0"
                        style={{
                            height: bottomNavHeight,
                        }}
                    >
                        <BottomNavigation />
                    </div>
                )}
            </div>
        </div>
    );
}
