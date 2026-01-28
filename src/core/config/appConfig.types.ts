export interface AppConfig {
    features: {
        audit: boolean;
        multiTenant: boolean;
    };
    branding: {
        logo: string;
        primaryColor: string;
    };
}
