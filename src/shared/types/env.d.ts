interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_BUILD_VERSION: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
