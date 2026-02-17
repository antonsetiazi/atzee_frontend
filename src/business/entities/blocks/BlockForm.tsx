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
}

export default function BlockForm({
    entityKey,
    schema,
    block,
    id,
    idx,
}: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // 🔹 ambil transaction id dari query ?parent_id=4
    const parentId = searchParams.get("parent_id");

    const [initialValues, setInitialValues] = useState<any>({});
    const [loadingData, setLoadingData] = useState(true);
    const isCreatePage = entityKey.endsWith(".create");

    useEffect(() => {
        // console.log(entityKey);
        if (!entityKey) return;

        async function load() {
            setLoadingData(true);

            /**
             * CREATE PAGE
             */
            if (isCreatePage) {
                setInitialValues({});
                setLoadingData(false);
                return;
            }

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

            /**
             * EDIT PAGE
             * 1️⃣ Coba ambil dari navigation state
             */
            const state = location.state as any;
            if (state?.initialValues) {
                setInitialValues(state.initialValues);
                setLoadingData(false);
                return;
            }

            try {
                // Ambil URL dari schema.blocks[form].submit_to
                const formBlock = schema.blocks.find(
                    (b: any) => b.type === "form",
                );
                if (formBlock?.submit_to) {
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
            return;
        }

        load();
    }, [entityKey, id, parentId, schema, isCreatePage, location.state]);

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
    // console.log(initialValues);
    // console.log("id: ", id);
    // console.log("parentId: ", parentId);
    // console.log(schema.entity);
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
