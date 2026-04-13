// src/core/modal/ModalProvider.tsx

import { useModalStore } from "./modal.store";

export default function ModalProvider() {
    const { component: Component, props, setModal } = useModalStore();

    if (!Component) return null;

    const handleClose = () => {
        setModal(null, null);
    };

    return <Component {...props} open onClose={handleClose} />;
}
