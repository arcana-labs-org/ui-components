import {
    forwardRef,
    useImperativeHandle,
    useRef,
    type ReactNode,
} from "react";
import {
    ArcanaDialog,
    type ArcanaDialogHandle,
    type ArcanaDialogSize,
} from "./ArcanaDialog";
import { ArcanaButton } from "./ArcanaButton";

/**
 * `<ArcanaEditFieldDialog>` — React port do SFC Vue. Wrapper genérico pra modais de
 * "Alterar X": recebe o input via `children` e fornece o chrome (header/footer com
 * Cancelar/Salvar). Reusa o `<ArcanaDialog>` React já portado.
 *
 * Equivalências Vue → React:
 * - API ref-based (`show()`/`hide()`) → `forwardRef` + `useImperativeHandle` (delega
 *   ao ref do `<ArcanaDialog>` interno, igual ao SFC que chama `this.$refs.dialog`)
 * - `emit('save')` → `onSave` (sem auto-close; caller fecha via ref após validar)
 * - slot default → `children`
 * - footer com `<ArcanaButton>` (Cancelar/Salvar), idêntico ao SFC
 */
export interface ArcanaEditFieldDialogHandle {
    show: () => void;
    hide: () => void;
}

export interface ArcanaEditFieldDialogProps {
    title: string;
    description?: string;
    cancelLabel?: string;
    saveLabel?: string;
    cancelColor?: string;
    saveColor?: string;
    cancelClass?: string;
    saveClass?: string;
    size?: ArcanaDialogSize;
    children?: ReactNode;
    onSave?: () => void;
}

export const ArcanaEditFieldDialog = forwardRef<
    ArcanaEditFieldDialogHandle,
    ArcanaEditFieldDialogProps
>(function ArcanaEditFieldDialog(
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
            title={title}
            description={description}
            size={size}
            footer={(hide) => (
                <>
                    <ArcanaButton
                        variant="outline-danger"
                        className={cancelClass}
                        onClick={hide}
                    >
                        <><i className="fa-solid fa-xmark" /> {cancelLabel}</>
                    </ArcanaButton>
                    <ArcanaButton
                        variant="success"
                        className={saveClass}
                        onClick={() => onSave?.()}
                    >
                        <><i className="fa-solid fa-check" /> {saveLabel}</>
                    </ArcanaButton>
                </>
            )}
        >
            {children}
        </ArcanaDialog>
    );
});
