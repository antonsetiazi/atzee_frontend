export interface MenuItem {
    key: string;
    label: string;
    path?: string;
    icon?: string;
    permission?: string;
    children?: MenuItem[];
}
