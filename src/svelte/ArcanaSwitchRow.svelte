<script lang="ts">
  import type { Snippet } from "svelte";
  import ArcanaSwitch from "./ArcanaSwitch.svelte";

  /**
   * `<ArcanaSwitchRow>` — Svelte 5 port. Toggle full-width "linha de configuração".
   * Reproduz o `<button class="arcana-switch-row">` (+ `is-on`, `is-disabled`), os textos
   * (`__text`/`__title`/`__sub`) e o `<ArcanaSwitch class="arcana-switch-row__switch">`
   * interno (aria-hidden, sem click próprio), idêntico ao SFC.
   *
   * Equivalências Vue → Svelte 5:
   * - `modelValue` (v-model) → prop `value` + `onValueChange`; `emit('change')` → `onChange`
   * - slots `#label`/`#description` → props `label`/`description` (`string | Snippet`)
   */
  let {
    value = false,
    label = "",
    description,
    disabled = false,
    ariaLabel = "",
    onValueChange,
    onChange,
    class: className = "",
  }: {
    value?: boolean;
    label?: string | Snippet;
    description?: string | Snippet;
    disabled?: boolean;
    ariaLabel?: string;
    onValueChange?: (value: boolean) => void;
    onChange?: (value: boolean) => void;
    class?: string;
  } = $props();

  const hasDescription = $derived(Boolean(description));

  const rootClasses = $derived(
    ["arcana-switch-row", value ? "is-on" : "", disabled ? "is-disabled" : "", className]
      .filter(Boolean)
      .join(" ")
  );

  const ariaLabelText = $derived(
    ariaLabel || (typeof label === "string" ? label : "") || undefined
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
  <div class="arcana-switch-row__text">
    <div class="arcana-switch-row__title">
      {#if typeof label === "function"}{@render label()}{:else}{label}{/if}
    </div>
    {#if hasDescription}
      <div class="arcana-switch-row__sub">
        {#if typeof description === "function"}{@render description()}{:else}{description}{/if}
      </div>
    {/if}
  </div>

  <ArcanaSwitch
    class="arcana-switch-row__switch"
    value={Boolean(value)}
    {disabled}
    tabindex={-1}
    aria-hidden={true}
  />
</button>
