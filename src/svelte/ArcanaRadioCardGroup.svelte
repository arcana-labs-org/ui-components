<script lang="ts" module>
  export interface RadioCardOption {
    label: string;
    value: string | number | boolean | null;
    description?: string;
    icon?: string;
    badge?: string;
    disabled?: boolean;
    iconBg?: string;
    iconColor?: string;
    iconBorder?: string;
  }

  let uidCounter = 0;
</script>

<script lang="ts">
  /**
   * `<ArcanaRadioCardGroup>` — Svelte 5 port. Reproduz `<div class="arcana-radio-card-group">`
   * (+ `--inline`/`--grid`/`--radio-end`/`--icon-end`), cada `<label class="arcana-radio-card">`
   * (+ `is-selected`/`is-disabled`), o `__input` nativo, `__radio`/`__dot`, `__icon`,
   * `__content`/`__label`/`__desc` e `__badge`, idêntico ao SFC.
   *
   * Posicionamento (puramente CSS, DOM inalterado):
   * - `radioPosition` — `'start'` (default) | `'end'`: lado do círculo do radio.
   * - `iconPosition` — `'start'` (default) | `'end'`: lado do chip do ícone. Em `'end'`
   *   o ícone vem depois do texto/badge, encostado na direita. Independente de
   *   `radioPosition` — as 4 permutações são suportadas.
   *
   * Equivalências (parity com React): `modelValue` → `value` + `onValueChange`;
   * `emit('change')` → `onChange`.
   */
  import ArcanaRadioIndicator from "./ArcanaRadioIndicator.svelte";

  let {
    value = null,
    options,
    name = "",
    ariaLabel = "",
    disabled = false,
    inline = false,
    columns = 0,
    radioPosition = "start",
    iconPosition = "start",
    onValueChange,
    onChange,
    class: className = "",
  }: {
    value?: string | number | boolean | null;
    options: RadioCardOption[];
    name?: string;
    ariaLabel?: string;
    disabled?: boolean;
    inline?: boolean;
    columns?: number;
    radioPosition?: "start" | "end";
    iconPosition?: "start" | "end";
    onValueChange?: (value: string | number | boolean | null) => void;
    onChange?: (value: string | number | boolean | null) => void;
    class?: string;
  } = $props();

  const uid = ++uidCounter;
  const groupName = $derived(name || `arcana-radio-card-group-${uid}`);
  const normalizedOptions = $derived(options ?? []);

  const isSelected = (opt: RadioCardOption) => opt.value === value;
  const isOptionDisabled = (opt: RadioCardOption) => Boolean(disabled || opt.disabled);

  function handleChange(opt: RadioCardOption) {
    if (isOptionDisabled(opt)) return;
    onValueChange?.(opt.value);
    onChange?.(opt.value);
  }

  const rootClasses = $derived(
    [
      "arcana-radio-card-group",
      inline && !columns ? "arcana-radio-card-group--inline" : "",
      columns > 0 ? "arcana-radio-card-group--grid" : "",
      radioPosition === "end" ? "arcana-radio-card-group--radio-end" : "",
      iconPosition === "end" ? "arcana-radio-card-group--icon-end" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );

  const rootStyle = $derived(
    columns > 0 ? `grid-template-columns:repeat(${columns}, minmax(0, 1fr));` : undefined
  );
</script>

<div class={rootClasses} style={rootStyle} role="radiogroup" aria-label={ariaLabel}>
  {#each normalizedOptions as opt (String(opt.value))}
    <label
      class={[
        "arcana-radio-card",
        isSelected(opt) ? "is-selected" : "",
        isOptionDisabled(opt) ? "is-disabled" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        type="radio"
        class="arcana-radio-card__input"
        name={groupName}
        value={String(opt.value)}
        checked={isSelected(opt)}
        disabled={isOptionDisabled(opt)}
        onchange={() => handleChange(opt)}
      />

      <ArcanaRadioIndicator checked={isSelected(opt)} size="lg" tone="solid" />

      {#if opt.icon}
        <span
          class="arcana-radio-card__icon"
          style={[
            opt.iconBg ? `background:${opt.iconBg};` : "",
            opt.iconColor ? `color:${opt.iconColor};` : "",
            opt.iconBorder ? `border:1px solid ${opt.iconBorder};` : "",
          ]
            .filter(Boolean)
            .join("") || undefined}
          aria-hidden="true"
        >
          <i class={opt.icon}></i>
        </span>
      {/if}

      <span class="arcana-radio-card__content">
        <span class="arcana-radio-card__label">{opt.label}</span>
        {#if opt.description}
          <span class="arcana-radio-card__desc">{opt.description}</span>
        {/if}
      </span>

      {#if opt.badge}
        <span class="arcana-radio-card__badge">{opt.badge}</span>
      {/if}
    </label>
  {/each}
</div>
