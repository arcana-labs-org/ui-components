import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from "@angular/core";
import { ShadcnSwitchComponent } from "./shadcn-switch.component";

/**
 * `ShadcnSwitchRowComponent` — Angular port do SFC Vue `ShadcnSwitchRow`.
 *
 * Attribute selector num `<button>` (`<button arcanaShadcnSwitchRow>`): toggle full-width
 * "linha de configuração". Reproduz `.shadcn-switch-row` (+ `is-on`/`is-disabled`), os textos
 * (`__text`/`__title`/`__sub`) e o `<button arcanaShadcnSwitch class="shadcn-switch-row__switch">`
 * interno (aria-hidden), idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 * - slots `#label`/`#description` → `@Input() label` / `@Input() description` (string) nesta fase.
 */
@Component({
  selector: "button[arcanaShadcnSwitchRow]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShadcnSwitchComponent],
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
    <div class="shadcn-switch-row__text">
      <div class="shadcn-switch-row__title">{{ label }}</div>
      @if (description) {
        <div class="shadcn-switch-row__sub">{{ description }}</div>
      }
    </div>

    <button
      arcanaShadcnSwitch
      class="shadcn-switch-row__switch"
      [value]="!!value"
      [disabled]="disabled"
      tabindex="-1"
      aria-hidden="true"
    ></button>
  `
})
export class ShadcnSwitchRowComponent {
  @Input() value = false;
  @Input() label = "";
  @Input() description = "";
  @Input() disabled = false;
  @Input() ariaLabel = "";

  @Output() valueChange = new EventEmitter<boolean>();
  @Output() change = new EventEmitter<boolean>();

  get rootClass(): string {
    return [
      "shadcn-switch-row",
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
