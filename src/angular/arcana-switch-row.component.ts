import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from "@angular/core";
import { ArcanaSwitchComponent } from "./arcana-switch.component";

/**
 * `ArcanaSwitchRowComponent` — Angular port do SFC Vue `ArcanaSwitchRow`.
 *
 * Attribute selector num `<button>` (`<button arcanaSwitchRow>`): toggle full-width
 * "linha de configuração". Reproduz `.arcana-switch-row` (+ `is-on`/`is-disabled`), os textos
 * (`__text`/`__title`/`__sub`) e o `<button arcanaSwitch class="arcana-switch-row__switch">`
 * interno (aria-hidden), idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 * - slots `#label`/`#description` → `@Input() label` / `@Input() description` (string) nesta fase.
 */
@Component({
  selector: "button[arcanaSwitchRow]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArcanaSwitchComponent],
  host: {
    "type": "button",
    "role": "switch",
    "[class]": "rootClass",
    "[attr.aria-checked]": "!!value",
    "[attr.aria-label]": "ariaLabel || label || null",
    "[disabled]": "disabled",
    "(click)": "toggle()",
    "(keydown)": "onKeydown($event)"
  },
  template: `
    <div class="arcana-switch-row__text">
      <div class="arcana-switch-row__title">{{ label }}</div>
      @if (description) {
        <div class="arcana-switch-row__sub">{{ description }}</div>
      }
    </div>

    <button
      arcanaSwitch
      class="arcana-switch-row__switch"
      [value]="!!value"
      [disabled]="disabled"
      tabindex="-1"
      aria-hidden="true"
    ></button>
  `
})
export class ArcanaSwitchRowComponent {
  @Input() value = false;
  @Input() label = "";
  @Input() description = "";
  @Input() disabled = false;
  @Input() ariaLabel = "";

  @Output() valueChange = new EventEmitter<boolean>();
  @Output() change = new EventEmitter<boolean>();

  get rootClass(): string {
    return [
      "arcana-switch-row",
      this.value ? "is-on" : "",
      this.disabled ? "is-disabled" : ""
    ].filter(Boolean).join(" ");
  }

  toggle(): void {
    if (this.disabled) return;
    const next = !this.value;
    this.valueChange.emit(next);
    this.change.emit(next);
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      this.toggle();
    }
  }
}
