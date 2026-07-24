<script lang="ts">
  /**
   * `<ArcanaSwitchSegmented>` — Svelte 5 port. Reproduz `<div class="arcana-switch-segmented">`
   * (+ `is-on`/`is-disabled`/`is-compact`/`is-squared`), o `__indicator` e as duas metades
   * `__option--off`/`__option--on` (com `__radio` opcional), idêntico ao SFC.
   *
   * Equivalências (parity com React): `modelValue` → `value` + `onValueChange`;
   * `emit('change')` → `onChange`; slots `#off-label`/`#on-label` → snippets `offSlot`/`onSlot`.
   */
  import type { Snippet } from "svelte";

  let {
    value = false,
    offLabel = "Inativo",
    onLabel = "Ativo",
    disabled = false,
    ariaLabel = "",
    compact = false,
    squared = false,
    activeColor = "",
    radio = false,
    offSlot,
    onSlot,
    onValueChange,
    onChange,
    class: className = "",
  }: {
    value?: boolean;
    offLabel?: string;
    onLabel?: string;
    disabled?: boolean;
    ariaLabel?: string;
    compact?: boolean;
    squared?: boolean;
    activeColor?: string;
    radio?: boolean;
    offSlot?: Snippet;
    onSlot?: Snippet;
    onValueChange?: (value: boolean) => void;
    onChange?: (value: boolean) => void;
    class?: string;
  } = $props();

  const ariaLabelFallback = $derived(`${offLabel} ou ${onLabel}`);

  function toggle() {
    if (disabled) return;
    const next = !value;
    onValueChange?.(next);
    onChange?.(next);
  }

  function onKeydown(e: KeyboardEvent) {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
      return;
    }
    if (e.key === "ArrowLeft" && value) {
      e.preventDefault();
      toggle();
    }
    if (e.key === "ArrowRight" && !value) {
      e.preventDefault();
      toggle();
    }
  }

  const rootClasses = $derived(
    [
      "arcana-switch-segmented",
      value ? "is-on" : "",
      disabled ? "is-disabled" : "",
      compact ? "is-compact" : "",
      squared ? "is-squared" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );

  const rootStyle = $derived(activeColor ? `--seg-active: ${activeColor};` : undefined);
</script>

<div
  class={rootClasses}
  style={rootStyle}
  role="switch"
  aria-checked={Boolean(value)}
  aria-label={ariaLabel || ariaLabelFallback || undefined}
  aria-disabled={disabled}
  tabindex={disabled ? -1 : 0}
  onclick={toggle}
  onkeydown={onKeydown}
>
  <div class="arcana-switch-segmented__indicator" aria-hidden="true"></div>

  <div class="arcana-switch-segmented__option arcana-switch-segmented__option--off">
    {#if radio}<span class="arcana-switch-segmented__radio" aria-hidden="true"></span>{/if}
    {#if offSlot}{@render offSlot()}{:else}{offLabel}{/if}
  </div>
  <div class="arcana-switch-segmented__option arcana-switch-segmented__option--on">
    {#if radio}<span class="arcana-switch-segmented__radio" aria-hidden="true"></span>{/if}
    {#if onSlot}{@render onSlot()}{:else}{onLabel}{/if}
  </div>
</div>
