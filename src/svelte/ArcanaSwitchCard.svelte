<script lang="ts">
  import type { Snippet } from "svelte";

  /**
   * `<ArcanaSwitchCard>` — Svelte 5 port. Toggle full-width de alto impacto (card inverte
   * pra zinc-900 quando ativo). Reproduz `<button class="arcana-switch-card">` (+ `is-on`,
   * `is-disabled`), o ícone (`__icon`), textos (`__text`/`__title`/`__status`) e o switch
   * visual interno custom (`__switch`/`__switch-thumb`), idêntico ao SFC.
   *
   * Equivalências Vue → Svelte 5:
   * - `modelValue` (v-model) → prop `value` + `onValueChange`; `emit('change')` → `onChange`
   * - slots `#icon`/`#title`/`#status` → props `iconNode`/`title`/`status` (Snippet) + `icon`
   */
  let {
    value = false,
    title = "",
    statusOn = "ATIVO",
    statusOff = "DESLIGADO",
    icon = "",
    iconNode,
    status,
    disabled = false,
    ariaLabel = "",
    onValueChange,
    onChange,
    class: className = "",
  }: {
    value?: boolean;
    title?: string | Snippet;
    statusOn?: string;
    statusOff?: string;
    icon?: string;
    iconNode?: Snippet;
    status?: string | Snippet;
    disabled?: boolean;
    ariaLabel?: string;
    onValueChange?: (value: boolean) => void;
    onChange?: (value: boolean) => void;
    class?: string;
  } = $props();

  const hasIcon = $derived(Boolean(icon) || Boolean(iconNode));
  const currentStatus = $derived(value ? statusOn : statusOff);
  const hasStatus = $derived(Boolean(currentStatus) || Boolean(status));

  const rootClasses = $derived(
    ["arcana-switch-card", value ? "is-on" : "", disabled ? "is-disabled" : "", className]
      .filter(Boolean)
      .join(" ")
  );

  const ariaLabelText = $derived(
    ariaLabel || (typeof title === "string" ? title : "") || undefined
  );

  function toggle() {
    if (disabled) return;
    const next = !value;
    onValueChange?.(next);
    onChange?.(next);
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  }
</script>

<button
  type="button"
  class={rootClasses}
  role="switch"
  aria-checked={Boolean(value)}
  aria-label={ariaLabelText}
  {disabled}
  onclick={toggle}
  onkeydown={onKeydown}
>
  {#if hasIcon}
    <span class="arcana-switch-card__icon" aria-hidden="true">
      {#if iconNode}{@render iconNode()}{:else if icon}<i class={icon}></i>{/if}
    </span>
  {/if}

  <div class="arcana-switch-card__text">
    <div class="arcana-switch-card__title">
      {#if typeof title === "function"}{@render title()}{:else}{title}{/if}
    </div>
    {#if hasStatus}
      <div class="arcana-switch-card__status">
        {#if status}{#if typeof status === "function"}{@render status()}{:else}{status}{/if}{:else}{currentStatus}{/if}
      </div>
    {/if}
  </div>

  <span class="arcana-switch-card__switch" aria-hidden="true">
    <span class="arcana-switch-card__switch-thumb"></span>
  </span>
</button>
