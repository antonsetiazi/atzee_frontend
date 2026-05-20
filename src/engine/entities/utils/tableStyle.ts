// src/engine/entities/utils/tableStyle.ts

export function getTextStyle(style?: string) {
    switch (style) {
        case "muted":
            return "text-[var(--text-muted)]";

        case "primary":
            return "text-[var(--color-primary)]";

        case "success":
            return "text-green-600";

        case "danger":
            return "text-red-600";

        case "warning":
            return "text-yellow-600";

        default:
            return "";
    }
}

export function getTextSize(size?: string) {
    switch (size) {
        case "xs":
            return "text-xs";

        case "sm":
            return "text-sm";

        case "lg":
            return "text-lg";

        default:
            return "text-sm";
    }
}

export function getTextWeight(weight?: string) {
    switch (weight) {
        case "medium":
            return "font-medium";

        case "semibold":
            return "font-semibold";

        case "bold":
            return "font-bold";

        default:
            return "";
    }
}
