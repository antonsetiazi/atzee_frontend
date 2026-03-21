// src/business/entities/CoreEntityPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams, Navigate } from "react-router-dom";
import LoadingState from "@/shared/ui/LoadingState";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import PageHeader from "@/core/ui/layout/PageHeader";
import BlockRenderer from "../renderers/BlockRenderer";
import { useEntityData } from "../hooks/useEntityData";
import { useEntityContext } from "../hooks/useEntityContext";
import { useEntitySchema } from "../hooks/useEntitySchema";
// import ListingView from "@/core/ui/views/listing/ListingView";
// import { dummyListings } from "@/core/ui/views/listing/listing.dummy";

interface Props {
    entityKey: string;
}

export default function CoreEntityPage({ entityKey }: Props) {
    const { id } = useParams<{ id: string }>();
    const { isMobile } = useBreakpoint();
    // const navigate = useNavigate();
    const { schema, loading: loadingSchema } = useEntitySchema(entityKey);

    const context = useEntityContext(schema?.accept_context);

    const { data: pageData, loading: loadingData } = useEntityData({
        entityKey,
        schema,
        context,
        id,
    });

    if (!entityKey) {
        return <Navigate to="/dashboard" replace />;
    }

    if (loadingSchema || loadingData) {
        return <LoadingState />;
    }

    return (
        <div className="w-full bg-[var(--color-background)]">
            <PageHeader
                title={schema.title}
                description={schema.description}
                isMobile={isMobile}
            />

            {/* <ListingView
                data={dummyListings}
                defaultSort="rating"
                perPage={8}
                onItemClick={(item) => {
                    if (item.type === "product") {
                        navigate(`/product/${item.id}`);
                    } else {
                        navigate(`/service/${item.id}`);
                    }
                }}
            /> */}

            <div
                className={`mx-auto w-full ${
                    isMobile ? "px-4 py-4 space-y-3" : "px-6 py-6 space-y-4"
                }`}
            >
                {schema.blocks?.map((block: any, idx: number) => (
                    <BlockRenderer
                        key={idx}
                        block={block}
                        idx={idx}
                        entityKey={entityKey}
                        schema={schema}
                        pageData={pageData}
                        context={context}
                        id={id}
                    />
                ))}
            </div>
        </div>
    );
}
