// src/engine/entities/blocks/BlockForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import FormRenderer from "../../../business/forms/FormRenderer";
import LoadingState from "@/shared/ui/LoadingState";
import type { FormContext } from "@/business/forms/form.context";

interface Props {
    entityKey: string;
    schema: any;
    block: any;
    id?: string;
    idx: number;
    pageData?: any;
    context?: Record<string, any>;
}

export default function BlockForm({
    entityKey,
    schema,
    block,
    id,
    idx,
    pageData,
    context = {},
}: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // 🔹 ambil transaction id dari query ?parent_id=4
    const parentId = searchParams.get("parent_id");

    const [initialValues, setInitialValues] = useState<any>({});
    const [loadingData, setLoadingData] = useState(true);
    const isCreatePage = block.mode === "create";
    const isFilterMode = block.mode === "filter";
    // console.log(initialValues);

    useEffect(() => {
        // console.log(entityKey);
        if (!entityKey) return;

        async function load() {
            setLoadingData(true);

            /**
             * FILTER MODE
             */
            if (isFilterMode) {
                setInitialValues({});
                setLoadingData(false);
                return;
            }

            /**
             * CREATE PAGE
             */
            if (isCreatePage) {
                const injectedValues: Record<string, any> = {};

                block.fields?.forEach((field: any) => {
                    if (field.bind?.startsWith("context.")) {
                        const key = field.bind.replace("context.", "");
                        if (context[key] !== undefined) {
                            injectedValues[field.key] = context[key];
                        }
                    }
                });

                setInitialValues(injectedValues);
                setLoadingData(false);
                return;
            }

            /**
             * 🔹 PRIORITAS 1: Navigation State
             */
            const state = location.state as any;
            if (state?.initialValues) {
                setInitialValues(state.initialValues);
                setLoadingData(false);
                return;
            }

            /**
             * 🔹 PRIORITAS 2: Page-level data_source (Detail Page)
             */
            if (pageData) {
                setInitialValues(pageData);
                setLoadingData(false);
                return;
            }

            /**
             * Tidak ada data
             */
            setInitialValues({});
            setLoadingData(false);
        }

        load();
    }, [
        entityKey,
        isCreatePage,
        isFilterMode,
        location.state,
        pageData,
        context,
        block,
    ]);

    const formContext = useMemo<FormContext>(
        () => ({
            navigate,
            entityKey,
        }),
        [navigate, entityKey],
    );

    const submitUrl = block.submit_to
        ?.replace("{id}", id ?? "")
        ?.replace("{parent_id}", parentId ?? "");

    if (loadingData) return <LoadingState />;

    return (
        <div key={idx} className="mb-4">
            <FormRenderer
                key={idx}
                entity={schema.entity}
                schema={{ ...block, submit_to: submitUrl }}
                initialValues={initialValues}
                context={formContext}
                parentId={String(parentId)}
            />
        </div>
    );
}
