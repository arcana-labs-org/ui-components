<script lang="ts">
  /**
   * `<ArcanaStatistic>` — Svelte 5 port. Número em destaque com rótulo. Reproduz
   * `<div class="arcana-statistic arcana-statistic--{size} arcana-statistic--{tone}">`, o
   * `__title` e o `__content` com `__icon`/`__prefix`/`__value`/`__suffix`, idêntico ao SFC.
   *
   * Equivalências: slots `#title`/`#prefix`/`#suffix` → snippets `titleSlot`/`prefixSlot`/
   * `suffixSlot`; `valueColor` → inline `--arcana-statistic-value-color` na raiz.
   *
   * A formatação numérica vive em `core/statistic.ts` (framework-agnóstica e testada).
   */
  import type { Snippet } from "svelte";

  import { formatStatisticValue } from "../core/statistic";

  let {
    value = null,
    title = "",
    label = "",
    precision = undefined,
    groupSeparator = ",",
    decimalSeparator = ".",
    locale = "",
    formatter = undefined,
    prefix = "",
    suffix = "",
    tone = "neutral",
    valueColor = "",
    size = "md",
    icon = "",
    titleSlot,
    prefixSlot,
    suffixSlot,
    class: className = "",
    style,
  }: {
    /** Número exibido. String passa intacta (escape hatch pra valor já formatado). */
    value?: number | string | null;
    title?: string;
    /** Alias de `title` (`title` vence quando os dois vêm). */
    label?: string;
    /** Casas decimais fixas. Omitido = mantém as casas do próprio número. */
    precision?: number;
    /** Separador de milhar (default `","`); `""` desliga o agrupamento. */
    groupSeparator?: string;
    /** Separador decimal (default `"."`). */
    decimalSeparator?: string;
    /** Quando informado, `Intl.NumberFormat` assume e ignora os separadores manuais. */
    locale?: string;
    /** Controle total da string final — tem precedência sobre todo o resto. */
    formatter?: (value: number | string | null) => string;
    prefix?: string;
    suffix?: string;
    tone?: "neutral" | "success" | "danger" | "warning" | "info";
    /** Cor CSS arbitrária do valor; vence o `tone`. */
    valueColor?: string;
    size?: "sm" | "md" | "lg" | "xl";
    /** Classe do ícone (ex: `"fa-solid fa-arrow-trend-up"`). */
    icon?: string;
    titleSlot?: Snippet;
    prefixSlot?: Snippet;
    suffixSlot?: Snippet;
    class?: string;
    style?: string;
  } = $props();

  const resolvedTitle = $derived(title || label);
  const hasTitle = $derived(Boolean(titleSlot || resolvedTitle));
  const hasPrefix = $derived(Boolean(prefixSlot || prefix));
  const hasSuffix = $derived(Boolean(suffixSlot || suffix));

  const displayValue = $derived(
    formatter
      ? formatter(value ?? null)
      : formatStatisticValue(value, {
          precision,
          groupSeparator,
          decimalSeparator,
          locale: locale || undefined,
        })
  );

  const rootClasses = $derived(
    [
      "arcana-statistic",
      `arcana-statistic--${size}`,
      `arcana-statistic--${tone}`,
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );

  const rootStyle = $derived(
    [style ?? "", valueColor ? `--arcana-statistic-value-color: ${valueColor};` : ""]
      .filter(Boolean)
      .join(" ") || undefined
  );
</script>

<div class={rootClasses} style={rootStyle}>
  {#if hasTitle}
    <div class="arcana-statistic__title">
      {#if titleSlot}{@render titleSlot()}{:else}{resolvedTitle}{/if}
    </div>
  {/if}

  <div class="arcana-statistic__content">
    {#if icon}
      <span class="arcana-statistic__icon" aria-hidden="true"><i class={icon}></i></span>
    {/if}

    {#if hasPrefix}
      <span class="arcana-statistic__prefix">
        {#if prefixSlot}{@render prefixSlot()}{:else}{prefix}{/if}
      </span>
    {/if}

    <span class="arcana-statistic__value">{displayValue}</span>

    {#if hasSuffix}
      <span class="arcana-statistic__suffix">
        {#if suffixSlot}{@render suffixSlot()}{:else}{suffix}{/if}
      </span>
    {/if}
  </div>
</div>
