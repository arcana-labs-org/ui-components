import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,
  TemplateRef
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { CurrencyFormatter } from "../core/currency";

/**
 * `ArcanaInputCurrencyComponent` — Angular port do SFC Vue `InputCurrency`. Input de moeda BRL.
 *
 * Decisão sobre a lib (mesma do React — sem deps novas):
 * - O SFC usa `v-money3` (Vue-only). Reimplementamos a mesma máscara de moeda right-to-left
 *   (dígitos preenchem dos centavos pra cima), mantendo markup/classes (`icur-arcana-field`/
 *   `icur-arcana-input` no modo shadcn; `input-group`/`form-control` no Bootstrap).
 * - Comportamento observável preservado: o `modelValue` emitido é a STRING mascarada BRL
 *   (ex. `"1.234,56"`), igual ao default do v-money3 no SFC.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change'|'enter'|'blur')`
 *   → `@Output() change`/`enter`/`blur`
 * - slots `#prepend`/`#append` → `@Input() prependTemplate`/`appendTemplate` (TemplateRef)
 */
const DECIMAL = ",";
const THOUSANDS = ".";

function digitsFromValue(v: string | number | undefined, precision: number): string {
  if (v == null || v === "") return "";
  if (typeof v === "number") {
    return String(Math.round(Math.abs(v) * Math.pow(10, precision)));
  }
  const s = String(v);
  if (s.includes(DECIMAL)) return s.replace(/\D/g, "");
  const n = parseFloat(s);
  if (!isFinite(n)) return s.replace(/\D/g, "");
  return String(Math.round(Math.abs(n) * Math.pow(10, precision)));
}

function formatDigits(digits: string, precision: number, prefix: string): string {
  let d = digits.replace(/\D/g, "");
  if (!d) d = "0";
  if (precision > 0) d = d.padStart(precision + 1, "0");
  const cut = precision > 0 ? d.length - precision : d.length;
  let intPart = d.slice(0, cut).replace(/^0+(?=\d)/, "");
  const fracPart = precision > 0 ? d.slice(cut) : "";
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS);
  return prefix + intPart + (precision > 0 ? DECIMAL + fracPart : "");
}

@Component({
  selector: "div[arcanaInputCurrency]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "[class]": "wrapClasses" },
  template: `
    @if (prependTemplate) {
      <ng-container [ngTemplateOutlet]="prependTemplate"></ng-container>
    } @else {
      @if (showIcon && !shadcn) {
        <span class="input-group-addon"><i [class]="icon"></i></span>
      }
      @if (showIcon && shadcn) {
        <span class="icur-arcana-field__icon"><i [class]="icon"></i></span>
      }
    }

    @if (!isDisabled) {
      <input
        type="text"
        [class]="inputClasses"
        [attr.name]="name ?? null"
        [value]="display"
        (input)="onInput($event)"
        (keyup)="onKeyup($event)"
        (blur)="onBlurEvent($event)"
      />
    } @else {
      <input
        disabled
        [class]="disabledInputClasses"
        type="text"
        [value]="formattedCurrency"
        readonly
      />
    }

    @if (appendTemplate) {
      <ng-container [ngTemplateOutlet]="appendTemplate"></ng-container>
    }
  `
})
export class ArcanaInputCurrencyComponent implements OnChanges {
  @Input() value: string | number = "";
  @Input() disabled: boolean | number = false;
  @Input() fraction = 2;
  @Input() name?: string;
  @Input() showIcon = true;
  @Input() prefix = "";
  @Input() icon = "icon-coin-dollar";
  @Input() formatCurrency = true;
  @Input() shadcn = false;
  @Input() prependTemplate?: TemplateRef<unknown>;
  @Input() appendTemplate?: TemplateRef<unknown>;
  @Input() className = "";

  @Output() valueChange = new EventEmitter<string>();
  @Output() change = new EventEmitter<unknown>();
  @Output() enter = new EventEmitter<KeyboardEvent>();
  @Output() blur = new EventEmitter<FocusEvent>();

  display = "";

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["value"] || changes["fraction"] || changes["prefix"]) {
      const incoming = digitsFromValue(this.value, this.fraction);
      const current = this.display.replace(/\D/g, "");
      if (incoming.replace(/^0+(?=\d)/, "") !== current.replace(/^0+(?=\d)/, "")) {
        this.display = formatDigits(incoming, this.fraction, this.prefix);
      }
    }
  }

  get isDisabled(): boolean {
    return Boolean(this.disabled);
  }

  get formattedCurrency(): string {
    return String(this.formatCurrency ? CurrencyFormatter.format(this.value || 0) : this.value);
  }

  get inputClasses(): string {
    return [
      this.shadcn ? "icur-arcana-input" : "form-control",
      this.shadcn && this.showIcon ? "has-icon" : "",
      this.className
    ].filter(Boolean).join(" ");
  }

  get disabledInputClasses(): string {
    return [
      this.shadcn ? "icur-arcana-input" : "form-control",
      this.shadcn && this.showIcon ? "has-icon" : "",
      "full-width"
    ].filter(Boolean).join(" ");
  }

  get wrapClasses(): string {
    if (this.shadcn) {
      return ["icur-arcana-field", this.isDisabled ? "is-disabled" : ""].filter(Boolean).join(" ");
    }
    return this.showIcon ? "input-group" : "";
  }

  onInput(e: Event): void {
    const digits = (e.target as HTMLInputElement).value.replace(/\D/g, "");
    const formatted = formatDigits(digits, this.fraction, this.prefix);
    this.display = formatted;
    this.valueChange.emit(formatted);
  }

  onKeyup(e: KeyboardEvent): void {
    if (e.key === "Enter") this.enter.emit(e);
  }

  onBlurEvent(e: FocusEvent): void {
    this.change.emit(this.display);
    this.blur.emit(e);
  }
}
