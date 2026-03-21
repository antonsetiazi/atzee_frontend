// src/business/entities/renderers/blockRegistry.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import BlockForm from "../blocks/BlockForm";
import BlockTable from "../blocks/BlockTable";
import BlockList from "../blocks/BlockList";
import BlockCardList from "../blocks/BlockCardList";
import BlockListView from "../blocks/BlockListView";
import BlockText from "../blocks/BlockText";
import BlockChart from "../blocks/BlockChart";
import BlockStat from "../blocks/BlockStat";
import BlockInfo from "../blocks/BlockInfo";
import BlockBanner from "../blocks/BlockBanner";
import BlockImageGallery from "../blocks/BlockImageGallery";
import BlockMap from "../blocks/BlockMap";
import BlockShortcut from "../blocks/BlockShortcut";
import BlockBooking from "../blocks/BlockBooking";
import BlockTransactionSummary from "../blocks/BlockTransactionSummary";
import BlockTags from "../blocks/BlockTags";
import BlockActionGroup from "../blocks/BlockActionGroup";

export const blockRegistry: Record<string, any> = {
    action: BlockActionGroup,
    form: BlockForm,
    table: BlockTable,
    list: BlockList,
    card_list: BlockCardList,
    list_view: BlockListView,
    text: BlockText,
    chart: BlockChart,
    stat: BlockStat,
    info: BlockInfo,
    banner: BlockBanner,
    image_gallery: BlockImageGallery,
    map: BlockMap,
    tags: BlockTags,
    shortcut: BlockShortcut,
    booking: BlockBooking,
    transaction_summary: BlockTransactionSummary,
};
