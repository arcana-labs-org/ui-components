import { useEffect, useRef, useState, type FocusEvent } from "react";
import { mask as maskaMask, tokens as maskaTokens } from "maska";
import { DateFormatter } from "../core/date";

/**
 * `<ArcanaDatePicker>` — React port. Input de data shadcn com máscara `DD/MM/AAAA`.
 *
 * Decisão sobre o calendário (deps externas):
 * - O SFC Vue usa `<el-date-picker>` (Element Plus) APENAS como popover/âncora do
 *   calendário. No React NÃO temos Element Plus. Em vez de reimplementar um calendário
 *   completo (exigiria CSS novo, fora do escopo de reuso do CSS compartilhado), o
 *   calendário é provido pelo **date picker nativo do browser**: um `<input type="date">`
 *   escondido dentro do `__picker-anchor`, aberto pelo botão de ícone via `showPicker()`
 *   (fallback: focus+click). A digitação mascarada e a emissão de `YYYY-MM-DD` são
 *   IDÊNTICAS ao SFC; só o visual do calendário difere (nativo, não Element Plus).
 * - `type="date"` (default) usa esse composite. Outros types (`daterange`/`month`/`year`)
 *   caem num `<input>` nativo do tipo correspondente como fallback documentado (ranges
 *   nativos não existem → usa `type="date"`).
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change')` → `onChange`
 * - watch(modelValue) → `useEffect`
 */
export interface ArcanaDatePickerProps {
    value?: string | string[] | null;
    type?: string;
    disabled?: boolean;
    clearable?: boolean;
    editable?: boolean;
    placeholder?: string;
    size?: "sm" | "md" | "lg";
    onValueChange?: (value: string | null) => void;
    onChange?: (value: string | null) => void;
    onBlur?: (ev: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (ev: FocusEvent<HTMLInputElement>) => void;
    className?: string;
}

const DATE_MASK = "##/##/####";

export function ArcanaDatePicker({
    value = null,
    type = "date",
    disabled = false,
    placeholder = "",
    size = "md",
    onValueChange,
    onChange,
    onBlur,
    onFocus,
    className,
}: ArcanaDatePickerProps) {
    const isRange = String(type).includes("range");
    const isComposite = type === "date";

    const nativeType =
        type === "month" || type === "monthrange"
            ? "month"
            : type === "year" || type === "yearrange"
              ? "number"
              : "date";

    const toDisplay = (ymd: string): string => DateFormatter.fromDate(ymd) ?? "";

    const [displayText, setDisplayText] = useState<string>(() =>
        value && typeof value === "string" ? toDisplay(value) : ""
    );
    const lastEmitted = useRef<string | null>(
        typeof value === "string" ? value : null
    );
    const nativeRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!isComposite) return;
        const v = typeof value === "string" ? value : null;
        if (v !== lastEmitted.current) {
            lastEmitted.current = v;
            setDisplayText(v ? toDisplay(v) : "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const rawToYmd = (raw: string): string | undefined => {
        if (raw.length !== 8) return undefined;
        const d = raw.slice(0, 2),
            m = raw.slice(2, 4),
            y = raw.slice(4, 8);
        const dd = Number(d),
            mm = Number(m),
            yyyy = Number(y);
        if (mm < 1 || mm > 12 || dd < 1 || dd > 31 || yyyy < 1900) return undefined;
        const dt = new Date(yyyy, mm - 1, dd);
        if (
            dt.getFullYear() !== yyyy ||
            dt.getMonth() !== mm - 1 ||
            dt.getDate() !== dd
        )
            return undefined;
        return `${y}-${m}-${d}`;
    };

    const emitValue = (ymd: string | null) => {
        lastEmitted.current = ymd;
        onValueChange?.(ymd);
        onChange?.(ymd);
    };

    const onTextChange = (typed: string) => {
        const display = maskaMask(typed, DATE_MASK, maskaTokens);
        setDisplayText(display);
        const raw = maskaMask(typed, DATE_MASK, maskaTokens, false);
        if (raw.length === 0) {
            emitValue(null);
            return;
        }
        if (raw.length === 8) {
            const ymd = rawToYmd(raw);
            if (ymd) emitValue(ymd);
        }
    };

    const onTextBlur = (event: FocusEvent<HTMLInputElement>) => {
        onBlur?.(event);
        const raw = (displayText ?? "").replace(/\D/g, "");
        if (raw.length !== 8 || !rawToYmd(raw)) {
            setDisplayText(
                typeof value === "string" && value ? toDisplay(value) : ""
            );
        }
    };

    const openPicker = () => {
        if (disabled) return;
        const el = nativeRef.current;
        if (!el) return;
        // showPicker() abre o calendário nativo; fallback pra focus+click.
        if (typeof el.showPicker === "function") {
            try {
                el.showPicker();
                return;
            } catch {
                /* alguns browsers exigem interação; cai no fallback abaixo */
            }
        }
        el.focus();
        el.click();
    };

    const rootClasses = [
        "arcana-date-picker",
        disabled ? "is-disabled" : "",
        `arcana-date-picker--${size}`,
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    if (isComposite) {
        return (
            <div className={rootClasses}>
                <div className="arcana-date-picker__box">
                    <div
                        className="arcana-date-picker__picker-anchor"
                        aria-hidden="true"
                    >
                        <input
                            ref={nativeRef}
                            type="date"
                            value={typeof value === "string" ? value : ""}
                            disabled={disabled}
                            tabIndex={-1}
                            onChange={(e) => emitValue(e.target.value || null)}
                        />
                    </div>

                    <input
                        className="arcana-date-picker__text"
                        inputMode="numeric"
                        value={displayText}
                        placeholder="__/__/____"
                        disabled={disabled}
                        onChange={(e) => onTextChange(e.target.value)}
                        onBlur={onTextBlur}
                        onFocus={onFocus}
                    />

                    <button
                        type="button"
                        className="arcana-date-picker__icon-btn"
                        disabled={disabled}
                        aria-label="Abrir calendário"
                        onClick={openPicker}
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
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    // Fallback nativo pros demais types (ranges/month/year). Documentado: sem Element
    // Plus, ranges nativos não existem — usa um único input do tipo aproximado.
    return (
        <div className={rootClasses}>
            <input
                className="arcana-date-picker__text"
                type={nativeType}
                value={typeof value === "string" ? value : ""}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(e) => emitValue(e.target.value || null)}
                onBlur={onBlur}
                onFocus={onFocus}
            />
            {isRange ? null : null}
        </div>
    );
}
