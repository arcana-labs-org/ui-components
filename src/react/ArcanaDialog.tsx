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
 * `<ArcanaDialog>` — React port do SFC Vue. Modal arcana-style com API imperativa
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
 * A transição fade+zoom do Vue (`<transition name="arcana-dialog">`) é omitida — o
 * markup/classes de conteúdo são idênticos, só a animação de entrada/saída não é
 * replicada (mesma decisão dos outros ports com Teleport/Transition).
 */
export type ArcanaDialogSize = "sm" | "md" | "lg" | "xl" | "full" | number;

export interface ArcanaDialogHandle {
    show: () => void;
    hide: () => void;
}

export interface ArcanaDialogProps {
    title?: string;
    description?: string;
    size?: ArcanaDialogSize;
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

function resolveMaxWidth(size: ArcanaDialogSize): string {
    if (typeof size === "number") return `${size}px`;
    return SIZE_PRESETS[size] ?? SIZE_PRESETS.md;
}

export const ArcanaDialog = forwardRef<ArcanaDialogHandle, ArcanaDialogProps>(
    function ArcanaDialog(
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
        const contentClasses = ["arcana-dialog-content"];
        if (fullHeight) contentClasses.push("arcana-dialog-content--full-height");
        if (contentClass) contentClasses.push(contentClass);

        const bodyClasses = ["arcana-dialog-body"];
        if (noBodyPadding) bodyClasses.push("arcana-dialog-body--no-padding");
        if (!bodyScrollable) bodyClasses.push("arcana-dialog-body--no-scroll");

        const footerClasses = ["arcana-dialog-footer"];
        if (flatFooter) footerClasses.push("arcana-dialog-footer--flat");

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
                className="arcana-dialog-overlay"
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
                    aria-labelledby={title ? "arcana-dialog-title" : undefined}
                    aria-describedby={description ? "arcana-dialog-desc" : undefined}
                    style={contentStyle}
                >
                    {showHeader && (
                        <header className="arcana-dialog-header">
                            {header ?? (
                                <>
                                    <h2 id="arcana-dialog-title" className="arcana-dialog-title">
                                        {title}
                                    </h2>
                                    {description && (
                                        <p id="arcana-dialog-desc" className="arcana-dialog-description">
                                            {description}
                                        </p>
                                    )}
                                </>
                            )}
                            {closeable && (
                                <button
                                    type="button"
                                    className="arcana-dialog-close"
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
