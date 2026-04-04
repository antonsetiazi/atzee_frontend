// src/core/payment/payment.types.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export type SnapCallbacks = {
    onSuccess?: (result: any) => void;
    onPending?: (result: any) => void;
    onError?: (result: any) => void;
    onClose?: () => void;
};
