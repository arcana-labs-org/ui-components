import { forwardRef, useImperativeHandle, useRef } from "react";
import { ShadcnDialog, type ShadcnDialogHandle } from "./ShadcnDialog";
import { LabeledButton } from "./LabeledButton";

/**
 * `<ShadcnRequiredFieldsDialog>` — React port do SFC Vue. Dialog amber/warning que lista
 * campos obrigatórios pendentes. Reusa o `<ShadcnDialog>` React (header/footer custom).
 *
 * Equivalências Vue → React:
 * - API ref-based (`show()`/`hide()`) → `forwardRef` + `useImperativeHandle` (delega ao
 *   ref do `<ShadcnDialog>` interno)
 * - header slot custom (`rf-header`) → prop `header` do `<ShadcnDialog>`
 * - footer com `<LabeledButton>` (Voltar) → prop `footer` (scope `{ hide }`)
 */
export interface RequiredField {
    key: string;
    label: string;
    hint: string;
}

export interface ShadcnRequiredFieldsDialogHandle {
    show: () => void;
    hide: () => void;
}

export interface ShadcnRequiredFieldsDialogProps {
    title?: string;
    description?: string;
    fields?: RequiredField[];
    buttonLabel?: string;
    size?: number | string;
}

export const ShadcnRequiredFieldsDialog = forwardRef<
    ShadcnRequiredFieldsDialogHandle,
    ShadcnRequiredFieldsDialogProps
>(function ShadcnRequiredFieldsDialog(
    {
        title = "Faltam campos obrigatórios",
        description = "Os campos abaixo precisam ser preenchidos antes de continuar.",
        fields = [],
        buttonLabel = "Voltar e corrigir",
        size = 560,
    },
    ref
) {
    const dialogRef = useRef<ShadcnDialogHandle | null>(null);

    useImperativeHandle(
        ref,
        () => ({
            show: () => dialogRef.current?.show(),
            hide: () => dialogRef.current?.hide(),
        }),
        []
    );

    return (
        <ShadcnDialog
            ref={dialogRef}
            size={size as never}
            flatFooter
            header={
                <div className="rf-header">
                    <div className="rf-header__icon">
                        <i className="fa-solid fa-triangle-exclamation" />
                    </div>
                    <div className="rf-header__text">
                        <h2 className="rf-header__title">{title}</h2>
                        <p className="rf-header__desc">{description}</p>
                    </div>
                </div>
            }
            footer={(hide) => (
                <LabeledButton
                    label={buttonLabel}
                    icon="fa-solid fa-arrow-left"
                    color="amber-600"
                    shadcn
                    onClick={hide}
                />
            )}
        >
            <div className="rf-list">
                {fields.map((field) => (
                    <div key={field.key} className="rf-item">
                        <div className="rf-item__icon">
                            <i className="fa-solid fa-circle-exclamation" />
                        </div>
                        <div className="rf-item__body">
                            <div className="rf-item__label">{field.label}</div>
                            <div className="rf-item__hint">{field.hint}</div>
                        </div>
                    </div>
                ))}
            </div>
        </ShadcnDialog>
    );
});
