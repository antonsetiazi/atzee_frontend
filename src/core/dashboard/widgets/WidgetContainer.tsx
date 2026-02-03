// src/core/dashboard/widgets/WidgetContainer.tsx

interface Props {
    size: "sm" | "md" | "lg";
    children: React.ReactNode;
}

export default function WidgetContainer({ size, children }: Props) {
    const sizeClass = {
        sm: "col-span-1",
        md: "col-span-2",
        lg: "col-span-3",
    }[size];

    return (
        <div
            className={`
                ${sizeClass}
                rounded-xl
                border
                border-gray-200
                bg-white
                shadow-sm
                min-h-0
                transition
                duration-200
                hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700
                dark:border-gray-800
                dark:bg-gray-900
            `}
        >
            {children}
        </div>
    );
}
