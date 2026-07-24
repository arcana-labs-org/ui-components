import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from "@angular/core";

/**
 * `ShadcnCheckboxComponent` — Angular port do SFC Vue `ShadcnCheckbox`.
 *
 * Attribute selector num `<label>` (`<label arcanaShadcnCheckbox>`): reproduz o
 * `<label class="shadcn-checkbox">` com `<input type="checkbox" class="shadcn-checkbox__input">`
 * NATIVO + a pintura (`__box`/`__icon`/`__label`), idêntico ao Vue/React. O input real
 * preserva `check()`/`uncheck()` do Dusk.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 * - slot default (label) → `@Input() label` (string) nesta fase.
 */
@Component({
  selector: "label[arcanaShadcnCheckbox]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass"
  },
  template: `
    <input
      type="checkbox"
      class="shadcn-checkbox__input"
      [checked]="value"
      [disabled]="disabled"
      [attr.name]="name || null"
      [attr.aria-label]="ariaLabel || null"
      (change)="onChange($event)"
    />

    <span class="shadcn-checkbox__box" aria-hidden="true">
      @if (indeterminate) {
        <i class="fa-solid fa-minus shadcn-checkbox__icon"></i>
      } @else if (value) {
        <i class="fa-solid fa-check shadcn-checkbox__icon"></i>
      }
    </span>

    @if (label) {
      <span class="shadcn-checkbox__label">{{ label }}</span>
    }
  `
})
export class ShadcnCheckboxComponent {
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
      "shadcn-checkbox",
      this.value || this.indeterminate ? "shadcn-checkbox--checked" : "",
      this.disabled ? "shadcn-checkbox--disabled" : ""
    ].filter(Boolean).join(" ");
  }

  onChange(ev: Event): void {
    const checked = (ev.target as HTMLInputElement).checked;
    this.valueChange.emit(checked);
    this.change.emit(checked);
  }
}
