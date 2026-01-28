// src/core/ui/page/schema-to-page.ts
import type { UISchema } from "@/business/schema/ui-schema.types";
import type { UIPage, UIBlock } from "./page.types";

export function composePageFromSchema(schema: UISchema): UIPage {
    const blocks: UIBlock[] = [];

    if (schema.table) {
        blocks.push({
            type: "table",
            ...schema.table,
        });
    }

    if (schema.form) {
        blocks.push({
            type: "form",
            ...schema.form,
        });
    }

    if (schema.workflow) {
        blocks.push({
            type: "workflow",
            ...schema.workflow,
        });
    }

    return {
        key: schema.entity,
        title: schema.label,
        entity: schema.entity,
        permissions: [],
        blocks,
    };
}
