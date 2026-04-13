// src/core/modal/modal.store.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import type { ComponentType } from "react";

interface ModalState {
    component: ComponentType<any> | null;
    props?: any;

    setModal: (component: ComponentType<any> | null, props?: any) => void;
}

export const useModalStore = create<ModalState>((set) => ({
    component: null,
    props: null,

    setModal: (component, props) =>
        set({
            component,
            props,
        }),
}));
