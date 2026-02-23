/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/types.ts

export interface BookingBlockSchema {
    type: "booking";
    title?: string;
    description?: string;
    layout?: "vertical" | "horizontal";

    data_source?: string;
    data_method?: "GET";
    data_params?: string[];

    estimate_endpoint?: string;
    estimate_method?: "POST";

    submit_to?: string;
    submit_method?: "POST";

    redirect_to?: {
        page: string;
        param: string;
    };

    allow_multiple_services?: boolean;
    require_schedule?: boolean;
    require_notes?: boolean;

    config?: Record<string, any>;
}
