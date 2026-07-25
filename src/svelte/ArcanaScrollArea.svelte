<script lang="ts">
  /**
   * `<ArcanaScrollArea>` — Svelte 5 port. Área rolável com barra estilizada.
   * Reproduz `<div class="arcana-scroll-area arcana-scroll-area--vertical
   * arcana-scroll-area--type-auto">` + `.arcana-scroll-area__viewport`, idêntico
   * ao SFC Vue / aos ports React e Angular.
   *
   * A rolagem é **NATIVA**: o componente só pinta a barra (`::-webkit-scrollbar`
   * no Chrome/Safari/Edge + `scrollbar-width`/`scrollbar-color` no Firefox) e
   * limita a altura do viewport. NÃO reimplementamos scroll em JS (translate no
   * conteúdo + polegar sintético) de propósito: assim o teclado (setas,
   * PageUp/PageDown, Home/End, Space), o touch com inércia, o scroll anchoring,
   * o `scrollIntoView` e os leitores de tela continuam funcionando de graça.
   */
  import type { Snippet } from "svelte";

  type ScrollAreaOrientation = "vertical" | "horizontal" | "both";
  type ScrollAreaType = "auto" | "always" | "hover";

  let {
    orientation = "vertical",
    height = null,
    maxHeight = null,
    scrollbarSize = 10,
    type = "auto",
    hideDelay = 500,
    tabbable = true,
    viewport = $bindable(undefined),
    children,
    class: className = "",
  }: {
    /** Eixos liberados. Default `"vertical"` (o outro eixo fica `overflow: hidden`). */
    orientation?: ScrollAreaOrientation;
    /** Altura fixa do viewport. `number` = px; string = valor CSS cru. */
    height?: number | string | null;
    /** Altura máxima do viewport. `number` = px; string = valor CSS cru. */
    maxHeight?: number | string | null;
    /** Espessura da barra em px (WebKit; no Firefox a espessura é `thin`). Default `10`. */
    scrollbarSize?: number;
    /**
     * `"auto"` (default): barra nativa, aparece quando há transbordo;
     * `"always"`: `overflow: scroll`, calha sempre reservada;
     * `"hover"`: polegar transparente em repouso, pintado no hover/foco.
     */
    type?: ScrollAreaType;
    /** Atraso do auto-ocultar (ms) — só tem efeito com `type="hover"`. Default `500`. */
    hideDelay?: number;
    /** `tabindex={0}` no viewport pra rolar por teclado sem foco interno. Default `true`. */
    tabbable?: boolean;
    /** `bind:viewport` — o elemento que realmente rola (`scrollTo`, `scrollTop`, …). */
    viewport?: HTMLDivElement | undefined;
    children?: Snippet;
    class?: string;
  } = $props();

  /** `number` vira px; string passa crua; `null`/`""` some. */
  function toCssLength(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === "") return "";
    return typeof value === "number" ? `${value}px` : String(value);
  }

  const rootClasses = $derived(
    [
      "arcana-scroll-area",
      `arcana-scroll-area--${orientation}`,
      `arcana-scroll-area--type-${type}`,
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );

  const rootStyle = $derived(
    `--arcana-scroll-area-size: ${scrollbarSize}px; --arcana-scroll-area-hide-delay: ${hideDelay}ms;`
  );

  const viewportStyle = $derived(
    [
      toCssLength(height) ? `height: ${toCssLength(height)}` : "",
      toCssLength(maxHeight) ? `max-height: ${toCssLength(maxHeight)}` : "",
    ]
      .filter(Boolean)
      .join("; ")
  );
</script>

<div class={rootClasses} style={rootStyle}>
  <div
    bind:this={viewport}
    class="arcana-scroll-area__viewport"
    style={viewportStyle}
    tabindex={tabbable ? 0 : undefined}
  >
    {@render children?.()}
  </div>
</div>
