/**
 * `<ShadcnLoadingOverlay>` — React port. Overlay de carregamento (spinner + texto).
 * Reproduz `<div class="shadcn-loading-overlay">` (com `__box`/`__spinner`/`__text`),
 * idêntico ao SFC. A `<transition>` de fade do Vue é omitida — o overlay
 * monta/desmonta direto conforme `visible`.
 */
export interface ShadcnLoadingOverlayProps {
    visible?: boolean;
    text?: string;
    className?: string;
}

export function ShadcnLoadingOverlay({
    visible = false,
    text = "Carregando…",
    className,
}: ShadcnLoadingOverlayProps) {
    if (!visible) return null;

    return (
        <div
            className={["shadcn-loading-overlay", className ?? ""]
                .filter(Boolean)
                .join(" ")}
            role="status"
            aria-live="polite"
        >
            <div className="shadcn-loading-overlay__box">
                <span className="shadcn-loading-overlay__spinner" aria-hidden="true" />
                <span className="shadcn-loading-overlay__text">{text}</span>
            </div>
        </div>
    );
}
