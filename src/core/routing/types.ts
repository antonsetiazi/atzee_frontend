export interface ModuleRoute {
    path: string;
    element: React.LazyExoticComponent<React.ComponentType>;
    permission?: string;
}

export interface ModuleDefinition {
    name: string;
    routes: ModuleRoute[];
}
