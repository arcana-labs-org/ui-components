<script lang="ts">
  /**
   * `<ArcanaSegmentedOptions>` — Svelte 5 port. Segmented control de N opções. Reproduz
   * `<div class="arcana-segmented-options">` (+ `is-compact`/`is-squared`/`is-disabled`),
   * cada `<button class="arcana-segmented-options__option">` (+ `is-active`), o
   * `__radio`/`__icon` opcionais e o `__empty`, idêntico ao SFC.
   *
   * Equivalências Vue → Svelte 5:
   * - `modelValue` (v-model) → prop `value` + `onValueChange`; `emit('change')` → `onChange`
   * - `--seg-active` inline style preservado
   */
  export interface SegmentedOption {
    label: string;
    value: string | number;
    disabled?: boolean;
    icon?: string;
  }

  let {
    value = null,
    options = [],
    disabled = false,
    compact = false,
    squared = false,
    activeColor = "",
    radio = false,
    autoSelectFirst = false,
    ariaLabel = "",
    emptyText = "Sem opções disponíveis",
    onValueChange,
    onChange,
    class: className = "",
  }: {
    value?: string | number | null;
    options?: SegmentedOption[];
    disabled?: boolean;
    compact?: boolean;
    squared?: boolean;
    activeColor?: string;
    radio?: boolean;
    autoSelectFirst?: boolean;
    ariaLabel?: string;
    emptyText?: string;
    onValueChange?: (value: string | number) => void;
    onChange?: (value: string | number) => void;
    class?: string;
  } = $props();

  const normalizedOptions = $derived(options ?? []);

  function select(opt: SegmentedOption) {
    if (disabled || opt.disabled || opt.value === value) return;
    onValueChange?.(opt.value);
    onChange?.(opt.value);
  }

  // `autoSelectFirst`: quando as options carregam e nada está selecionado, seleciona a
  // 1ª habilitada. Reproduz o watch(options)+mounted do SFC.
  $effect(() => {
    // Depende de `options` (nova referência a cada carga dinâmica).
    void options;
    if (!autoSelectFirst || disabled) return;
    const hasValue = value !== null && value !== undefined && value !== "";
    if (hasValue) return;
    const first = normalizedOptions.find((o) => !o.disabled);
    if (!first) return;
    onValueChange?.(first.value);
    onChange?.(first.value);
  });

  const rootClasses = $derived(
    [
      "arcana-segmented-options",
      compact ? "is-compact" : "",
      squared ? "is-squared" : "",
      disabled ? "is-disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );
</script>

<div
  class={rootClasses}
  style={activeColor ? `--seg-active: ${activeColor};` : undefined}
  role="radiogroup"
  aria-label={ariaLabel || undefined}
>
  {#each normalizedOptions as opt (String(opt.value))}
    <button
      type="button"
      class={["arcana-segmented-options__option", opt.value === value ? "is-active" : ""]
        .filter(Boolean)
        .join(" ")}
      role="radio"
      aria-checked={opt.value === value}
      disabled={disabled || opt.disabled}
      onclick={() => select(opt)}
    >
      {#if radio}<span class="arcana-segmented-options__radio" aria-hidden="true"></span>{/if}
      {#if opt.icon}<i class={`arcana-segmented-options__icon ${opt.icon}`}></i>{/if}
      <span>{opt.label}</span>
    </button>
  {/each}

  {#if !normalizedOptions.length}
    <span class="arcana-segmented-options__empty">{emptyText}</span>
  {/if}
</div>
