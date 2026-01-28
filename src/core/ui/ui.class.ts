// src/core/ui/ui.class.ts

export const button = {
    base:
        "inline-flex items-center justify-center gap-2 " +
        "px-4 py-2 rounded-md text-sm font-medium " +
        "transition-colors focus:outline-none",

    primary:
        "bg-blue-600 text-white hover:bg-blue-700 " + "disabled:bg-blue-300",

    danger: "bg-red-600 text-white hover:bg-red-700 " + "disabled:bg-red-300",

    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",

    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
};
