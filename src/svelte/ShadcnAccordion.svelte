<script lang="ts" module>
  export interface AccordionApi {
    isOpen: (name: string) => boolean;
    toggle: (name: string) => void;
  }

  /** Chave de contexto compartilhada entre `<ShadcnAccordion>` e `<ShadcnAccordionItem>`. */
  export const ACCORDION_CONTEXT = Symbol("shadcn-accordion");
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";

  /**
   * `<ShadcnAccordion>` — Svelte 5 port. Reproduz `<div class="shadcn-accordion">`.
   *
   * Equivalências Vue → Svelte 5:
   * - `provide`/`inject` do `accordionApi` → `setContext`/`getContext`
   * - `modelValue` (v-model) → prop `value` + `onValueChange` (string | string[] | null)
   * - slot default → snippet `children`
   */
  let {
    value = null,
    accordion = true,
    onValueChange,
    class: className = "",
    children,
  }: {
    value?: string | string[] | null;
    /** `true` (default): só um item aberto por vez. `false`: múltiplos (array). */
    accordion?: boolean;
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
  setContext<AccordionApi>(ACCORDION_CONTEXT, { isOpen, toggle });

  const classes = $derived(["shadcn-accordion", className].filter(Boolean).join(" "));
</script>

<div class={classes}>{@render children?.()}</div>
