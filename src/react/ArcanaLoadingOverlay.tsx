/**
 * `<ArcanaLoadingOverlay>` — React port. Overlay de carregamento (spinner + texto).
 * Reproduz `<div class="arcana-loading-overlay">` (com `__box`/`__spinner`/`__text`),
 * idêntico ao SFC. A `<transition>` de fade do Vue é omitida — o overlay
 * monta/desmonta direto conforme `visible`.
 */
export interface ArcanaLoadingOverlayProps {
    visible?: boolean;
    text?: string;
    className?: string;
}

export function ArcanaLoadingOverlay({
    visible = false,
    text = "Carregando…",
    className,
}: ArcanaLoadingOverlayProps) {
    if (!visible) return null;

    return (
        <div
            className={["arcana-loading-overlay", className ?? ""]
                .filter(Boolean)
                .join(" ")}
            role="status"
            aria-live="polite"
        >
            <div className="arcana-loading-overlay__box">
                <span className="arcana-loading-overlay__spinner" aria-hidden="true" />
                <span className="arcana-loading-overlay__text">{text}</span>
            </div>
        </div>
    );
}
