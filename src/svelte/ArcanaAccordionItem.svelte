<script lang="ts">
  import type { Snippet } from "svelte";
  import { getContext } from "svelte";
  import { animateCollapse, applyCollapsedState } from "../core/collapse";
  import { ACCORDION_CONTEXT, type AccordionApi } from "./ArcanaAccordion.svelte";

  /**
   * `<ArcanaAccordionItem>` — Svelte 5 port. Reproduz o item (`arcana-accordion-item` +
   * `open`/`disabled`, `arcana-accordion-trigger`, `arcana-accordion-title`,
   * `arcana-accordion-chevron`, `arcana-accordion-content`), idêntico ao SFC.
   *
   * Equivalências Vue → Svelte 5:
   * - `inject('accordionApi')` → `getContext(ACCORDION_CONTEXT)`
   * - slots default/`#title` → snippet `children` / prop `title` (`string | Snippet`)
   * - `watch` + `$refs` da animação → `$effect` + `bind:this`
   *
   * Props:
   * - `name` (obrigatório), `title`, `disabled`
   * - `animated` — opcional. Quando **não** informada, herda o `animated` do
   *   `<ArcanaAccordion>` (default `false`); quando informada, tem **precedência**
   *   sobre a do container. `true` = slide de altura (0 → altura real medida) + fade (~200ms).
   *
   * A animação é imperativa (`core/collapse.ts`), porque `height: auto` não anima: o
   * conteúdo é medido e a altura em px é escrita inline; a transição em si está no CSS
   * (`.arcana-accordion-content--animated`). Com `prefers-reduced-motion: reduce` a
   * animação é ignorada e o estado final é aplicado direto.
   */
  let {
    name,
    title = "",
    disabled = false,
    animated,
    class: className = "",
    children,
  }: {
    name: string;
    title?: string | Snippet;
    disabled?: boolean;
    /** `undefined` = herda do `<ArcanaAccordion>`; informado = tem precedência. */
    animated?: boolean;
    class?: string;
    children?: Snippet;
  } = $props();

  const api = getContext<AccordionApi>(ACCORDION_CONTEXT);
  if (!api) {
    throw new Error("ArcanaAccordionItem must be used within a ArcanaAccordion");
  }

  const open = $derived(api.isOpen(name));
  const isAnimated = $derived(animated ?? api.animated());

  const rootClasses = $derived(
    ["arcana-accordion-item", open ? "open" : "", disabled ? "disabled" : "", className]
      .filter(Boolean)
      .join(" ")
  );

  const contentClasses = $derived(
    ["arcana-accordion-content", isAnimated ? "arcana-accordion-content--animated" : ""]
      .filter(Boolean)
      .join(" ")
  );

  let contentEl: HTMLDivElement | undefined = $state();
  // Estado local não-reativo: só o `$effect` abaixo lê/escreve.
  let prevOpen = false;
  let initialized = false;

  $effect(() => {
    const el = contentEl;
    const nextOpen = open;
    const nextAnimated = isAnimated;
    if (!el) return;
    if (!nextAnimated) {
      initialized = false;
      prevOpen = nextOpen;
      return;
    }
    if (!initialized) {
      // Primeira passada no modo animado: aplica o estado de repouso, sem animar.
      initialized = true;
      prevOpen = nextOpen;
      applyCollapsedState(el, nextOpen);
      return;
    }
    if (prevOpen === nextOpen) return;
    prevOpen = nextOpen;
    // O cleanup do `$effect` finaliza a transição (re-toggle no meio / destroy).
    return animateCollapse(el, nextOpen);
  });

  function onToggle() {
    if (disabled) return;
    api.toggle(name);
  }
</script>

<div class={rootClasses}>
  <button type="button" class="arcana-accordion-trigger" {disabled} onclick={onToggle}>
    <span class="arcana-accordion-title">
      {#if typeof title === "function"}{@render title()}{:else}{title}{/if}
    </span>
    <i class="fa-solid fa-chevron-down arcana-accordion-chevron"></i>
  </button>
  <!--
    Modo estático: Vue usa `v-show` — o content fica montado e alterna via `display`
    (preserva estado). Modo animado: o `style` fica `undefined` de propósito; quem
    escreve `display`/`height`/`opacity` é o `core/collapse`.
  -->
  <div
    bind:this={contentEl}
    class={contentClasses}
    style={isAnimated || open ? undefined : "display: none;"}
  >
    {@render children?.()}
  </div>
</div>
