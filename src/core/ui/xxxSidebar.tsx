import { Link } from "react-router-dom";
import { useMenu } from "./menu/useMenu";

export default function Sidebar() {
    const menu = useMenu();

    return (
        <aside className="w-64 bg-gray-800 text-white h-screen p-4">
            <h2 className="text-lg font-bold mb-4">Atzee ERP</h2>

            <ul className="space-y-2">
                {menu.map((item) => (
                    <li key={item.key}>
                        {item.path ? (
                            <Link
                                to={item.path}
                                className="block px-3 py-2 rounded hover:bg-gray-700"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="px-3 py-2 block font-semibold">
                                {item.label}
                            </span>
                        )}

                        {item.children && (
                            <ul className="ml-4 mt-1 space-y-1">
                                {item.children.map((child) => (
                                    <li key={child.key}>
                                        <Link
                                            to={child.path!}
                                            className="block px-3 py-1 rounded hover:bg-gray-700 text-sm"
                                        >
                                            {child.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
}
