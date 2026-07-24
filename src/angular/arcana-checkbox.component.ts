import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from "@angular/core";

/**
 * `ArcanaCheckboxComponent` — Angular port do SFC Vue `ArcanaCheckbox`.
 *
 * Attribute selector num `<label>` (`<label arcanaCheckbox>`): reproduz o
 * `<label class="arcana-checkbox">` com `<input type="checkbox" class="arcana-checkbox__input">`
 * NATIVO + a pintura (`__box`/`__icon`/`__label`), idêntico ao Vue/React. O input real
 * preserva `check()`/`uncheck()` do Dusk.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 * - slot default (label) → `@Input() label` (string) nesta fase.
 */
@Component({
  selector: "label[arcanaCheckbox]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass"
  },
  template: `
    <input
      type="checkbox"
      class="arcana-checkbox__input"
      [checked]="value"
      [disabled]="disabled"
      [attr.name]="name || null"
      [attr.aria-label]="ariaLabel || null"
      (change)="onChange($event)"
    />

    <span class="arcana-checkbox__box" aria-hidden="true">
      @if (indeterminate) {
        <i class="fa-solid fa-minus arcana-checkbox__icon"></i>
      } @else if (value) {
        <i class="fa-solid fa-check arcana-checkbox__icon"></i>
      }
    </span>

    @if (label) {
      <span class="arcana-checkbox__label">{{ label }}</span>
    }
  `
})
export class ArcanaCheckboxComponent {
  @Input() value = false;
  @Input() indeterminate = false;
  @Input() disabled = false;
  @Input() label = "";
  @Input() name = "";
  @Input() ariaLabel = "";

  @Output() valueChange = new EventEmitter<boolean>();
  @Output() change = new EventEmitter<boolean>();

  get rootClass(): string {
    return [
      "arcana-checkbox",
      this.value || this.indeterminate ? "arcana-checkbox--checked" : "",
      this.disabled ? "arcana-checkbox--disabled" : ""
    ].filter(Boolean).join(" ");
  }

  onChange(ev: Event): void {
    const checked = (ev.target as HTMLInputElement).checked;
    this.valueChange.emit(checked);
    this.change.emit(checked);
  }
}
