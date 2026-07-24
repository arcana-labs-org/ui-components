<script lang="ts">
  import type { Snippet } from "svelte";

  /**
   * `<ArcanaCheckbox>` — Svelte 5 port. Reproduz o `<label class="arcana-checkbox">` com
   * `<input type="checkbox" class="arcana-checkbox__input">` NATIVO + a pintura
   * (`arcana-checkbox__box`/`__icon`/`__label`), idêntico ao SFC Vue.
   *
   * Equivalências Vue → Svelte 5:
   * - `modelValue` (v-model) → prop `value` + `onValueChange`
   * - `emit('change')` → `onChange` (mesmo booleano)
   * - slot default → snippet `children` (fallback pro `label`)
   */
  let {
    value = false,
    indeterminate = false,
    disabled = false,
    label = "",
    name = "",
    ariaLabel = "",
    onValueChange,
    onChange,
    class: className = "",
    children,
  }: {
    value?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
    ariaLabel?: string;
    onValueChange?: (checked: boolean) => void;
    onChange?: (checked: boolean) => void;
    class?: string;
    children?: Snippet;
  } = $props();

  const rootClasses = $derived(
    [
      "arcana-checkbox",
      value || indeterminate ? "arcana-checkbox--checked" : "",
      disabled ? "arcana-checkbox--disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );

  function handleChange(checked: boolean) {
    onValueChange?.(checked);
    onChange?.(checked);
  }
</script>

<label class={rootClasses}>
  <input
    type="checkbox"
    class="arcana-checkbox__input"
    checked={value}
    {disabled}
    name={name || undefined}
    aria-label={ariaLabel || undefined}
    onchange={(e) => handleChange((e.target as HTMLInputElement).checked)}
  />

  <span class="arcana-checkbox__box" aria-hidden="true">
    {#if indeterminate}
      <i class="fa-solid fa-minus arcana-checkbox__icon"></i>
    {:else if value}
      <i class="fa-solid fa-check arcana-checkbox__icon"></i>
    {/if}
  </span>

  {#if children || label}
    <span class="arcana-checkbox__label">
      {#if children}{@render children()}{:else}{label}{/if}
    </span>
  {/if}
</label>
