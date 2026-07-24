import { useEffect, useState, type FocusEvent } from "react";
import { mask as maskaMask, tokens as maskaTokens } from "maska";

/**
 * `<ArcanaInputMask>` — React port. Input mascarado shadcn (`class="arcana-input"` +
 * `arcana-input--${size}`/`--disabled`), idêntico ao SFC.
 *
 * Decisão sobre a máscara (deps externas):
 * - O SFC usa a diretiva Vue `v-maska`, que não existe no React. Em vez de reimplementar
 *   a máscara, reusamos as funções CORE da própria lib `maska` (`mask`/`tokens`), já
 *   instalada e agnóstica de framework:
 *   - display formatado  = `mask(raw, maskStr, tokens)`            (masked = true)
 *   - raw sem separadores = `mask(raw, maskStr, tokens, false)`   (masked = false)
 *   O `false` no 4º argumento devolve exatamente o `maskRawValue` que a diretiva injeta
 *   no DOM — então o valor emitido é o MESMO do SFC (sem pontos/traços).
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange` (sempre o raw value)
 * - `emit('blur'|'focus')` → `onBlur`/`onFocus`
 * - watch(modelValue) → `useEffect` que re-aplica a máscara em mudança externa
 */
export interface ArcanaInputMaskProps {
    value?: string | number | null;
    mask: string | string[];
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    name?: string;
    size?: "sm" | "md" | "lg";
    onValueChange?: (value: string) => void;
    onBlur?: (ev: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (ev: FocusEvent<HTMLInputElement>) => void;
    className?: string;
}

function normalizeMask(mask: string | string[]): string {
    // `maska` aceita string única ou array stringificado (máscara dinâmica por tamanho).
    return Array.isArray(mask) ? JSON.stringify(mask) : mask;
}

export function ArcanaInputMask({
    value = "",
    mask,
    placeholder = "",
    disabled = false,
    readonly = false,
    name,
    size = "md",
    onValueChange,
    onBlur,
    onFocus,
    className,
}: ArcanaInputMaskProps) {
    const maskStr = normalizeMask(mask);

    // `tempValue` (display mascarado) ≠ raw emitido — igual ao SFC.
    const [tempValue, setTempValue] = useState<string>(() =>
        value ? maskaMask(String(value), maskStr, maskaTokens) : ""
    );

    // Re-aplica a máscara quando o pai muda `value` (load/reset). Compara com o raw
    // atual do display pra evitar reformatar durante a própria digitação.
    useEffect(() => {
        const incoming = value == null ? "" : String(value);
        const currentRaw = tempValue
            ? maskaMask(tempValue, maskStr, maskaTokens, false)
            : "";
        if (incoming !== currentRaw) {
            setTempValue(incoming ? maskaMask(incoming, maskStr, maskaTokens) : "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, maskStr]);

    const rootClasses = [
        "arcana-input",
        `arcana-input--${size}`,
        disabled ? "arcana-input--disabled" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <input
            className={rootClasses}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            name={name}
            value={tempValue}
            onChange={(e) => {
                const typed = e.target.value;
                const display = maskaMask(typed, maskStr, maskaTokens);
                const raw = maskaMask(typed, maskStr, maskaTokens, false);
                setTempValue(display);
                onValueChange?.(raw);
            }}
            onBlur={onBlur}
            onFocus={onFocus}
        />
    );
}
