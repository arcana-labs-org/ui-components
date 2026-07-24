import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from "@angular/core";

/**
 * `ArcanaSwitchComponent` — Angular port do SFC Vue `ArcanaSwitch`.
 *
 * Attribute selector num `<button>` (`<button arcanaSwitch>`): `role="switch"`,
 * `span.arcana-switch__thumb` e o `<input class="arcana-switch__hidden-input">` opcional
 * (quando `name`), idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 */
@Component({
  selector: "button[arcanaSwitch]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "type": "button",
    "role": "switch",
    "[class]": "rootClass",
    "[attr.aria-checked]": "isChecked",
    "[attr.aria-label]": "ariaLabel || null",
    "[disabled]": "disabled",
    "(click)": "toggle()",
    "(keydown)": "onKeydown($event)"
  },
  template: `
    <span class="arcana-switch__thumb" aria-hidden="true"></span>

    @if (name) {
      <input
        type="checkbox"
        class="arcana-switch__hidden-input"
        [attr.name]="name"
        [checked]="isChecked"
        [disabled]="disabled"
        tabindex="-1"
        aria-hidden="true"
        (change)="$event.stopPropagation()"
      />
    }
  `
})
export class ArcanaSwitchComponent {
  @Input() value = false;
  @Input() disabled = false;
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() name = "";
  @Input() ariaLabel = "";

  @Output() valueChange = new EventEmitter<boolean>();
  @Output() change = new EventEmitter<boolean>();

  get isChecked(): boolean {
    return Boolean(this.value);
  }

  get rootClass(): string {
    return [
      "arcana-switch",
      `arcana-switch--${this.size}`,
      this.isChecked ? "is-checked" : "",
      this.disabled ? "is-disabled" : ""
    ].filter(Boolean).join(" ");
  }

  toggle(): void {
    if (this.disabled) return;
    const next = !this.isChecked;
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
