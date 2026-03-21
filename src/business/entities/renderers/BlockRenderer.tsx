// src/business/entities/BlockRenderer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

import WorkflowContainer from "../../workflows/WorkflowContainer";
import { executeWorkflowAction } from "@/business/workflows/workflow.executor";

import { TransactionWorkspace } from "../../transaction_workspace/TransactionWorkspace";

import { blockRegistry } from "./blockRegistry";

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
 * 🔥 Premium Surface Wrapper (tetap dipakai)
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

/**
 * 🔥 Helper: ambil data dari pageData
 */
function resolveBlockData(block: any, pageData: any) {
    if (!pageData) return pageData;
    return block.data_key ? pageData[block.data_key] : pageData;
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
     * 🔥 SPECIAL BLOCK: WORKFLOW
     * =========================================
     */
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

    /**
     * =========================================
     * 🔥 SPECIAL BLOCK: TRANSACTION
     * =========================================
     */
    if (block.type === "transaction") {
        return (
            <TransactionWorkspace key={idx} block={block} pageData={pageData} />
        );
    }

    /**
     * =========================================
     * 🔥 NORMAL BLOCK (via registry)
     * =========================================
     */
    const Component = blockRegistry[block.type];

    if (!Component) {
        console.warn(`Unknown block type: ${block.type}`);
        return null;
    }

    const blockData = resolveBlockData(block, pageData);

    /**
     * =========================================
     * 🔥 WRAPPER LOGIC (biar tetap kaya sebelumnya)
     * =========================================
     */

    // LIST / CARD LIST → ada onSelect + Surface
    if (block.type === "list" || block.type === "card_list") {
        return (
            <Surface key={idx}>
                <Component
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
            </Surface>
        );
    }

    // FILES / TAGS / AVAILABILITY → pakai Surface
    if (
        block.type === "files" ||
        block.type === "tags" ||
        block.type === "availability"
    ) {
        return (
            <Surface key={idx}>
                <Component {...props} />
            </Surface>
        );
    }

    // TABLE → handle items & total
    if (block.type === "table") {
        return (
            <Component
                key={idx}
                {...props}
                data={blockData?.items || blockData || []}
                total={blockData?.total}
            />
        );
    }

    // SHORTCUT / LIST VIEW / CARD LIST → spacing mobile
    if (
        block.type === "shortcut" ||
        block.type === "list_view" ||
        block.type === "card_list"
    ) {
        return (
            <div key={idx} className={isMobile ? "p-4" : "p-6"}>
                <Component {...props} data={blockData} />
            </div>
        );
    }

    // DEFAULT
    return <Component key={idx} {...props} data={blockData} />;
}
