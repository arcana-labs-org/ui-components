import type { CSSProperties, ReactNode } from "react";

/**
 * `<ArcanaAspectRatio>` — React port. Mantém a proporção do conteúdo (imagem,
 * vídeo, iframe, mapa…) independentemente da largura disponível. Reproduz
 * `<div class="arcana-aspect-ratio"><div class="arcana-aspect-ratio__content">`,
 * idêntico ao SFC Vue.
 *
 * Implementação SEM JavaScript: a razão vira o custom property inline
 * `--arcana-aspect-ratio` e quem faz o trabalho é a propriedade `aspect-ratio`
 * do CSS (a lib mira browsers modernos — nada de padding-hack nem
 * `ResizeObserver`). Os `children` são envolvidos por `__content`, que preenche
 * 100% da caixa; mídia direta recebe `object-fit: cover` (ajustável por
 * `--arcana-aspect-ratio-fit`).
 */
export interface ArcanaAspectRatioProps {
    /** Largura ÷ altura. Default `16 / 9`; valores não-finitos ou ≤ 0 caem no default. */
    ratio?: number;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

const DEFAULT_RATIO = 16 / 9;

export function ArcanaAspectRatio({
    ratio = DEFAULT_RATIO,
    children,
    className,
    style,
}: ArcanaAspectRatioProps) {
    // Blinda contra `0`, negativos e `NaN` (que quebrariam o layout inteiro).
    const safeRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : DEFAULT_RATIO;

    const rootStyle = {
        "--arcana-aspect-ratio": String(safeRatio),
        ...style,
    } as CSSProperties;

    return (
        <div
            className={["arcana-aspect-ratio", className].filter(Boolean).join(" ")}
            style={rootStyle}
        >
            <div className="arcana-aspect-ratio__content">{children}</div>
        </div>
    );
}
