import type { ReactNode } from "react";
import { ArcanaRadioIndicator } from "./ArcanaRadioIndicator";

/**
 * `<ArcanaRadio>` — React port. Radio button único: `<input type="radio">` nativo
 * (escondido visualmente, mas focável) + `<ArcanaRadioIndicator>` + label opcional,
 * idêntico ao SFC Vue.
 *
 * Grupo se forma como no HTML: vários `<ArcanaRadio>` com o mesmo `name` e um estado
 * compartilhado. Fica marcado quando `groupValue === value`. Pra listas ricas (ícone,
 * descrição, badge) use `<ArcanaRadioCardGroup>`.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `groupValue` (valor selecionado do grupo) + `onChange`
 * - `value` — valor desta opção. `checked` explícito vence `groupValue === value`.
 * - slot default → `children` (fallback pro `label`)
 * - `emit('change')` → `onChange` (recebe o `value` desta opção)
 */
export interface ArcanaRadioProps {
    /** Força o estado marcado (alternativa a `groupValue`/`value`). */
    checked?: boolean;
    /** Valor desta opção. */
    value?: string | number | boolean | null;
    /** Valor selecionado do grupo; marcado quando `groupValue === value`. */
    groupValue?: string | number | boolean | null;
    /** `name` HTML do grupo de radios. */
    name?: string;
    disabled?: boolean;
    /** Texto do label (ou use `children` pra conteúdo custom). */
    label?: string;
    size?: "sm" | "md" | "lg";
    tone?: "solid" | "on-solid";
    onChange?: (value: string | number | boolean | null | undefined) => void;
    className?: string;
    children?: ReactNode;
}

export function ArcanaRadio({
    checked,
    value,
    groupValue,
    name,
    disabled = false,
    label = "",
    size = "md",
    tone = "solid",
    onChange,
    className,
    children,
}: ArcanaRadioProps) {
    /**
     * `checked` explícito tem prioridade; senão deriva de `groupValue === value`.
     * Permite tanto o uso controlado por grupo quanto o standalone.
     */
    const isChecked =
        checked !== undefined
            ? checked
            : groupValue !== undefined && groupValue === value;

    const rootClasses = [
        "arcana-radio",
        isChecked ? "is-checked" : "",
        disabled ? "is-disabled" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const handleChange = () => {
        if (disabled) return;
        onChange?.(value);
    };

    return (
        <label className={rootClasses}>
            <input
                type="radio"
                className="arcana-radio__input"
                name={name}
                value={value === null || value === undefined ? undefined : String(value)}
                checked={isChecked}
                disabled={disabled}
                onChange={handleChange}
            />
            <ArcanaRadioIndicator
                checked={isChecked}
                disabled={disabled}
                size={size}
                tone={tone}
            />
            {label || children ? (
                <span className="arcana-radio__label">{children ?? label}</span>
            ) : null}
        </label>
    );
}
