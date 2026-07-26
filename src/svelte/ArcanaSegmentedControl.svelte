<script lang="ts">
  /**
   * `<ArcanaSegmentedControl>` — Svelte 5 port. Segmented control de N opções. Reproduz
   * `<div class="arcana-segmented-control arcana-segmented-control--md">` (+ `is-compact`/
   * `is-squared`/`is-disabled`), cada `<button class="arcana-segmented-control__option">`
   * (+ `is-active`), o `__radio`/`__icon` opcionais e o `__empty`, idêntico ao SFC.
   *
   * Equivalências Vue → Svelte 5:
   * - `modelValue` (v-model) → prop `value` + `onValueChange`; `emit('change')` → `onChange`
   * - `--seg-active` inline style preservado
   * - `iconColor` por opção → inline style `color` no `<i>` (vence o CSS, inclusive na ativa)
   *
   * Modo só-ícone: opção com `label` vazio/ausente renderiza só o `<i>` — o `<span>` de texto
   * não é emitido (nada de span vazio comendo o `gap`) e o botão ganha
   * `.arcana-segmented-control__option--icon-only` (gap zerado + padding simétrico pelos tokens
   * do `size`). Como o `<i>` é `aria-hidden`, quem nomeia o botão é o `ariaLabel` da opção.
   */
  import ArcanaRadioIndicator from "./ArcanaRadioIndicator.svelte";

  export interface SegmentedOption {
    /**
     * Rótulo visível do segmento. Vazio (`""`) ou ausente ativa o modo **só-ícone**:
     * o `<span>` de texto nem é renderizado e o botão recebe a classe
     * `arcana-segmented-control__option--icon-only`. Nesse modo, informe `ariaLabel`
     * — o ícone é `aria-hidden`, então sem ele o botão fica sem nome acessível.
     */
    label?: string;
    value: string | number;
    disabled?: boolean;
    /** Classe do ícone (ex: FontAwesome `fa-solid fa-truck`). */
    icon?: string;
    /**
     * Cor do ícone desta opção. Qualquer string CSS válida (hex, rgb, `var(...)`).
     * Aplicada como inline style no `<i>`, então vence o CSS e permanece válida
     * inclusive quando a opção está ativa (fundo escuro/colorido). Sem valor, o
     * ícone herda a cor do texto do segmento.
     */
    iconColor?: string;
    /**
     * Nome acessível do botão desta opção (`aria-label`). O nome final é
     * `ariaLabel || label`; com os dois vazios o atributo não é emitido.
     * Indispensável no modo só-ícone; com `label` presente é opcional.
     * No modo só-ícone vira também o `title` (tooltip nativa).
     */
    ariaLabel?: string;
  }

  export type SegmentedControlSize = "sm" | "md" | "lg" | "xl";

  let {
    value = null,
    options = [],
    disabled = false,
    size = undefined,
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
    /**
     * Altura/padding/fonte/ícone. Default `"md"`; `"sm"` equivale ao antigo `compact`.
     * Custom via `--arcana-segmented-control-*` (height/font-size/padding-x/icon-size/padding).
     */
    size?: SegmentedControlSize;
    /** @deprecated Use `size="sm"`. Só tem efeito quando `size` não é informado. */
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

  // `size` explícito vence; sem ele, o `compact` legado mapeia pra `sm`.
  const effectiveSize = $derived(size ?? (compact ? "sm" : "md"));

  /**
   * Tamanho do círculo de radio conforme o tamanho do controle: os antigos 14/16/18px
   * viram sm/md/lg do `<ArcanaRadioIndicator>` (base sm/md → sm, lg → md, xl → lg).
   */
  const indicatorSize = $derived<"sm" | "md" | "lg">(
    effectiveSize === "xl" ? "lg" : effectiveSize === "lg" ? "md" : "sm"
  );

  /** `false` quando o `label` é vazio/ausente → modo só-ícone (span de texto nem sai). */
  function hasLabel(opt: SegmentedOption): boolean {
    return (opt.label ?? "") !== "";
  }

  /** Nome acessível do botão: `ariaLabel` da opção, com fallback no `label` visível. */
  function optionName(opt: SegmentedOption): string {
    return opt.ariaLabel || opt.label || "";
  }

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
      "arcana-segmented-control",
      `arcana-segmented-control--${effectiveSize}`,
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
      class={[
        "arcana-segmented-control__option",
        opt.value === value ? "is-active" : "",
        hasLabel(opt) ? "" : "arcana-segmented-control__option--icon-only",
      ]
        .filter(Boolean)
        .join(" ")}
      role="radio"
      aria-checked={opt.value === value}
      aria-label={optionName(opt) || undefined}
      title={!hasLabel(opt) ? optionName(opt) || undefined : undefined}
      disabled={disabled || opt.disabled}
      onclick={() => select(opt)}
    >
      {#if radio}<ArcanaRadioIndicator tone="on-solid" size={indicatorSize} checked={opt.value === value} />{/if}
      {#if opt.icon}<i
          class={`arcana-segmented-control__icon ${opt.icon}`}
          style={opt.iconColor ? `color: ${opt.iconColor};` : undefined}
          aria-hidden="true"
        ></i>{/if}
      {#if hasLabel(opt)}<span>{opt.label}</span>{/if}
    </button>
  {/each}

  {#if !normalizedOptions.length}
    <span class="arcana-segmented-control__empty">{emptyText}</span>
  {/if}
</div>
