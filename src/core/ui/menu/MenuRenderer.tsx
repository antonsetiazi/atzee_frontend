// src/core/ui/menu/MenuRenderer.tsx
import { NavLink } from "react-router-dom";
import { useState } from "react";
import type { MenuItem } from "./menu.types";

interface Props {
    items: MenuItem[];
    collapseMode?: boolean; // true = dropdown mode
}

export default function MenuRenderer({ items, collapseMode = false }: Props) {
    // state open per menu key
    const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

    const toggleOpen = (key: string) => {
        setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <ul className="space-y-1">
            {items.map((item) => (
                <MenuItemRenderer
                    key={item.key}
                    item={item}
                    collapseMode={collapseMode}
                    isOpen={!!openMap[item.key]}
                    toggleOpen={() => toggleOpen(item.key)}
                    // openMap={openMap}
                    // setOpenMap={setOpenMap}
                />
            ))}
        </ul>
    );
}

interface MenuItemRendererProps {
    item: MenuItem;
    collapseMode: boolean;
    isOpen: boolean;
    toggleOpen: () => void;
    // openMap: Record<string, boolean>;
    // setOpenMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

function MenuItemRenderer({
    item,
    collapseMode,
    isOpen,
    toggleOpen,
}: MenuItemRendererProps) {
    const hasChildren = item.children && item.children.length > 0;

    // Base styling untuk teks menu
    const baseClasses =
        "block px-3 py-2 rounded text-gray-700 hover:bg-gray-100";

    // Collapse mode dengan children
    if (collapseMode && hasChildren) {
        return (
            <li>
                <NavLink
                    to="#"
                    className={({ isActive }) =>
                        `${baseClasses} flex justify-between items-center ${isActive ? "bg-purple-100 text-amber-50" : ""}`
                    }
                    onClick={(e) => {
                        e.preventDefault(); // cegah navigasi
                        toggleOpen(); // toggle hanya menu ini
                    }}
                >
                    <span>{item.label}</span>
                    <span className="ml-2 text-sm">{isOpen ? "▾" : "▸"}</span>
                </NavLink>
                {isOpen && (
                    <div className="ml-4 mt-1">
                        <MenuRenderer
                            items={item.children!}
                            collapseMode={collapseMode}
                        />
                    </div>
                )}
            </li>
        );
    }

    // Default: inline menu seperti sekarang
    return (
        <li>
            {item.route ? (
                <NavLink
                    to={item.route}
                    className={({ isActive }) =>
                        `${baseClasses} ${isActive ? "bg-purple-100 text-amber-50" : ""}`
                    }
                >
                    {item.label}
                </NavLink>
            ) : (
                <span className={baseClasses}>{item.label}</span>
            )}

            {hasChildren && !collapseMode && (
                <div className="ml-4 mt-1">
                    <MenuRenderer
                        items={item.children!}
                        collapseMode={collapseMode}
                    />
                </div>
            )}
        </li>
    );
}
