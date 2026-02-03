// src/business/schema/ui-schema.types.ts

import type { EntityTableSchema } from "../tables/table.types";
import type { FormSchema } from "../forms/form.types";
import type { WorkflowSchema } from "../workflows/workflow.types";

export interface UISchema {
    entity: string; // identifier backend
    domain: string;
    label: string; // label UI

    table?: EntityTableSchema;
    form?: FormSchema;
    workflow?: WorkflowSchema;
}
