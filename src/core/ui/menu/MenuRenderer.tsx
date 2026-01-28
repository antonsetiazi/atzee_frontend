import { NavLink } from "react-router-dom";
import type { MenuItem } from "./menu.types";

interface Props {
    items: MenuItem[];
}

export default function MenuRenderer({ items }: Props) {
    return (
        <ul className="space-y-1">
            {items.map((item) => (
                <li key={item.key}>
                    {item.route ? (
                        <NavLink
                            to={item.route}
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded ${
                                    isActive
                                        ? "bg-purple-100 text-amber-50"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ) : (
                        <span className="px-3 py-2 text-gray-500">
                            {item.label}
                        </span>
                    )}

                    {item.children && (
                        <div className="ml-4 mt-1">
                            <MenuRenderer items={item.children} />
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
}
