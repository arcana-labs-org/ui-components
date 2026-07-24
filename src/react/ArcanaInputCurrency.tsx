import {
    useEffect,
    useState,
    type FocusEvent,
    type KeyboardEvent,
    type ReactNode,
} from "react";
import { CurrencyFormatter } from "../core/currency";

/**
 * `<ArcanaInputCurrency>` — React port. Input de moeda BRL.
 *
 * Decisão sobre a lib (deps externas):
 * - O SFC usa `v-money3` (`<Money3Component>`), que é Vue-only (sem binding React).
 *   Em vez de adicionar uma dep React nova, reimplementamos a máscara de moeda
 *   equivalente (mesma UX right-to-left do v-money3: dígitos preenchem a partir dos
 *   centavos), mantendo markup/classes (`icur-arcana-field`/`icur-arcana-input` no modo
 *   shadcn; `input-group`/`form-control` no modo Bootstrap).
 * - Comportamento observável preservado: assim como o v-money3 no default do SFC (sem
 *   `masked:false`), o `modelValue` emitido é a STRING mascarada BRL (ex. `"1.234,56"`) —
 *   o mesmo formato que o SFC guarda. Formatação: milhar `.`, decimal `,`, `precision`
 *   casas (default 2), com `prefix` opcional.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change'|'enter'|'blur')`
 *   → `onChange`/`onEnter`/`onBlur`
 * - slots `#prepend`/`#append` → props `prepend`/`append` (ReactNode)
 */
export interface ArcanaInputCurrencyProps {
    value?: string | number;
    disabled?: boolean | number;
    allowBlank?: boolean;
    fraction?: number;
    name?: string;
    showIcon?: boolean;
    prefix?: string;
    icon?: string;
    max?: number;
    min?: number;
    formatCurrency?: boolean;
    shadcn?: boolean;
    prepend?: ReactNode;
    append?: ReactNode;
    onValueChange?: (value: string) => void;
    onChange?: (ev: unknown) => void;
    onEnter?: (ev: KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (ev: FocusEvent<HTMLInputElement>) => void;
    className?: string;
}

const DECIMAL = ",";
const THOUSANDS = ".";

function digitsFromValue(v: string | number | undefined, precision: number): string {
    if (v == null || v === "") return "";
    if (typeof v === "number") {
        return String(Math.round(Math.abs(v) * Math.pow(10, precision)));
    }
    const s = String(v);
    // String já mascarada (contém o separador decimal) → só os dígitos.
    if (s.includes(DECIMAL)) return s.replace(/\D/g, "");
    const n = parseFloat(s);
    if (!isFinite(n)) return s.replace(/\D/g, "");
    return String(Math.round(Math.abs(n) * Math.pow(10, precision)));
}

function formatDigits(
    digits: string,
    precision: number,
    prefix: string
): string {
    let d = digits.replace(/\D/g, "");
    if (!d) d = "0";
    if (precision > 0) d = d.padStart(precision + 1, "0");
    const cut = precision > 0 ? d.length - precision : d.length;
    let intPart = d.slice(0, cut).replace(/^0+(?=\d)/, "");
    const fracPart = precision > 0 ? d.slice(cut) : "";
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS);
    return prefix + intPart + (precision > 0 ? DECIMAL + fracPart : "");
}

export function ArcanaInputCurrency({
    value = "",
    disabled = false,
    fraction = 2,
    name,
    showIcon = true,
    prefix = "",
    icon = "icon-coin-dollar",
    formatCurrency = true,
    shadcn = false,
    prepend,
    append,
    onValueChange,
    onChange,
    onEnter,
    onBlur,
    className,
}: ArcanaInputCurrencyProps) {
    const isDisabled = Boolean(disabled);

    const [display, setDisplay] = useState<string>(() =>
        formatDigits(digitsFromValue(value, fraction), fraction, prefix)
    );

    // Reflete mudança externa do `value` no display (load/reset). Compara pelos dígitos.
    useEffect(() => {
        const incoming = digitsFromValue(value, fraction);
        const current = display.replace(/\D/g, "");
        if (incoming.replace(/^0+(?=\d)/, "") !== current.replace(/^0+(?=\d)/, "")) {
            setDisplay(formatDigits(incoming, fraction, prefix));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, fraction, prefix]);

    const formattedCurrency = formatCurrency
        ? CurrencyFormatter.format(value || 0)
        : value;

    const onInput = (raw: string) => {
        const digits = raw.replace(/\D/g, "");
        const formatted = formatDigits(digits, fraction, prefix);
        setDisplay(formatted);
        onValueChange?.(formatted);
    };

    const inputClasses = [
        shadcn ? "icur-arcana-input" : "form-control",
        shadcn && showIcon ? "has-icon" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const wrapClasses = shadcn
        ? ["icur-arcana-field", isDisabled ? "is-disabled" : ""]
              .filter(Boolean)
              .join(" ")
        : showIcon
          ? "input-group"
          : "";

    return (
        <div className={wrapClasses || undefined}>
            {prepend ?? (
                <>
                    {showIcon && !shadcn ? (
                        <span className="input-group-addon">
                            <i className={icon} />
                        </span>
                    ) : null}
                    {showIcon && shadcn ? (
                        <span className="icur-arcana-field__icon">
                            <i className={icon} />
                        </span>
                    ) : null}
                </>
            )}

            {!isDisabled ? (
                <input
                    type="text"
                    className={inputClasses}
                    name={name}
                    value={display}
                    onChange={(e) => onInput(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") onEnter?.(e);
                    }}
                    onBlur={(e) => {
                        // `emit('change')` do VueMoney dispara no change nativo (blur/enter).
                        onChange?.(display);
                        onBlur?.(e);
                    }}
                />
            ) : (
                <input
                    disabled
                    className={[
                        shadcn ? "icur-arcana-input" : "form-control",
                        shadcn && showIcon ? "has-icon" : "",
                        "full-width",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    type="text"
                    value={String(formattedCurrency)}
                    readOnly
                />
            )}

            {append}
        </div>
    );
}
