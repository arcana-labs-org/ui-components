import { useMemo, useRef, useState, type ReactNode } from "react";
import { ArcanaSettingsListItem } from "./ArcanaSettingsList";
import {
    ArcanaEditFieldDialog,
    type ArcanaEditFieldDialogHandle,
} from "./ArcanaEditFieldDialog";
import { ArcanaInput } from "./ArcanaInput";
import { ArcanaSelect } from "./ArcanaSelect";
import { ArcanaInputCurrency } from "./ArcanaInputCurrency";
import { CurrencyFormatter } from "../core/currency";

/**
 * `<ArcanaSettingsEditableField>` — React port do SFC Vue. Item smart de
 * `<ArcanaSettingsList>` que combina display read-only + botão "Alterar" + modal de
 * edição (`<ArcanaEditFieldDialog>`) numa única tag.
 *
 * Equivalências Vue → React:
 * - `v-model` (`modelValue`) → `value` + `onValueChange`; `emit('save')` → `onSave`
 * - buffer (`bufferValue`) snapshotado ao abrir; cancelar descarta; salvar emite
 *   `onValueChange(buffer)` + `onSave(buffer)` e fecha (idêntico ao SFC)
 * - `<Teleport>` do modal → o próprio `<ArcanaEditFieldDialog>` React já usa portal
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

export interface ArcanaSettingsEditableFieldProps {
    value?: string | number | boolean | null;
    label: string;
    caption?: string;
    type?: "text" | "currency" | "number" | "select";
    options?: SelectOption[];
    disabled?: boolean;
    nested?: boolean;
    displayFormatter?: (value: unknown) => string;
    /** Rótulo do botão trigger de edição. Default: "Alterar". */
    editLabel?: string;
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

export function ArcanaSettingsEditableField({
    value = null,
    label,
    caption = "",
    type = "text",
    options = [],
    disabled = false,
    nested = false,
    displayFormatter,
    editLabel = "Alterar",
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
}: ArcanaSettingsEditableFieldProps) {
    const modalRef = useRef<ArcanaEditFieldDialogHandle | null>(null);
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

    const valueClasses = ["arcana-settings-list__current-value"];
    if (isEmpty) valueClasses.push("arcana-settings-list__current-value--empty");

    const resolvedModalTitle = modalTitle || `${editLabel} ${label}`;
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
            <ArcanaInput
                value={bufferValue as string | number | null}
                placeholder={inputPlaceholder}
                onValueChange={(v) => setBufferValue(v)}
            />
        );
    } else if (type === "currency") {
        input = (
            <ArcanaInputCurrency
                value={bufferValue as string | number}
                shadcn
                onValueChange={(v) => setBufferValue(v)}
            />
        );
    } else if (type === "number") {
        input = (
            <ArcanaInput
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
            <ArcanaSelect
                value={bufferValue}
                options={options}
                onValueChange={(v) => setBufferValue(v as string | number | boolean | null)}
            />
        );
    }

    return (
        <ArcanaSettingsListItem
            label={labelSlot ?? label}
            caption={caption}
            disabled={disabled}
            nested={nested}
        >
            <span className={valueClasses.join(" ")}>{displayValue}</span>
            <button
                className="arcana-settings-list__edit-btn"
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
                {editLabel}
            </button>

            <ArcanaEditFieldDialog
                ref={modalRef}
                title={resolvedModalTitle}
                description={modalDescription}
                onSave={handleSave}
            >
                {formGroup({ label: resolvedInputLabel, children: input })}
            </ArcanaEditFieldDialog>
        </ArcanaSettingsListItem>
    );
}
