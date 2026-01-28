import type { FormField } from "./types";

export function useFormRules(values: Record<string, unknown>) {
    function isVisible(field: FormField): boolean {
        if (!field.visible_if) return true;

        return values[field.visible_if.field] === field.visible_if.equals;
    }

    return { isVisible };
}
