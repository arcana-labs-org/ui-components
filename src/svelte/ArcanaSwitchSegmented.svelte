<script lang="ts">
  /**
   * `<ArcanaSwitchSegmented>` — Svelte 5 port. Reproduz `<div class="arcana-switch-segmented">`
   * (+ `is-on`/`is-disabled`/`is-compact`/`is-squared`), o `__indicator` e as duas metades
   * `__option--off`/`__option--on` (com `__radio` opcional), idêntico ao SFC.
   *
   * Equivalências (parity com React): `modelValue` → `value` + `onValueChange`;
   * `emit('change')` → `onChange`; slots `#off-label`/`#on-label` → snippets `offSlot`/`onSlot`.
   *
   * `offIcon`/`onIcon` (classe FontAwesome) viram um `<i class="arcana-switch-segmented__icon">`
   * decorativo antes do texto de cada lado; `offIconColor`/`onIconColor` aplicam `color` inline
   * (vence o CSS, inclusive no lado ativo). Com o label vazio (`offLabel=""`) o lado fica
   * icon-only, com o ícone centralizado — nenhum texto é forçado.
   */
  import type { Snippet } from "svelte";

  let {
    value = false,
    offLabel = "Inativo",
    onLabel = "Ativo",
    offIcon = "",
    onIcon = "",
    offIconColor = "",
    onIconColor = "",
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
    /** Classe FontAwesome do ícone da opção esquerda (ex: `"fa-solid fa-moon"`). */
    offIcon?: string;
    /** Classe FontAwesome do ícone da opção direita (ex: `"fa-solid fa-sun"`). */
    onIcon?: string;
    /** Cor inline do `offIcon` (qualquer string CSS válida). */
    offIconColor?: string;
    /** Cor inline do `onIcon`. */
    onIconColor?: string;
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

  // Labels vazios (modo icon-only) são descartados pra não gerar " ou ".
  const ariaLabelFallback = $derived([offLabel, onLabel].filter(Boolean).join(" ou "));

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
    {#if offIcon}<i
        class={`arcana-switch-segmented__icon ${offIcon}`}
        style={offIconColor ? `color: ${offIconColor};` : undefined}
        aria-hidden="true"
      ></i>{/if}
    {#if offSlot}{@render offSlot()}{:else if offLabel}{offLabel}{/if}
  </div>
  <div class="arcana-switch-segmented__option arcana-switch-segmented__option--on">
    {#if radio}<span class="arcana-switch-segmented__radio" aria-hidden="true"></span>{/if}
    {#if onIcon}<i
        class={`arcana-switch-segmented__icon ${onIcon}`}
        style={onIconColor ? `color: ${onIconColor};` : undefined}
        aria-hidden="true"
      ></i>{/if}
    {#if onSlot}{@render onSlot()}{:else if onLabel}{onLabel}{/if}
  </div>
</div>
