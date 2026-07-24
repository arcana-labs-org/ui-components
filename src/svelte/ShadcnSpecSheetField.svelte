<script lang="ts">
  /**
   * `<ShadcnSpecSheetField>` — Svelte 5 port do SFC Vue. Campo individual da
   * `<ShadcnSpecSheetSection>`: label uppercase mono + valor. Valor vazio mostra
   * `emptyText` em italic muted. Slot default substitui o valor (badges/HTML custom).
   *
   * slot default → snippet `children` (quando presente, NUNCA renderiza como vazio).
   */
  import type { Snippet } from "svelte";

  let {
    label,
    value = "",
    emptyText = "Não informado",
    span = 1,
    children,
  }: {
    label: string;
    value?: string | number | null;
    emptyText?: string;
    span?: number | string;
    children?: Snippet;
  } = $props();

  const isEmpty = $derived(
    !children && (value === null || value === undefined || value === "")
  );
  const displayValue = $derived(isEmpty ? emptyText : String(value));

  const valueClasses = $derived(
    ["shadcn-spec-sheet__value", isEmpty ? "shadcn-spec-sheet__value--empty" : ""]
      .filter(Boolean)
      .join(" ")
  );
</script>

<div class="shadcn-spec-sheet__field" style={Number(span) > 1 ? `grid-column:span ${span};` : undefined}>
  <div class="shadcn-spec-sheet__label">{label}</div>
  <div class={valueClasses}>
    {#if children}{@render children()}{:else}{displayValue}{/if}
  </div>
</div>
