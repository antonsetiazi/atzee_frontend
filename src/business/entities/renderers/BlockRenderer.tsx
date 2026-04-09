// src/business/entities/BlockRenderer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

import WorkflowContainer from "../../workflows/WorkflowContainer";
import { executeWorkflowAction } from "@/business/workflows/workflow.executor";
import { TransactionWorkspace } from "../../transaction_workspace/TransactionWorkspace";

import BlockStat from "../blocks/BlockStat";
import BlockHeader from "../blocks/BlockHeader";
import BlockBanner from "../blocks/BlockBanner";
import BlockShortcut from "../blocks/BlockShortcut";
import BlockChart from "../blocks/BlockChart";
import BlockListView from "../blocks/BlockListView";
import BlockForm from "../blocks/BlockForm";
import BlockActionGroup from "../blocks/BlockActionGroup";
import BlockTable from "../blocks/BlockTable";
import BlockList from "../blocks/BlockList";
import BlockCardList from "../blocks/BlockCardList";
import BlockText from "../blocks/BlockText";
import BlockTags from "../blocks/BlockTags";
import BlockInfo from "../blocks/BlockInfo";
import BlockMap from "../blocks/BlockMap";
import BlockImageGallery from "../blocks/BlockImageGallery";
import BlockTransactionSummary from "../blocks/BlockTransactionSummary";
import BlockFiles from "../blocks/BlockFiles";

/**
 * 🔥 Helper: ambil data dari pageData
 */
function resolveBlockData(block: any, pageData: any) {
    if (!pageData) return pageData;
    return block.data_key ? pageData[block.data_key] : pageData;
}

interface Props {
    block: any;
    idx: number;
    entityKey: string;
    schema: any;
    pageData: any;
    context: Record<string, any>;
    id?: string;
}

export default function BlockRenderer(props: Props): React.ReactNode {
    const { block, idx, pageData, id } = props;
    const { isMobile } = useBreakpoint();

    /**
     * =========================================
     * 🔥 SPECIAL BLOCK: CONTAINER (recursive)
     * =========================================
     */
    if (block.type === "container") {
        const isColumn = block.direction === "column";

        return (
            <div
                key={idx}
                className={`
                    w-full
                    ${!isColumn ? "grid" : "flex flex-col"}
                    ${isMobile ? "p-4" : "p-6"}
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

                    const separatorStyle: React.CSSProperties = {};

                    if (block.column_line_separator && isColumn && !isLast) {
                        separatorStyle.borderBottom =
                            "1px solid var(--color-border)";
                    }

                    if (block.row_line_separator && !isColumn && !isLast) {
                        separatorStyle.borderRight =
                            "1px solid var(--color-border)";
                    }

                    return (
                        <div key={i} style={separatorStyle}>
                            <BlockRenderer {...props} block={child} idx={i} />
                        </div>
                    );
                })}
            </div>
        );
    }

    /**
     * =========================================
     * 🔥 BLOCK RENDERING (MANUAL)
     * =========================================
     */

    if (block.type === "header" && isMobile) {
        return <BlockHeader key={idx} {...props} />;
    }

    if (block.type === "banner") {
        const blockData = resolveBlockData(block, pageData);
        return <BlockBanner key={idx} {...props} data={blockData} />;
    }

    if (block.type === "form") {
        return <BlockForm {...props} />;
    }

    if (block.type === "transaction_summary") {
        return <BlockTransactionSummary key={idx} {...props} />;
    }

    if (block.type === "action") {
        return <BlockActionGroup {...props} />;
    }

    if (block.type === "table") {
        const blockData = resolveBlockData(block, pageData);
        return (
            <BlockTable
                key={idx}
                {...props}
                data={blockData?.items || blockData || []}
                total={blockData?.total}
            />
        );
    }

    if (block.type === "list") {
        return (
            <BlockList
                {...props}
                onSelect={(field: string, value: any) => {
                    window.dispatchEvent(
                        new CustomEvent("form:set-value", {
                            detail: { field, value },
                        }),
                    );
                }}
            />
        );
    }

    if (block.type === "shortcut") {
        return (
            <div key={idx} className={isMobile ? "px-4 py-4" : "p-2"}>
                <BlockShortcut block={block} />
            </div>
        );
    }

    if (block.type === "stat") {
        const blockData = resolveBlockData(block, pageData);
        return <BlockStat {...props} data={blockData} />;
    }

    if (block.type === "info") {
        const blockData = resolveBlockData(block, pageData);
        return <BlockInfo {...props} data={blockData} />;
    }

    if (block.type === "chart") {
        return <BlockChart block={block} />;
    }

    if (block.type === "map") {
        return <BlockMap key={idx} {...props} />;
    }

    if (block.type === "image_gallery") {
        return <BlockImageGallery key={idx} {...props} />;
    }

    if (block.type === "list_view") {
        const blockData = resolveBlockData(block, pageData);
        return (
            <div key={idx} className={isMobile ? "px-4 py-4" : "p-2"}>
                <BlockListView {...props} data={blockData} />
            </div>
        );
    }

    if (block.type === "card_list") {
        const blockData = resolveBlockData(block, pageData);
        return (
            <BlockCardList
                {...props}
                data={blockData}
                onSelect={(field: string, value: any) => {
                    window.dispatchEvent(
                        new CustomEvent("form:set-value", {
                            detail: { field, value },
                        }),
                    );
                }}
            />
        );
    }

    if (block.type === "text") {
        return <BlockText key={idx} {...props} />;
    }

    if (block.type === "tags") {
        return <BlockTags {...props} />;
    }

    if (block.type === "files") {
        return <BlockFiles {...props} />;
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

    if (block.type === "transaction") {
        return (
            <TransactionWorkspace key={idx} block={block} pageData={pageData} />
        );
    }
}
