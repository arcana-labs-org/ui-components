import { useMemo, useRef, useState, type ReactNode } from "react";
import { ShadcnSettingsListItem } from "./ShadcnSettingsList";
import {
    ShadcnEditFieldModal,
    type ShadcnEditFieldModalHandle,
} from "./ShadcnEditFieldModal";
import { ShadcnInput } from "./ShadcnInput";
import { ShadcnSelect } from "./ShadcnSelect";
import { InputCurrency } from "./InputCurrency";
import { CurrencyFormatter } from "../core/currency";

/**
 * `<ShadcnSettingsEditableField>` — React port do SFC Vue. Item smart de
 * `<ShadcnSettingsList>` que combina display read-only + botão "Alterar" + modal de
 * edição (`<ShadcnEditFieldModal>`) numa única tag.
 *
 * Equivalências Vue → React:
 * - `v-model` (`modelValue`) → `value` + `onValueChange`; `emit('save')` → `onSave`
 * - buffer (`bufferValue`) snapshotado ao abrir; cancelar descarta; salvar emite
 *   `onValueChange(buffer)` + `onSave(buffer)` e fecha (idêntico ao SFC)
 * - `<Teleport>` do modal → o próprio `<ShadcnEditFieldModal>` React já usa portal
 *
 * FormGroup: o SFC referencia um `<FormGroup>` GLOBAL do app host (não importado
 * localmente). No port, o wrapper de campo é REIMPLEMENTADO minimamente (label + input,
 * classe `demo-form-group` — mesma do stub usado na docs). Passe a render-prop
 * `formGroup` pra substituir por um wrapper próprio (kit de form do app consumidor).
 */
interface SelectOption {
    label: string;
    value: string | number | boolean | null;
}

export interface ShadcnSettingsEditableFieldProps {
    value?: string | number | boolean | null;
    label: string;
    caption?: string;
    type?: "text" | "currency" | "number" | "select";
    options?: SelectOption[];
    disabled?: boolean;
    nested?: boolean;
    displayFormatter?: (value: unknown) => string;
    modalTitle?: string;
    modalDescription?: string;
    inputLabel?: string;
    inputPlaceholder?: string;
    min?: number | string;
    max?: number | string;
    emptyText?: string;
    /** Substitui o `#label` slot do item (HTML custom com badge etc). */
    labelSlot?: ReactNode;
    /** Wrapper do campo dentro do modal. Default: label + input (classe `demo-form-group`). */
    formGroup?: (opts: { label: string; children: ReactNode }) => ReactNode;
    onValueChange?: (value: string | number | boolean | null) => void;
    onSave?: (value: string | number | boolean | null) => void;
}

function defaultFormGroup({ label, children }: { label: string; children: ReactNode }): ReactNode {
    return (
        <div className="demo-form-group">
            {label && <label className="demo-form-group__label">{label}</label>}
            {children}
        </div>
    );
}

export function ShadcnSettingsEditableField({
    value = null,
    label,
    caption = "",
    type = "text",
    options = [],
    disabled = false,
    nested = false,
    displayFormatter,
    modalTitle = "",
    modalDescription = "",
    inputLabel = "",
    inputPlaceholder = "",
    min,
    max,
    emptyText = "Não definido",
    labelSlot,
    formGroup = defaultFormGroup,
    onValueChange,
    onSave,
}: ShadcnSettingsEditableFieldProps) {
    const modalRef = useRef<ShadcnEditFieldModalHandle | null>(null);
    const [bufferValue, setBufferValue] = useState<string | number | boolean | null>(null);

    const isEmpty = value === null || value === undefined || value === "";

    const displayValue = useMemo(() => {
        if (isEmpty) return emptyText;
        if (displayFormatter) return displayFormatter(value);
        if (type === "currency") return CurrencyFormatter.format(value as number);
        if (type === "select") {
            const opt = options.find((o) => o.value === value);
            return opt?.label ?? String(value);
        }
        return String(value);
    }, [isEmpty, emptyText, displayFormatter, type, value, options]);

    const valueClasses = ["shadcn-settings-list__current-value"];
    if (isEmpty) valueClasses.push("shadcn-settings-list__current-value--empty");

    const resolvedModalTitle = modalTitle || `Alterar ${label}`;
    const resolvedInputLabel = inputLabel || label;

    const openModal = () => {
        setBufferValue(value);
        modalRef.current?.show();
    };

    const handleSave = () => {
        onValueChange?.(bufferValue);
        onSave?.(bufferValue);
        modalRef.current?.hide();
    };

    let input: ReactNode = null;
    if (type === "text") {
        input = (
            <ShadcnInput
                value={bufferValue as string | number | null}
                placeholder={inputPlaceholder}
                onValueChange={(v) => setBufferValue(v)}
            />
        );
    } else if (type === "currency") {
        input = (
            <InputCurrency
                value={bufferValue as string | number}
                onValueChange={(v) => setBufferValue(v)}
            />
        );
    } else if (type === "number") {
        input = (
            <ShadcnInput
                value={bufferValue as string | number | null}
                type="number"
                min={min}
                max={max}
                placeholder={inputPlaceholder}
                onValueChange={(v) => setBufferValue(v)}
            />
        );
    } else if (type === "select") {
        input = (
            <ShadcnSelect
                value={bufferValue}
                options={options}
                onValueChange={(v) => setBufferValue(v as string | number | boolean | null)}
            />
        );
    }

    return (
        <ShadcnSettingsListItem
            label={labelSlot ?? label}
            caption={caption}
            disabled={disabled}
            nested={nested}
        >
            <span className={valueClasses.join(" ")}>{displayValue}</span>
            <button
                className="shadcn-settings-list__edit-btn"
                type="button"
                disabled={disabled}
                onClick={openModal}
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
                Alterar
            </button>

            <ShadcnEditFieldModal
                ref={modalRef}
                title={resolvedModalTitle}
                description={modalDescription}
                onSave={handleSave}
            >
                {formGroup({ label: resolvedInputLabel, children: input })}
            </ShadcnEditFieldModal>
        </ShadcnSettingsListItem>
    );
}
