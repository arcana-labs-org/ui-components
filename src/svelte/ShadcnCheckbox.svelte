<script lang="ts">
  import type { Snippet } from "svelte";

  /**
   * `<ShadcnCheckbox>` — Svelte 5 port. Reproduz o `<label class="shadcn-checkbox">` com
   * `<input type="checkbox" class="shadcn-checkbox__input">` NATIVO + a pintura
   * (`shadcn-checkbox__box`/`__icon`/`__label`), idêntico ao SFC Vue.
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
      "shadcn-checkbox",
      value || indeterminate ? "shadcn-checkbox--checked" : "",
      disabled ? "shadcn-checkbox--disabled" : "",
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
    class="shadcn-checkbox__input"
    checked={value}
    {disabled}
    name={name || undefined}
    aria-label={ariaLabel || undefined}
    onchange={(e) => handleChange((e.target as HTMLInputElement).checked)}
  />

  <span class="shadcn-checkbox__box" aria-hidden="true">
    {#if indeterminate}
      <i class="fa-solid fa-minus shadcn-checkbox__icon"></i>
    {:else if value}
      <i class="fa-solid fa-check shadcn-checkbox__icon"></i>
    {/if}
  </span>

  {#if children || label}
    <span class="shadcn-checkbox__label">
      {#if children}{@render children()}{:else}{label}{/if}
    </span>
  {/if}
</label>
