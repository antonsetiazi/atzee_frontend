/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockForm.tsx

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import FormRenderer from "../../forms/FormRenderer";
import { fetchEntityDetail } from "./../entity.api";
import { httpPost } from "@/core/http/http.client";
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

// 🔹 Fungsi rekursif untuk menemukan FormBlock
const findFormBlock = (blocks: any[]): any | undefined => {
    for (const b of blocks) {
        if (b.type === "form") return b;
        if (b.blocks) {
            const nested = findFormBlock(b.blocks);
            if (nested) return nested;
        }
    }
    return undefined;
};

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
             * 🔹 PRIORITAS 3: Fallback (Legacy Support)
             * Jika page tidak punya data_source
             */
            try {
                const formBlock = findFormBlock(schema.blocks);

                if (id && formBlock?.submit_to) {
                    const submitUrl = formBlock.submit_to
                        .replace("{id}", id.toString())
                        .replace("{parent_id}", parentId ?? "");

                    const res = await fetchEntityDetail(submitUrl);
                    setInitialValues(res);
                }
            } catch (err) {
                console.error("Failed to fetch entity detail:", err);
            } finally {
                setLoadingData(false);
            }

            /**
             * 🔹 SELF ENTITY QUERY (rare case)
             */
            if (!id) {
                try {
                    const res = await httpPost(
                        `/entities/${schema.domain}/${schema.entity}/query/`,
                        {}, // 👈 query kosong
                    );

                    setInitialValues(res);
                } catch (err) {
                    console.error("Failed to fetch self entity:", err);
                } finally {
                    setLoadingData(false);
                }
                return;
            }

            setLoadingData(false);
        }

        load();
    }, [
        entityKey,
        id,
        parentId,
        schema,
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
        <div key={idx}>
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
