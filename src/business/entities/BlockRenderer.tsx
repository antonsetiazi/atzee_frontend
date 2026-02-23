/* eslint-disable @typescript-eslint/no-explicit-any */
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
// import BlockContainer from "./blocks/BlockContainer";

interface Props {
    block: any;
    idx: number;
    entityKey: string;
    schema: any;
    pageData: any;
    context: Record<string, any>;
    id?: string;
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
        const containerClasses = block.background_color ?? ""; // ambil dari schema

        return (
            <div
                key={idx}
                className={`grid w-full ${containerClasses}`}
                style={{
                    gridTemplateColumns: block.columns
                        ? `repeat(${block.columns}, 1fr)`
                        : "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: block.gap ?? 16,
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
            <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 w-full"
            >
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
            </div>
        );
    }

    // 🔥 CARD LIST
    if (block.type === "card_list") {
        const blockData =
            block.data_key && pageData ? pageData[block.data_key] : pageData;

        return (
            <div key={idx}>
                <BlockCardList
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
            </div>
        );
    }

    if (block.type === "form") {
        return (
            <div key={idx}>
                <BlockForm
                    entityKey={entityKey}
                    schema={schema}
                    block={block}
                    id={id}
                    idx={idx}
                    pageData={pageData}
                    context={context}
                />
            </div>
        );
    }

    if (block.type === "table") {
        return (
            <div key={idx}>
                <BlockTable
                    entityKey={entityKey}
                    schema={schema}
                    block={block}
                    id={id}
                    searchMode={block.search_mode ?? "client"}
                />
            </div>
        );
    }

    if (block.type === "availability") {
        return (
            <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 w-full"
            >
                <BlockAvailability
                    block={block}
                    entityKey={entityKey}
                    context={context}
                />
            </div>
        );
    }

    if (block.type === "workflow") {
        return (
            <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
            >
                <WorkflowContainer
                    workflow={block}
                    onAction={(action) =>
                        console.log("Workflow action:", action)
                    }
                />
            </div>
        );
    }

    if (block.type === "files") {
        return (
            <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 w-full"
            >
                <BlockFiles block={block} entityKey={entityKey} id={id} />
            </div>
        );
    }

    if (block.type === "tags") {
        return (
            <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 w-full"
            >
                <BlockTags block={block} entityKey={entityKey} id={id} />
            </div>
        );
    }

    if (block.type === "stat") {
        return (
            <div key={idx}>
                <BlockStat block={block} data={pageData} />
            </div>
        );
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
        return (
            <div key={idx}>
                <BlockBanner block={block} schema={schema} />
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
                <BlockActionGroup block={block} entityId={id} />
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
