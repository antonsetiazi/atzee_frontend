/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/BlockRenderer.tsx

import React from "react";
import WorkflowContainer from "../workflows/WorkflowContainer";
import BlockForm from "./blocks/BlockForm";
import BlockTable from "./blocks/BlockTable";
import BlockFiles from "./blocks/BlockFiles";
import BlockTags from "./blocks/BlockTags";
import BlockText from "./blocks/BlockText";
import BlockChart from "./blocks/BlockChart";
import BlockStat from "./blocks/BlockStat";
import BlockShortcut from "./blocks/BlockShortcut";
import BlockBanner from "./blocks/BlockBanner";
import BlockMap from "./blocks/BlockMap";
import BlockActionGroup from "./blocks/BlockActionGroup";
import BlockAvailability from "./blocks/BlockAvailability";
import BlockCardList from "./blocks/BlockCardList";
import BlockList from "./blocks/BlockList";
import BlockTransactionSummary from "./blocks/BlockTransactionSummary";
import BlockBooking from "./blocks/BlockBooking";
import BlockInfo from "./blocks/BlockInfo";
import BlockListView from "./blocks/BlockListView";
import { executeWorkflowAction } from "@/business/workflows/workflow.executor";
import BlockImageGallery from "./blocks/BlockImageGallery";
import { TransactionWorkspace } from "../transaction_workspace/TransactionWorkspace";

interface Props {
    block: any;
    idx: number;
    entityKey: string;
    schema: any;
    pageData: any;
    context: Record<string, any>;
    id?: string;
}

/**
 * 🔥 Premium Surface Wrapper
 */
function Surface({
    children,
    padded = true,
}: {
    children: React.ReactNode;
    padded?: boolean;
}) {
    return (
        <div
            className={`w-full rounded-2xl ${
                padded ? "p-6" : ""
            } transition-all duration-300`}
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
            }}
        >
            {children}
        </div>
    );
}

export default function BlockRenderer({
    block,
    idx,
    entityKey,
    schema,
    pageData,
    context,
    id,
}: Props): React.ReactNode {
    // console.log(block.type);
    // 🔥 CONTAINER
    if (block.type === "container") {
        const isColumn = block.direction === "column";

        return (
            <div
                key={idx}
                className={`
                    w-full
                    ${!isColumn ? "grid" : "flex flex-col"}
                `}
                style={
                    !isColumn
                        ? {
                              gridTemplateColumns: block.columns
                                  ? `repeat(${block.columns}, 1fr)`
                                  : "repeat(auto-fit, minmax(250px, 1fr))",
                              gap: block.gap ?? 20,
                          }
                        : {
                              gap: block.gap ?? 16,
                          }
                }
            >
                {block.blocks?.map((child: any, i: number) => {
                    const isLast = i === block.blocks.length - 1;

                    // 🔹 separator style
                    const separatorStyle: React.CSSProperties = {};

                    // Vertical lines between column blocks
                    if (block.column_line_separator && isColumn && !isLast) {
                        separatorStyle.borderBottom =
                            "1px solid var(--color-border)";
                    }

                    // Horizontal lines between row blocks
                    if (block.row_line_separator && !isColumn && !isLast) {
                        separatorStyle.borderRight =
                            "1px solid var(--color-border)";
                    }
                    return (
                        <div key={i} style={separatorStyle}>
                            <BlockRenderer
                                block={child}
                                idx={i}
                                entityKey={entityKey}
                                schema={schema}
                                pageData={pageData}
                                context={context}
                                id={id}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }

    // 🔥 LIST
    if (block.type === "list") {
        return (
            <Surface key={idx}>
                <BlockList
                    block={block}
                    entityKey={entityKey}
                    context={context}
                    onSelect={(field, value) => {
                        window.dispatchEvent(
                            new CustomEvent("form:set-value", {
                                detail: { field, value },
                            }),
                        );
                    }}
                />
            </Surface>
        );
    }

    if (block.type === "list_view") {
        const blockData =
            block.data_key && pageData ? pageData[block.data_key] : pageData;

        return <BlockListView key={idx} block={block} data={blockData} />;
    }

    // 🔥 CARD LIST
    if (block.type === "card_list") {
        const blockData =
            block.data_key && pageData ? pageData[block.data_key] : pageData;

        return (
            <BlockCardList
                key={idx}
                block={block}
                data={blockData}
                context={context}
                onSelect={(field, value) => {
                    window.dispatchEvent(
                        new CustomEvent("form:set-value", {
                            detail: { field, value },
                        }),
                    );
                }}
            />
        );
    }

    if (block.type === "form") {
        return (
            <BlockForm
                key={idx}
                entityKey={entityKey}
                schema={schema}
                block={block}
                id={id}
                idx={idx}
                pageData={pageData}
                context={context}
            />
        );
    }

    if (block.type === "table") {
        const blockData =
            block.data_key && pageData ? pageData[block.data_key] : pageData;

        return (
            <BlockTable
                key={idx}
                block={block}
                data={blockData?.items || blockData || []}
                total={blockData?.total}
                entityKey={entityKey}
                id={id}
            />
        );
    }
    if (block.type === "availability") {
        return (
            <Surface key={idx}>
                <BlockAvailability
                    block={block}
                    entityKey={entityKey}
                    context={context}
                />
            </Surface>
        );
    }

    if (block.type === "workflow") {
        return (
            <WorkflowContainer
                key={idx}
                workflow={block}
                entityData={pageData}
                onAction={(action) => executeWorkflowAction(action, id)}
            />
        );
    }

    if (block.type === "files") {
        return (
            <Surface key={idx}>
                <BlockFiles block={block} entityKey={entityKey} id={id} />
            </Surface>
        );
    }

    if (block.type === "tags") {
        return (
            <Surface key={idx}>
                <BlockTags block={block} entityKey={entityKey} id={id} />
            </Surface>
        );
    }

    if (block.type === "stat") {
        return <BlockStat key={idx} block={block} data={pageData} />;
    }

    if (block.type === "info") {
        return <BlockInfo key={idx} block={block} data={pageData} />;
    }

    if (block.type === "chart") {
        return <BlockChart key={idx} block={block} />;
    }

    if (block.type === "text") {
        return <BlockText key={idx} block={block} />;
    }

    if (block.type === "banner") {
        const blockData =
            block.data_key && pageData ? pageData[block.data_key] : pageData;

        return <BlockBanner key={idx} data={blockData} />;
    }

    if (block.type === "image_gallery") {
        const blockData =
            block.data_key && pageData ? pageData[block.data_key] : pageData;
        return <BlockImageGallery key={idx} pageData={blockData} />;
    }

    if (block.type === "map") {
        return (
            <BlockMap key={idx} block={block} entityKey={entityKey} id={id} />
        );
    }

    if (block.type === "action") {
        return (
            <BlockActionGroup
                key={idx}
                block={block}
                entityId={id}
                entityData={pageData}
            />
        );
    }

    if (block.type === "shortcut") {
        return <BlockShortcut key={idx} block={block} />;
    }

    if (block.type === "transaction_summary") {
        return (
            <BlockTransactionSummary
                key={idx}
                block={block}
                formValues={schema?.formValues} // nanti kita rapikan
            />
        );
    }

    if (block.type === "booking") {
        return <BlockBooking key={idx} block={block} />;
    }

    if (block.type === "transaction") {
        return (
            <TransactionWorkspace key={idx} block={block} pageData={pageData} />
        );
    }

    return null;
}
