// src/core/ui/components/breadcrumb/Breadcrumb.tsx

import { ChevronRightIcon } from "@heroicons/react/24/solid"; // atau ikon lain sesuai design

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface Props {
    items: BreadcrumbItem[];
    className?: string;
}

export default function Breadcrumb({ items, className = "" }: Props) {
    if (!items || items.length === 0) return null;

    return (
        <nav
            className={`flex items-center text-sm font-medium text-[var(--text-muted)] ${className}`}
            aria-label="Breadcrumb"
        >
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center">
                        {item.href && !isLast ? (
                            <a
                                href={item.href}
                                className="
                                    text-[var(--text-primary)]
                                    hover:text-[var(--color-primary)]
                                    transition
                                    truncate
                                    max-w-xs
                                "
                            >
                                {item.label}
                            </a>
                        ) : (
                            <span className="truncate max-w-xs">
                                {item.label}
                            </span>
                        )}

                        {!isLast && (
                            <ChevronRightIcon className="w-4 h-4 mx-2 text-[var(--text-muted)]" />
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
