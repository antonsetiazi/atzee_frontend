// src/core/confirm/useConfirm.ts

import { useConfirmStore } from "./confirm.store";

export function useConfirm() {
    return useConfirmStore((state) => state.confirm);
}
