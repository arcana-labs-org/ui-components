import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { acquireZIndex, releaseZIndex } from "../vue/services/dialog-stack";

/**
 * `<ShadcnDialog>` — React port do SFC Vue. Modal shadcn-style com API imperativa
 * via `ref` (`show()` / `hide()`), espelhando a API ref-based do SFC (`this.$refs
 * .dialog.show()`).
 *
 * Equivalências Vue → React:
 * - `<Teleport to="body">` → `createPortal(..., document.body)`
 * - API ref-based (`show()`/`hide()`) → `forwardRef` + `useImperativeHandle`
 * - `emit('show'|'hide')` → `onShow` / `onHide`
 * - slots `header` / `footer` / default → props `header` (ReactNode), `footer`
 *   (ReactNode OU `(hide) => ReactNode`, espelha o slot-scope `{ hide }`), `children`
 * - z-index dinâmico via o mesmo `dialog-stack` compartilhado (stacking de modais aninhados)
 *
 * A transição fade+zoom do Vue (`<transition name="shadcn-dialog">`) é omitida — o
 * markup/classes de conteúdo são idênticos, só a animação de entrada/saída não é
 * replicada (mesma decisão dos outros ports com Teleport/Transition).
 */
export type ShadcnDialogSize = "sm" | "md" | "lg" | "xl" | "full" | number;

export interface ShadcnDialogHandle {
    show: () => void;
    hide: () => void;
}

export interface ShadcnDialogProps {
    title?: string;
    description?: string;
    size?: ShadcnDialogSize;
    fullHeight?: boolean;
    closeable?: boolean;
    contentClass?: string;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    noBodyPadding?: boolean;
    bodyScrollable?: boolean;
    flatFooter?: boolean;
    header?: ReactNode;
    footer?: ReactNode | ((hide: () => void) => ReactNode);
    children?: ReactNode;
    onShow?: () => void;
    onHide?: () => void;
}

const SIZE_PRESETS: Record<string, string> = {
    sm: "470px",
    md: "580px",
    lg: "720px",
    xl: "880px",
    full: "90vw",
};

function resolveMaxWidth(size: ShadcnDialogSize): string {
    if (typeof size === "number") return `${size}px`;
    return SIZE_PRESETS[size] ?? SIZE_PRESETS.md;
}

export const ShadcnDialog = forwardRef<ShadcnDialogHandle, ShadcnDialogProps>(
    function ShadcnDialog(
        {
            title = "",
            description = "",
            size = "md",
            fullHeight = false,
            closeable = true,
            contentClass = "",
            closeOnOverlayClick = false,
            closeOnEscape = true,
            noBodyPadding = false,
            bodyScrollable = true,
            flatFooter = false,
            header,
            footer,
            children,
            onShow,
            onHide,
        },
        ref
    ) {
        const [visible, setVisible] = useState(false);
        const [zIndex, setZIndex] = useState(10000);
        const overlayRef = useRef<HTMLDivElement | null>(null);
        const contentRef = useRef<HTMLDivElement | null>(null);

        const hide = useCallback(() => {
            setVisible((wasVisible) => {
                if (!wasVisible) return wasVisible;
                releaseZIndex();
                onHide?.();
                return false;
            });
        }, [onHide]);

        const show = useCallback(() => {
            setZIndex(acquireZIndex());
            setVisible(true);
            onShow?.();
        }, [onShow]);

        useImperativeHandle(ref, () => ({ show, hide }), [show, hide]);

        // Foca o primeiro elemento interativo ao abrir (focus trap leve, igual ao SFC).
        useEffect(() => {
            if (!visible) return;
            const root = contentRef.current;
            if (!root) return;
            const focusable = root.querySelector<HTMLElement>(
                'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            (focusable ?? root).focus?.();
        }, [visible]);

        // Escape fecha (configurável).
        useEffect(() => {
            if (!visible) return;
            const handleKeydown = (e: KeyboardEvent) => {
                if (e.key === "Escape" && closeOnEscape) {
                    e.preventDefault();
                    hide();
                }
            };
            document.addEventListener("keydown", handleKeydown);
            return () => document.removeEventListener("keydown", handleKeydown);
        }, [visible, closeOnEscape, hide]);

        if (!visible) return null;

        const showHeader = Boolean(title || header);
        const contentClasses = ["shadcn-dialog-content"];
        if (fullHeight) contentClasses.push("shadcn-dialog-content--full-height");
        if (contentClass) contentClasses.push(contentClass);

        const bodyClasses = ["shadcn-dialog-body"];
        if (noBodyPadding) bodyClasses.push("shadcn-dialog-body--no-padding");
        if (!bodyScrollable) bodyClasses.push("shadcn-dialog-body--no-scroll");

        const footerClasses = ["shadcn-dialog-footer"];
        if (flatFooter) footerClasses.push("shadcn-dialog-footer--flat");

        const overlayStyle: CSSProperties = { zIndex };
        const contentStyle: CSSProperties = {
            maxWidth: resolveMaxWidth(size),
            zIndex: zIndex + 1,
        };

        const footerContent =
            typeof footer === "function" ? footer(hide) : footer;

        return createPortal(
            <div
                ref={overlayRef}
                className="shadcn-dialog-overlay"
                style={overlayStyle}
                onClick={(e) => {
                    if (e.target === e.currentTarget && closeOnOverlayClick) {
                        hide();
                    }
                }}
            >
                <div
                    ref={contentRef}
                    className={contentClasses.join(" ")}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={title ? "shadcn-dialog-title" : undefined}
                    aria-describedby={description ? "shadcn-dialog-desc" : undefined}
                    style={contentStyle}
                >
                    {showHeader && (
                        <header className="shadcn-dialog-header">
                            {header ?? (
                                <>
                                    <h2 id="shadcn-dialog-title" className="shadcn-dialog-title">
                                        {title}
                                    </h2>
                                    {description && (
                                        <p id="shadcn-dialog-desc" className="shadcn-dialog-description">
                                            {description}
                                        </p>
                                    )}
                                </>
                            )}
                            {closeable && (
                                <button
                                    type="button"
                                    className="shadcn-dialog-close"
                                    aria-label="Fechar"
                                    onClick={hide}
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
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            )}
                        </header>
                    )}

                    <div className={bodyClasses.join(" ")}>{children}</div>

                    {footerContent != null && footerContent !== false && (
                        <footer className={footerClasses.join(" ")}>{footerContent}</footer>
                    )}
                </div>
            </div>,
            document.body
        );
    }
);
