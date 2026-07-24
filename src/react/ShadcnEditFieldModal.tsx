import {
    forwardRef,
    useImperativeHandle,
    useRef,
    type ReactNode,
} from "react";
import {
    ShadcnDialog,
    type ShadcnDialogHandle,
    type ShadcnDialogSize,
} from "./ShadcnDialog";
import { LabeledButton } from "./LabeledButton";

/**
 * `<ShadcnEditFieldModal>` — React port do SFC Vue. Wrapper genérico pra modais de
 * "Alterar X": recebe o input via `children` e fornece o chrome (header/footer com
 * Cancelar/Salvar). Reusa o `<ShadcnDialog>` React já portado.
 *
 * Equivalências Vue → React:
 * - API ref-based (`show()`/`hide()`) → `forwardRef` + `useImperativeHandle` (delega
 *   ao ref do `<ShadcnDialog>` interno, igual ao SFC que chama `this.$refs.dialog`)
 * - `emit('save')` → `onSave` (sem auto-close; caller fecha via ref após validar)
 * - slot default → `children`
 * - footer com `<LabeledButton>` (Cancelar/Salvar), idêntico ao SFC
 */
export interface ShadcnEditFieldModalHandle {
    show: () => void;
    hide: () => void;
}

export interface ShadcnEditFieldModalProps {
    title: string;
    description?: string;
    cancelLabel?: string;
    saveLabel?: string;
    cancelColor?: string;
    saveColor?: string;
    cancelClass?: string;
    saveClass?: string;
    size?: ShadcnDialogSize;
    children?: ReactNode;
    onSave?: () => void;
}

export const ShadcnEditFieldModal = forwardRef<
    ShadcnEditFieldModalHandle,
    ShadcnEditFieldModalProps
>(function ShadcnEditFieldModal(
    {
        title,
        description = "",
        cancelLabel = "Cancelar",
        saveLabel = "Salvar Alterações",
        cancelColor = "white",
        saveColor = "primary-700",
        cancelClass = "",
        saveClass = "",
        size = "md",
        children,
        onSave,
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
            title={title}
            description={description}
            size={size}
            footer={(hide) => (
                <>
                    <LabeledButton
                        label={cancelLabel}
                        color={cancelColor}
                        className={cancelClass}
                        shadcn
                        onClick={hide}
                    />
                    <LabeledButton
                        label={saveLabel}
                        color={saveColor}
                        className={saveClass}
                        shadcn
                        onClick={() => onSave?.()}
                    />
                </>
            )}
        >
            {children}
        </ShadcnDialog>
    );
});
