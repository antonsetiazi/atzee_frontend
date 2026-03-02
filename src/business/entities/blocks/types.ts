/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/types.ts

/**
 * =========================================
 *  Shared Block Base
 * =========================================
 */
export interface BlockBaseSchema {
    type: string;
    title?: string;
    description?: string;
    layout?: "vertical" | "horizontal";
}

/**
 * =========================================
 *  Redirect Config
 * =========================================
 */
export interface RedirectConfig {
    page: string;
    param?: string;
}

/**
 * =========================================
 *  Transaction Block Schema
 * =========================================
 */
export interface TransactionBlockSchema extends BlockBaseSchema {
    type: "transaction";

    // =============================
    // CONTEXT LOAD
    // =============================
    data_source?: string;
    data_method?: "GET" | "POST";
    data_params?: string[];

    // =============================
    // SUBMIT (Single Endpoint)
    // =============================
    submit_to: string;
    submit_method?: "POST" | "PUT" | "PATCH";

    // =============================
    // SUCCESS HANDLING
    // =============================
    redirect_to?: RedirectConfig;
    affects?: string[];
    refresh_cache?: string[];

    // =============================
    // BEHAVIOR
    // =============================
    auto_create?: boolean;
    config?: Record<string, any>;
}

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
