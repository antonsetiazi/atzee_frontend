// src/engine/entities/hooks/useEntitySchema.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useUISchemaStore } from "../../../business/schema/ui-schema.store";

export function useEntitySchema(entityKey: string) {
    const [schema, setSchema] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!entityKey) return;

        let alive = true;

        async function load() {
            setLoading(true);

            try {
                const result = await useUISchemaStore
                    .getState()
                    .getSchema(entityKey);

                if (!alive) return;
                setSchema(result);
            } finally {
                if (alive) setLoading(false);
            }
        }

        load();

        return () => {
            alive = false;
        };
    }, [entityKey]);

    return { schema, loading };
}
