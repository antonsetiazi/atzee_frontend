// src/core/modal/useModal.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useModalStore } from "./modal.store";

export function useModal() {
    const setModal = useModalStore((s) => s.setModal);

    return {
        openModal: (component: any, props?: any) => {
            setModal(component, props);
        },

        closeModal: () => {
            setModal(null, null);
        },
    };
}
