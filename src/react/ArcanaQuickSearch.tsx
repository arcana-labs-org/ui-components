import {
    forwardRef,
    useCallback,
    useId,
    useImperativeHandle,
    useRef,
    useState,
    type ChangeEvent,
    type KeyboardEvent,
} from "react";

/**
 * `<ArcanaQuickSearch>` — React port. Campo de busca compacto com dica dos campos
 * pesquisáveis e contador opcional de resultados. Reproduz
 * `<div class="arcana-quick-search">` (+ `is-disabled`/`has-counter`), o
 * `__info`/`__hint` (só quando `searchFields.length`), o `__icon`, o `__input`, o
 * `__clear` e o `__counter` (só quando `counter != null`), idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange(value)`; sem `value` controlado,
 *   mantém buffer interno (`useState`) — funciona não-controlado também
 * - `emit('search', value)` / `emit('clear')` → `onSearch(value)` / `onClear()`
 * - métodos `reset()/focus()` → handle via `ref` (`ArcanaQuickSearchHandle`)
 * - `uid` (contador módulo) do Vue → `useId()`
 */
export interface ArcanaQuickSearchHandle {
    /** Zera o texto sem emitir `search` (só `onValueChange`). */
    reset: () => void;
    /** Foca o `<input>`. */
    focus: () => void;
}

export interface ArcanaQuickSearchProps {
    /** Texto da busca. Sem valor controlado, o componente mantém buffer interno. */
    value?: string;
    placeholder?: string;
    /** Lista de campos pesquisáveis; quando vazia, o gatilho de dica nem é renderizado. */
    searchFields?: string[];
    fieldsLabel?: string;
    /** Número (ou string) de resultados; `null`/`undefined` esconde o pill. */
    counter?: number | string | null;
    unit?: string;
    hideUnit?: boolean;
    disabled?: boolean;
    clearLabel?: string;
    onValueChange?: (value: string) => void;
    /** Ao pressionar Enter, ou ao limpar (com `''`). */
    onSearch?: (value: string) => void;
    onClear?: () => void;
    className?: string;
}

export const ArcanaQuickSearch = forwardRef<ArcanaQuickSearchHandle, ArcanaQuickSearchProps>(
    function ArcanaQuickSearch(
        {
            value,
            placeholder = "",
            searchFields = [],
            fieldsLabel = "Campos pesquisáveis:",
            counter = null,
            unit = "registro(s)",
            hideUnit = false,
            disabled = false,
            clearLabel = "Limpar busca",
            onValueChange,
            onSearch,
            onClear,
            className,
        },
        ref
    ) {
        const [internalText, setInternalText] = useState(value ?? "");
        const isControlled = value !== undefined;
        const text = isControlled ? value : internalText;

        const inputRef = useRef<HTMLInputElement>(null);
        const hintId = `arcana-qs-${useId()}`;

        const setText = useCallback(
            (next: string) => {
                if (!isControlled) setInternalText(next);
                onValueChange?.(next);
            },
            [isControlled, onValueChange]
        );

        const onInput = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                setText(e.target.value);
            },
            [setText]
        );

        const search = useCallback(
            (current: string) => {
                onSearch?.(current);
            },
            [onSearch]
        );

        const onKeyUp = useCallback(
            (e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") search(text);
            },
            [search, text]
        );

        const clear = useCallback(() => {
            setText("");
            onClear?.();
            search("");
        }, [setText, onClear, search]);

        useImperativeHandle(
            ref,
            () => ({
                reset: () => setText(""),
                focus: () => inputRef.current?.focus(),
            }),
            [setText]
        );

        const rootClasses = [
            "arcana-quick-search",
            disabled ? "is-disabled" : "",
            counter != null ? "has-counter" : "",
            className ?? "",
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <div className={rootClasses}>
                {searchFields.length ? (
                    <div className="arcana-quick-search__info" role="button" tabIndex={0}>
                        <svg
                            className="arcana-quick-search__info-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx={12} cy={12} r={10} />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                        <div id={hintId} className="arcana-quick-search__hint" role="tooltip">
                            <span className="arcana-quick-search__hint-label">{fieldsLabel}</span>
                            <ul className="arcana-quick-search__hint-list">
                                {searchFields.map((field) => (
                                    <li key={field} className="arcana-quick-search__hint-item">
                                        {field}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : null}

                <svg
                    className="arcana-quick-search__icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx={11} cy={11} r={8} />
                    <path d="m21 21-4.3-4.3" />
                </svg>

                <input
                    ref={inputRef}
                    className="arcana-quick-search__input"
                    type="text"
                    value={text}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-describedby={searchFields.length ? hintId : undefined}
                    onChange={onInput}
                    onKeyUp={onKeyUp}
                />

                <button
                    type="button"
                    className="arcana-quick-search__clear"
                    aria-label={clearLabel}
                    title={clearLabel}
                    onClick={clear}
                >
                    <svg
                        width={12}
                        height={12}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx={12} cy={12} r={10} />
                        <path d="m15 9-6 6" />
                        <path d="m9 9 6 6" />
                    </svg>
                </button>

                {counter != null ? (
                    <div className="arcana-quick-search__counter">
                        <span className="arcana-quick-search__counter-value">{counter}</span>
                        {!hideUnit ? (
                            <span className="arcana-quick-search__counter-unit">{unit}</span>
                        ) : null}
                    </div>
                ) : null}
            </div>
        );
    }
);
