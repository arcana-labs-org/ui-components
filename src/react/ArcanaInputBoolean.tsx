import { useMemo } from "react";
import { ArcanaSelect, type SelectOption } from "./ArcanaSelect";

/**
 * `<ArcanaInputBoolean>` — React port. Renderiza um `<ArcanaSelect>` com opções
 * Sim/Não (ou Ativo/Inativo, ou IS_NOT_NULL/IS_NULL) + "Todos" opcional, idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change')` → `onChange`
 * - `normalizedValue`/`onChange` preservados
 */
export interface ArcanaInputBooleanProps {
    value?: unknown;
    variation?: "" | "status" | "nullable" | string;
    disabled?: boolean | number;
    clearable?: boolean;
    placeholder?: string;
    onValueChange?: (value: unknown) => void;
    onChange?: (value: unknown) => void;
    className?: string;
}

export function ArcanaInputBoolean({
    value,
    variation = "",
    disabled = false,
    clearable = true,
    placeholder = "Selecione…",
    onValueChange,
    onChange,
    className,
}: ArcanaInputBooleanProps) {
    const yesText = variation === "status" ? "Ativo" : "Sim";
    const noText = variation === "status" ? "Inativo" : "Não";
    const yesValue: string | number = variation === "nullable" ? "IS_NOT_NULL" : 1;
    const noValue: string | number = variation === "nullable" ? "IS_NULL" : 0;

    const options = useMemo<SelectOption[]>(() => {
        const opts: SelectOption[] = [
            { label: yesText, value: yesValue },
            { label: noText, value: noValue },
        ];
        if (clearable) opts.unshift({ label: "Todos", value: null });
        return opts;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variation, clearable]);

    const normalizedValue = useMemo<unknown>(() => {
        if (value === true) return variation === "nullable" ? "IS_NOT_NULL" : 1;
        if (value === false) return variation === "nullable" ? "IS_NULL" : 0;
        return value;
    }, [value, variation]);

    const handleChange = (v: unknown) => {
        onValueChange?.(v);
        onChange?.(v);
    };

    return (
        <ArcanaSelect
            value={normalizedValue}
            options={options}
            disabled={Boolean(disabled)}
            placeholder={placeholder}
            onValueChange={handleChange}
            className={className}
        />
    );
}
