<script lang="ts">
  /**
   * `<ArcanaLoadingOverlay>` — Svelte 5 port. Overlay de carregamento (spinner + texto).
   * Reproduz `<div class="arcana-loading-overlay">` (com `__box`/`__spinner`/`__text`),
   * idêntico ao SFC. A `<transition>` de fade do Vue é omitida — o overlay monta/desmonta
   * direto conforme `visible`.
   */
  let {
    visible = false,
    text = "Carregando…",
    class: className = "",
  }: {
    visible?: boolean;
    text?: string;
    class?: string;
  } = $props();
</script>

{#if visible}
  <div
    class={["arcana-loading-overlay", className].filter(Boolean).join(" ")}
    role="status"
    aria-live="polite"
  >
    <div class="arcana-loading-overlay__box">
      <span class="arcana-loading-overlay__spinner" aria-hidden="true"></span>
      <span class="arcana-loading-overlay__text">{text}</span>
    </div>
  </div>
{/if}
