import type { MouseEvent, ReactNode } from "react";

/**
 * `<ShadcnButton>` — React port do SFC Vue de mesmo nome. Emite o MESMO markup e as
 * MESMAS classes (`shadcn-button`, `shadcn-button--${variant}`, `is-disabled`) pra
 * reusar o CSS compartilhado (`@arcanalabs/ui-components/styles.css`).
 *
 * Equivalências Vue → React:
 * - slot default → `children`
 * - `emit('click', ev)` → `onClick(ev)`
 */
export type ShadcnButtonVariant =
    | "primary"
    | "outline"
    | "outline-danger"
    | "ghost"
    | "danger"
    | "destructive"
    | "destructive-outline"
    | "success"
    | "secondary"
    | "dark"
    | "indigo"
    | "alert"
    | "info"
    | "warning"
    | "teal";

export interface ShadcnButtonProps {
    variant?: ShadcnButtonVariant;
    type?: "button" | "submit";
    disabled?: boolean;
    onClick?: (ev: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    children?: ReactNode;
}

export function ShadcnButton({
    variant = "primary",
    type = "button",
    disabled = false,
    onClick,
    className,
    children,
}: ShadcnButtonProps) {
    const classes = [
        "shadcn-button",
        `shadcn-button--${variant}`,
        disabled ? "is-disabled" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled}
            onClick={(ev) => onClick?.(ev)}
        >
            {children}
        </button>
    );
}
