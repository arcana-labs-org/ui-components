import {
  ChangeDetectionStrategy, Component, Input
} from "@angular/core";

import { clampProgressValue, formatProgressLabel, progressPercent } from "../core/progress";

/**
 * `ArcanaProgressComponent` — Angular port do SFC Vue `ArcanaProgress`.
 *
 * Attribute selector num `<div>` (`<div arcanaProgress>`): barra de progresso determinada ou
 * indeterminada. Reproduz `.arcana-progress` (+ `--{size}`/`--{variant}`/`--{tone}`/
 * `--radius-{radius}`/`is-indeterminate`), o `__track` (que carrega `role="progressbar"` e os
 * `aria-value*`), o `__indicator` e o `__value`, idêntico ao Vue/React/Svelte.
 *
 * Vue → Angular:
 * - slot `#value` → conteúdo projetado `[progressValue]` (fallback: o rótulo `NN%`)
 *
 * Acessibilidade: `aria-valuemin`/`aria-valuemax` sempre; `aria-valuenow`/`aria-valuetext` só
 * no determinado — omitidos quando `value` é `null`/`undefined`.
 */
export type ProgressTone = "accent" | "success" | "danger" | "warning" | "info";
export type ProgressSize = "sm" | "md" | "lg";
export type ProgressVariant = "solid" | "soft";
export type ProgressRadius = "none" | "sm" | "md" | "lg" | "full";

@Component({
  selector: "div[arcanaProgress]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "rootClass" },
  template: `
    <div
      class="arcana-progress__track"
      role="progressbar"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="normalizedMax"
      [attr.aria-valuenow]="isIndeterminate ? null : clampedValue"
      [attr.aria-valuetext]="isIndeterminate ? null : percentLabel"
      [attr.aria-label]="ariaLabel || null"
    >
      <!-- No indeterminado a largura é fixa pelo CSS (a animação é que anda). -->
      <div class="arcana-progress__indicator" [style.width]="indicatorWidth"></div>
    </div>

    @if (showValue) {
      <span class="arcana-progress__value">
        <ng-content select="[progressValue]">{{
          isIndeterminate ? indeterminateText : percentLabel
        }}</ng-content>
      </span>
    }
  `
})
export class ArcanaProgressComponent {
  /** 0–`max`. `null`/`undefined` = indeterminado. Fora da faixa é clampado. */
  @Input() value: number | null = null;
  /** Teto da escala (default `100`). `max <= 0` cai pro default. */
  @Input() max = 100;
  @Input() size: ProgressSize = "md";
  @Input() variant: ProgressVariant = "solid";
  @Input() tone: ProgressTone = "accent";
  /** Mostra o rótulo `NN%` ao lado da barra. */
  @Input() showValue = false;
  /** Rótulo usado no modo indeterminado (default `"…"`). */
  @Input() indeterminateText = "…";
  @Input() radius: ProgressRadius = "full";
  @Input() ariaLabel = "";
  @Input() className = "";

  get percent(): number | null {
    return progressPercent(this.value, this.max);
  }

  get isIndeterminate(): boolean {
    return this.percent === null;
  }

  get clampedValue(): number | null {
    return clampProgressValue(this.value, this.max);
  }

  get percentLabel(): string {
    return formatProgressLabel(this.value, this.max);
  }

  get normalizedMax(): number {
    return Number.isFinite(this.max) && this.max > 0 ? this.max : 100;
  }

  get indicatorWidth(): string | null {
    const percent = this.percent;
    return percent === null ? null : `${percent}%`;
  }

  get rootClass(): string {
    return [
      "arcana-progress",
      `arcana-progress--${this.size}`,
      `arcana-progress--${this.variant}`,
      `arcana-progress--${this.tone}`,
      `arcana-progress--radius-${this.radius}`,
      this.isIndeterminate ? "is-indeterminate" : "",
      this.className
    ].filter(Boolean).join(" ");
  }
}
