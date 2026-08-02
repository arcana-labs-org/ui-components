import {
    Children,
    createContext,
    Fragment,
    isValidElement,
    useMemo,
    type ReactElement,
    type ReactNode,
} from "react";

import { canNavigateTo, clampStep, formatStepLabel, stepStatus } from "../core/wizard";
import type { ArcanaWizardStepProps } from "./ArcanaWizardStep";

type WizardValidate = (step: number) => boolean | string | Promise<boolean | string>;

/**
 * `<ArcanaWizard>` — React port do shell de passos (stepper + corpo + rodapé), pai
 * do `<ArcanaWizardStep>`. Reproduz o MESMO markup/classes de
 * `src/vue/components/ArcanaWizard.vue` (fonte da verdade da anatomia/API — ver lá
 * pro detalhe visual em `src/styles/parts/wizard.scss`).
 *
 * Equivalências Vue → React:
 * - `provide('wizardApi')` + `inject` + registro dinâmico (`mounted`/`beforeUnmount`
 *   no `<ArcanaWizardStep>`) → **abordagem mais simples** adotada aqui: o
 *   `<ArcanaWizard>` lê `React.Children` de `children` direto (síncrono, sem
 *   timing de mount) pra montar `steps[]` (título/descrição) do cabeçalho, e
 *   renderiza só o filho ativo (`childrenArray[value]`) no corpo. O
 *   `<ArcanaWizardStep>` vira um holder puro de metadados + conteúdo — não se
 *   registra, não sabe seu próprio índice. `WizardContext` é exportado pra
 *   paridade de API com os outros compostos (ex. `AccordionContext`), mas
 *   `<ArcanaWizardStep>` não precisa consumi-lo: como só o passo ativo é
 *   montado, ele está sempre "ativo" quando renderizado. Passos dinâmicos
 *   (adicionar/remover em runtime) funcionam de graça aqui — `React.Children`
 *   é recomputado a cada render, sem tombstone.
 * - `modelValue` (v-model) → `value` + `onValueChange`
 * - `emit('next'|'back'|'cancel'|'finish')` → `onNext`/`onBack`/`onCancel`/`onFinish`
 * - slot `header-actions` → prop `headerActions?: ReactNode`
 * - slot `footer` (scoped: step/total/isFirst/isLast/back/next/finish/cancel) →
 *   prop `footer?: (scope) => ReactNode`; sem a prop, renderiza os botões default
 *   (Cancel/Back/Continue/Finish), igual ao fallback do slot Vue.
 * - slot default → `children` (lista de `<ArcanaWizardStep>`)
 *
 * Anatomia (idêntica ao SFC — ver `wizard.scss` pro CSS compartilhado):
 *   .arcana-wizard
 *     .arcana-wizard__stepper
 *       .arcana-wizard__step (.is-active|.is-completed|.is-pending, +.is-clickable)
 *         .arcana-wizard__indicator (número OU .arcana-wizard__check quando concluído)
 *         .arcana-wizard__label > .arcana-wizard__title + .arcana-wizard__description
 *       .arcana-wizard__connector (+.is-completed entre passos já concluídos)
 *       .arcana-wizard__header-actions (prop `headerActions`)
 *     .arcana-wizard__body — só o `<ArcanaWizardStep>` ativo é renderizado aqui
 *     .arcana-wizard__footer
 *       .arcana-wizard__footer-text — "Step {current} of {total}" (`stepLabel`)
 *       .arcana-wizard__footer-actions — prop `footer` (com scope) ou os botões
 *         default, classes `.arcana-wizard__btn` + `--primary` (Continue/Finish)
 *         ou `--default` (Back/Cancel). Botões crus (`<button>`), não
 *         `<ArcanaButton>` — mesma decisão do Vue.
 *
 * Contrato de `validate(step)`: chamado (com `await`) antes de avançar via
 * Continue. Retorno `false` ou uma `string` BLOQUEIA o avanço — a string não é
 * exibida automaticamente (sem toast embutido); cabe ao consumidor tratar o
 * retorno se quiser mostrá-la. `true`/`undefined` (ou promise resolvida assim)
 * libera o avanço, chama `onNext` e atualiza `value` via `onValueChange`. No
 * último passo, o botão vira "Finish" e chama `onFinish` (sem chamar `validate`).
 */

export interface WizardApi {
    activeIndex: number;
    total: number;
}

export const WizardContext = createContext<WizardApi | null>(null);

export interface WizardFooterScope {
    step: number;
    total: number;
    isFirst: boolean;
    isLast: boolean;
    back: () => void;
    next: () => void | Promise<void>;
    finish: () => void;
    cancel: () => void;
}

export interface ArcanaWizardProps {
    value?: number;
    onValueChange?: (value: number) => void;
    validate?: WizardValidate;
    /** `true` (default): navegação direta no stepper só pra passos já alcançados. */
    linear?: boolean;
    cancellable?: boolean;
    continueLabel?: string;
    backLabel?: string;
    cancelLabel?: string;
    finalLabel?: string;
    finalDisabled?: boolean;
    stepLabel?: string;
    headerActions?: ReactNode;
    footer?: (scope: WizardFooterScope) => ReactNode;
    onNext?: (step: number) => void;
    onBack?: (step: number) => void;
    onCancel?: () => void;
    onFinish?: () => void;
    className?: string;
    children?: ReactNode;
}

