// src/core/ui/components/command_palette/command_palette.types.ts

export interface CommandItemType {
    id: string;
    title: string;
    description?: string;
    icon?: React.ReactNode;
    onSelect?: () => void;
}

export interface CommandPaletteProps {
    open: boolean;
    onClose?: () => void;
    items: CommandItemType[];
}
