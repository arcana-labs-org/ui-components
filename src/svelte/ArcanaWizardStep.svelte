<script lang="ts">
  import type { Snippet } from "svelte";
  import { getContext, untrack } from "svelte";
  import { WIZARD_CONTEXT, type WizardContextValue } from "./wizard-context";

  /**
   * `<ArcanaWizardStep>` — Svelte 5 port. Um passo do `<ArcanaWizard>`.
   *
   * Equivalências Vue → Svelte 5:
   * | Vue                                    | Svelte 5                                  |
   * | --------------------------------------- | ------------------------------------------ |
   * | `inject('wizardApi')`                   | `getContext(WIZARD_CONTEXT)`                |
   * | `mounted()` → `register(...)`           | `$effect` (pós-mount) com `untrack` no      |
   * |                                          | register — roda só uma vez (sem deps        |
   * |                                          | rastreadas), igual ao `mounted` do Vue      |
   * | `beforeUnmount()` → `unregister(index)` | cleanup devolvido pelo `$effect`            |
   * | `v-if="isActive"` no root                | `{#if isActive}` no root                    |
   * | slot default                            | snippet `children`                          |
   *
   * Se registra no `wizardApi` (via `getContext`, provido pelo `<ArcanaWizard>` pai) num
   * `$effect` que roda só uma vez — `untrack` isola a leitura de `title`/`description` pra
   * não recriar o registro se essas props mudarem depois (mesmo comportamento do `mounted`
   * do Vue, que só roda na montagem) — e se desregistra no cleanup desse `$effect`
   * (equivalente a `beforeUnmount`). O corpo (snippet `children`) só renderiza quando o
   * índice do passo é o ativo (`wizardApi.isActive(index)`); o cabeçalho do stepper
   * (título, indicador, connector) é responsabilidade exclusiva do `<ArcanaWizard>` pai,
   * que lê `title`/`description` a partir do registro.
   *
   * Ver o header do `<ArcanaWizard>` para a ressalva sobre passos estáticos (sem
   * adicionar/remover passos em runtime).
   */
  let {
    title,
    description,
    children,
  }: {
    title: string;
    description?: string;
    children?: Snippet;
  } = $props();

  const ctx = getContext<WizardContextValue>(WIZARD_CONTEXT);
  if (!ctx) {
    throw new Error("ArcanaWizardStep must be used within a ArcanaWizard");
  }

  let index = $state(-1);

  $effect(() => {
    let assigned = -1;
    untrack(() => {
      assigned = ctx.register({ title, description });
    });
    index = assigned;
    return () => ctx.unregister(assigned);
  });

  const isActive = $derived(ctx.isActive(index));
</script>

{#if isActive}
  <div class="arcana-wizard-step">
    {@render children?.()}
  </div>
{/if}
