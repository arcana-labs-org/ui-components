<script lang="ts" module>
  export interface AccordionApi {
    isOpen: (name: string) => boolean;
    toggle: (name: string) => void;
    /** Default de animação herdado pelos itens que não passam `animated` (closure = reativo). */
    animated: () => boolean;
  }

  /** Chave de contexto compartilhada entre `<ArcanaAccordion>` e `<ArcanaAccordionItem>`. */
  export const ACCORDION_CONTEXT = Symbol("arcana-accordion");
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";

  /**
   * `<ArcanaAccordion>` — Svelte 5 port. Reproduz `<div class="arcana-accordion">`.
   *
   * Equivalências Vue → Svelte 5:
   * - `provide`/`inject` do `accordionApi` → `setContext`/`getContext`
   * - `modelValue` (v-model) → prop `value` + `onValueChange` (string | string[] | null)
   * - slot default → snippet `children`
   *
   * Props:
   * - `accordion` — `true` (default): só um item aberto por vez; `false`: múltiplos (array)
   * - `animated` — `false` (default): abre/fecha instantâneo (comportamento histórico).
   *   `true`: transição de altura (0 → altura real medida) + fade, ~200ms. O
   *   `<ArcanaAccordionItem>` também aceita `animated` e, quando informada lá, ela tem
   *   **precedência** sobre a do container. Respeita `prefers-reduced-motion: reduce`.
   */
  let {
    value = null,
    accordion = true,
    animated = false,
    onValueChange,
    class: className = "",
    children,
  }: {
    value?: string | string[] | null;
    /** `true` (default): só um item aberto por vez. `false`: múltiplos (array). */
    accordion?: boolean;
    /** `false` (default): abre/fecha instantâneo. `true`: slide de altura + fade (~200ms). */
    animated?: boolean;
    onValueChange?: (value: string | string[] | null) => void;
    class?: string;
    children?: Snippet;
  } = $props();

  function isOpen(name: string): boolean {
    if (Array.isArray(value)) return value.includes(name);
    return value === name;
  }

  function toggle(name: string) {
    if (accordion) {
      onValueChange?.(value === name ? null : name);
      return;
    }
    const current = Array.isArray(value) ? [...value] : [];
    const idx = current.indexOf(name);
    if (idx >= 0) current.splice(idx, 1);
    else current.push(name);
    onValueChange?.(current);
  }

  // Funções leem `value` (prop reativa) no momento da chamada — o `$derived` do Item
  // que invoca `isOpen` rastreia essa leitura e recomputa quando `value` muda.
  setContext<AccordionApi>(ACCORDION_CONTEXT, { isOpen, toggle, animated: () => animated });

  const classes = $derived(["arcana-accordion", className].filter(Boolean).join(" "));
</script>

<div class={classes}>{@render children?.()}</div>
