export interface ContextMenuEntry {
    type: "button" | "separator";
}

export interface ContextMenuButton extends ContextMenuEntry {
    type: "button";
    label?: String;
    action?: () => void;
    disabled?: boolean;
}

export interface ContextMenuSeparator extends ContextMenuEntry {
    type: "separator";
}
