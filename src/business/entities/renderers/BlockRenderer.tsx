// src/business/entities/BlockRenderer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

import WorkflowContainer from "../../workflows/WorkflowContainer";
import { executeWorkflowAction } from "@/business/workflows/workflow.executor";

import { TransactionWorkspace } from "../../transaction_workspace/TransactionWorkspace";

import { blockRegistry } from "./blockRegistry";

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

/**
 * 🔥 Helper: ambil data dari pageData
 */
function resolveBlockData(block: any, pageData: any) {
    if (!pageData) return pageData;
    return block.data_key ? pageData[block.data_key] : pageData;
}

/**
 * 🔥 Helper: detect empty data (centralized)
 */
function isEmpty(data: any) {
    if (data === null || data === undefined) return true;
    if (Array.isArray(data)) return data.length === 0;
    if (typeof data === "object") return Object.keys(data).length === 0;
    return false;
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
     * 🔥 RESOLVE COMPONENT (UPGRADED)
     * =========================================
     */
    let Component = blockRegistry[block.type];

    // 🔥 HERO BANNER (future ready, SAFE)
    if (block.type === "banner" && block.config?.variant === "hero") {
        Component = blockRegistry["banner"]; // nanti diganti HeroBanner
    }

    // 🔥 SHORTCUT GRID (future ready, SAFE)
    if (block.type === "shortcut" && block.variant === "primary") {
        Component = blockRegistry["shortcut"]; // nanti diganti ShortcutGrid
    }

    if (!Component) {
        console.warn(`Unknown block type: ${block.type}`);
        return null;
    }

    const blockData = resolveBlockData(block, pageData);

    /**
     * =========================================
     * 🔥 EMPTY STATE (CENTRALIZED)
     * =========================================
     */
    if (block.empty_state && isEmpty(blockData)) {
        // sementara fallback simple (nanti kita bikin component)
        return (
            <div
                key={idx}
                className="text-sm text-[var(--color-text-secondary)] px-4 py-6"
            >
                {block.empty_state?.message || "Belum ada data"}
            </div>
        );
    }

    /**
     * =========================================
     * 🔥 UI CONFIG
     * =========================================
     */
    const useSurface = block.ui?.surface;

    /**
     * =========================================
     * 🔥 SPECIAL HANDLING
     * =========================================
     */

    // LIST / CARD LIST → selectable
    if (["list", "card_list"].includes(block.type)) {
        const content = (
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
        );

        return useSurface ? (
            <Surface key={idx}>{content}</Surface>
        ) : (
            <div key={idx}>{content}</div>
        );
    }

    // FILE-LIKE BLOCKS
    if (["files", "tags", "availability"].includes(block.type)) {
        const content = <Component {...props} />;

        return useSurface ? (
            <Surface key={idx}>{content}</Surface>
        ) : (
            <div key={idx}>{content}</div>
        );
    }

    // TABLE
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

    // SHORTCUT / LIST VIEW → spacing wrapper (FIXED, no duplicate)
    if (["shortcut", "list_view"].includes(block.type)) {
        return (
            <div key={idx} className={isMobile ? "" : "p-2"}>
                <Component {...props} data={blockData} />
            </div>
        );
    }

    /**
     * =========================================
     * 🔥 DEFAULT RENDER
     * =========================================
     */
    const content = <Component key={idx} {...props} data={blockData} />;

    return useSurface ? <Surface key={idx}>{content}</Surface> : content;
}
