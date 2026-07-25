import {
  ChangeDetectionStrategy, Component, Input
} from "@angular/core";

import { formatStatisticValue } from "../core/statistic";

/**
 * `ArcanaStatisticComponent` — Angular port do SFC Vue `ArcanaStatistic`.
 *
 * Attribute selector num `<div>` (`<div arcanaStatistic>`): número em destaque com rótulo.
 * Reproduz `.arcana-statistic` (+ `--{size}`/`--{tone}`), o `__title` e o `__content` com
 * `__icon`/`__prefix`/`__value`/`__suffix`, idêntico ao Vue/React/Svelte. Preserva o inline
 * `--arcana-statistic-value-color` do `valueColor`.
 *
 * Vue → Angular:
 * - slots `#title`/`#prefix`/`#suffix` → conteúdo projetado `[statTitle]`/`[statPrefix]`/
 *   `[statSuffix]` (fallback: as props `title`/`prefix`/`suffix`). Como no
 *   `ArcanaSummaryTile`, o wrapper só é renderizado quando a prop correspondente tem valor
 *   — projete o conteúdo E preencha a prop (mesmo que com um placeholder) pra exibi-lo.
 *
 * A formatação numérica vive em `core/statistic.ts` (framework-agnóstica e testada).
 */
export type StatisticTone = "neutral" | "success" | "danger" | "warning" | "info";
export type StatisticSize = "sm" | "md" | "lg" | "xl";

@Component({
  selector: "div[arcanaStatistic]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[style.--arcana-statistic-value-color]": "valueColor || null"
  },
  template: `
    @if (hasTitle) {
      <div class="arcana-statistic__title">
        <ng-content select="[statTitle]">{{ resolvedTitle }}</ng-content>
      </div>
    }

    <div class="arcana-statistic__content">
      @if (icon) {
        <span class="arcana-statistic__icon" aria-hidden="true"><i [class]="icon"></i></span>
      }

      @if (prefix) {
        <span class="arcana-statistic__prefix">
          <ng-content select="[statPrefix]">{{ prefix }}</ng-content>
        </span>
      }

      <span class="arcana-statistic__value">{{ displayValue }}</span>

      @if (suffix) {
        <span class="arcana-statistic__suffix">
          <ng-content select="[statSuffix]">{{ suffix }}</ng-content>
        </span>
      }
    </div>
  `
})
export class ArcanaStatisticComponent {
  /** Número exibido. String passa intacta (escape hatch pra valor já formatado). */
  @Input() value: number | string | null = null;
  @Input() title = "";
  /** Alias de `title` (`title` vence quando os dois vêm). */
  @Input() label = "";
  /** Casas decimais fixas. Omitido = mantém as casas do próprio número. */
  @Input() precision?: number;
  /** Separador de milhar (default `","`); `""` desliga o agrupamento. */
  @Input() groupSeparator = ",";
  /** Separador decimal (default `"."`). */
  @Input() decimalSeparator = ".";
  /** Quando informado, `Intl.NumberFormat` assume e ignora os separadores manuais. */
  @Input() locale = "";
  /** Controle total da string final — tem precedência sobre todo o resto. */
  @Input() formatter?: (value: number | string | null) => string;
  @Input() prefix = "";
  @Input() suffix = "";
  @Input() tone: StatisticTone = "neutral";
  /** Cor CSS arbitrária do valor; vence o `tone`. */
  @Input() valueColor = "";
  @Input() size: StatisticSize = "md";
  /** Classe do ícone (ex: `"fa-solid fa-arrow-trend-up"`). */
  @Input() icon = "";
  @Input() className = "";

  get resolvedTitle(): string {
    return this.title || this.label;
  }

  get hasTitle(): boolean {
    return Boolean(this.resolvedTitle);
  }

  get displayValue(): string {
    if (this.formatter) return this.formatter(this.value ?? null);
    return formatStatisticValue(this.value, {
      precision: this.precision,
      groupSeparator: this.groupSeparator,
      decimalSeparator: this.decimalSeparator,
      locale: this.locale || undefined
    });
  }

  get rootClass(): string {
    return [
      "arcana-statistic",
      `arcana-statistic--${this.size}`,
      `arcana-statistic--${this.tone}`,
      this.className
    ].filter(Boolean).join(" ");
  }
}
