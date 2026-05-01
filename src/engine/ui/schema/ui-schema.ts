// src/engine/ui/schema/ui-schema.ts

import type { EntityTableSchema } from "@/engine/ui/table/schema/table.schema";
import type { WorkflowSchema } from "@/engine/workflows/types/workflow.types";
import type { FormSchema } from "@/core/schema/form.schema";

export interface UISchema {
    entity: string; // identifier backend
    domain: string;
    label: string; // label UI

    table?: EntityTableSchema;
    form?: FormSchema;
    workflow?: WorkflowSchema;
}
