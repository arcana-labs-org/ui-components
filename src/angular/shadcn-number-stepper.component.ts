import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from "@angular/core";

/**
 * `ShadcnNumberStepperComponent` — Angular port do SFC Vue `ShadcnNumberStepper`.
 *
 * Attribute selector num `<div>` (`<div arcanaShadcnNumberStepper>`): reproduz
 * `.shadcn-number-stepper` (+ `is-disabled`), os `__btn--decrement`/`__btn--increment`
 * e o `__input`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 */
@Component({
  selector: "div[arcanaShadcnNumberStepper]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "rootClass" },
  template: `
    <button
      type="button"
      class="shadcn-number-stepper__btn shadcn-number-stepper__btn--decrement"
      [disabled]="cannotDecrement"
      [attr.aria-label]="'Diminuir ' + (ariaLabel || 'valor')"
      (click)="decrement()"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>

    <input
      type="number"
      class="shadcn-number-stepper__input"
      [value]="value ?? ''"
      [min]="min"
      [attr.max]="maxAttr"
      [step]="step"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel || null"
      (input)="onInput($event)"
      (blur)="onBlur()"
      (keydown)="onKeydown($event)"
    />

    <button
      type="button"
      class="shadcn-number-stepper__btn shadcn-number-stepper__btn--increment"
      [disabled]="cannotIncrement"
      [attr.aria-label]="'Aumentar ' + (ariaLabel || 'valor')"
      (click)="increment()"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  `
})
export class ShadcnNumberStepperComponent {
  @Input() value: number | string | null = 0;
  @Input() min = 0;
  @Input() max = Number.POSITIVE_INFINITY;
  @Input() step = 1;
  @Input() disabled = false;
  @Input() ariaLabel = "";

  @Output() valueChange = new EventEmitter<number | null>();
  @Output() change = new EventEmitter<number>();

  get currentValue(): number {
    const n = Number(this.value);
    return Number.isFinite(n) ? n : this.min;
  }

  get cannotDecrement(): boolean {
    return this.disabled || this.currentValue <= this.min;
  }

  get cannotIncrement(): boolean {
    return this.disabled || this.currentValue >= this.max;
  }

  get maxAttr(): number | null {
    return Number.isFinite(this.max) ? this.max : null;
  }

  get rootClass(): string {
    return [
      "shadcn-number-stepper",
      this.disabled ? "is-disabled" : ""
    ].filter(Boolean).join(" ");
  }

  private clamp(v: number): number {
    return Math.min(this.max, Math.max(this.min, v));
  }

  private emitValue(v: number): void {
    const clamped = this.clamp(v);
    this.valueChange.emit(clamped);
    this.change.emit(clamped);
  }

  increment(): void {
    if (this.cannotIncrement) return;
    this.emitValue(this.currentValue + this.step);
  }

  decrement(): void {
    if (this.cannotDecrement) return;
    this.emitValue(this.currentValue - this.step);
  }

  onInput(e: Event): void {
    const raw = (e.target as HTMLInputElement).value;
    if (raw === "") {
      this.valueChange.emit(null);
      return;
    }
    const n = Number(raw);
    if (Number.isFinite(n)) this.emitValue(n);
  }

  onBlur(): void {
    const n = Number(this.value);
    const final = Number.isFinite(n) ? this.clamp(n) : this.min;
    if (final !== Number(this.value)) {
      this.valueChange.emit(final);
      this.change.emit(final);
    }
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      this.increment();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      this.decrement();
    }
  }
}
