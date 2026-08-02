<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";
  import { canNavigateTo, clampStep, formatStepLabel, stepStatus } from "../core/wizard";
  import { WIZARD_CONTEXT, type WizardContextValue, type WizardStepMeta } from "./wizard-context";

  type WizardValidate = (step: number) => boolean | string | Promise<boolean | string>;

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

  /**
   * `<ArcanaWizard>` — Svelte 5 port do shell de passos (stepper + corpo + rodapé), pai
   * do `<ArcanaWizardStep>`. Reproduz o MESMO markup/classes de
   * `src/vue/components/ArcanaWizard.vue` (fonte da verdade da anatomia/API — ver lá
   * pro detalhe visual em `src/styles/parts/wizard.scss`).
   *
   * Equivalências Vue → Svelte 5:
   * | Vue                                   | Svelte 5                                   |
   * | -------------------------------------- | ------------------------------------------- |
   * | `provide('wizardApi', …)` + `inject`   | `setContext(WIZARD_CONTEXT, …)` (aqui) +     |
   * |                                         | `getContext` (no `<ArcanaWizardStep>`)       |
   * | `mounted`/`beforeUnmount` (registro)   | `$effect` com `untrack` no register + cleanup |
   * | `modelValue` (v-model)                 | prop `value` + `onValueChange`               |
   * | `emit('next'\|'back'\|'cancel'\|'finish')` | `onNext`/`onBack`/`onCancel`/`onFinish`  |
   * | slot `header-actions`                  | snippet prop `headerActions?`                |
   * | slot `footer` (escopado)               | snippet prop `footer?: Snippet<[Scope]>`     |
   * |                                         | (snippets Svelte ACEITAM argumentos — ao     |
   * |                                         | contrário do Angular, que não suporta slot   |
   * |                                         | escopado com `<ng-content>`)                 |
   * | slot default                           | snippet `children` (os `<ArcanaWizardStep>`) |
   *
   * Anatomia (idêntica ao SFC — ver `wizard.scss` pro CSS compartilhado):
   *   .arcana-wizard
   *     .arcana-wizard__stepper
   *       .arcana-wizard__step (.is-active|.is-completed|.is-pending, +.is-clickable)
   *         .arcana-wizard__indicator (número OU .arcana-wizard__check quando concluído)
   *         .arcana-wizard__label > .arcana-wizard__title + .arcana-wizard__description
   *       .arcana-wizard__connector (+.is-completed entre passos já concluídos)
   *       .arcana-wizard__header-actions (snippet `headerActions`)
   *     .arcana-wizard__body — os `<ArcanaWizardStep>` do `children` se auto-registram
   *       aqui, só o passo ativo renderiza seu corpo (ver `<ArcanaWizardStep>`)
   *     .arcana-wizard__footer
   *       .arcana-wizard__footer-text — "Step {current} of {total}" (`stepLabel`)
   *       .arcana-wizard__footer-actions — snippet `footer` (com escopo) ou os botões
   *         default (Cancel/Back/Continue/Finish), classes `.arcana-wizard__btn` +
   *         `--primary` (Continue/Finish) ou `--default` (Back/Cancel). Botões crus
   *         (`<button>`), não `<ArcanaButton>` — mesma decisão do Vue/React.
   *
   * Contrato compartilhado com `<ArcanaWizardStep>` (`WIZARD_CONTEXT`, provido aqui):
   * `register({ title, description }) => index`, `unregister(index)`, `isActive(index)`,
   * `current()`. Os filhos se registram no mount (`$effect`) e se desregistram no cleanup
   * do `$effect` (equivalente a `beforeUnmount`).
   *
   * Passos estáticos apenas: os índices são a ordem de `register()` (= ordem de mount dos
   * `<ArcanaWizardStep>`, para passos declarados estaticamente no `children`). `unregister`
   * NÃO reindexa a lista — só marca a posição como "tombstone" (`null`), pra que os índices
   * já entregues a outros passos continuem válidos. `activeSteps` filtra os tombstones.
   * Adicionar/remover passos em runtime está fora do escopo (mesma ressalva do Vue).
   *
   * `totalSteps === 0` acontece por um instante entre o primeiro render do shell e o
   * `$effect` (pós-mount) dos `<ArcanaWizardStep>` — registro é assíncrono, igual ao
   * `mounted` do Vue. Sem a guarda em `isLast`, `0 >= -1` faria o rodapé mostrar "Finish"
   * antes do primeiro passo existir.
   *
   * Contrato de `validate(step)`: chamado (com `await`) antes de avançar via Continue.
   * Retorno `false` ou uma `string` BLOQUEIA o avanço — a string não é exibida
   * automaticamente (sem toast embutido); cabe ao consumidor tratar o retorno se quiser
   * mostrá-la. `true`/`undefined` (ou promise resolvida assim) libera o avanço, chama
   * `onNext` e atualiza `value` via `onValueChange`. No último passo, o botão vira "Finish"
   * e chama `onFinish` (sem chamar `validate`).
   */
  let {
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
    class: className = "",
    children,
    headerActions,
    footer,
    onNext,
    onBack,
    onCancel,
    onFinish,
  }: {
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
    class?: string;
    children?: Snippet;
    headerActions?: Snippet;
    footer?: Snippet<[WizardFooterScope]>;
    onNext?: (step: number) => void;
    onBack?: (step: number) => void;
    onCancel?: () => void;
    onFinish?: () => void;
  } = $props();

  // Tombstone-on-unregister (ver doc acima): posições desregistradas viram `null` em vez
  // de removidas, pra não deslocar os índices já entregues aos passos que continuam montados.
  let steps = $state<Array<WizardStepMeta | null>>([]);

  const ctx: WizardContextValue = {
    register: (step) => {
      steps.push(step);
      return steps.length - 1;
    },
    unregister: (index) => {
      if (index >= 0 && index < steps.length) steps[index] = null;
    },
    // Funções leem `value` (prop reativa) no momento da chamada — o `$derived` do Step
    // que invoca `isActive` rastreia essa leitura e recomputa quando `value` muda.
    isActive: (index) => index === value,
    current: () => value,
  };
  setContext(WIZARD_CONTEXT, ctx);

  const activeSteps = $derived.by(() => {
    const out: Array<WizardStepMeta & { originalIndex: number }> = [];
    steps.forEach((step, originalIndex) => {
      if (step) out.push({ ...step, originalIndex });
    });
    return out;
  });

  const totalSteps = $derived(activeSteps.length);
  const isLast = $derived(totalSteps > 0 && value >= totalSteps - 1);
  const isFirst = $derived(value <= 0);
  const footerText = $derived(formatStepLabel(stepLabel, value, totalSteps));
  const classes = $derived(["arcana-wizard", className].filter(Boolean).join(" "));

  function isCompleted(i: number): boolean {
    return stepStatus(i, value) === "completed";
  }

  function stepClasses(i: number): string {
    return [
      "arcana-wizard__step",
      `is-${stepStatus(i, value)}`,
      canNavigateTo(i, value, linear) ? "is-clickable" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  function goToStep(step: number) {
    onValueChange?.(clampStep(step, totalSteps));
  }

  function goToStepIfAllowed(i: number) {
    if (canNavigateTo(i, value, linear)) goToStep(i);
  }

  function goBack() {
    onBack?.(value);
    goToStep(value - 1);
  }

  async function handleNext() {
    if (validate) {
      const result = await validate(value);
      if (result === false || typeof result === "string") return;
    }
    onNext?.(value);
    goToStep(value + 1);
  }

  function emitFinish() {
    onFinish?.();
  }

  function emitCancel() {
    onCancel?.();
  }

  const footerScope = $derived<WizardFooterScope>({
    step: value,
    total: totalSteps,
    isFirst,
    isLast,
    back: goBack,
    next: handleNext,
    finish: emitFinish,
    cancel: emitCancel,
  });
</script>

<div class={classes}>
  <div class="arcana-wizard__stepper">
    {#each activeSteps as s, idx (s.originalIndex)}
      <div
        class={stepClasses(s.originalIndex)}
        onclick={() => goToStepIfAllowed(s.originalIndex)}
      >
        <div class="arcana-wizard__indicator">
          {#if isCompleted(s.originalIndex)}
            <svg
              class="arcana-wizard__check"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          {:else}
            {s.originalIndex + 1}
          {/if}
        </div>
        <div class="arcana-wizard__label">
          <div class="arcana-wizard__title">{s.title}</div>
          {#if s.description}
            <div class="arcana-wizard__description">{s.description}</div>
          {/if}
        </div>
      </div>
      {#if idx < activeSteps.length - 1}
        <div class="arcana-wizard__connector" class:is-completed={s.originalIndex < value}></div>
      {/if}
    {/each}
    {#if headerActions}
      <div class="arcana-wizard__header-actions">{@render headerActions()}</div>
    {/if}
  </div>

  <div class="arcana-wizard__body">{@render children?.()}</div>

  <div class="arcana-wizard__footer">
    <div class="arcana-wizard__footer-text">{footerText}</div>
    <div class="arcana-wizard__footer-actions">
      {#if footer}
        {@render footer(footerScope)}
      {:else}
        {#if cancellable}
          <button
            type="button"
            class="arcana-wizard__btn arcana-wizard__btn--default"
            onclick={emitCancel}
          >
            {cancelLabel}
          </button>
        {/if}
        {#if value > 0}
          <button
            type="button"
            class="arcana-wizard__btn arcana-wizard__btn--default"
            onclick={goBack}
          >
            {backLabel}
          </button>
        {/if}
        {#if !isLast}
          <button
            type="button"
            class="arcana-wizard__btn arcana-wizard__btn--primary"
            onclick={handleNext}
          >
            {continueLabel}
          </button>
        {:else}
          <button
            type="button"
            class="arcana-wizard__btn arcana-wizard__btn--primary"
            disabled={finalDisabled}
            onclick={emitFinish}
          >
            {finalLabel}
          </button>
        {/if}
      {/if}
    </div>
  </div>
</div>
