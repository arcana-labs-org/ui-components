import type { CSSProperties, ReactNode, Ref } from "react";

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";
export type ScrollAreaType = "auto" | "always" | "hover";

/**
 * `<ArcanaScrollArea>` — React port. Área rolável com barra estilizada. Reproduz
 * `<div class="arcana-scroll-area arcana-scroll-area--vertical arcana-scroll-area--type-auto">`
 * + `.arcana-scroll-area__viewport`, idêntico ao SFC Vue.
 *
 * A rolagem é **NATIVA**: o componente só pinta a barra (`::-webkit-scrollbar` no
 * Chrome/Safari/Edge + `scrollbar-width`/`scrollbar-color` no Firefox) e limita a
 * altura do viewport. NÃO reimplementamos scroll em JS (translate no conteúdo +
 * polegar sintético) de propósito: assim o teclado (setas, PageUp/PageDown,
 * Home/End, Space), o touch com inércia, o scroll anchoring, o `scrollIntoView` e
 * os leitores de tela continuam funcionando de graça.
 */
export interface ArcanaScrollAreaProps {
    /** Eixos liberados. Default `"vertical"` (o outro eixo fica `overflow: hidden`). */
    orientation?: ScrollAreaOrientation;
    /** Altura fixa do viewport. `number` = px; string = valor CSS cru. */
    height?: number | string | null;
    /** Altura máxima do viewport. `number` = px; string = valor CSS cru. */
    maxHeight?: number | string | null;
    /** Espessura da barra em px (WebKit; no Firefox a espessura é `thin`). Default `10`. */
    scrollbarSize?: number;
    /**
     * `"auto"` (default): barra nativa, aparece quando há transbordo;
     * `"always"`: `overflow: scroll`, calha sempre reservada;
     * `"hover"`: polegar transparente em repouso, pintado no hover/foco.
     */
    type?: ScrollAreaType;
    /** Atraso do auto-ocultar (ms) — só tem efeito com `type="hover"`. Default `500`. */
    hideDelay?: number;
    /** `tabindex={0}` no viewport pra rolar por teclado sem foco interno. Default `true`. */
    tabbable?: boolean;
    /** Acesso ao elemento que realmente rola (para `scrollTo`, `scrollTop`, …). */
    viewportRef?: Ref<HTMLDivElement>;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

/** `number` vira px; string passa crua; `null`/`""` some. */
function toCssLength(value: number | string | null | undefined): string | undefined {
    if (value === null || value === undefined || value === "") return undefined;
    return typeof value === "number" ? `${value}px` : String(value);
}

export function ArcanaScrollArea({
    orientation = "vertical",
    height = null,
    maxHeight = null,
    scrollbarSize = 10,
    type = "auto",
    hideDelay = 500,
    tabbable = true,
    viewportRef,
    children,
    className,
    style,
}: ArcanaScrollAreaProps) {
    const rootStyle = {
        "--arcana-scroll-area-size": `${scrollbarSize}px`,
        "--arcana-scroll-area-hide-delay": `${hideDelay}ms`,
        ...style,
    } as CSSProperties;

    const viewportStyle: CSSProperties = {
        height: toCssLength(height),
        maxHeight: toCssLength(maxHeight),
    };

    return (
        <div
            className={[
                "arcana-scroll-area",
                `arcana-scroll-area--${orientation}`,
                `arcana-scroll-area--type-${type}`,
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            style={rootStyle}
        >
            <div
                ref={viewportRef}
                className="arcana-scroll-area__viewport"
                style={viewportStyle}
                tabIndex={tabbable ? 0 : undefined}
            >
                {children}
            </div>
        </div>
    );
}
