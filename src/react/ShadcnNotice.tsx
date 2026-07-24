import type { ReactNode } from "react";

/**
 * `<ShadcnNotice>` — React port. Banner informativo com variants semânticas. Reproduz
 * `<div class="shadcn-notice shadcn-notice--${variant}">` com `__icon`/`__content`/
 * `__title`/`__body` e o botão `__close` opcional, idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - slot default → `children`; slots `#title`/`#icon` → props `title`/`iconNode`
 * - `emit('dismiss')` → `onDismiss`
 */
export type NoticeVariant =
    | "info"
    | "blue"
    | "success"
    | "warning"
    | "pending"
    | "destructive";

const VARIANT_DEFAULT_ICONS: Record<NoticeVariant, string> = {
    info: "fa-solid fa-circle-info",
    blue: "fa-solid fa-circle-info",
    success: "fa-solid fa-circle-check",
    warning: "fa-solid fa-triangle-exclamation",
    pending: "fa-solid fa-clock",
    destructive: "fa-solid fa-circle-exclamation",
};

export interface ShadcnNoticeProps {
    variant?: NoticeVariant;
    title?: ReactNode;
    icon?: string;
    iconNode?: ReactNode;
    showIcon?: boolean;
    dismissible?: boolean;
    onDismiss?: () => void;
    className?: string;
    children?: ReactNode;
}

export function ShadcnNotice({
    variant = "info",
    title = "",
    icon = "",
    iconNode,
    showIcon = true,
    dismissible = false,
    onDismiss,
    className,
    children,
}: ShadcnNoticeProps) {
    const resolvedIcon = icon || VARIANT_DEFAULT_ICONS[variant];

    const rootClasses = [
        "shadcn-notice",
        `shadcn-notice--${variant}`,
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={rootClasses} role="status">
            {showIcon ? (
                <span className="shadcn-notice__icon" aria-hidden="true">
                    {iconNode ?? <i className={resolvedIcon} />}
                </span>
            ) : null}

            <div className="shadcn-notice__content">
                {title ? (
                    <strong className="shadcn-notice__title">{title}</strong>
                ) : null}
                <div className="shadcn-notice__body">{children}</div>
            </div>

            {dismissible ? (
                <button
                    type="button"
                    className="shadcn-notice__close"
                    aria-label="Fechar"
                    onClick={() => onDismiss?.()}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            ) : null}
        </div>
    );
}
