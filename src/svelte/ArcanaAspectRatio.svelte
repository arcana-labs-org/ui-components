<script lang="ts">
  /**
   * `<ArcanaAspectRatio>` — Svelte 5 port. Mantém a proporção do conteúdo (imagem,
   * vídeo, iframe, mapa…) independentemente da largura disponível. Reproduz
   * `<div class="arcana-aspect-ratio"><div class="arcana-aspect-ratio__content">`,
   * idêntico ao SFC Vue / ao port React.
   *
   * Implementação SEM JavaScript: a razão vira o custom property inline
   * `--arcana-aspect-ratio` e quem faz o trabalho é a propriedade `aspect-ratio`
   * do CSS (a lib mira browsers modernos — nada de padding-hack nem
   * `ResizeObserver`). O snippet `children` é envolvido por `__content`, que
   * preenche 100% da caixa; mídia direta recebe `object-fit: cover` (ajustável
   * por `--arcana-aspect-ratio-fit`).
   */
  import type { Snippet } from "svelte";

  const DEFAULT_RATIO = 16 / 9;

  let {
    ratio = DEFAULT_RATIO,
    children,
    class: className = "",
  }: {
    /** Largura ÷ altura. Default `16 / 9`; valores não-finitos ou ≤ 0 caem no default. */
    ratio?: number;
    children?: Snippet;
    class?: string;
  } = $props();

  // Blinda contra `0`, negativos e `NaN` (que quebrariam o layout inteiro).
  const safeRatio = $derived(Number.isFinite(ratio) && ratio > 0 ? ratio : DEFAULT_RATIO);
</script>

<div
  class={["arcana-aspect-ratio", className].filter(Boolean).join(" ")}
  style={`--arcana-aspect-ratio: ${safeRatio};`}
>
  <div class="arcana-aspect-ratio__content">
    {@render children?.()}
  </div>
</div>
