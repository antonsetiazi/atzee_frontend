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
        return (
            <div
                key={idx}
                className="grid w-full"
                style={{
                    gridTemplateColumns: block.columns
                        ? `repeat(${block.columns}, 1fr)`
                        : "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: block.gap ?? 20,
                }}
            >
                {block.blocks?.map((child: any, i: number) => (
                    <BlockRenderer
                        key={i}
                        block={child}
                        idx={i}
                        entityKey={entityKey}
                        schema={schema}
                        pageData={pageData}
                        context={context}
                        id={id}
                    />
                ))}
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
        return (
            <BlockTable
                key={idx}
                entityKey={entityKey}
                schema={schema}
                block={block}
                id={id}
                searchMode={block.search_mode ?? "client"}
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
        return (
            <div key={idx}>
                <BlockInfo block={block} data={pageData} />
            </div>
        );
    }

    if (block.type === "chart") {
        return (
            <div key={idx}>
                <BlockChart block={block} />
            </div>
        );
    }

    if (block.type === "text") {
        return (
            <div key={idx}>
                <BlockText block={block} />
            </div>
        );
    }

    if (block.type === "banner") {
        const blockData =
            block.data_key && pageData ? pageData[block.data_key] : pageData;
        return (
            <div key={idx}>
                <BlockBanner data={blockData} />
            </div>
        );
    }

    if (block.type === "map") {
        return (
            <div key={idx}>
                <BlockMap block={block} entityKey={entityKey} id={id} />
            </div>
        );
    }

    if (block.type === "action") {
        return (
            <div key={idx}>
                <BlockActionGroup
                    block={block}
                    entityId={id}
                    entityData={pageData}
                />
            </div>
        );
    }

    if (block.type === "shortcut") {
        return (
            <div key={idx}>
                <BlockShortcut block={block} />
            </div>
        );
    }

    if (block.type === "transaction_summary") {
        return (
            <div key={idx}>
                <BlockTransactionSummary
                    block={block}
                    formValues={schema?.formValues} // nanti kita rapikan
                />
            </div>
        );
    }

    if (block.type === "booking") {
        return (
            <div key={idx}>
                <BlockBooking block={block} />
            </div>
        );
    }

    return null;
}
