import { forwardRef, useImperativeHandle, useRef } from "react";
import { ArcanaDialog, type ArcanaDialogHandle } from "./ArcanaDialog";
import { ArcanaButton } from "./ArcanaButton";

/**
 * `<ArcanaRequiredFieldsDialog>` — React port do SFC Vue. Dialog amber/warning que lista
 * campos obrigatórios pendentes. Reusa o `<ArcanaDialog>` React (header/footer custom).
 *
 * Equivalências Vue → React:
 * - API ref-based (`show()`/`hide()`) → `forwardRef` + `useImperativeHandle` (delega ao
 *   ref do `<ArcanaDialog>` interno)
 * - header slot custom (`rf-header`) → prop `header` do `<ArcanaDialog>`
 * - footer com `<ArcanaButton>` (Voltar) → prop `footer` (scope `{ hide }`)
 */
export interface RequiredField {
    key: string;
    label: string;
    hint: string;
}

export interface ArcanaRequiredFieldsDialogHandle {
    show: () => void;
    hide: () => void;
}

export interface ArcanaRequiredFieldsDialogProps {
    title?: string;
    description?: string;
    fields?: RequiredField[];
    buttonLabel?: string;
    size?: number | string;
}

export const ArcanaRequiredFieldsDialog = forwardRef<
    ArcanaRequiredFieldsDialogHandle,
    ArcanaRequiredFieldsDialogProps
>(function ArcanaRequiredFieldsDialog(
    {
        title = "Faltam campos obrigatórios",
        description = "Os campos abaixo precisam ser preenchidos antes de continuar.",
        fields = [],
        buttonLabel = "Voltar e corrigir",
        size = 560,
    },
    ref
) {
    const dialogRef = useRef<ArcanaDialogHandle | null>(null);

    useImperativeHandle(
        ref,
        () => ({
            show: () => dialogRef.current?.show(),
            hide: () => dialogRef.current?.hide(),
        }),
        []
    );

    return (
        <ArcanaDialog
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
                <ArcanaButton variant="warning" onClick={hide}>
                    <i className="fa-solid fa-arrow-left" /> {buttonLabel}
                </ArcanaButton>
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
        </ArcanaDialog>
    );
});
