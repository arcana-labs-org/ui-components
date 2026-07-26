import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from "@angular/core";
import { ArcanaRadioIndicatorComponent } from "./arcana-radio-indicator.component";

/**
 * `ArcanaRadioCardGroupComponent` — Angular port do SFC Vue `ArcanaRadioCardGroup`.
 *
 * Attribute selector num `<div>` (`<div arcanaRadioCardGroup>`): reproduz
 * `.arcana-radio-card-group` (+ `--inline`/`--grid`/`--radio-end`/`--icon-end`), cada
 * `<label class="arcana-radio-card">` (+ `is-selected`/`is-disabled`), o `__input` nativo,
 * `__radio`/`__dot`, `__icon`, `__content`/`__label`/`__desc` e `__badge`, idêntico ao Vue/React.
 *
 * Posicionamento (puramente CSS, DOM inalterado):
 * - `radioPosition` — `'start'` (default) | `'end'`: lado do círculo do radio.
 * - `iconPosition` — `'start'` (default) | `'end'`: lado do chip do ícone. Em `'end'`
 *   o ícone vem depois do texto/badge, encostado na direita. Independente de
 *   `radioPosition` — as 4 permutações são suportadas.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 */
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

@Component({
  selector: "div[arcanaRadioCardGroup]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArcanaRadioIndicatorComponent],
  host: {
    "[class]": "rootClass",
    "[style.gridTemplateColumns]": "gridTemplateColumns",
    "role": "radiogroup",
    "[attr.aria-label]": "ariaLabel || null"
  },
  template: `
    @for (opt of normalizedOptions; track $index) {
      <label
        class="arcana-radio-card"
        [class.is-selected]="isSelected(opt)"
        [class.is-disabled]="isOptionDisabled(opt)"
      >
        <input
          type="radio"
          class="arcana-radio-card__input"
          [name]="groupName"
          [value]="opt.value"
          [checked]="isSelected(opt)"
          [disabled]="isOptionDisabled(opt)"
          (change)="handleChange(opt)"
        />

        <arcana-radio-indicator [checked]="isSelected(opt)" size="lg" tone="solid"></arcana-radio-indicator>

        @if (opt.icon) {
          <span
            class="arcana-radio-card__icon"
            [style.background]="opt.iconBg || null"
            [style.color]="opt.iconColor || null"
            [style.border]="opt.iconBorder ? '1px solid ' + opt.iconBorder : null"
            aria-hidden="true"
          >
            <i [class]="opt.icon"></i>
          </span>
        }

        <span class="arcana-radio-card__content">
          <span class="arcana-radio-card__label">{{ opt.label }}</span>
          @if (opt.description) {
            <span class="arcana-radio-card__desc">{{ opt.description }}</span>
          }
        </span>

        @if (opt.badge) {
          <span class="arcana-radio-card__badge">{{ opt.badge }}</span>
        }
      </label>
    }
  `
})
export class ArcanaRadioCardGroupComponent {
  private readonly uid = ++uidCounter;

  @Input() value: string | number | boolean | null = null;
  @Input() options: RadioCardOption[] = [];
  @Input() name = "";
  @Input() ariaLabel = "";
  @Input() disabled = false;
  @Input() inline = false;
  @Input() columns = 0;
  @Input() radioPosition: "start" | "end" = "start";
  @Input() iconPosition: "start" | "end" = "start";
  @Input() className = "";

  @Output() valueChange = new EventEmitter<string | number | boolean | null>();
  @Output() change = new EventEmitter<string | number | boolean | null>();

  get groupName(): string {
    return this.name || `arcana-radio-card-group-${this.uid}`;
  }

  get normalizedOptions(): RadioCardOption[] {
    return this.options ?? [];
  }

  get gridTemplateColumns(): string | null {
    return this.columns > 0 ? `repeat(${this.columns}, minmax(0, 1fr))` : null;
  }

  get rootClass(): string {
    return [
      "arcana-radio-card-group",
      this.inline && !this.columns ? "arcana-radio-card-group--inline" : "",
      this.columns > 0 ? "arcana-radio-card-group--grid" : "",
      this.radioPosition === "end" ? "arcana-radio-card-group--radio-end" : "",
      this.iconPosition === "end" ? "arcana-radio-card-group--icon-end" : "",
      this.className
    ].filter(Boolean).join(" ");
  }

  isSelected(opt: RadioCardOption): boolean {
    return opt.value === this.value;
  }

  isOptionDisabled(opt: RadioCardOption): boolean {
    return Boolean(this.disabled || opt.disabled);
  }

  handleChange(opt: RadioCardOption): void {
    if (this.isOptionDisabled(opt)) return;
    this.valueChange.emit(opt.value);
    this.change.emit(opt.value);
  }
}
