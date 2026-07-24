<script lang="ts">
  /**
   * `<ArcanaSwitch>` — Svelte 5 port. Reproduz o `<button role="switch" class="arcana-switch">`
   * (+ `arcana-switch--${size}`, `is-checked`, `is-disabled`), o `span.arcana-switch__thumb`
   * e o `<input class="arcana-switch__hidden-input">` opcional (quando `name`), idêntico ao SFC.
   *
   * Equivalências Vue → Svelte 5:
   * - `modelValue` (v-model) → prop `value` + `onValueChange`
   * - `emit('change')` → `onChange`
   */
  let {
    value = false,
    disabled = false,
    size = "md",
    name = "",
    ariaLabel = "",
    onValueChange,
    onChange,
    class: className = "",
    tabindex,
    "aria-hidden": ariaHidden,
  }: {
    value?: boolean;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    name?: string;
    ariaLabel?: string;
    onValueChange?: (value: boolean) => void;
    onChange?: (value: boolean) => void;
    class?: string;
    /** Reproduz `tabindex`/`aria-hidden` que o ArcanaSwitchRow passa ao switch interno. */
    tabindex?: number;
    "aria-hidden"?: boolean;
  } = $props();

  const isChecked = $derived(Boolean(value));

  const rootClasses = $derived(
    [
      "arcana-switch",
      `arcana-switch--${size}`,
      isChecked ? "is-checked" : "",
      disabled ? "is-disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );

  function toggle() {
    if (disabled) return;
    const next = !isChecked;
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
  role="switch"
  class={rootClasses}
  aria-checked={isChecked}
  aria-label={ariaLabel || undefined}
  aria-hidden={ariaHidden}
  {disabled}
  {tabindex}
  onclick={toggle}
  onkeydown={onKeydown}
>
  <span class="arcana-switch__thumb" aria-hidden="true"></span>

  {#if name}
    <input
      type="checkbox"
      class="arcana-switch__hidden-input"
      {name}
      checked={isChecked}
      {disabled}
      tabindex="-1"
      aria-hidden="true"
      onclick={(e) => e.stopPropagation()}
      onchange={(e) => e.stopPropagation()}
    />
  {/if}
</button>
