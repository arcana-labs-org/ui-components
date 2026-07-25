<script lang="ts">
  /**
   * `<ArcanaProgress>` — Svelte 5 port. Barra de progresso determinada ou indeterminada.
   * Reproduz `<div class="arcana-progress arcana-progress--{size} --{variant} --{tone}
   * --radius-{radius}">` (+ `is-indeterminate`), o `__track` (que carrega `role="progressbar"`
   * e os `aria-value*`), o `__indicator` e o `__value`, idêntico ao SFC.
   *
   * Equivalências: slot `#value` → snippet `valueSlot`.
   *
   * Acessibilidade: `aria-valuemin`/`aria-valuemax` sempre; `aria-valuenow`/`aria-valuetext`
   * só no determinado — omitidos quando `value` é `null`/`undefined`.
   */
  import type { Snippet } from "svelte";

  import { clampProgressValue, formatProgressLabel, progressPercent } from "../core/progress";

  let {
    value = null,
    max = 100,
    size = "md",
    variant = "solid",
    tone = "accent",
    showValue = false,
    indeterminateText = "…",
    radius = "full",
    ariaLabel = "",
    valueSlot,
    class: className = "",
    style,
  }: {
    /** 0–`max`. `null`/`undefined` = indeterminado. Fora da faixa é clampado. */
    value?: number | null;
    /** Teto da escala (default `100`). `max <= 0` cai pro default. */
    max?: number;
    size?: "sm" | "md" | "lg";
    variant?: "solid" | "soft";
    tone?: "accent" | "success" | "danger" | "warning" | "info";
    /** Mostra o rótulo `NN%` ao lado da barra. */
    showValue?: boolean;
    /** Rótulo usado no modo indeterminado (default `"…"`). */
    indeterminateText?: string;
    radius?: "none" | "sm" | "md" | "lg" | "full";
    ariaLabel?: string;
    valueSlot?: Snippet;
    class?: string;
    style?: string;
  } = $props();

  const percent = $derived(progressPercent(value, max));
  const isIndeterminate = $derived(percent === null);
  const clamped = $derived(clampProgressValue(value, max));
  const percentLabel = $derived(formatProgressLabel(value, max));
  const normalizedMax = $derived(Number.isFinite(max) && max > 0 ? max : 100);

  const rootClasses = $derived(
    [
      "arcana-progress",
      `arcana-progress--${size}`,
      `arcana-progress--${variant}`,
      `arcana-progress--${tone}`,
      `arcana-progress--radius-${radius}`,
      isIndeterminate ? "is-indeterminate" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );
</script>

<div class={rootClasses} {style}>
  <div
    class="arcana-progress__track"
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={normalizedMax}
    aria-valuenow={isIndeterminate ? undefined : (clamped ?? undefined)}
    aria-valuetext={isIndeterminate ? undefined : percentLabel}
    aria-label={ariaLabel || undefined}
  >
    <!-- No indeterminado a largura é fixa pelo CSS (a animação é que anda). -->
    <div
      class="arcana-progress__indicator"
      style={isIndeterminate ? undefined : `width: ${percent}%;`}
    ></div>
  </div>

  {#if showValue}
    <span class="arcana-progress__value">
      {#if valueSlot}{@render valueSlot()}{:else}{isIndeterminate ? indeterminateText : percentLabel}{/if}
    </span>
  {/if}
</div>
