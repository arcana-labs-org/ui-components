import { useEffect, useRef, type FocusEvent, type KeyboardEvent } from "react";

/**
 * `<ShadcnInput>` — React port. `<input class="shadcn-input shadcn-input--${size}">`
 * (+ `shadcn-input--disabled`), idêntico ao SFC Vue.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` (controlado) + `onValueChange` (dispara a cada
 *   digitação; equivale ao `emit('update:modelValue')`)
 * - `emit('change')` (evento `change` nativo — blur/enter) → `onChange` (fixado via
 *   listener DOM real, preservando a semântica Vue)
 * - `blur`/`focus`/`keydown`/`keyup` → `onBlur`/`onFocus`/`onKeyDown`/`onKeyUp`
 *
 * Pra `type="number"`, converte string vazia → null e valor válido → number (mesmo
 * `parseValue` do Vue).
 */
export interface ShadcnInputProps {
    value?: string | number | null;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    maxlength?: string | number;
    autocomplete?: string;
    name?: string;
    size?: "sm" | "md" | "lg";
    onValueChange?: (value: string | number | null) => void;
    onChange?: (value: string | number | null) => void;
    onBlur?: (ev: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (ev: FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (ev: KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (ev: KeyboardEvent<HTMLInputElement>) => void;
    className?: string;
}

export function ShadcnInput({
    value = "",
    type = "text",
    placeholder = "",
    disabled = false,
    readonly = false,
    min,
    max,
    step,
    maxlength,
    autocomplete,
    name,
    size = "md",
    onValueChange,
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    onKeyUp,
    className,
}: ShadcnInputProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const parseValue = (raw: string): string | number | null => {
        if (type !== "number") return raw;
        if (raw === "" || raw === null || raw === undefined) return null;
        const n = Number(raw);
        return Number.isNaN(n) ? raw : n;
    };

    // Evento `change` nativo (dispara em blur/enter, não a cada tecla). React não
    // expõe esse evento — só o `input` (mapeado ao seu `onChange`). Anexamos direto
    // ao DOM pra manter a semântica do `emit('change')` do Vue.
    useEffect(() => {
        const el = inputRef.current;
        if (!el) return;
        const handler = (e: Event) => {
            const target = e.target as HTMLInputElement;
            onChange?.(parseValue(target.value));
        };
        el.addEventListener("change", handler);
        return () => el.removeEventListener("change", handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, onChange]);

    const rootClasses = [
        "shadcn-input",
        `shadcn-input--${size}`,
        disabled ? "shadcn-input--disabled" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <input
            ref={inputRef}
            type={type}
            value={value ?? ""}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            min={min}
            max={max}
            step={step}
            maxLength={maxlength as number | undefined}
            autoComplete={autocomplete}
            name={name}
            className={rootClasses}
            onChange={(e) => onValueChange?.(parseValue(e.target.value))}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
        />
    );
}