export function ArcanaWizard({
    value = 0,
    onValueChange,
    validate,
    linear = true,
    cancellable = false,
    continueLabel = "Continue",
    backLabel = "Back",
    cancelLabel = "Cancel",
    finalLabel = "Finish",
    finalDisabled = false,
    stepLabel = "Step {current} of {total}",
    headerActions,
    footer,
    onNext,
    onBack,
    onCancel,
    onFinish,
    className,
    children,
}: ArcanaWizardProps) {
    const childrenArray = useMemo(
        () =>
            Children.toArray(children).filter(isValidElement) as ReactElement<ArcanaWizardStepProps>[],
        [children],
    );

    const steps = childrenArray.map((child) => ({
        title: child.props.title,
        description: child.props.description,
    }));

    const totalSteps = steps.length;
    const current = value;
    // `totalSteps === 0` pode acontecer com `children` vazio — sem essa guarda,
    // `0 >= -1` faria o rodapé mostrar "Finish" sem nenhum passo (mesma nota do Vue).
    const isLast = totalSteps > 0 && current >= totalSteps - 1;
    const isFirst = current <= 0;
    const footerText = formatStepLabel(stepLabel, current, totalSteps);

    const goToStep = (step: number) => {
        onValueChange?.(clampStep(step, totalSteps));
    };

    const goToStepIfAllowed = (i: number) => {
        if (canNavigateTo(i, current, linear)) goToStep(i);
    };

    const goBack = () => {
        onBack?.(current);
        goToStep(current - 1);
    };

    const handleNext = async () => {
        if (validate) {
            const result = await validate(current);
            if (result === false || typeof result === "string") return;
        }
        onNext?.(current);
        goToStep(current + 1);
    };

    const emitFinish = () => {
        onFinish?.();
    };

    const emitCancel = () => {
        onCancel?.();
    };

    const classes = ["arcana-wizard", className ?? ""].filter(Boolean).join(" ");

    const footerScope: WizardFooterScope = {
        step: current,
        total: totalSteps,
        isFirst,
        isLast,
        back: goBack,
        next: handleNext,
        finish: emitFinish,
        cancel: emitCancel,
    };

    return (
        <WizardContext.Provider value={{ activeIndex: current, total: totalSteps }}>
            <div className={classes}>
                <div className="arcana-wizard__stepper">
                    {steps.map((s, idx) => {
                        const status = stepStatus(idx, current);
                        const stepClasses = [
                            "arcana-wizard__step",
                            `is-${status}`,
                            canNavigateTo(idx, current, linear) ? "is-clickable" : "",
                        ]
                            .filter(Boolean)
                            .join(" ");
                        return (
                            <Fragment key={idx}>
                                <div className={stepClasses} onClick={() => goToStepIfAllowed(idx)}>
                                    <div className="arcana-wizard__indicator">
                                        {status === "completed" ? (
                                            <svg
                                                className="arcana-wizard__check"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={3}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        ) : (
                                            idx + 1
                                        )}
                                    </div>
                                    <div className="arcana-wizard__label">
                                        <div className="arcana-wizard__title">{s.title}</div>
                                        {s.description && (
                                            <div className="arcana-wizard__description">{s.description}</div>
                                        )}
                                    </div>
                                </div>
                                {idx < steps.length - 1 && (
                                    <div
                                        className={
                                            "arcana-wizard__connector" + (idx < current ? " is-completed" : "")
                                        }
                                    />
                                )}
                            </Fragment>
                        );
                    })}
                    {headerActions && <div className="arcana-wizard__header-actions">{headerActions}</div>}
                </div>

                <div className="arcana-wizard__body">{childrenArray[current] ?? null}</div>

                <div className="arcana-wizard__footer">
                    <div className="arcana-wizard__footer-text">{footerText}</div>
                    <div className="arcana-wizard__footer-actions">
                        {footer ? (
                            footer(footerScope)
                        ) : (
                            <>
                                {cancellable && (
                                    <button
                                        type="button"
                                        className="arcana-wizard__btn arcana-wizard__btn--default"
                                        onClick={emitCancel}
                                    >
                                        {cancelLabel}
                                    </button>
                                )}
                                {current > 0 && (
                                    <button
                                        type="button"
                                        className="arcana-wizard__btn arcana-wizard__btn--default"
                                        onClick={goBack}
                                    >
                                        {backLabel}
                                    </button>
                                )}
                                {!isLast ? (
                                    <button
                                        type="button"
                                        className="arcana-wizard__btn arcana-wizard__btn--primary"
                                        onClick={handleNext}
                                    >
                                        {continueLabel}
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="arcana-wizard__btn arcana-wizard__btn--primary"
                                        disabled={finalDisabled}
                                        onClick={emitFinish}
                                    >
                                        {finalLabel}
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </WizardContext.Provider>
    );
}
