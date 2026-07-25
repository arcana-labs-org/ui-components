import { useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react";

/**
 * `<ArcanaRate>` — React port. Avaliação por estrelas. Reproduz
 * `<div class="arcana-rate arcana-rate--md">` (+ `is-disabled`/`is-readonly`), cada
 * `<span class="arcana-rate__item" role="radio">` com as duas camadas
 * `__icon--void`/`__icon--filled` e o `__text`/`__score`, idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change')` → `onChange`
 * - `--arcana-rate-color` / `--arcana-rate-void-color` inline style preservados
 *
 * Acessibilidade (mesma escolha do SFC): `role="radiogroup"` + `role="radio"` com
 * tabindex rotativo, e não `<input type="radio">` escondido — inputs reais exigiriam
 * `name` único por instância (colisão em listas), dobrariam de quantidade com
 * `allowHalf` e criariam N pontos de parada no Tab. Setas movem de um passo
 * (`allowHalf ? 0.5 : 1`), `Home`/`End` vão aos extremos, e o foco acompanha.
 */
export type RateSize = "sm" | "md" | "lg";

export interface ArcanaRateProps {
    value?: number;
    max?: number;
    disabled?: boolean;
    /** Desliga a interação mantendo o contraste cheio — modo "exibir média". */
    readonly?: boolean;
    /** Meia estrela: clique/hover na metade esquerda vale `n - 0.5`; passo do teclado = `0.5`. */
    allowHalf?: boolean;
    showText?: boolean;
    /** Rótulo por nota — `texts[0]` é a nota 1, `texts[max - 1]` a nota `max`. */
    texts?: string[];
    /** Nota numérica. Mutuamente exclusivo com `showText`, que vence. */
    showScore?: boolean;
    /**
     * `"sm" | "md" | "lg"` (default `"md"`). Cada dimensão é uma custom property com
     * o valor do size como fallback (`--arcana-rate-icon-size`, `--arcana-rate-gap`,
     * `--arcana-rate-font-size`), então dá pra afinar via `style`/CSS.
     */
    size?: RateSize;
    /** Cor da estrela cheia. Default: token `--arcana-warning-solid`. */
    color?: string;
    /** Cor da estrela vazia. Default: degrau 6 da escala neutra. */
    voidColor?: string;
    ariaLabel?: string;
    onValueChange?: (value: number) => void;
    onChange?: (value: number) => void;
    className?: string;
}

const STAR_PATH =
    "M12 2.6l2.83 5.73 6.32.92-4.57 4.46 1.08 6.3L12 16.93l-5.66 2.98 1.08-6.3-4.57-4.46 6.32-.92z";

export function ArcanaRate({
    value = 0,
    max = 5,
    disabled = false,
    readonly = false,
    allowHalf = false,
    showText = false,
    texts = [],
    showScore = false,
    size = "md",
    color = "",
    voidColor = "",
    ariaLabel = "",
    onValueChange,
    onChange,
    className,
}: ArcanaRateProps) {
    // Nota sob o cursor (preview). `null` = nenhum hover em curso.
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);

    const isInert = disabled || readonly;
    const step = allowHalf ? 0.5 : 1;

    const safeValue = (() => {
        const v = Number(value);
        if (!Number.isFinite(v)) return 0;
        return Math.min(Math.max(v, 0), max);
    })();

    const displayValue = hoverValue ?? safeValue;

    // Índices 0-based das estrelas — a mesma lista nos 4 frameworks.
    const stars = Array.from({ length: Math.max(0, Math.floor(max)) }, (_, i) => i);

    /**
     * 0..100 — quanto da estrela `index` está preenchido. Arredondado a 2 casas porque
     * o valor vai para o `style` inline e `(4.3 - 4) * 100` em ponto flutuante daria
     * `30.000000000000027%`.
     */
    const fillPercent = (index: number) =>
        Math.round(Math.min(Math.max((displayValue - index) * 100, 0), 100) * 100) / 100;

    /**
     * Só UMA estrela fica `aria-checked` (é um radiogroup): a que CONTÉM a nota.
     * Com nota `0` nenhuma fica marcada; com `3.5` é a quarta (`ceil(3.5) = 4`).
     */
    const isChecked = (index: number) => Math.ceil(safeValue) === index + 1;

    const itemLabel = (index: number) => texts[index] || String(index + 1);

    /** Roving tabindex: um único ponto de parada no Tab. */
    const itemTabIndex = (index: number) => {
        if (isInert) return -1;
        const focusIndex = safeValue > 0 ? Math.ceil(safeValue) - 1 : 0;
        return index === focusIndex ? 0 : -1;
    };

    /** Nota apontada pelo cursor: metade esquerda vale `n - 0.5` quando `allowHalf`. */
    const valueFromPointer = (event: MouseEvent<HTMLSpanElement>, index: number) => {
        if (!allowHalf) return index + 1;
        const rect = event.currentTarget.getBoundingClientRect();
        if (!rect.width) return index + 1;
        return event.clientX - rect.left < rect.width / 2 ? index + 0.5 : index + 1;
    };

    const setValue = (next: number) => {
        if (isInert || next === safeValue) return;
        setHoverValue(null);
        onValueChange?.(next);
        onChange?.(next);
    };

    /** Move o foco para a estrela que passou a conter a nota (roving tabindex). */
    const focusStar = (next: number) => {
        const items = rootRef.current?.querySelectorAll<HTMLElement>(".arcana-rate__item");
        const target = items?.[Math.max(0, Math.ceil(next) - 1)];
        if (target) target.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (isInert) return;
        let next: number | null = null;

        if (event.key === "ArrowRight" || event.key === "ArrowUp") {
            next = Math.min(max, safeValue + step);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
            next = Math.max(0, safeValue - step);
        } else if (event.key === "Home") {
            next = step;
        } else if (event.key === "End") {
            next = max;
        }

        if (next === null) return;
        event.preventDefault();
        setValue(next);
        focusStar(next);
    };

    const rootStyle: CSSProperties = {};
    if (color) (rootStyle as Record<string, string>)["--arcana-rate-color"] = color;
    if (voidColor) (rootStyle as Record<string, string>)["--arcana-rate-void-color"] = voidColor;

    const currentText = (() => {
        const idx = Math.ceil(displayValue) - 1;
        return idx >= 0 ? texts[idx] ?? "" : "";
    })();

    const scoreText = allowHalf ? displayValue.toFixed(1) : String(displayValue);

    return (
        <div
            ref={rootRef}
            className={[
                "arcana-rate",
                `arcana-rate--${size}`,
                disabled ? "is-disabled" : "",
                readonly ? "is-readonly" : "",
                className ?? "",
            ]
                .filter(Boolean)
                .join(" ")}
            style={Object.keys(rootStyle).length ? rootStyle : undefined}
            role="radiogroup"
            aria-label={ariaLabel || undefined}
            aria-disabled={disabled || undefined}
            aria-readonly={readonly || undefined}
            onKeyDown={onKeyDown}
        >
            {stars.map((index) => (
                <span
                    key={index}
                    className="arcana-rate__item"
                    role="radio"
                    aria-checked={isChecked(index)}
                    aria-label={itemLabel(index)}
                    tabIndex={itemTabIndex(index)}
                    onClick={(event) => {
                        if (isInert) return;
                        setValue(valueFromPointer(event, index));
                    }}
                    onMouseMove={(event) => {
                        if (isInert) return;
                        setHoverValue(valueFromPointer(event, index));
                    }}
                    onMouseLeave={() => setHoverValue(null)}
                >
                    <span className="arcana-rate__icon arcana-rate__icon--void" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false">
                            <path d={STAR_PATH} />
                        </svg>
                    </span>
                    <span
                        className="arcana-rate__icon arcana-rate__icon--filled"
                        style={{ width: `${fillPercent(index)}%` }}
                        aria-hidden="true"
                    >
                        <svg viewBox="0 0 24 24" focusable="false">
                            <path d={STAR_PATH} />
                        </svg>
                    </span>
                </span>
            ))}

            {showText ? (
                <span className="arcana-rate__text">{currentText}</span>
            ) : showScore ? (
                <span className="arcana-rate__score">{scoreText}</span>
            ) : null}
        </div>
    );
}
